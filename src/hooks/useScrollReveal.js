import { useEffect } from 'react'

export default function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } }),
      { threshold: 0.08 }
    )

    const observe = () => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .fc-cell').forEach(el => {
        if (!el.classList.contains('visible')) io.observe(el)
      })
    }

    observe()

    // Re-observe whenever new elements are added to DOM
    const mo = new MutationObserver(observe)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => { io.disconnect(); mo.disconnect() }
  }, [])
}
