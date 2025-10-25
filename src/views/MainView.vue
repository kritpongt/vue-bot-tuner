<script setup lang="ts">
import { onMounted } from 'vue'
import { useSlotRows } from '@/composables/useSlotRows'
import { useStats } from '@/composables/useStats'
import { useParts } from '@/composables/useParts'
import { useWeapons } from '@/composables/useWeapons'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import StatsCard from '@/components/StatsCard.vue'
import PartsCard from '@/components/PartsCard.vue'
import WeaponCard from '@/components/WeaponCard.vue'

const { partTypes, weaponPartTypes, partsByType, fetchParts } = useParts()
const { slots, totalPartStats, addSlot, removeSlot } = useSlotRows(5)
const { baseStats, liveStats } = useStats(totalPartStats)
const { weapons, weaponsLiveAttr, addWeapon, updateBaseAttr, updateWeaponType } = useWeapons()

onMounted(() => { fetchParts() })
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
			<PartsCard :customClass="['max-h-[614px]']"
				:partTypes="partTypes"
				:partsByType="partsByType"
				v-model:slots="slots"
				@addSlot="addSlot"
				@removeSlot="(id) => { removeSlot(id) }"
			/>
			<div class="grid grid-cols-1 gap-4 justify-items-center">
				<WeaponCard
					v-for="weapon in weaponsLiveAttr" :key="weapon.id"
					:title="`Weapon ${weapon.id + 1}`"
					:liveAttr1="weapon.liveAttr1"
					:liveAttr2="weapon.liveAttr2"
					@addWeapon="addWeapon"
					@updateBaseAttr="(attr) => { updateBaseAttr(weapon.id, attr) }"
					@updateWeaponType="(type) => { updateWeaponType(weapon.id, type) }"
				/>
			</div>
			<div class="grid grid-cols-1 gap-4 ">
				<PartsCard :customClass="['max-h-[286px]']"
					v-for="weapon in weapons" :key="weapon.id"
					:selectWeaponType="weapon.weaponType.value"
					:partTypes="weaponPartTypes"
					:partsByType="partsByType"
					v-model:slots="weapon.slotRows.slots"
					@addSlot="weapon.slotRows.addSlot"
					@removeSlot="(id) => weapon.slotRows.removeSlot(id)"
				/>
			</div>
		</div>
	</DefaultLayout>
</template>

<style scoped>
</style>
