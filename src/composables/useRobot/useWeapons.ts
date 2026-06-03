import { computed, type Ref } from 'vue'
// import type { WeaponStat } from '@/models/Weapon'
import { Robot } from '@/models/Robot'

export function useWeapons(robot: Ref<Robot>) {
  const list = computed(() => robot.value.weapons.weaponList)

  const addWeapon = () => {
    robot.value.weapons.addWeapons(1)
  }

  const removeWeapon = (id: number) => {
    robot.value.weapons.removeWeapon(id)
  }

  // const updateWeaponBaseStat = (id: number, uppdate: Partial<WeaponStat>) => {
  //   // const weapon = weapons.value.find((w) => w.id === id)
  //   // if (weapon) {
  //   //   robot.value.weapons.weaponList[id]?.updateBaseStats(uppdate)
  //   // }
  //   const weapon = robot.value.weapons.weaponList.find((w) => w.id === id)
  //   if (weapon) {
  //     weapon.updateBaseStats(uppdate)
  //   }
  // }

  // const updateWeaponType = (id: number, type: string) => {
  //   // const weapon = weapons.value.find((w) => w.id === id)
  //   // if (weapon) {
  //   //   robot.value.weapons.weaponList[id]?.updateWeaponType(type)
  //   // }
  //   const weapon = robot.value.weapons.weaponList.find((w) => w.id === id)
  //   if (weapon) {
  //     weapon.updateWeaponType(type)
  //   }
  // }

  // const weaponsStats = computed(() => {
  //   return weapons.value.map((weapon) => {
  //     const stats_a = weapon.totalStat
  //     const stats_b = Object.fromEntries(
  //       Object.entries(weapon.totalStat).map(([key, value]) => {
  //         return [key, weapon.baseStat[key as keyof WeaponStat] + Math.ceil(value)]
  //       })
  //     )
  //     return { id: weapon.id, stats_a, stats_b }
  //   })
  // })

  return {
    list,
    // weaponsStats,
    addWeapon,
    removeWeapon
    // updateWeaponBaseStat,
    // updateWeaponType
  }
}
