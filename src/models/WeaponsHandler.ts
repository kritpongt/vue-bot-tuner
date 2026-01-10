import { Weapon, type WeaponStat } from '@/models/Weapon'

export class WeaponsHandler{
	private _weapons: Weapon[] = []
	private _nextId: number = 0
	private _defaultType: string = 'ALL'
	private _defaultStats: WeaponStat = { force: 0, ammo: 0, speed: 0, range: 0, int: 0 }

	get weaponList(): readonly Weapon[]{
		return this._weapons
	}

	get totalUsedCapa(): number{
		return this._weapons.reduce((sum, row) => sum + row.getUsedCapa(), 0)
	}

	get totalUsedSlot(): number{
		return this._weapons.reduce((sum, row) => sum + row.getUsedSlot(), 0)
	}

	count(): number{
		return this._weapons.length
	}

	addWeapons(amount: number){
		if(amount <= 0){ return }

		for(let i = 0; i < amount; i++){
			const row = new Weapon(this._nextId++, this._defaultType, this._defaultStats)
			this._weapons.push(row)
		}
	}

	removeWeapon(id: number): boolean{
		const index = this._weapons.findIndex((r) => r.id === id)
		if(index === -1){ return false }

		this._weapons.splice(index, 1)
		return true
	}
}
