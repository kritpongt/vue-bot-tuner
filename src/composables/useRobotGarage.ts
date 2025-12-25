import { ref, computed, readonly } from 'vue'
import { type Stat, Robot } from '@/models/Robot'

let robotInstance: ReturnType<typeof robotGarage> | null = null

function robotGarage(){
	const id = crypto.randomUUID()
	const currentCapa = 0
	const maxCapa = 0
	const maxSlots = 0
	const defaultStats = {
		hp: 0,
		str: 0,
		tec: 0,
		wlk: 0,
		fly: 0,
		tgh: 0
	} as Stat

	const robots = ref<Robot[]>([new Robot(id, '', currentCapa, maxCapa, maxSlots, defaultStats)])
	const activeRobotId = ref<string>(id)

	const activeRobot = computed(() => {
		return robots.value.find((r) => r.id === activeRobotId.value)
	})

	const activeRobotIndex = computed(() => {
		return robots.value.findIndex((r) => r.id === activeRobotId.value)
	})

	const addRobot = () => {
		const robot = new Robot(crypto.randomUUID(), '', currentCapa, maxCapa, maxSlots, defaultStats)
		robots.value.push(robot)
	}

	const removeRobot = (id: string) => {
		const index = robots.value.findIndex((r) => r.id === id)
		if(index > -1){ robots.value.splice(index, 1) }
	}

	const getRobotIndex = (index: number) => {
		return robots.value[index] as Robot
	}

	const getRobot = (id: string) => {
		return robots.value.find((r) => r.id === id) as Robot
	}

	const setActiveRobot = (id: string) => {
		const robot = getRobot(id)
		if(robot){
			activeRobotId.value = id
			return true
		}
		return false
	}

	return {
		robots: readonly(robots),
		activeRobotId: readonly(activeRobotId),
		activeRobot,
		activeRobotIndex,
		addRobot,
		removeRobot,
		getRobot,
		getRobotIndex,
		setActiveRobot
	}
}

export function useRobotGarage(){
	if(!robotInstance){
		robotInstance = robotGarage()
	}
	return robotInstance
}
