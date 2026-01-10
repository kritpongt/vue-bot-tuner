import { WithPartRows } from "@/models/WithPartRows"
import { WeaponsHandler } from "@/models/WeaponsHandler"

export type EquipStat = {
	hp: number
	str: number
	tec: number
	wlk: number
	fly: number
	tgh: number
}

export class Robot extends WithPartRows{
	private _weapons: WeaponsHandler = new WeaponsHandler()

	constructor(
		private readonly _id: string,
		public name: string,
		public currentCapa: number,
		public maxCapa: number,
		public maxSlots: number,
		public baseStats: EquipStat,
		public initRows: number = 4,
		public initWeapons: number = 1
	){
		super()
		this.addSlotRows(initRows)
		this._weapons.addWeapons(initWeapons)
	}

	get id(){
		return this._id
	}

	get weapons(){
		return this._weapons
	}

	get totalCapa(): number{
		return this.currentCapa + (this.usedCapa + this._weapons.totalUsedCapa)
	}

	get remainingSlots(): number{
		return this.maxSlots - (this.usedSlot + this._weapons.totalUsedSlot)
	}

	get totalStats(): EquipStat{
		const partStats = this._slotRows.reduce((acc, row) => {
			if(!row.part || row.quantity <= 0){ return acc }
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
			tgh: this.baseStats.tgh + partStats.tgh
		}
	}
}
