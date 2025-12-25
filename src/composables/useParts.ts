import { reactive, toRef, computed } from 'vue'
import { Part } from '@/models/Part'

const PARTS_URL = 'https://raw.githubusercontent.com/kritpongt/data_tune_up_parts/refs/heads/main/parts.json'

interface UsePartsState{
	data: Part[]
	loading: boolean
	err: Error | null
}
const state = reactive<UsePartsState>({
	data: [],
	loading: false,
	err: null
})

const fetchParts = async () => {
	state.loading = true
	state.err = null
	try{
		const res = await fetch(PARTS_URL)
		if(!res.ok){ throw new Error(`HTTP error! status: ${res.status}`) }
		const json = await res.json()
		if(Array.isArray(json)){
			state.data = json.map((p) => new Part(
				p.type, p.partName, p.hp, p.str, p.tec, p.wlk, p.fly, p.tgh, p.cost, p.mod, p.proc
			))
		}

	}catch(err){
		const error = err instanceof Error ? err : new Error('Unknown error occurred')
		state.err = error

	}finally{
		state.loading = false
	}
}

export function useParts(){
	const partTypes = computed(() => {
		return Array.from(new Set(state.data.map(part => part.type).filter((type) => Part.isPartType(type)))) || []
	})

	const weaponPartTypes = computed(() => {
		return Array.from(new Set(state.data.map(part => part.type).filter((type) => Part.isWeaponPartType(type)))) || []
	})

	const partsByType = computed(() => {
		const map = new Map<string, string[]>()
		state.data.forEach((part) => {
			const key = part.type
			if(!map.has(key)){
				map.set(key, [part.partName])
			}else{
				const list = map.get(key)
				if(list){ list.push(part.partName) }
			}
		})
		return map
	})

	return{
		fetchParts,
		loading: toRef(state, 'loading'),
		err: toRef(state, 'err'),
		parts: toRef(state, 'data'),
		partTypes,
		weaponPartTypes,
		partsByType
	}
}
