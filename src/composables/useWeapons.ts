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
			baseStat: row.baseStats,
			totalStat: row.totalStats,
			partRows: getWeaponPartRows(row.id)
		}))
	})

	const addWeapon = () => {
		robot.value.weapons.addWeapons(1)
	}

	const removeWeapon = (id: number) => {
		robot.value.weapons.removeWeapon(id)
	}

	const updateWeaponBaseStat = (weaponId: number, uppdate: Partial<WeaponStat>) => {
		const weapon = weapons.value.find((w) => w.id === weaponId)
		if(weapon){ robot.value.weapons.weaponList[weaponId]?.updateBaseStats(uppdate) }
	}

	const updateWeaponType = (weaponId: number, type: string) => {
		const weapon = weapons.value.find((w) => w.id === weaponId)
		if(weapon){ robot.value.weapons.weaponList[weaponId]?.updateWeaponType(type) }
	}

	const weaponsStats = computed(() => {
		return weapons.value.map((weapon) => {
			const stats_A = weapon.totalStat
			const stats_B = Object.fromEntries(
				Object.entries(weapon.totalStat).map(([key, value]) => {
					return [key, weapon.baseStat[key as keyof WeaponStat] + Math.ceil(value)]
				})
			)
			return { id: weapon.id, stats_A, stats_B }
		})
	})

	return {
		weapons,
		weaponsStats,
		addWeapon,
		removeWeapon,
		updateWeaponBaseStat,
		updateWeaponType
	}
}
