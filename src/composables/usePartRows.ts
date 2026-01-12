import { type Ref, computed, unref } from 'vue'
import { type IPart } from '@/models/Part'
import { Robot } from '@/models/Robot'
import { useParts } from '@/composables/useParts'

const { parts } = useParts()

export type Row = {
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

export function usePartRows(robot: Ref<Robot>){
	const rows = computed(() => {
    return robot.value.partRows.map((row) => ({
			id: row.id,
			type: row.type,
			partName: row.partName,
			quantity: row.quantity === 0 ? null : row.quantity
    }))
	})

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

	const addRow = () => {
		return robot.value.addPartRows(1)
	}

	const removeRow = (id: number) => {
		return robot.value.removePartRow(id)
	}

	const updateRow = (id: number, update: UpdateRow) => {
		const lookup = partsLookup.value
		const partRows = unref(robot.value.partRows)

		robot.value.updatePartRow(id, update)

		const row = partRows.find((r) => r.id === id)
		if(row && row.type !== '' && row.partName !== '' && row.quantity > 0){
			const key = `${row.type}:${row.partName}`
			const part = lookup.get(key)
			robot.value.updatePartRow(id, { part: part ?? null })
		}else{
			robot.value.updatePartRow(id, { part: null })
		}
	}

	return{
		rows,
		addRow,
		removeRow,
		updateRow
	}
}
