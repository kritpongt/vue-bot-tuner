<script setup lang="ts">
import { watch } from 'vue'
import type { Slot } from '@/types/slot'

interface PartsCardProps{
	partTypes: string[]
	partsByType: Map<string, string[]>
	customClass?: string[]
	selectWeaponType?: string
}
interface PartsCardEmits{
	addRow: []
	removeRow: [id: number]
}

const props = defineProps<PartsCardProps>()
const emit = defineEmits<PartsCardEmits>()

const childSlots = defineModel<Slot[]>('slots', { required: true })

const handleAddRow = () => { emit('addRow') }
// const handleRemoveRow = (id: number) => { emit('removeRow', id) }

watch([() => props.selectWeaponType, () => childSlots.value.length], ([newType, newLength], [oldType, oldLength]) => {
  if(newType && (newType !== oldType || newLength >= oldLength)){
    childSlots.value.forEach(slot => {
			slot.type = newType !== 'ALL' ? newType : ''
    })
  }
})
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
										:value="type">{{ type }}
									</option>
								</select>
							</td>
							<td>
								<select class="select select-sm w-full" v-model="row.partName">
									<option v-for="(partName, index) in props.partsByType.get(row.type) || []"
										:key="index"
										:value="partName">{{ partName }}
									</option>
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
