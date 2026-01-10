import { type Ref, computed, unref } from 'vue'
import type { IPart } from '@/models/Part'
import { Robot } from '@/models/Robot'
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

export function useWeaponPartRows(robot: Ref<Robot>, weaponId: number){
	const weaponList = computed(() => {
		const weapon = robot.value.weapons.weaponList.find((w) => w.id === weaponId)
		if(!weapon){ throw new Error(`Robot '${robot.value.name}' Weapon ${weaponId} not found`) }
		return weapon
	})

	const rows = computed(() => {
		return weaponList.value.slotRows.map((row) => ({
			id: row.id,
			type: row.type,
			partName: row.partName,
			quantity: row.quantity === 0 ? null : row.quantity
		}))
	})

	const addRow = () => {
		return weaponList.value.addSlotRows(1)
	}

	const removeRow = (id: number) => {
		return weaponList.value.removeSlotRow(id)
	}

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

	const updateRow = (id: number, update: UpdateRow) => {
		const lookup = partsLookup.value
		const slotRows = unref(weaponList.value.slotRows)
		weaponList.value.updateSlotRow(id, update)

		const row = slotRows.find((r) => r.id === id)
		if(row && row.type !== '' && row.partName !== '' && row.quantity > 0){
			const key = `${row.type}:${row.partName}`
			const part = lookup.get(key)
			weaponList.value.updateSlotRow(id, { part: part ?? null })
		}else{
			weaponList.value.updateSlotRow(id, { part: null })
		}
	}

	return{
		slotRows: rows,
		addRow,
		removeRow,
		updateRow
	}
}
