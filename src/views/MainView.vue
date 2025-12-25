<script setup lang="ts">
import { computed, onMounted, provide } from 'vue'
import { useParts } from '@/composables/useParts'
import { useRobotGarage } from '@/composables/useRobotGarage'
import { useSlotRows } from '@/composables/useSlotRows'
import { useStats } from '@/composables/useStats'

import { useWeapons } from '@/composables/useWeapons'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import StatsCard from '@/components/StatsCard.vue'
import PartsCard from '@/components/PartsCard.vue'
import WeaponCard from '@/components/WeaponCard.vue'

const { partTypes, weaponPartTypes, partsByType, fetchParts } = useParts()
const robotGarage = useRobotGarage()
provide('robotGarage', robotGarage)
const robot = computed(() => robotGarage.getRobotIndex(0))
const { slotRows, addRow, removeRow, updateRow } = useSlotRows(robot, 5)
const { usedCapa, maxCapa, remainingSlots, totalStats, updateBaseStat, updateCurrentCapa, updateMaxCapa, updateMaxSlots } = useStats(robot)

const { weapons, weaponsLiveAttr, addWeapon, updateBaseAttr, updateWeaponType } = useWeapons(robot)

onMounted(() => { fetchParts() })
</script>

<template>
	<DefaultLayout>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div class="grid grid-cols-1 gap-4 md:justify-items-center">
				<StatsCard
					title="Stats"
					:usedCapa="usedCapa"
					:maxCapa="maxCapa"
					:remainingSlots="remainingSlots"
					:stats="totalStats"
				/>
				<StatsCard
					title="Base stats"
					:editable="true"
					@updateBaseStats="(key, value) => { updateBaseStat(key, value) }"
					@updateCurrentCapa="(value) => { updateCurrentCapa(value) }"
					@updateMaxCapa="(value) => { updateMaxCapa(value) }"
					@updateMaxSlots="(value) => { updateMaxSlots(value) }"
				/>
			</div>
			<PartsCard :customClass="['max-h-[614px]']"
				:partTypes="partTypes"
				:partsByType="partsByType"
				:partRows="slotRows"
				@addRow="addRow"
				@removeRow="(id) => { removeRow(id) }"
				@updateRow="(id, update) => { updateRow(id, update) }"
			/>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
			<template v-for="weapon in weapons" :key="weapon.id">
				<div class="justify-items-center">
					<template v-if="weaponsLiveAttr[weapon.id]">
						<WeaponCard
							:title="`Weapon ${weapon.id + 1}`"
							:liveAttr1="weaponsLiveAttr[weapon.id]?.liveAttr1 ?? {}"
							:liveAttr2="weaponsLiveAttr[weapon.id]?.liveAttr2 ?? {}"
							@addWeapon="addWeapon"
							@updateBaseAttr="(attr) => { updateBaseAttr(weapon.id, attr) }"
							@updateWeaponType="(type) => { updateWeaponType(weapon.id, type) }"
						/>
					</template>
				</div>
				<div class="pt-[1.3rem]">
					<PartsCard :customClass="['h-full', 'max-h-[264px]']"
						:selectWeaponType="weapon.weaponType.value"
						:partTypes="weaponPartTypes"
						:partsByType="partsByType"
						:partRows="slotRows"
						v-model:slots="weapon.slotRows.slotRows"
						@addRow="weapon.slotRows.addRow"
						@removeRow="(id) => weapon.slotRows.removeRow(id)"
					/>
				</div>
			</template>
		</div>
	</DefaultLayout>
</template>

<style scoped>
</style>
