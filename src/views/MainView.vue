<script setup lang="ts">
import { onMounted } from 'vue'
import { useSlots } from '@/composables/useSlots'
import { useStats } from '@/composables/useStats'
import { useParts } from '@/composables/useParts'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import StatsCard from '@/components/StatsCard.vue'

const { parts, partTypes, getPartsByType, fetchParts } = useParts()
const { slots, addSlot, totalPartStats } = useSlots(parts)
const { baseStats, liveStats } = useStats(totalPartStats)

onMounted(() => {
	fetchParts()
})
</script>

<template>
	<DefaultLayout>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<!-- Stats -->
			<div class="grid grid-cols-1 gap-4 md:justify-items-center">
				<StatsCard
					title="Stats"
					:stats="liveStats"
				/>
				<StatsCard
					title="Base stats"
					v-model:stats="baseStats"
					:editable="true"
				/>
			</div>
			<!-- Part -->
			<div class="card w-full bg-base-100 shadow-md card-border relative">
				<div class="card-body">
					<button class="btn btn-sm btn-neutral btn-dash w-min absolute right-2 -top-1 text-lg" @click="addSlot">+</button>
					<div class="overflow-x-auto">
						<table class="table table-xs whitespace-nowrap min-w-max">
							<thead>
								<tr>
									<th class="w-40">Type</th>
									<th>Part name</th>
									<th class="w-24">Number</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="row in slots" :key="row.id">
									<td>
										<select class="select select-sm w-full" v-model="row.type">
											<option selected></option>
											<option v-for="type in partTypes"
												:key="type"
												:value="type">{{ type }}</option>
										</select>
									</td>
									<td>
										<select class="select select-sm w-full" v-model="row.partName">
											<option v-for="(partName, index) in getPartsByType.get(row.type)"
												:key="index"
												:value="partName">{{ partName }}</option>
										</select>
									</td>
									<td><input class="input input-bordered input-sm w-full" type="number" v-model="row.number"/></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</DefaultLayout>
</template>

<style scoped>
</style>
