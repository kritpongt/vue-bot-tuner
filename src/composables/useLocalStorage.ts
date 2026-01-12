import { ref, readonly, type Ref } from 'vue'
import type { EquipStat } from '@/models/Robot'
import type { IPart } from '@/models/Part'
import { Robot } from '@/models/Robot'

import { useDebounce } from '@/composables/useDebounce'

export interface StoredPartRow {
  id: number
  type: string
  partName: string
  quantity: number
  part: IPart | null
}

export interface StoredWeaponData {
  id: number
  weaponType: string
  baseStats: {
    force: number
    ammo: number
    range: number
    speed: number
    int: number
  }
  partRows: StoredPartRow[]
}

export interface StoredRobotData {
  id: string
  name: string
  currentCapa: number
  maxCapa: number
  maxSlots: number
  baseStats: EquipStat
  partRows: StoredPartRow[]
  weapons: StoredWeaponData[]
  savedAt: string
}

// ==================
// CONSTANTS
// ==================
const STORAGE_KEY = 'robot_tuner_robots'
const DEBOUNCE_DELAY = 300

// ==================
// HELPER FUNCTIONS
// ==================
/**
 * Check if localStorage is available
 */
const isLocalStorageAvailable = (): boolean => {
  try{
    const test = '__storage_test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  }catch{
    return false
  }
}

/**
 * Safe localStorage get with error handling
 */
const safeGetItem = (key: string): string | null => {
  if(!isLocalStorageAvailable()){ return null }

  try{
    return localStorage.getItem(key)
  }catch(error){
    console.warn(`Failed to get localStorage item '${key}':`, error)
    return null
  }
}

/**
 * Safe localStorage set with error handling
 */
const safeSetItem = (key: string, value: string): boolean => {
  if (!isLocalStorageAvailable()){ return false }

  try{
    localStorage.setItem(key, value)
    return true
	}catch(error){
    console.warn(`Failed to set localStorage item "${key}":`, error)
    return false
  }
}

/**
 * Safe localStorage remove with error handling
 */
const safeRemoveItem = (key: string): boolean => {
  if (!isLocalStorageAvailable()){ return false }

  try {
    localStorage.removeItem(key)
    return true
	}catch(error){
    console.warn(`Failed to remove localStorage item "${key}":`, error)
    return false
  }
}

// ==================
// DATA TRANSFORMATION
// ==================
/**
 * Convert Robot object to storage format
 */
const robotToStoredData = (robot: Robot): StoredRobotData => {
	return {
		id: robot.id,
		name: robot.name,
		currentCapa: robot.currentCapa,
		maxCapa: robot.maxCapa,
		maxSlots: robot.maxSlots,
		baseStats: robot.baseStats,
		partRows: robot.partRows.map((row) => ({
			id: row.id,
			type: row.type,
			partName: row.partName,
			quantity: row.quantity,
			part: row.part
		})),
		weapons: robot.weapons.weaponList.map((weapon) => ({
			id: weapon.id,
			weaponType: weapon.weaponType,
			baseStats: weapon.baseStats,
			partRows: weapon.partRows.map(row => ({
				id: row.id,
				type: row.type,
				partName: row.partName,
				quantity: row.quantity,
				part: row.part
			}))
		})),
		savedAt: new Date().toISOString()
	}
}

export function useLocalStorage() {
  // STATE
  const isLoading: Ref<boolean> = ref(false)
  const lastSaveTime: Ref<string | null> = ref(null)
  const error: Ref<string | null> = ref(null)

  // METHODS
  /**
   * Save robots to localStorage with debouncing
   */
  const saveRobots = useDebounce((robots: Robot[]) => {
    try{
      isLoading.value = true
      error.value = null

      // Transform and serialize data
      const storedData: StoredRobotData[] = robots.map(robotToStoredData)
      const jsonData = JSON.stringify(storedData, null, 2) // Pretty print for debugging

      // Save to localStorage
      const success = safeSetItem(STORAGE_KEY, jsonData)

      if(success){
        lastSaveTime.value = new Date().toISOString()
        console.log(`Saved ${robots.length} robots to localStorage`)
      }else{
        throw new Error('Failed to write to localStorage')
      }
    }catch(err){
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      error.value = errorMessage
      console.error('Failed to save robots:', err)
    }finally{
      isLoading.value = false
    }
  }, DEBOUNCE_DELAY)

  /**
   * Load robots from localStorage
   */
  const loadRobots = (): StoredRobotData[] | null => {
    try{
      isLoading.value = true
      error.value = null

      const stored = safeGetItem(STORAGE_KEY)
      if(!stored){
        console.log('No saved robots found in localStorage')
        return null
      }

      const data: StoredRobotData[] = JSON.parse(stored)

      // Validate data structure
      if(!Array.isArray(data)){ throw new Error('Invalid data format: expected array') }
      console.log(`Loaded ${data.length} robots from localStorage`)

      return data
    }catch(err){
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      error.value = errorMessage
      console.error('Failed to load robots:', err)
      return null
    }finally{
      isLoading.value = false
    }
  }

  /**
   * Clear all saved data
   */
  const clearStorage = (): boolean => {
    try{
      const success = safeRemoveItem(STORAGE_KEY)
      if(success){
        lastSaveTime.value = null
        error.value = null
        console.log('Cleared all saved robots from localStorage')
      }
      return success
    }catch(err){
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      error.value = errorMessage
      console.error('Failed to clear storage:', err)
      return false
    }
  }

  /**
   * Get storage statistics
   */
  const getStorageStats = () => {
    const stored = safeGetItem(STORAGE_KEY)
    if(!stored){ return { size: 0, robotsCount: 0 } }

    try{
      const data: StoredRobotData[] = JSON.parse(stored)
      return {
        size: stored.length,
        robotsCount: data.length
      }
    }catch{
      return {
				size: stored.length,
				robotsCount: 0
			}
    }
  }

  return {
    isLoading: readonly(isLoading),
    lastSaveTime: readonly(lastSaveTime),
    error: readonly(error),

    saveRobots,
    loadRobots,
    clearStorage,
    getStorageStats
  }
}
