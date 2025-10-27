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
const { slots, totalPartStats, addRow, removeRow } = useSlotRows(5)
const { baseStats, liveStats } = useStats(totalPartStats)
const { weapons, weaponsLiveAttr, addWeapon, updateBaseAttr, updateWeaponType } = useWeapons()

onMounted(() => { fetchParts() })
</script>

<template>
	<DefaultLayout>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
			<PartsCard :customClass="['max-h-[614px]']"
				:partTypes="partTypes"
				:partsByType="partsByType"
				v-model:slots="slots"
				@addRow="addRow"
				@removeRow="(id) => { removeRow(id) }"
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
						v-model:slots="weapon.slotRows.slots"
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
