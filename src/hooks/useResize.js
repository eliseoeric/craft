import React, { useEffect } from 'react'

function useResize(callback, delay) {
  // use callback here
  function debounce(fn, ms) {
    let timer
    return (_) => {
      clearTimeout(timer)
      timer = setTimeout((_) => {
        timer = null
        fn.apply(this, arguments)
      }, ms)
    }
  }

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      callback({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }, delay)

    window.addEventListener('resize', debouncedHandleResize)

    return (_) => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  })
}

export default useResize
