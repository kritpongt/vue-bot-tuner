import { shallowReactive, computed, type Ref, watch } from 'vue'
import type { WeaponStat } from '@/models/Weapon'
import { Robot } from '@/models/Robot'
// import { useWeaponPartRows } from '@/composables/useWeaponPartRows'
import { usePartRows } from '@/composables/useRobot/usePartRows'

export function useWeapons(robot: Ref<Robot>) {
  const weaponInstance = shallowReactive<Map<number, ReturnType<typeof usePartRows>>>(new Map())

  watch(
    () => robot.value.id,
    () => {
      weaponInstance.clear()
    }
  )

  const getWeaponPartRows = (id: number) => {
    if (!weaponInstance.has(id)) {
      // weaponInstance.set(id, useWeaponPartRows(robot, id))
      const weaponRef = computed(() => {
        const weapon = robot.value.weapons.weaponList.find((w) => w.id === id)
        if (!weapon) throw new Error(`Robot '${robot.value.name}' Weapon ${id} not found`)
        return weapon
      })
      weaponInstance.set(id, usePartRows(weaponRef))
    }
    return weaponInstance.get(id) as ReturnType<typeof usePartRows>
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

  const updateWeaponBaseStat = (id: number, uppdate: Partial<WeaponStat>) => {
    // const weapon = weapons.value.find((w) => w.id === id)
    // if (weapon) {
    //   robot.value.weapons.weaponList[id]?.updateBaseStats(uppdate)
    // }
    const weapon = robot.value.weapons.weaponList.find((w) => w.id === id)
    if (weapon) {
      weapon.updateBaseStats(uppdate)
    }
  }

  const updateWeaponType = (id: number, type: string) => {
    // const weapon = weapons.value.find((w) => w.id === id)
    // if (weapon) {
    //   robot.value.weapons.weaponList[id]?.updateWeaponType(type)
    // }
    const weapon = robot.value.weapons.weaponList.find((w) => w.id === id)
    if (weapon) {
      weapon.updateWeaponType(type)
    }
  }

  const weaponsStats = computed(() => {
    return weapons.value.map((weapon) => {
      const stats_a = weapon.totalStat
      const stats_b = Object.fromEntries(
        Object.entries(weapon.totalStat).map(([key, value]) => {
          return [key, weapon.baseStat[key as keyof WeaponStat] + Math.ceil(value)]
        })
      )
      return { id: weapon.id, stats_a, stats_b }
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
