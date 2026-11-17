import { useEffect } from 'react'

/**
 * Site-wide parallax for elements with [data-parallax].
 * Speed is a float (e.g. 0.18 = slow background, 0.45 = faster foreground).
 * Optional data-parallax-x for a horizontal component.
 * Writes --parallax-y / --parallax-x on each target so CSS can compose transforms.
 */
export default function useParallax() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduce.matches) return undefined

    let ticking = false
    let rafId = 0

    const collect = () => Array.from(document.querySelectorAll('[data-parallax]'))

    const update = () => {
      ticking = false
      const vh = window.innerHeight || 1
      const scrollY = window.scrollY || 0
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh)

      document.documentElement.style.setProperty('--scroll-y', `${scrollY}`)
      document.documentElement.style.setProperty('--scroll-p', `${scrollY / maxScroll}`)

      collect().forEach((el) => {
        const speed = Number.parseFloat(el.dataset.parallax)
        if (!Number.isFinite(speed) || speed === 0) return

        const rect = el.getBoundingClientRect()
        // Skip far-offscreen work (keep a buffer so it eases in)
        if (rect.bottom < -vh || rect.top > vh * 2) return

        // Distance of element center from viewport center
        const mid = rect.top + rect.height / 2
        const delta = (mid - vh / 2) * speed
        const xSpeed = Number.parseFloat(el.dataset.parallaxX) || 0

        el.style.setProperty('--parallax-y', `${delta.toFixed(2)}px`)
        el.style.setProperty('--parallax-x', `${(delta * xSpeed).toFixed(2)}px`)
        el.classList.add('is-parallax')
      })
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      rafId = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    const mo = new MutationObserver(() => onScroll())
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      mo.disconnect()
    }
  }, [])
}
