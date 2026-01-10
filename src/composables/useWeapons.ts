import { shallowReactive, computed, type Ref, watch } from 'vue'
import type { WeaponStat } from '@/models/Weapon'
import { Robot } from '@/models/Robot'
import { useWeaponPartRows } from '@/composables/useWeaponPartRows'

export function useWeapons(robot: Ref<Robot>){
	const weaponInstance = shallowReactive<Map<number, ReturnType<typeof useWeaponPartRows>>>(new Map())

	watch(() => robot.value.id, () => {
		weaponInstance.clear()
	})

	const getWeaponPartRows = (index: number) => {
		if(!weaponInstance.has(index)){
			weaponInstance.set(index, useWeaponPartRows(robot, index))
		}
		return weaponInstance.get(index) as ReturnType<typeof useWeaponPartRows>
	}

	const weapons = computed(() => {
		return robot.value.weapons.weaponList.map((row) => ({
			id: row.id,
			weaponType: row.weaponType,
			baseAttr: row.baseStats,
			totalStat: row.totalStats,
			slotRows: getWeaponPartRows(row.id)
		}))
	})

	const addWeapon = () => {
		robot.value.weapons.addWeapons(1)
	}

	const removeWeapon = (id: number) => {
		robot.value.weapons.removeWeapon(id)
	}

	const updateBaseAttr = (weaponId: number, attr: Partial<WeaponStat>) => {
		const weapon = weapons.value.find((w) => w.id === weaponId)
		if(weapon){ robot.value.weapons.weaponList[weaponId]?.updateBaseStats(attr) }
	}

	const updateWeaponType = (weaponId: number, type: string) => {
		const weapon = weapons.value.find((w) => w.id === weaponId)
		if(weapon){ robot.value.weapons.weaponList[weaponId]?.updateWeaponType(type) }
	}

	const weaponsLiveAttr = computed(() => {
		return weapons.value.map((weapon) => {
			const liveAttr1 = weapon.totalStat
			const liveAttr2 = Object.fromEntries(
				Object.entries(weapon.totalStat).map(([key, value]) => {
					return [key, weapon.baseAttr[key as keyof WeaponStat] + Math.ceil(value)]
				})
			)
			return { id: weapon.id, liveAttr1, liveAttr2 }
		})
	})

	return {
		weapons,
		weaponsLiveAttr,
		addWeapon,
		removeWeapon,
		updateBaseAttr,
		updateWeaponType
	}
}
