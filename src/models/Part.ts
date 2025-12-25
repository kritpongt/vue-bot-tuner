export type PartType = 'HP' | 'TGH' | 'STR' | 'TEC' | 'WLK' | 'FLY' | 'OTHER' | 'STR&TEC' | 'WLK&FLY'
export type WeaponPartType = 'MAIN' | 'SUB'

export type PartModifier = {
	force: number
	ammo: number
	range: number
	speed: number
	int: number
}

export interface IPart{
	type: PartType | WeaponPartType
	partName: string
	hp: number
	str: number
	tec: number
	wlk: number
	fly: number
	tgh: number
	cost: number
	mod?: Partial<PartModifier>
	proc?: Record<string, number>
}

export class Part implements IPart{
	constructor(
		public type: PartType | WeaponPartType,
		public partName: string,
		public hp: number,
		public str: number,
		public tec: number,
		public wlk: number,
		public fly: number,
		public tgh: number,
		public cost: number,
		public mod?: Partial<PartModifier>,
		public proc?: Record<string, number>
	){}

	static partTypes = ['HP', 'TGH', 'STR', 'TEC', 'WLK', 'FLY', 'OTHER', 'STR&TEC', 'WLK&FLY']
	static weaponPartTypes = ['MAIN', 'SUB']

	static isPartType(type: string): type is PartType{
		return this.partTypes.includes(type)
	}

	static isWeaponPartType(type: string): type is WeaponPartType{
		return this.weaponPartTypes.includes(type)
	}

	getModValue(key: keyof PartModifier, defaultValue: number = 0): number{
		return this.mod?.[key] ?? defaultValue
	}
}
