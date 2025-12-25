<script setup lang="ts">
import { watch } from 'vue'

import type { Slot, UpdateRow } from '@/composables/useSlotRows'

type PartsCardProps = {
	partTypes: string[]
	partsByType: Map<string, string[]>
	partRows: Slot[]
	customClass?: string[]
	selectWeaponType?: string
}
type PartsCardEmits = {
	addRow: []
	removeRow: [id: number]
	updateRow: [id: number, update: UpdateRow]
}

const props = defineProps<PartsCardProps>()
const emit = defineEmits<PartsCardEmits>()

// const slots = defineModel<Slot[]>('slots', { required: true })
// const rows = defineModel<Slot[]>('slots', { required: true })

const handleAddRow = () => { emit('addRow') }
const handleUpdateRow = (id: number, update: UpdateRow) => { emit('updateRow', id, update) }
// const handleRemoveRow = (id: number) => { emit('removeRow', id) }

// const updateType = (id: number, event: Event) => {
// 	const value = (event.target as HTMLSelectElement).value
// 	emit('updateRow', id, { type: value })
// }
// const updatePartName = (id: number, event: Event) => {
// 	const value = (event.target as HTMLSelectElement).value
// 	emit('updateRow', id, { partName: value })
// }
// const updateQuantity = (id: number, event: Event) => {
// 	const value = Number((event.target as HTMLInputElement).value)
// 	emit('updateRow', id, { quantity: value })
// }

watch([() => props.selectWeaponType, () => props.partRows.length], ([newType, newLength], [oldType, oldLength]) => {
  if(newType && (newType !== oldType || newLength >= oldLength)){
    props.partRows.forEach(slot => {
			slot.type = newType !== 'ALL' ? newType : ''
    })
  }
})
// watch((() => props.partRows), (newValue) => {
// 	console.log(newValue)
// }, {immediate: true, deep: true})
</script>

<template>
	<div class="card w-full bg-base-100 shadow-md card-border relative" :class="props.customClass">
		<div class="card-body h-full">
			<button class="btn btn-sm btn-neutral btn-dash w-min absolute right-2 -top-1 text-lg" @click="handleAddRow">+</button>
			<div class="overflow-auto">
				<table class="table table-xs min-w-max whitespace-nowrap">
					<thead>
						<tr>
							<th class="w-40">Type</th>
							<th>Part Name</th>
							<th class="w-24">Qty</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="row in partRows" :key="row.id">
							<td>
								<select class="select select-sm w-full"
									:value="row.type"
									@change="handleUpdateRow(row.id, { type: ($event.target as HTMLSelectElement).value })"
									>
									<option selected></option>
									<option v-for="type in props.partTypes"
										:key="type"
										:value="type">{{ type }}
									</option>
								</select>
							</td>
							<td>
								<select class="select select-sm w-full"
									:value="row.partName"
									@change="handleUpdateRow(row.id, { partName: ($event.target as HTMLSelectElement).value })"
									>
									<option selected></option>
									<option v-for="(partName, index) in props.partsByType.get(row.type) || []"
										:key="index"
										:value="partName">{{ partName }}
									</option>
								</select>
							</td>
							<td>
								<input class="input input-bordered input-sm w-full"
									type="number"
									:value="row.quantity"
									@input="handleUpdateRow(row.id, { quantity: +($event.target as HTMLSelectElement).value })"
									 />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>
