import { reactive, computed, type Ref } from 'vue'
import type { Stats } from '@/types/stats'
import type { Part } from '@/types/part'

export type Slot = {
	id: number
	type: string
	partName: string
	number: number | null
}

export function useSlots(parts: Ref<Part[]>){
	const slots = reactive<Slot[]>([
		{ id: 0, type: '', partName: '', number: null },
		{ id: 1, type: '', partName: '', number: null },
		{ id: 2, type: '', partName: '', number: null }
	])

	const addSlot = () => {
		const newId = slots.length > 0 ? Math.max(...slots.map(row => row.id)) + 1 : 0
		slots.push({
			id: newId,
			type: '',
			partName: '',
			number: null
		})
	}

	const removeSlot = (id: number) => {
		const index = slots.findIndex(row => row.id === id)
		if(index !== -1){
			slots.splice(index, 1)
		}
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

	return{
		slots,
		addSlot,
		removeSlot,
		totalPartStats
	}
}
