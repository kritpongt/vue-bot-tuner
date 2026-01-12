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
	updateBaseStat: [key: keyof EquipStat, value: number]
	updateCurrentCapa: [value: number]
	updateMaxCapa: [value: number]
	updateMaxSlots: [value: number]
	inputSave: []
}
const props = withDefaults(defineProps<StatsCardProps>(), { editable: false })
const emits = defineEmits<StatsCardEmits>()

const handleUpdateCurrentCapa = (value: number) => {
	emits('updateCurrentCapa', value)
	emits('inputSave')
}
const handleUpdateMaxCapa = (value: number) => {
	emits('updateMaxCapa', value)
	emits('inputSave')
}
const handleUpdateMaxSlots = (value: number) => {
	emits('updateMaxSlots', value)
	emits('inputSave')
}
const handleUpdateBaseStat = (key: keyof EquipStat, value: number) => {
	emits('updateBaseStat', key, value)
	emits('inputSave')
}

const formatInput = (value: number = 0) => {
	return value === 0 ? '' : value
}
</script>

<template>
	<fieldset class="fieldset bg-base-100 rounded-box card-border shadow-md p-[1.5rem] w-full md:w-[30rem] relative">
		<legend class="fieldset-legend text-xl font-bold text-outline-white">{{ props.title }}</legend>
		<div class="overflow-x-auto mt-[-1rem]">
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
									:value="formatInput(props.usedCapa)"
									@input="handleUpdateCurrentCapa(+($event.target as HTMLInputElement).value)" /> /
								<input class="input input-sm max-w-[5rem] text-center"
									type="number"
									:value="formatInput(props.maxCapa)"
									@input="handleUpdateMaxCapa(+($event.target as HTMLInputElement).value)" />
							</div>
						</td>
						<td v-else><div class="text-center text-2xl">{{ props.usedCapa }} / {{ props.maxCapa }}</div></td>
						<th>STR</th>
						<td v-if="props.editable">
							<div class="text-right">
								<input class="input input-sm max-w-[5rem] text-center"
									type="number"
									:value="formatInput(props.stats?.str)"
									@input="handleUpdateBaseStat('str', +($event.target as HTMLInputElement).value)" />
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
									:value="formatInput(props.stats?.hp)"
									@input="handleUpdateBaseStat('hp', +($event.target as HTMLInputElement).value)" />
							</div>
						</td>
						<td v-else><div class="text-center text-2xl">{{ props.stats?.hp }}</div></td>
						<th>TEC</th>
						<td v-if="props.editable">
							<div class="text-right">
							<input class="input input-sm max-w-[5rem] text-center"
								type="number"
								:value="formatInput(props.stats?.tec)"
								@input="handleUpdateBaseStat('tec', +($event.target as HTMLInputElement).value)" />
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
									:value="formatInput(props.remainingSlots)"
									@input="handleUpdateMaxSlots(+($event.target as HTMLInputElement).value)"/>
							</div>
						</td>
						<td v-else><div class="text-center text-2xl">{{ props.remainingSlots }}</div></td>
						<th>WLK</th>
						<td v-if="props.editable">
							<div class="text-right">
								<input class="input input-sm max-w-[5rem] text-center"
									type="number"
									:value="formatInput(props.stats?.wlk)"
									@input="handleUpdateBaseStat('wlk', +($event.target as HTMLInputElement).value)" />
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
								:value="formatInput(props.stats?.fly)"
								@input="handleUpdateBaseStat('fly', +($event.target as HTMLInputElement).value)" />
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
									:value="formatInput(props.stats?.tgh)"
									@input="handleUpdateBaseStat('tgh', +($event.target as HTMLInputElement).value)" />
							</div>
						</td>
						<td v-else><div class="text-center text-2xl">{{ props.stats?.tgh }}</div></td>
					</tr>
				</tbody>
			</table>
		</div>
	</fieldset>
</template>
