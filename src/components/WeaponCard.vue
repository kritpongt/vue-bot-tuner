<script setup lang="ts">
import { ref, watch } from 'vue'
import type { WeaponStat } from '@/models/Weapon'

interface WeaponCardProps{
	title: string
	liveAttr1: Record<string, number>
	liveAttr2: Record<string, number>
}
interface WeaponCardEmits{
	addWeapon: []
	updateBaseAttr: [attr: Partial<WeaponStat>]
	updateWeaponType: [type: string]
}

const props = defineProps<WeaponCardProps>()
const emit = defineEmits<WeaponCardEmits>()

const handleAddWeapon = () => {
	emit('addWeapon')
}
const handleUpdateBaseAttr = (key: keyof WeaponStat, value: number) => {
	emit('updateBaseAttr', { [key]: value })
}
const typeSelected = ref<string>('ALL')
watch(typeSelected, (newType) => {
	emit('updateWeaponType', newType)
})

const formatSigned = (value: number = 0) => {
	// return value.toLocaleString('en-US', { signDisplay: 'always' })
	return value >= 0 ? `+${value}` : value
}
</script>

<template>
	<fieldset class="fieldset bg-base-100 rounded-box card-border shadow-md p-[1.5rem] w-full md:w-[30rem] relative">
		<div class="filter absolute left-37 -top-7">
			<input class="btn btn-xs filter-reset" type="radio" :name="`filter-${props.title}`" aria-label="All" value="ALL" v-model="typeSelected"/>
			<input class="btn btn-xs" type="radio" :name="`filter-${props.title}`" aria-label="MAIN" value="MAIN" v-model="typeSelected"/>
			<input class="btn btn-xs" type="radio" :name="`filter-${props.title}`" aria-label="SUB" value="SUB" v-model="typeSelected"/>
		</div>
		<button class="btn btn-sm btn-neutral btn-dash w-min absolute right-2 -top-8 text-lg" @click="handleAddWeapon">+</button>
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
						<th>Force</th>
						<td class="text-center text-2xl">{{ liveAttr2.force }}</td>
						<th>({{ formatSigned(liveAttr1.force) }})</th>
						<td>
							<div class="text-right">
								<input class="input input-sm max-w-[5rem] text-center"
									type="number"
									@input="handleUpdateBaseAttr('force', +($event.target as HTMLInputElement).value)" />
							</div>
						</td>
					</tr>
					<tr>
						<th>Ammo</th>
						<td class="text-center text-2xl">{{ liveAttr2.ammo }}</td>
						<th>({{ formatSigned(liveAttr1.ammo) }})</th>
						<td>
							<div class="text-right">
								<input class="input input-sm max-w-[5rem] text-center"
									type="number"
									@input="handleUpdateBaseAttr('ammo', +($event.target as HTMLInputElement).value)" />
							</div>
						</td>
					</tr>
					<tr>
						<th>Range</th>
						<td class="text-center text-2xl">{{ liveAttr2.range }}</td>
						<th>({{ formatSigned(liveAttr1.range) }})</th>
						<td>
							<div class="text-right">
								<input class="input input-sm max-w-[5rem] text-center"
									type="number"
									@input="handleUpdateBaseAttr('range', +($event.target as HTMLInputElement).value)" />
							</div>
						</td>
					</tr>
					<tr>
						<th>Speed</th>
						<td class="text-center text-2xl">{{ liveAttr2.speed }}</td>
						<th>({{ formatSigned(liveAttr1.speed) }})</th>
						<td>
							<div class="text-right">
								<input class="input input-sm max-w-[5rem] text-center"
									type="number"
									@input="handleUpdateBaseAttr('speed', +($event.target as HTMLInputElement).value)" />
							</div>
						</td>
					</tr>
					<tr>
						<th>Int</th>
						<td class="text-center text-2xl">{{ liveAttr2.int }}</td>
						<th>({{ formatSigned(liveAttr1.int) }})</th>
						<td>
							<div class="text-right">
								<input class="input input-sm max-w-[5rem] text-center"
									type="number"
									@input="handleUpdateBaseAttr('int', +($event.target as HTMLInputElement).value)" />
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</fieldset>
</template>
