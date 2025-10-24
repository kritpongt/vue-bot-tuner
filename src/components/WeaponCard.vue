<script setup lang="ts">
import type { Weapon } from '@/types/weapon'

interface WeaponCardProps{
	title: string
	liveAttr1: Weapon
	liveAttr2: Record<string, string>
}
interface WeaponCardEmits{
	updateBaseAttr: [attr: Partial<Weapon>]
}

const props = defineProps<WeaponCardProps>()
const emit = defineEmits<WeaponCardEmits>()

const handleUpdateBaseAttr = (key: keyof Weapon, value: number) => {
	emit('updateBaseAttr', { [key]: value })
}
</script>

<template>
	<fieldset class="fieldset bg-base-100 rounded-box card-border shadow-md p-[1.5rem] w-full md:w-[30rem] relative">
		<legend class="fieldset-legend text-xl font-bold">{{ props.title }}</legend>
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
						<td class="text-center text-2xl">{{ liveAttr1.force }}</td>
						<th>({{ liveAttr2.force }})</th>
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
						<td class="text-center text-2xl">{{ liveAttr1.ammo }}</td>
						<th>({{ liveAttr2.ammo }})</th>
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
						<td class="text-center text-2xl">{{ liveAttr1.range }}</td>
						<th>({{ liveAttr2.range }})</th>
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
						<td class="text-center text-2xl">{{ liveAttr1.speed }}</td>
						<th>({{ liveAttr2.speed }})</th>
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
						<td class="text-center text-2xl">{{ liveAttr1.int }}</td>
						<th>({{ liveAttr2.int }})</th>
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
