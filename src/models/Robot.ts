import { SlotRow } from "@/models/SlotRow"
import { Weapon } from "@/models/Weapon"

export type EquipStat = {
	hp: number
	str: number
	tec: number
	wlk: number
	fly: number
	tgh: number
}

export class Robot{
	private _slotRows: SlotRow[] = []
	private _weapons: Weapon[] = []

	constructor(
		public id: string,
		public name: string,
		public currentCapa: number,
		public maxCapa: number,
		public maxSlots: number,
		public baseStats: EquipStat,
	){}

	get slotRows(): SlotRow[]{
		return this._slotRows
	}

	get weapons(): Weapon[]{
		return this._weapons
	}

	get usedCapa(){
		const sum = this._slotRows.reduce((sum, row) => sum + (row.part ? row.part.cost * (row.quantity ?? 0) : 0), 0)
		return this.currentCapa + sum
	}

	get remainingSlots(){
		const sum = this._slotRows.reduce((sum, row) => sum + (row.part ? (row.quantity ?? 0) : 0), 0)
		return this.maxSlots - sum
	}

	get totalStats(): EquipStat{
		const partStats = this._slotRows.reduce((acc, row) => {
			if(!row.part && row.quantity <= 0){ return acc }
			return{
				hp: acc.hp + ((row.part?.hp ?? 0) * row.quantity),
				str: acc.str + ((row.part?.str ?? 0) * row.quantity),
				tec: acc.tec + ((row.part?.tec ?? 0) * row.quantity),
				wlk: acc.wlk + ((row.part?.wlk ?? 0) * row.quantity),
				fly: acc.fly + ((row.part?.fly ?? 0) * row.quantity),
				tgh: acc.tgh + ((row.part?.tgh ?? 0) * row.quantity)
			}
		}, { hp: 0, str: 0, tec: 0, wlk: 0, fly: 0, tgh: 0 })

		return{
			hp: this.baseStats.hp + partStats.hp,
			str: this.baseStats.str + partStats.str,
			tec: this.baseStats.tec + partStats.tec,
			wlk: this.baseStats.wlk + partStats.wlk,
			fly: this.baseStats.fly + partStats.fly,
			tgh: this.baseStats.tgh + partStats.tgh,
		}
	}

	addSlotRow(row: SlotRow){
		this._slotRows.push(row)
	}

	addSlotRows(rowCount: number){
		for(let id = 0; id < rowCount; id++){
			const row = new SlotRow(id, '', '', 0)
			this._slotRows.push(row)
		}
	}

	removeSlotRow(id: number){
		const index = this._slotRows.findIndex((r) => r.id === id)
		if(index === -1){ return false }

		this._slotRows.splice(index, 1)
		return true
	}

	updateSlotRow(id: number, update: Partial<SlotRow>){
		const row = this._slotRows.find((r) => r.id === id)
		if(!row){ return false }

		Object.assign(row, update)
		return true
	}
}
