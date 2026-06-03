import { computed, type Ref } from 'vue'
import { type EquipStat, Robot } from '@/models/Robot'

export function useStats(robot: Ref<Robot>) {
  const usedCapa = computed(() => robot.value.totalCapa)
  const maxCapa = computed(() => robot.value.maxCapa)
  const remainingSlots = computed(() => robot.value.remainingSlots)
  const totalStats = computed(() => robot.value.totalStats)

  // ## derived UI state
  const isOverCapa = computed(() => robot.value.totalCapa > robot.value.maxCapa)
  const isOverSlots = computed(() => robot.value.remainingSlots < 0)

  const updateCurrentCapa = (value: number) => {
    robot.value.currentCapa = value
  }

  const updateMaxCapa = (value: number) => {
    robot.value.maxCapa = value
  }

  const updateMaxSlots = (value: number) => {
    robot.value.maxSlots = value
  }

  const updateBaseStat = (key: keyof EquipStat, value: number) => {
    robot.value.updateBaseStats({ [key]: value })
  }

  return {
    usedCapa,
    maxCapa,
    remainingSlots,
    totalStats,
    isOverCapa,
    isOverSlots,
    updateCurrentCapa,
    updateMaxCapa,
    updateMaxSlots,
    updateBaseStat
  }
}
