<script setup lang="ts">
import { computed, watch } from 'vue'
import type { useRobotGarage } from '@/composables/useRobotGarage';
import type { PartType, WeaponPartType } from '@/models/Part';
import { usePartRows } from '@/composables/usePartRows'
import { useStats } from '@/composables/useStats'
import { useWeapons } from '@/composables/useWeapons'

import StatsCard from '@/components/StatsCard.vue'
import PartsCard from '@/components/PartsCard.vue'
import WeaponCard from '@/components/WeaponCard.vue'

type RobotTabProps = {
	robotGarage: ReturnType<typeof useRobotGarage>,
	partTypes: PartType[],
	weaponPartTypes: WeaponPartType[],
	partsByType: Map<string, string[]>
}
type RobotTabEmits = {
	addRobot: []
}
const props = defineProps<RobotTabProps>()
const emits = defineEmits<RobotTabEmits>()

const robot = computed(() => {
	const activeRobot = props.robotGarage.activeRobot.value
	if(!activeRobot){ throw new Error('No active robot found!') }
	return activeRobot
})

const { usedCapa, maxCapa, remainingSlots, totalStats, updateBaseStat, updateCurrentCapa, updateMaxCapa, updateMaxSlots } = useStats(robot)
const { rows, addRow, removeRow, updateRow } = usePartRows(robot)
const { weapons, weaponsStats, addWeapon, updateWeaponBaseStat, updateWeaponType } = useWeapons(robot)

const handleAddRobot = () => { emits('addRobot') }

// watch(() => props.robotGarage.robots.value, () => {
// 	// console.log(val)
// 	props.robotGarage.inputSave()
// }, { deep: true })
</script>

<template>
	<div class="tabs tabs-box mb-3">
		<template v-for="robo in props.robotGarage.robots.value" :key="robo.id">
			<input type="radio" name="robot_tabs" class="tab" :aria-label="robo.name" :checked="robotGarage.activeRobotId.value === robo.id" @click="robotGarage.setRobotActive(robo.id)"/>
			<!-- <div class="tab-content bg-base-100 border-base-300 p-6">{{ robo.id }}</div> -->
		</template>
		<button class="btn btn-sm btn-neutral btn-dash w-min text-lg ml-2" @click="handleAddRobot">+</button>
	</div>

	<div class="flex flex-col items-center gap-4">
		<div class="flex flex-col md:flex-row gap-4 w-full max-w-6xl">
			<div class="flex flex-col gap-4 md:w-1/2">
				<div class="flex">
					<StatsCard
						title="Stats"
						:usedCapa="usedCapa"
						:maxCapa="maxCapa"
						:remainingSlots="remainingSlots"
						:stats="totalStats"
					/>
				</div>
				<div class="flex">
					<StatsCard
						title="Base Stats"
						:editable="true"
						:usedCapa="robot.currentCapa"
						:maxCapa="robot.maxCapa"
						:remainingSlots="robot.maxSlots"
						:stats="robot.baseStats"
						@updateBaseStat="(key, value) => { updateBaseStat(key, value) }"
						@updateCurrentCapa="(value) => { updateCurrentCapa(value) }"
						@updateMaxCapa="(value) => { updateMaxCapa(value) }"
						@updateMaxSlots="(value) => { updateMaxSlots(value) }"
						@inputSave="props.robotGarage.inputSave"
					/>
				</div>
			</div>
			<div class="md:w-1/2 pt-[1.4rem]">
				<PartsCard :customClass="['max-h-[563px]']"
					:partTypes="partTypes"
					:partsByType="partsByType"
					:partRows="rows"
					@addRow="addRow"
					@removeRow="(id) => { removeRow(id) }"
					@updateRow="(id, update) => { updateRow(id, update) }"
				/>
			</div>
		</div>
		<!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
		</div> -->

		<div class="flex flex-col items-center gap-4 w-full max-w-6xl">
			<template v-for="weapon in weapons" :key="weapon.id">
				<div class="flex flex-col md:flex-row gap-4 w-full">
					<div class="flex md:w-1/2">
						<template v-if="weaponsStats[weapon.id]">
							<WeaponCard
								:title="`Weapon #${weapon.id + 1}`"
								:weaponType="weapon.weaponType"
								:liveAttr1="weaponsStats[weapon.id]?.stats_A ?? {}"
								:liveAttr2="weaponsStats[weapon.id]?.stats_B ?? {}"
								:baseStat="weapon.baseStat"
								@addWeapon="addWeapon"
								@updateWeaponBaseStat="(update) => { updateWeaponBaseStat(weapon.id, update) }"
								@updateWeaponType="(type) => { updateWeaponType(weapon.id, type) }"
								@inputSave="props.robotGarage.inputSave"
							/>
						</template>
					</div>

					<div class="md:w-1/2 pt-[1.4rem]">
						<PartsCard :customClass="['max-h-[262px]']"
							:selectWeaponType="weapon.weaponType"
							:partTypes="weaponPartTypes"
							:partsByType="partsByType"
							:partRows="weapon.partRows.rows.value"
							@addRow="weapon.partRows.addRow"
							@removeRow="(id) => { weapon.partRows.removeRow(id) }"
							@updateRow="(id, update) => { weapon.partRows.updateRow(id, update) }"
						/>
					</div>
				</div>
			</template>
		</div>
	</div>
	<!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
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

</template>

<style scoped>
</style>
