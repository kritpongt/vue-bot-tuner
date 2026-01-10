import { type Ref, computed } from 'vue'
import { type EquipStat, Robot } from '@/models/Robot'

export function useStats(robot: Ref<Robot>) {
	const usedCapa = computed(() => {
		return robot.value.totalCapa
	})

	const maxCapa = computed(() => {
		return robot.value.maxCapa
	})

	const remainingSlots = computed(() => {
		return robot.value.remainingSlots
	})

	const totalStats = computed(() => {
		return robot.value.totalStats
	})

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
		robot.value.baseStats[key] = value
	}

	return {
		usedCapa,
		maxCapa,
		remainingSlots,
		totalStats,
		updateBaseStat,
		updateCurrentCapa,
		updateMaxCapa,
		updateMaxSlots
	}
}
