import { reactive, computed/* , type Ref */ } from 'vue'
import type { Stats } from '@/types/stats'
import { type Part, getModValue } from '@/types/part'
import type { Slot } from '@/types/slot'
import type { Weapon } from '@/types/weapon'

import { useParts } from '@/composables/useParts'

export function useSlotRows(/* parts: Ref<Part[]> */){
	const slots = reactive<Slot[]>([
		{ id: 0, type: '', partName: '', number: null },
		{ id: 1, type: '', partName: '', number: null },
		{ id: 2, type: '', partName: '', number: null }
	])

	const nextId = computed(() => {
		if(slots.length === 0){ return 0 }
		return Math.max(...slots.map((slots) => slots.id)) + 1
	})

	const addSlot = () => {
		slots.push({
			id: nextId.value,
			type: '',
			partName: '',
			number: null
		})
	}

	const removeSlot = (id: number) => {
		if(slots.length <= 1){ return false }

		const index = slots.findIndex((slot) => slot.id === id)
		if(index !== -1){ slots.splice(index, 1) }

		return false
	}

	const partsLookup = computed(() => {
		const { parts } = useParts()
		const map = new Map<string, Part>()
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

	const totalPartStats = computed(() => {
		const result = {
			capa: { current: 0, max: 0 },
			hp: 0,
			str: 0,
			tec: 0,
			wlk: 0,
			fly: 0,
			tgh: 0,
			slots: 0
		} as Stats

		const lookup = partsLookup.value

		slots.forEach((slot) => {
			if(slot.type && slot.partName && (slot.number !== null && slot.number > 0)){
				const key = `${slot.type}:${slot.partName}`
				const partStats = lookup.get(key)
				if(partStats){
					result.capa.current += (partStats.cost * slot.number)
					result.hp += (partStats.hp * slot.number)
					result.str += (partStats.str * slot.number)
					result.tec += (partStats.tec * slot.number)
					result.wlk += (partStats.wlk * slot.number)
					result.fly += (partStats.fly * slot.number)
					result.tgh += (partStats.tgh * slot.number)
					result.slots += slot.number
				}
			}
		})
		return result
	})

	const totalPartMods = computed(() => {
		const result = {
			force: 1,
			ammo: 1,
			range: 1,
			speed: 1,
			int: 1
		} as Weapon

		const lookup = partsLookup.value

		slots.forEach((slot) => {
			if(slot.type && slot.partName && (slot.number !== null && slot.number > 0)){
				const key = `${slot.type}:${slot.partName}`
				const partAttr = lookup.get(key)
				if(partAttr){
					result.force = Math.max(1 + (getModValue(partAttr, 'force') * slot.number), 0)
					result.ammo = Math.max(1 + (getModValue(partAttr, 'ammo') * slot.number), 0)
					result.range = Math.max(1 + (getModValue(partAttr, 'range') * slot.number), 0)
					result.speed = Math.max(1 + (getModValue(partAttr, 'speed') * slot.number), 0)
					result.int = Math.max(1 + (getModValue(partAttr, 'int') * slot.number), 0)
				}
			}
		})
		return result
	})

	return{
		slots,
		totalPartStats,
		totalPartMods,
		addSlot,
		removeSlot
	}
}
