<script setup lang="ts">
import { type EquipStat } from '@/models/Robot'

type StatsCardProps = {
	title: string
	usedCapa?: number
	maxCapa?: number
	remainingSlots?: number
	stats?: EquipStat
	editable?: boolean
}
type StatsCardEmits = {
	updateBaseStats: [key: keyof EquipStat, value: number]
	updateCurrentCapa: [value: number]
	updateMaxCapa: [value: number]
	updateMaxSlots: [value: number]
}
const props = withDefaults(defineProps<StatsCardProps>(), { editable: false })
const emits = defineEmits<StatsCardEmits>()

const handleUpdateCurrentCapa = (value: number) => {
	emits('updateCurrentCapa', value)
}
const handleUpdateMaxCapa = (value: number) => {
	emits('updateMaxCapa', value)
}
const handleUpdateMaxSlots = (value: number) => {
	emits('updateMaxSlots', value)
}
const handleUpdateBaseStats = (key: keyof EquipStat, value: number) => {
	emits('updateBaseStats', key, value)
}
</script>

<template>
	<div class="card w-full md:w-[30rem] bg-base-100 shadow-md card-border">
		<div class="card-body">
			<div class="flex justify-between">
				<h2 class="text-xl font-bold">{{ props.title }}</h2>
			</div>
			<div class="overflow-x-auto">
				<table class="table table-xs w-full whitespace-nowrap">
					<thead>
						<tr>
							<th class="w-[4rem] min-w-[4rem]"></th>
							<th class="w-[12rem] min-w-[12rem]"></th>
							<th class="w-[4rem] min-w-[4rem]"></th>
							<th class="w-[6rem] min-w-[6rem]"></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th>Capa</th>
							<td v-if="props.editable">
								<div class="text-center">
									<input class="input input-sm max-w-[5rem] text-center"
										type="number"
										@input="handleUpdateCurrentCapa(+($event.target as HTMLInputElement).value)" /> /
									<input class="input input-sm max-w-[5rem] text-center"
										type="number"
										@input="handleUpdateMaxCapa(+($event.target as HTMLInputElement).value)" />
								</div>
							</td>
							<td v-else><div class="text-center text-2xl">{{ usedCapa }} / {{ maxCapa }}</div></td>
							<th>STR</th>
							<td v-if="props.editable">
								<div class="text-right">
									<input class="input input-sm max-w-[5rem] text-center"
										type="number"
										@input="handleUpdateBaseStats('str', +($event.target as HTMLInputElement).value)" />
								</div>
							</td>
							<td v-else><div class="text-center text-2xl">{{ props.stats?.str }}</div></td>
						</tr>
						<tr>
							<th>HP</th>
							<td v-if="props.editable">
								<div class="text-center">
									<input class="input input-sm max-w-[5rem] text-center"
										type="number"
										@input="handleUpdateBaseStats('hp', +($event.target as HTMLInputElement).value)" />
								</div>
							</td>
							<td v-else><div class="text-center text-2xl">{{ props.stats?.hp}}</div></td>
							<th>TEC</th>
							<td v-if="props.editable">
								<div class="text-right">
								<input class="input input-sm max-w-[5rem] text-center"
									type="number"
									@input="handleUpdateBaseStats('tec', +($event.target as HTMLInputElement).value)" />
								</div>
							</td>
							<td v-else><div class="text-center text-2xl">{{ props.stats?.tec }}</div></td>
						</tr>
						<tr>
							<th>Slots</th>
							<td v-if="props.editable">
								<div class="text-center">
									<input class="input input-sm max-w-[5rem] text-center"
										type="number"
										@input="handleUpdateMaxSlots(+($event.target as HTMLInputElement).value)"/>
								</div>
							</td>
							<td v-else><div class="text-center text-2xl">{{ props.remainingSlots }}</div></td>
							<th>WLK</th>
							<td v-if="props.editable">
								<div class="text-right">
									<input class="input input-sm max-w-[5rem] text-center"
										type="number"
										@input="handleUpdateBaseStats('wlk', +($event.target as HTMLInputElement).value)" />
								</div>
							</td>
							<td v-else><div class="text-center text-2xl">{{ props.stats?.wlk }}</div></td>
						</tr>
						<tr>
							<th></th>
							<td></td>
							<th>FLY</th>
							<td v-if="props.editable">
								<div class="text-right">
								<input class="input input-sm max-w-[5rem] text-center"
									type="number"
									@input="handleUpdateBaseStats('fly', +($event.target as HTMLInputElement).value)" />
								</div>
							</td>
							<td v-else><div class="text-center text-2xl">{{ props.stats?.fly }}</div></td>
						</tr>
						<tr>
							<th></th>
							<td></td>
							<th>TGH</th>
							<td v-if="props.editable">
								<div class="text-right">
									<input class="input input-sm max-w-[5rem] text-center"
										type="number"
										@input="handleUpdateBaseStats('tgh', +($event.target as HTMLInputElement).value)" />
								</div>
							</td>
							<td v-else><div class="text-center text-2xl">{{ props.stats?.tgh }}</div></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>
