import { useEffect, useRef, useState } from 'react'

const CURSOR_SIZE = 44

function lerp(current: number, target: number, amount: number) {
  return current + (target - current) * amount
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null)

  const targetPosition = useRef({ x: 0, y: 0 })
  const currentPosition = useRef({ x: 0, y: 0 })
  const rafId = useRef<number | null>(null)

  const [isPointer, setIsPointer] = useState(false)
  const [isDown, setIsDown] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    const prefersReducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )
    const finePointerQuery = window.matchMedia('(pointer: fine)')
    // Tailwind `sm` starts at 640px, so this matches phone/<sm.
    const smallScreenQuery = window.matchMedia('(max-width: 639px)')

    let cleanupCursor: (() => void) | null = null

    const disableCursor = () => {
      if (cleanupCursor) {
        cleanupCursor()
        cleanupCursor = null
      }
      setIsEnabled(false)
      setIsPointer(false)
      setIsDown(false)
      document.documentElement.classList.remove('has-custom-cursor')
    }

    const enableCursor = () => {
      document.documentElement.classList.add('has-custom-cursor')
      setIsEnabled(true)

      const onMove = (event: PointerEvent) => {
        targetPosition.current.x = event.clientX
        targetPosition.current.y = event.clientY
      }

      const onOver = (event: PointerEvent) => {
        const element = event.target as HTMLElement | null
        if (!element) return

        const interactive = element.closest(
          'a, button, [role="button"], input[type="button"], input[type="submit"], summary, label, select, textarea',
        )
        setIsPointer(Boolean(interactive))
      }

      const onDown = () => setIsDown(true)
      const onUp = () => setIsDown(false)

      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerover', onOver)
      window.addEventListener('pointerdown', onDown)
      window.addEventListener('pointerup', onUp)

      // Initialize both positions so the cursor doesn't fly in.
      targetPosition.current.x = window.innerWidth / 2
      targetPosition.current.y = window.innerHeight / 2
      currentPosition.current.x = targetPosition.current.x
      currentPosition.current.y = targetPosition.current.y

      const tick = () => {
        // Lower = slower and more dramatic.
        const followSpeed = 0.1

        currentPosition.current.x = lerp(
          currentPosition.current.x,
          targetPosition.current.x,
          followSpeed,
        )
        currentPosition.current.y = lerp(
          currentPosition.current.y,
          targetPosition.current.y,
          followSpeed,
        )

        const node = cursorRef.current
        if (node) {
          // Use CSS vars to avoid layout thrash.
          node.style.setProperty('--x', `${currentPosition.current.x}px`)
          node.style.setProperty('--y', `${currentPosition.current.y}px`)
        }

        rafId.current = window.requestAnimationFrame(tick)
      }

      rafId.current = window.requestAnimationFrame(tick)

      return () => {
        document.documentElement.classList.remove('has-custom-cursor')

        if (rafId.current) window.cancelAnimationFrame(rafId.current)

        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerover', onOver)
        window.removeEventListener('pointerdown', onDown)
        window.removeEventListener('pointerup', onUp)
      }
    }

    const shouldEnable = () => {
      return (
        !prefersReducedMotionQuery.matches &&
        finePointerQuery.matches &&
        !smallScreenQuery.matches
      )
    }

    const sync = () => {
      if (shouldEnable()) {
        if (!cleanupCursor) cleanupCursor = enableCursor()
      } else {
        disableCursor()
      }
    }

    const onMediaChange = () => sync()
    prefersReducedMotionQuery.addEventListener('change', onMediaChange)
    finePointerQuery.addEventListener('change', onMediaChange)
    smallScreenQuery.addEventListener('change', onMediaChange)

    sync()

    return () => {
      prefersReducedMotionQuery.removeEventListener('change', onMediaChange)
      finePointerQuery.removeEventListener('change', onMediaChange)
      smallScreenQuery.removeEventListener('change', onMediaChange)
      disableCursor()
    }
  }, [])

  if (!isEnabled) return null

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={
        'custom-cursor' +
        (isPointer ? ' custom-cursor--pointer' : '') +
        (isDown ? ' custom-cursor--down' : '')
      }
      style={{
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
      }}
    >
      <img
        src="/cursor-64.svg"
        alt=""
        aria-hidden="true"
        className="custom-cursor__img"
        draggable={false}
      />
    </div>
  )
}
