<script setup lang="ts">
import { toRef } from 'vue'
import { Weapon } from '@/models/Weapon'
import { useWeapon } from '@/composables/useRobot'
import { useParts } from '@/composables/useParts'

import PartsCard from '@/components/PartsCard.vue'
import WeaponCard from '@/components/WeaponCard.vue'

const props = defineProps<{
  weapon: Weapon
}>()
const emits = defineEmits<{
	add: []
	remove: []
}>()

const { weaponPartTypes, partsByType } = useParts()

// const weapon = computed(() => props.weapon)
const w = toRef(props, 'weapon')
const { rows, weaponType, statDelta, statTotal, baseStat, addRow, removeRow, updateRow, updateType, updateBaseStat } = useWeapon(w)
</script>

<template>
  <div class="flex flex-col md:flex-row gap-4 w-full">
    <div class="flex md:w-1/2">
      <WeaponCard
        :title="`Weapon #${w.id + 1}`"
        :weaponType="weaponType"
        :liveAttr1="statDelta"
        :liveAttr2="statTotal"
        :baseStat="baseStat"
				@addWeapon="emits('add')"
				@updateWeaponBaseStat="(update) => { updateBaseStat(update) }"
				@updateWeaponType="(type) => { updateType(type) }"
      />
    </div>
		<div class="md:w-1/2 pt-[1.4rem]">
			<PartsCard :customClass="['max-h-[262px]']"
				:selectWeaponType="w.weaponType"
				:partTypes="weaponPartTypes"
				:partsByType="partsByType"
				:partRows="rows"
				@addRow="addRow"
				@removeRow="(id) => { removeRow(id) }"
				@updateRow="(id, update) => { updateRow(id, update) }"
			/>
		</div>
  </div>
</template>