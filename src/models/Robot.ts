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
	private _baseStats: EquipStat

	constructor(
		private readonly _id: string,
		public name: string,
		public currentCapa: number,
		public maxCapa: number,
		public maxSlots: number,
		baseStats: EquipStat,
		public initRows: number = 5,
		public initWeapons: number = 1
	){
		super()
		this._baseStats = { ...baseStats }
		this.addPartRows(initRows)
		this._weapons.addWeapons(initWeapons)
	}

	get id(){
		return this._id
	}

	get baseStats(): Readonly<EquipStat>{
		return { ...this._baseStats }
	}

	get weapons(): Readonly<WeaponsHandler>{
		return this._weapons
	}

	get totalCapa(): number{
		return this.currentCapa + (this.usedCapa + this._weapons.totalUsedCapa)
	}

	get remainingSlots(): number{
		return this.maxSlots - (this.usedSlot + this._weapons.totalUsedSlot)
	}

	get totalStats(): EquipStat{
		const partStats = this._partRows.reduce((acc, row) => {
			if(!row.part || row.quantity <= 0){ return acc }
			const part = row.part
			const quantity = row.quantity
			return{
				hp: acc.hp + (part.hp * quantity),
				str: acc.str + (part.str * quantity),
				tec: acc.tec + (part.tec * quantity),
				wlk: acc.wlk + (part.wlk * quantity),
				fly: acc.fly + (part.fly * quantity),
				tgh: acc.tgh + (part.tgh * quantity)
			}
		}, { hp: 0, str: 0, tec: 0, wlk: 0, fly: 0, tgh: 0 })

		return Object.fromEntries(
			Object.entries(this._baseStats).map(([key, value]) => [
				key, value + partStats[key as keyof EquipStat]
			])
		) as EquipStat
	}

	updateBaseStats(update: Partial<EquipStat>){
		for(const [key, value] of Object.entries(update)){
			if(typeof value !== 'number' || isNaN(value)){
				throw new Error(`Invalid value for ${key}: ${value}`)
			}
		}
		Object.assign(this._baseStats, update)
	}
}
