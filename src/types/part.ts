export type PartType = 'HP' | 'TGH' | 'STR' | 'TEC' | 'WLK' | 'FLY' | 'OTHER' | 'STR&TEC' | 'WLK&FLY'

export type WeaponPartType = 'MAIN' | 'SUB'

export type PartModifier = {
	force: number
	ammo: number
	range: number
	speed: number
	int: number
}

export interface Part{
	type: PartType | WeaponPartType
	partName: string
	hp: number
	str: number
	tec: number
	wlk: number
	fly: number
	tgh: number
	mod?: Partial<PartModifier> // every single field is optional
	proc?: Record<string, number>
	cost: number
}

export function isPartType(value: string){
	return (
		value === 'HP' ||
		value === 'TGH' ||
		value === 'STR' ||
		value === 'TEC' ||
		value === 'WLK' ||
		value === 'FLY' ||
		value === 'OTHER' ||
		value === 'STR&TEC' ||
		value === 'WLK&FLY'
	)
}

export function isWeaponPartType(value: string){
	return (
		value === 'MAIN' ||
		value === 'SUB'
	)
}

export function hasModifier(part: Part, key: keyof PartModifier){
	return part.mod !== undefined && part.mod[key] !== undefined
}

export function getModValue(part: Part, key: keyof PartModifier, defaultValue: number = 0): number{
	return part.mod?.[key] ?? defaultValue
}
