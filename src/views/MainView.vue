<script setup lang="ts">
import { onMounted } from 'vue'
import { useSlotRows } from '@/composables/useSlotRows'
import { useStats } from '@/composables/useStats'
import { useParts } from '@/composables/useParts'
import { useWeapons } from '@/composables/useWeapons'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import StatsCard from '@/components/StatsCard.vue'
import BodyPartsCard from '@/components/BodyPartsCard.vue'
import WeaponCard from '@/components/WeaponCard.vue'

const { partTypes, partsByType, fetchParts } = useParts()
const { slots, totalPartStats, addSlot, removeSlot } = useSlotRows()
const { baseStats, liveStats } = useStats(totalPartStats)
const { weapons, updateBaseAttr, weaponsLiveAttr } = useWeapons()

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
			<BodyPartsCard
				:partTypes="partTypes"
				:partsByType="partsByType"
				v-model:childSlots="slots"
				@addSlot="addSlot"
				@removeSlot="(id) => { removeSlot(id) }"
			/>
			<div class="grid grid-cols-1 gap-4 justify-items-center">
				<WeaponCard
					v-for="weapon in weaponsLiveAttr" :key="weapon.id"
					:title="`Weapon ${weapon.id + 1}`"
					:liveAttr1="weapon.liveAttr1"
					:liveAttr2="weapon.liveAttr2"
					@updateBaseAttr="(attr) => { updateBaseAttr(weapon.id, attr) }"
				/>
			</div>
			<div class="grid grid-cols-1 gap-4 ">
				<BodyPartsCard
					v-for="weapon in weapons" :key="weapon.id"
					:partTypes="partTypes"
					:partsByType="partsByType"
					v-model:childSlots="weapon.slotRows.slots"
					@addSlot="weapon.slotRows.addSlot"
					@removeSlot="(id) => weapon.slotRows.removeSlot(id)"
				/>
			</div>
		</div>
	</DefaultLayout>
</template>

<style scoped>
</style>
