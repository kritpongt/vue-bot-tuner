import { ref, computed, readonly } from 'vue'
import { type EquipStat, Robot } from '@/models/Robot'

import { useLocalStorage } from '@/composables/useLocalStorage'

let robotInstance: ReturnType<typeof robotGarage> | null = null

const CURRENT_CAPA = 0
const MAX_CAPA = 0
const MAX_SLOTS = 0
const DEFAULT_STATS = {
	hp: 0,
	str: 0,
	tec: 0,
	wlk: 0,
	fly: 0,
	tgh: 0
} as EquipStat

function robotGarage(init: number = 2){
	if(init < 1){ throw new Error('Robot initial must at least 1!!') }

	const defaultRobots = Array.from({ length: init }, (_, index) => {
		return new Robot(
			crypto.randomUUID(),
			`untitled${index + 1}`,
			CURRENT_CAPA,
			MAX_CAPA,
			MAX_SLOTS,
			DEFAULT_STATS
		)
	}) as [Robot, ...Robot[]]

	const robots = ref<Robot[]>(defaultRobots)
	const activeRobotId = ref<string>(defaultRobots[0].id)

	const activeRobot = computed(() => {
		return robots.value.find((r) => r.id === activeRobotId.value) as Robot
	})

	const addRobot = () => {
		const id = crypto.randomUUID()
		const robot = new Robot(id, `untitled${robots.value.length + 1}`, CURRENT_CAPA, MAX_CAPA, MAX_SLOTS, DEFAULT_STATS)
		robots.value.push(robot)
		activeRobotId.value = id
	}

	const removeRobot = (id: string) => {
		const index = robots.value.findIndex((r) => r.id === id)
		if (index > -1) { robots.value.splice(index, 1) }
	}

	const getRobotById = (id: string) => {
		return robots.value.find((r) => r.id === id) as Robot
	}

	const setRobotActive = (id: string) => {
		const robot = getRobotById(id)
		if(!robot){ return false }

		activeRobotId.value = id
		return true
	}

	const { saveRobots } = useLocalStorage()
	const inputSave = () => {
		saveRobots(robots.value as Robot[])
	}

	return {
		robots: readonly(robots),
		activeRobotId: readonly(activeRobotId),
		activeRobot,

		addRobot,
		removeRobot,
		setRobotActive,
		inputSave
	}
}

export function useRobotGarage() {
	if (!robotInstance) {
		robotInstance = robotGarage()
	}
	return robotInstance
}
