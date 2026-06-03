import { type Ref, computed } from 'vue'
import { type WeaponStat, Weapon } from '@/models/Weapon'
import { useSlots } from '@/composables/useRobot'

export function useWeapon(weapon: Ref<Weapon>) {
  const slots = useSlots(weapon)

  const weaponType = computed(() => weapon.value.weaponType)
  const baseStat = computed(() => weapon.value.baseStats)

  const statDelta = computed(() => weapon.value.totalStats)
  const statTotal = computed(
    () =>
      Object.fromEntries(
        Object.entries(statDelta.value).map(([k, v]) => [
          k,
          weapon.value.baseStats[k as keyof WeaponStat] + Math.ceil(v as number)
        ])
      ) as WeaponStat
  )

  const updateType = (type: string) => {
    weapon.value.updateWeaponType(type)
  }

  const updateBaseStat = (update: Partial<WeaponStat>) => {
    weapon.value.updateBaseStats(update)
  }

  return {
    ...slots,
    weaponType,
    baseStat,
    statDelta,
    statTotal,
    updateType,
    updateBaseStat
  }
}
