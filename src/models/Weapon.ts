import { WithPartRows } from '@/models/WithPartRows'
import { Part } from '@/models/Part'

export type WeaponStat = {
	force: number
	ammo: number
	range: number
	speed: number
	int: number
}

export class Weapon extends WithPartRows{
	private _baseStats: WeaponStat

	constructor(
		private readonly _id: number,
		public weaponType: string,
		baseStats: WeaponStat,
		public initRows: number = 3
	){
		super()
		this._baseStats = { ...baseStats }
		this.addPartRows(initRows)
	}

	get id(){
		return this._id
	}

	get baseStats(): Readonly<WeaponStat>{
		return { ...this._baseStats }
	}

	get totalStats(): WeaponStat{
		const partStats = this._partRows.reduce((acc, row) => {
			if(!row.part?.mod || row.quantity <= 0){ return acc }
			const part = row.part.mod
			const quantity = row.quantity
			return {
				force: acc.force + ((part.force ?? 0) * quantity),
				ammo: acc.ammo + ((part.ammo ?? 0) * quantity),
				range: acc.range + ((part.range ?? 0) * quantity),
				speed: acc.speed + ((part.speed ?? 0) * quantity),
				int: acc.int + ((part.int ?? 0) * quantity)
			}
		}, { force: 0, ammo: 0, range: 0, speed: 0, int: 0 })

		return Object.fromEntries(
			Object.entries(this._baseStats).map(([key, value]) => [
				key, Math.round((value * partStats[key as keyof WeaponStat]) * 10000) / 10000
			])
		) as WeaponStat
	}

	getUsedCapa(): number{
		return this.usedCapa
	}

	getUsedSlot(): number{
		return this.usedSlot
	}

	updateWeaponType(type: string){
		this.weaponType = type
		if(!Part.weaponPartTypes.includes(type)){ type = '' }
		this.updateAllPartRows({ type: type })
	}

	updateBaseStats(update: Partial<WeaponStat>){
		for(const [key, value] of Object.entries(update)){
			if(typeof value !== 'number' || isNaN(value)){
				throw new Error(`Invalid value for ${key}: ${value}`)
			}
		}
		Object.assign(this._baseStats, update)
	}
}
