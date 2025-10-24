import { reactive, computed } from 'vue'
import type { Weapon } from "@/types/weapon"
import { useSlotRows } from '@/composables/useSlotRows'

interface WeaponInstance{
	id: number
	baseAttr: Weapon
	slotRows: ReturnType<typeof useSlotRows>
}

export function useWeapons(){
	const weaponInstances = reactive<WeaponInstance[]>([
		{
			id: 0,
			baseAttr: { force: 0, ammo: 0, range: 0, speed: 0, int: 0 },
			slotRows: useSlotRows()
		}
	])

	const nextId = computed(() => {
		if(weaponInstances.length === 0){ return 0 }
		return Math.max(...weaponInstances.map((weapon) => weapon.id)) + 1
	})

	const addWeapon = () => {

	}

	const removeWeapon = () => {

	}

	const updateBaseAttr = (weaponId: number, attr: Partial<Weapon>) => {
		const weapon = weaponInstances.find((w) => w.id === weaponId)
		if(weapon){ Object.assign(weapon.baseAttr, attr) }
	}

	const weaponsLiveAttr = computed(() => {
		return weaponInstances.map((w) => {
			const modifier = w.slotRows.totalPartMods

			const liveAttr1 = {
				force: Math.ceil(w.baseAttr.force * modifier.force),
				ammo: Math.ceil(w.baseAttr.ammo * modifier.ammo),
				range: Math.ceil(w.baseAttr.range * modifier.range),
				speed: Math.ceil(w.baseAttr.speed * modifier.speed),
				int: Math.ceil(w.baseAttr.int * modifier.int)
			}

			const liveAttr2 = Object.fromEntries(
				Object.entries(liveAttr1).map(([key, value]) => {
					return [key, (Math.ceil(value * 10000) / 10000).toFixed(4)]
				})
			)

			return {
				id: w.id,
				liveAttr1, liveAttr2
			}
		})
	})

	return {
		weapons: weaponInstances,
		weaponsLiveAttr,
		addWeapon,
		removeWeapon,
		updateBaseAttr
	}
}
