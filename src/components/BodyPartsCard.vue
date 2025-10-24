<script setup lang="ts">
import type { Slot } from '@/types/slot'

interface BodyPartsCardProps{
	partTypes: string[]
	partsByType: Map<string, string[]>
}
interface BodyPartsCardEmits{
	addSlot: []
	removeSlot: [id: number]
}

const props = defineProps<BodyPartsCardProps>()
const emit = defineEmits<BodyPartsCardEmits>()

const childSlots = defineModel<Slot[]>('childSlots', { required: true })

const handleAddSlot = () => { emit('addSlot') }
// const handleRemoveSlot = (id: number) => { emit('removeSlot', id) }
</script>

<template>
	<div class="card w-full max-h-[614px] bg-base-100 shadow-md card-border relative">
		<div class="card-body h-full">
			<button class="btn btn-sm btn-neutral btn-dash w-min absolute right-2 -top-1 text-lg" @click="handleAddSlot">+</button>
			<div class="overflow-auto">
				<table class="table table-xs min-w-max whitespace-nowrap">
					<thead>
						<tr>
							<th class="w-40">Type</th>
							<th>Part name</th>
							<th class="w-24">Number</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="row in childSlots" :key="row.id">
							<td>
								<select class="select select-sm w-full" v-model="row.type">
									<option selected></option>
									<option v-for="type in props.partTypes"
										:key="type"
										:value="type">{{ type }}</option>
								</select>
							</td>
							<td>
								<select class="select select-sm w-full" v-model="row.partName">
									<option v-for="(partName, index) in props.partsByType.get(row.type) || []"
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
</template>
