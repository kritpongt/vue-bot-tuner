export type PartType = 'HP' | 'TGH' | 'STR' | 'TEC' | 'WLK' | 'FLY' | 'OTHER' | 'STR&TEC' | 'WLK&FLY' | 'MAIN' | 'SUB'

export interface Part{
	type: string
	partName: PartType
	hp: number
	str: number
	tec: number
	wlk: number
	fly: number
	tgh: number
	mod?: {
		force?: number
		ammo?: number
		range?: number
		speed?: number
		int?: number
	}
	proc?: Record<string, number>
	cost: number
}
