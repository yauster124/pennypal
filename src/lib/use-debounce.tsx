"use client"

import { useRef, useEffect } from "react"
import { debounce } from "lodash"

export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
) {
  const callbackRef = useRef(callback)

  // always keep the latest callback reference
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  // memoized debounced function
  const debouncedFn = useRef(
    debounce((...args: Parameters<T>) => {
      callbackRef.current(...args)
    }, delay)
  ).current

  // cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedFn.cancel()
    }
  }, [debouncedFn])

  return debouncedFn
}