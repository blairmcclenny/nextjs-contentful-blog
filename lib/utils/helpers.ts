export function throttle(cb: () => void, delay: number = 100) {
  let shouldWait: boolean = false
  let waitingArgs: any

  return (...args: any) => {
    if (shouldWait) {
      waitingArgs = args
      return
    }

    const timeoutFunc = () => {
      if (waitingArgs === null) {
        shouldWait = false
      } else {
        cb(...(waitingArgs as []))
        waitingArgs = null
        setTimeout(timeoutFunc, delay)
      }
    }

    cb(...(args as []))
    shouldWait = true

    setTimeout(timeoutFunc, delay)
  }
}

export function isBrowser() {
  return typeof window !== "undefined"
}
