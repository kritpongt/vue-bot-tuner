import { Robot } from '@/models/Robot'

export class RobotManager{
	private robots: Map<string, Robot> = new Map()
	private activeRobotId: string | null = null

	addRobot(robot: Robot){
		this.robots.set(robot.id, robot)
		if(!this.activeRobotId){ this.activeRobotId = robot.id }
	}

	removeRobot(robotId: string){
		if(this.robots.size <= 1){ return false }

		const deleted = this.robots.delete(robotId)
		return deleted
	}

	getAllRobots(): Robot[]{
		return Array.from(this.robots.values())
	}

	get robotCount(){
		return this.robots.size
	}
}
