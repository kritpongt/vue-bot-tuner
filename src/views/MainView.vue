<script setup lang="ts">
import { onMounted, provide } from 'vue'
import { useParts } from '@/composables/useParts'
import { useRobotGarage } from '@/composables/useRobotGarage'
// import { useSlotRows } from '@/composables/useSlotRows'
// import { useStats } from '@/composables/useStats'
// import { useWeapons } from '@/composables/useWeapons'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import RobotTab from '@/components/RobotTab.vue'
// import StatsCard from '@/components/StatsCard.vue'
// import PartsCard from '@/components/PartsCard.vue'
// import WeaponCard from '@/components/WeaponCard.vue'

const { partTypes, weaponPartTypes, partsByType, fetchParts } = useParts()
const robotGarage = useRobotGarage()
provide('robotGarage', robotGarage)
// const robot = computed(() => robotGarage.getRobotIndex(0))
// const { slotRows, addRow, removeRow, updateRow } = useSlotRows(robot, 5)
// const { usedCapa, maxCapa, remainingSlots, totalStats, updateBaseStat, updateCurrentCapa, updateMaxCapa, updateMaxSlots } = useStats(robot)
// const { weapons, weaponsLiveAttr, addWeapon, updateBaseAttr, updateWeaponType } = useWeapons(robot)

onMounted(() => { fetchParts() })
// watch(() => robotGarage, (value) => {
// 	console.log(value.activeRobotId)
// 	// console.log(robotGarage.robots.value)
// }, { immediate: true, deep: true })
</script>

<template>
	<DefaultLayout>
		<RobotTab
			:robotGarage="robotGarage"
			:partTypes="partTypes"
			:weaponPartTypes="weaponPartTypes"
			:partsByType="partsByType"
			@addRobot="robotGarage.addRobot"
		/>
		<!-- <div class="tabs tabs-box">
			<template v-for="robo in robotGarage.robots.value" :key="robo.id">
				<input type="radio" name="robot_tabs" class="tab" :aria-label="robo.name" :checked="robotGarage.activeRobotId.value === robo.id" @click="robotGarage.setActiveRobot(robo.id)"/>
				<div class="tab-content bg-base-100 border-base-300 p-6">{{ robo.id }}</div>
			</template>
		</div>
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
							:title="`Weapon #${weapon.id + 1}`"
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
						:selectWeaponType="weapon.weaponType"
						:partTypes="weaponPartTypes"
						:partsByType="partsByType"
						:partRows="weapon.slotRows.slotRows.value"
						@addRow="weapon.slotRows.addRow"
						@removeRow="(id) => { weapon.slotRows.removeRow(id) }"
						@updateRow="(id, update) => { weapon.slotRows.updateRow(id, update) }"
					/>
				</div>
			</template>
		</div> -->
	</DefaultLayout>
</template>

<style scoped>
</style>
