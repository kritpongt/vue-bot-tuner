import { onUnmounted } from 'vue'

export function useDebounce<T extends (...args: never[]) => unknown>(
  fn: T,
  delay: number = 300
): ((...args: Parameters<T>) => void) & { cancel: () => void; flush: () => void }{
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let lastArgs: Parameters<T> | null = null

  const cancel = () => {
    if(timeoutId !== null){
      clearTimeout(timeoutId)
      timeoutId = null
      lastArgs = null
    }
  }

  const flush = () => {
    if(timeoutId !== null && lastArgs !== null){
      cancel()
      fn(...lastArgs)
    }
  }

  const debounced = (...args: Parameters<T>) => {
    lastArgs = args
    cancel()

    timeoutId = setTimeout(() => {
      fn(...args)
      timeoutId = null
      lastArgs = null
    }, delay)
  }

	onUnmounted(() => { cancel() })

  // Attach utility methods
  debounced.cancel = cancel
  debounced.flush = flush

  return debounced
}
