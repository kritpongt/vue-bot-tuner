<script setup lang="ts">
import { watch } from 'vue'
import type { Row, UpdateRow } from '@/composables/usePartRows'

type PartsCardProps = {
	partTypes: string[]
	partsByType: Map<string, string[]>
	partRows: Row[]
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

const handleAddRow = () => { emit('addRow') }
const handleUpdateRow = (id: number, key: keyof UpdateRow, value: string | number) => {
	emit('updateRow', id, { [key]: value })
}

watch([() => props.selectWeaponType, () => props.partRows.length], ([newType, newLength], [oldType, oldLength]) => {
  if(newType && (newType !== oldType || newLength >= oldLength)){
    props.partRows.forEach(slot => {
			slot.type = newType !== 'ALL' ? newType : ''
    })
  }
})
</script>

<template>
	<div class="card w-full bg-base-100 shadow-md card-border relative">
		<div class="card-body" :class="props.customClass">
			<!-- <button class="btn btn-sm btn-neutral btn-dash w-min absolute right-2 -top-1 text-lg" @click="handleAddRow">+</button> -->
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
									@change="handleUpdateRow(row.id, 'type', ($event.target as HTMLSelectElement).value)"
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
									@change="handleUpdateRow(row.id, 'partName', ($event.target as HTMLSelectElement).value)"
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
									@input="handleUpdateRow(row.id, 'quantity', +($event.target as HTMLSelectElement).value)"
									 />
							</td>
						</tr>
						<tr>
							<td colspan="3" class="p-[-1]">
								<button class="btn btn-sm btn-neutral btn-dash w-full" @click="handleAddRow">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
										<path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
									</svg>
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>
