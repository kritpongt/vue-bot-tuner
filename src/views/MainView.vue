<script setup lang="ts">
import { onMounted, provide } from 'vue'
import { useParts } from '@/composables/useParts'
import { useRobotGarage } from '@/composables/useRobotGarage'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import RobotTab from '@/components/RobotTab.vue'

const { partTypes, weaponPartTypes, partsByType, fetchParts } = useParts()
const robotGarage = useRobotGarage()
// provide('robotGarage', robotGarage)

// todo: persistense system

onMounted(() => { fetchParts() })
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
	</DefaultLayout>
</template>

<style scoped>
</style>
