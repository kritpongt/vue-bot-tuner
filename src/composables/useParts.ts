import { reactive, toRef, computed } from 'vue'
import type { Part } from '@/types/part'

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
		state.data = json || []

	}catch(err){
		const error = err instanceof Error ? err : new Error('Unknown error occurred')
		state.err = error

	}finally{
		state.loading = false
	}
}

export function useParts(){
	const partTypes = computed(() => {
		return Array.from(new Set(state.data.map(part => part.type).filter(Boolean))) || []
	})

	// const getPartsByType = (type: string) => {
	// 	if(!type){ return [] }
	// 	return state.data.filter(part => part.type === type)
	// }
	const getPartsByType = computed(() => {
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
		getPartsByType
	}
}
