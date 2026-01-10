import { SlotRow } from '@/models/SlotRow'

export abstract class WithPartRows{
	protected _slotRows: SlotRow[] = []
	private _nextId: number = 0

	get slotRows(): readonly SlotRow[]{
		return this._slotRows
	}

	protected get usedCapa(){
		return this._slotRows.reduce((sum, row) => sum + (row.part ? row.part.cost * (row.quantity ?? 0) : 0), 0)
	}

	protected get usedSlot(){
		return this._slotRows.reduce((sum, row) => sum + (row.part ? (row.quantity ?? 0) : 0), 0)
	}

	addSlotRows(rowCount: number){
		if(rowCount <= 0){ return }

		for(let i = 0; i < rowCount; i++){
			const row = new SlotRow(this._nextId++, '', '', 0)
			this._slotRows.push(row)
		}
	}

	removeSlotRow(id: number): boolean{
		const index = this._slotRows.findIndex((r) => r.id === id)
		if(index === -1){ return false }

		this._slotRows.splice(index, 1)
		return true
	}

	updateSlotRow(id: number, update: Partial<SlotRow>): boolean{
		const row = this._slotRows.find((r) => r.id === id)
		if(!row){ return false }

		Object.assign(row, update)
		return true
	}

	protected updateAllSlotRows(update: Partial<SlotRow>){
		for(const row of this._slotRows){
			Object.assign(row, update)
		}
	}
}
