import { ref, reactive, shallowReactive, computed, unref, type Reactive, type Ref } from 'vue'
import type { Weapon } from "@/types/weapon"
import { Robot } from '@/models/Robot'
import { useSlotRows } from '@/composables/useSlotRows'

interface WeaponInstance{
	id: number
	weaponType: Ref<string>
	baseAttr: Reactive<Weapon>
	slotRows: ReturnType<typeof useSlotRows>
}

export function useWeapons(robot: Ref<Robot>){
	const weaponInstances = shallowReactive<WeaponInstance[]>([
		{
			id: 0,
			weaponType: ref('ALL'),
			baseAttr: reactive({ force: 0, ammo: 0, range: 0, speed: 0, int: 0 }),
			slotRows: useSlotRows(robot, 3)
		}
	])

	const nextId = computed(() => {
		if(weaponInstances.length === 0){ return 0 }
		return Math.max(...weaponInstances.map((weapon) => weapon.id)) + 1
	})

	const addWeapon = () => {
		weaponInstances.push({
			id: nextId.value,
			weaponType: ref('ALL'),
			baseAttr: reactive({ force: 0, ammo: 0, range: 0, speed: 0, int: 0 }),
			slotRows: useSlotRows(robot, 3)
		})
	}

	const removeWeapon = () => {

	}

	const updateBaseAttr = (weaponId: number, attr: Partial<Weapon>) => {
		const weapon = weaponInstances.find((w) => w.id === weaponId)
		if(weapon){ Object.assign(weapon.baseAttr, attr) }
	}

	const weaponsLiveAttr = computed(() => {
		return weaponInstances.map((w) => {
			// const modifier = unref(w.slotRows.totalPartMods)

			const liveAttr1 = Object.fromEntries(
				Object.entries(w.baseAttr).map(([key, value]) => {
					// return [key, Math.ceil(value * modifier[key as keyof Weapon])]
					return [key, Math.ceil(value * 1)]
				})
			)

			const liveAttr2 = Object.fromEntries(
				Object.entries(liveAttr1).map(([key, value]) => {
					return [key, w.baseAttr[key as keyof Weapon] + value]
				})
			)

			return {
				id: w.id,
				liveAttr1,
				liveAttr2
			}
		})
	})

	const updateWeaponType = (weaponId: number, type: string) => {
		const weapon = weaponInstances.find((w) => w.id === weaponId)
		if(weapon){ weapon.weaponType.value = type }
	}

	return {
		weapons: weaponInstances,
		weaponsLiveAttr,
		addWeapon,
		removeWeapon,
		updateBaseAttr,
		updateWeaponType
	}
}
