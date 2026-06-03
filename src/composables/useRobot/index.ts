import { type Ref } from 'vue'
import { Robot } from '@/models/Robot'
import { useStats } from '@/composables/useRobot/useStats'
import { usePartRows as useSlots } from '@/composables/useRobot/usePartRows'
import { useWeapons } from '@/composables/useRobot/useWeapons'
import { useWeapon } from '@/composables/useRobot/useWeapon'

export function useRobot(robot: Ref<Robot>) {
  return {
    stats: useStats(robot),
    slots: useSlots(robot),
    weapons: useWeapons(robot)
  }
}

export { useStats, useSlots, useWeapons, useWeapon }
