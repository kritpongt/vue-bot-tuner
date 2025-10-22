import { computed, reactive, type Ref } from 'vue'
import type { Stats } from '@/types/stats'

export function useStats(partStats: Ref<Stats>){
	const baseStats = reactive<Stats>({
		capa: { current: 0, max: 0 },
		hp: 0,
		slots: 0,
		str: 0,
		tec: 0,
		wlk: 0,
		fly: 0,
		tgh: 0
	})

	const liveStats = computed(() => {
		return {
			capa: { current: (baseStats.capa.current + partStats.value.capa.current), max: baseStats.capa.max },
			hp: baseStats.hp + partStats.value.hp,
			str: baseStats.str + partStats.value.str,
			tec: baseStats.tec + partStats.value.tec,
			wlk: baseStats.wlk + partStats.value.wlk,
			fly: baseStats.fly + partStats.value.fly,
			tgh: baseStats.tgh + partStats.value.tgh,
			slots: baseStats.slots - partStats.value.slots
		}
	})

	return{
		baseStats,
		liveStats
	}
}
