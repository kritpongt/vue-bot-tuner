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
	constructor(
		private readonly _id: number,
		public weaponType: string,
		public baseStats: WeaponStat,
		public initRows: number = 3
	){
		super()
		this.addSlotRows(initRows)
	}

	get id(){
		return this._id
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
		this.updateAllSlotRows({ type: type })
	}

	updateBaseStats(update: Partial<WeaponStat>){
		Object.assign(this.baseStats, update)
	}

	get totalStats(): WeaponStat{
		const partAttr = this._slotRows.reduce((acc, row) => {
			if(!row.part || row.quantity <= 0){ return acc }
			return {
				force: acc.force + ((row.part?.mod?.force ?? 0) * row.quantity),
				ammo: acc.ammo + ((row.part?.mod?.ammo ?? 0) * row.quantity),
				range: acc.range + ((row.part?.mod?.range ?? 0) * row.quantity),
				speed: acc.speed + ((row.part?.mod?.speed ?? 0) * row.quantity),
				int: acc.int + ((row.part?.mod?.int ?? 0) * row.quantity)
			}
		}, { force: 0, ammo: 0, range: 0, speed: 0, int: 0 })

		return {
			force: Math.round((this.baseStats.force * partAttr.force) * 10000) / 10000,
			ammo: Math.round((this.baseStats.ammo * partAttr.ammo) * 10000) / 10000,
			range: Math.round((this.baseStats.range * partAttr.range) * 10000) / 10000,
			speed: Math.round((this.baseStats.speed * partAttr.speed) * 10000) / 10000,
			int: Math.round((this.baseStats.int * partAttr.int) * 10000) / 10000
		}
	}
}
