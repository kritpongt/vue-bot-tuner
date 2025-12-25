import { type Ref, ref, computed, unref, watch } from 'vue'
import { Robot } from '@/models/Robot'
import { SlotRow } from '@/models/SlotRow'
import { type IPart } from '@/models/Part'

import { useParts } from '@/composables/useParts'
const { parts } = useParts()

export type Slot = {
	id: number
	type: string
	partName: string
	quantity: number | null
}
export type UpdateRow = Partial<{
	type: string,
	partName: string,
	quantity: number
}>

export function useSlotRows(robot: Ref<Robot>, initRows: number = 3){

	const rows = ref<Slot[]>([])

	if(robot.value.slotRows.length === 0){
		robot.value.addSlotRows(initRows)
	}

	watch(() => robot.value.slotRows, (slotRows) => {
		// console.log(slotRows)
		rows.value = slotRows.map(row => ({
			id: row.id,
			type: row.type,
			partName: row.partName,
			quantity: row.quantity === 0 ? null : row.quantity
		}))
	}, { immediate: true, deep: true })

	const partsLookup = computed(() => {
		const map = new Map<string, IPart>()
		if(parts.value && parts.value.length > 0){
			for(const part of parts.value){
				const key = `${part.type}:${part.partName}`
				if(!map.has(key)){
					map.set(key, part)
				}
			}
		}
		return map
	})

	const nextId = computed(() => {
		if(robot.value.slotRows.length === 0){ return 0 }
		return Math.max(...robot.value.slotRows.map((r) => r.id)) + 1
	})

	const addRow = () => {
		const row = new SlotRow(nextId.value, '', '', 0)
		return robot.value.addSlotRow(row)
	}

	const removeRow = (id: number) => {
		return robot.value.removeSlotRow(id)
	}

	const updateRow = (id: number, update: UpdateRow) => {
		const lookup = partsLookup.value
		const slotRows = unref(robot.value.slotRows)

		robot.value.updateSlotRow(id, update)

		const row = slotRows.find((r) => r.id === id)
		if(row && row.type !== '' && row.partName !== '' && (row.quantity ?? 0) > 0){
			const key = `${row.type}:${row.partName}`
			const part = lookup.get(key)
			robot.value.updateSlotRow(id, { part: part ?? null })
		}
	}

	// const totalPartStats = computed(() => {
	// 	const result = {
	// 		hp: 0,
	// 		str: 0,
	// 		tec: 0,
	// 		wlk: 0,
	// 		fly: 0,
	// 		tgh: 0,
	// 	}

	// 	const lookup = partsLookup.value

	// 	slotRows.forEach((row) => {
	// 		if(row.type && row.partName && (row.quantity !== null && row.quantity > 0)){
	// 			const key = `${row.type}:${row.partName}`
	// 			const partStats = lookup.get(key)
	// 			if(partStats){
	// 				row.part = partStats
	// 				result.hp += (row.part.hp * row.quantity)
	// 				result.str += (row.part.str * row.quantity)
	// 				result.tec += (row.part.tec * row.quantity)
	// 				result.wlk += (row.part.wlk * row.quantity)
	// 				result.fly += (row.part.fly * row.quantity)
	// 				result.tgh += (row.part.tgh * row.quantity)
	// 			}
	// 		}
	// 	})
	// 	return result
	// })

	// const totalPartMods = computed(() => {
	// 	const result = {
	// 		force: 0,
	// 		ammo: 0,
	// 		range: 0,
	// 		speed: 0,
	// 		int: 0
	// 	}

	// 	const lookup = partsLookup.value

	// 	slotRows.forEach((row) => {
	// 		if(row.type && row.partName && (row.quantity !== null && row.quantity > 0)){
	// 			const key = `${row.type}:${row.partName}`
	// 			const partAttr = lookup.get(key)
	// 			if(partAttr){
	// 				row.part = partAttr
	// 				result.force += row.part.getModValue('force') * row.quantity
	// 				result.ammo += row.part.getModValue('ammo') * row.quantity
	// 				result.range += row.part.getModValue('range') * row.quantity
	// 				result.speed += row.part.getModValue('speed') * row.quantity
	// 				result.int += row.part.getModValue('int') * row.quantity
	// 			}
	// 		}
	// 	})
	// 	return result
	// })

	return{
		slotRows: rows,
		addRow,
		removeRow,
		updateRow
	}
}
