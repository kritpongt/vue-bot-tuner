import { PartRow } from '@/models/PartRow'

export abstract class WithPartRows{
	protected _partRows: PartRow[] = []
	private _nextId: number = 0

	get partRows(): readonly PartRow[]{
		return this._partRows
	}

	protected get usedCapa(){
		return this._partRows.reduce((sum, row) => sum + (row.part ? row.part.cost * (row.quantity ?? 0) : 0), 0)
	}

	protected get usedSlot(){
		return this._partRows.reduce((sum, row) => sum + (row.part ? (row.quantity ?? 0) : 0), 0)
	}

	addPartRows(rowCount: number){
		if(rowCount <= 0){ return }

		for(let i = 0; i < rowCount; i++){
			const row = new PartRow(this._nextId++, '', '', 0)
			this._partRows.push(row)
		}
	}

	removePartRow(id: number): boolean{
		const index = this._partRows.findIndex((r) => r.id === id)
		if(index === -1){ return false }

		this._partRows.splice(index, 1)
		return true
	}

	updatePartRow(id: number, update: Partial<PartRow>): boolean{
		const row = this._partRows.find((r) => r.id === id)
		if(!row){ return false }

		Object.assign(row, update)
		return true
	}

	protected updateAllPartRows(update: Partial<PartRow>){
		for(const row of this._partRows){
			Object.assign(row, update)
		}
	}
}
