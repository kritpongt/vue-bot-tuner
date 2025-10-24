<script setup lang="ts">
import type { Stats } from '@/types/stats'

interface StatsCardProps{
	title: string
	editable?: boolean
}
const props = withDefaults(defineProps<StatsCardProps>(), {
	editable: false
})

const childStats = defineModel<Stats>('stats', { required: true })

const updateStat = (key: keyof Stats, value: number) => {
	(childStats.value[key] as number) = value
}
const updateObjectStat = (key: keyof Stats, field: string, value: number) => {
	const stat = childStats.value[key]
	if(typeof stat === 'object' && stat !== null){
		stat[field as keyof typeof stat] = value
	}
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
										:value="childStats.capa.current"
										@input="updateObjectStat('capa', 'current', +($event.target as HTMLInputElement).value)" /> /
									<input class="input input-sm max-w-[5rem] text-center"
										type="number"
										:value="childStats.capa.max"
										@input="updateObjectStat('capa', 'max', +($event.target as HTMLInputElement).value)" />
								</div>
							</td>
							<td v-else><div class="text-center text-2xl">{{ childStats.capa.current }} / {{ childStats.capa.max }}</div></td>
							<th>STR</th>
							<td v-if="props.editable">
								<div class="text-right">
									<input class="input input-sm max-w-[5rem] text-center"
										type="number"
										:value="childStats.str"
										@input="updateStat('str', +($event.target as HTMLInputElement).value)" />
								</div>
							</td>
							<td v-else><div class="text-center text-2xl">{{ childStats.str }}</div></td>
						</tr>
						<tr>
							<th>HP</th>
							<td v-if="props.editable">
								<div class="text-center">
									<input class="input input-sm max-w-[5rem] text-center"
										type="number"
										:value="childStats.hp"
										@input="updateStat('hp', +($event.target as HTMLInputElement).value)" />
								</div>
							</td>
							<td v-else><div class="text-center text-2xl">{{ childStats.hp}}</div></td>
							<th>TEC</th>
							<td v-if="props.editable">
								<div class="text-right">
								<input class="input input-sm max-w-[5rem] text-center"
									type="number"
									:value="childStats.tec"
									@input="updateStat('tec', +($event.target as HTMLInputElement).value)" />
								</div>
							</td>
							<td v-else><div class="text-center text-2xl">{{ childStats.tec }}</div></td>
						</tr>
						<tr>
							<th>Slots</th>
							<td v-if="props.editable">
								<div class="text-center">
									<input class="input input-sm max-w-[5rem] text-center"
										type="number"
										:value="childStats.slots"
										@input="updateStat('slots', +($event.target as HTMLInputElement).value)" />
								</div>
							</td>
							<td v-else><div class="text-center text-2xl">{{ childStats.slots }}</div></td>
							<th>WLK</th>
							<td v-if="props.editable">
								<div class="text-right">
									<input class="input input-sm max-w-[5rem] text-center"
										type="number"
										:value="childStats.wlk"
										@input="updateStat('wlk', +($event.target as HTMLInputElement).value)" />
								</div>
							</td>
							<td v-else><div class="text-center text-2xl">{{ childStats.wlk }}</div></td>
						</tr>
						<tr>
							<th></th>
							<td></td>
							<th>FLY</th>
							<td v-if="props.editable">
								<div class="text-right">
								<input class="input input-sm max-w-[5rem] text-center"
									type="number"
									:value="childStats.fly"
									@input="updateStat('fly', +($event.target as HTMLInputElement).value)" />
								</div>
							</td>
							<td v-else><div class="text-center text-2xl">{{ childStats.fly }}</div></td>
						</tr>
						<tr>
							<th></th>
							<td></td>
							<th>TGH</th>
							<td v-if="props.editable">
								<div class="text-right">
									<input class="input input-sm max-w-[5rem] text-center"
										type="number"
										:value="childStats.tgh"
										@input="updateStat('tgh', +($event.target as HTMLInputElement).value)" />
								</div>
							</td>
							<td v-else><div class="text-center text-2xl">{{ childStats.tgh }}</div></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>
