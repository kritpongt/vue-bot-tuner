import type { SlotRow } from '@/models/SlotRow'

export type WeaponStat = {
	force: number
	ammo: number
	range: number
	speed: number
	int: number
}

export class Weapon{
	private _slotRows: SlotRow[] = []

	constructor(
		public id: number,
		public weaponType: string,
		public baseStats: WeaponStat,
	){}

	get slotRows(): readonly SlotRow[]{
		return this._slotRows
	}

	addSlotRow(row: SlotRow){
		this._slotRows.push(row)
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
