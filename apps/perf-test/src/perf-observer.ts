import { performance, PerformanceObserver } from 'node:perf_hooks'

const obs = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    // eslint-disable-next-line no-console
    console.log(`⏱️ ${entry.name}: ${entry.duration.toFixed(2)}ms`)
  }
})
obs.observe({ entryTypes: ['measure'] })

performance.mark('start')

setTimeout(() => {
  performance.mark('end')
  performance.measure('timeout-delay', 'start', 'end')
}, 200)
