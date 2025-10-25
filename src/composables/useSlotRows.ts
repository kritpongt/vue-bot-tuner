import { reactive, computed } from 'vue'
import type { Stats } from '@/types/stats'
import { type Part, getModValue } from '@/types/part'
import type { Slot } from '@/types/slot'
import type { Weapon } from '@/types/weapon'

import { useParts } from '@/composables/useParts'

export function useSlotRows(initSlots: number = 3){
	const { parts } = useParts()

	const slots = reactive<Slot[]>(
		Array.from({ length: initSlots }, (_, index) => ({
				id: index,
				type: '',
				partName: '',
				number: null
		}))
	)

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
			force: 0,
			ammo: 0,
			range: 0,
			speed: 0,
			int: 0
		} as Weapon

		const lookup = partsLookup.value

		slots.forEach((slot) => {
			if(slot.type && slot.partName && (slot.number !== null && slot.number > 0)){
				const key = `${slot.type}:${slot.partName}`
				const partAttr = lookup.get(key)
				if(partAttr){
					result.force += getModValue(partAttr, 'force') * slot.number
					result.ammo += getModValue(partAttr, 'ammo') * slot.number
					result.range += getModValue(partAttr, 'range') * slot.number
					result.speed += getModValue(partAttr, 'speed') * slot.number
					result.int += getModValue(partAttr, 'int') * slot.number
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
