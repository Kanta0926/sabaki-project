// composables/useSmoothScroll.ts
import {} from 'vue'
import { globalScrollY } from '@/components/parts/useInertiaScroll'
export function useSmoothScroll() {
  const adjust = -30 // スクロール位置の調整
  const delay = 500 // globalScrollY の更新遅延

  const smoothScroll = (event: MouseEvent) => {
    event.preventDefault() // デフォルトのリンクの動作を防止

    const href =
      (event.currentTarget as HTMLAnchorElement).getAttribute('href') || ''

    console.log(href)

    const target = document.querySelector(
      href === '#' || href === '' ? 'html' : href,
    ) as HTMLElement
    console.log(target)

    if (target) {
      const position = target.offsetTop + adjust // 目標位置の算出

      // スムーズスクロール
      window.scrollTo({
        top: position,
        behavior: 'smooth',
      })

      // globalScrollY を更新して、スクロールがリセットされるのを防ぐ
      setTimeout(() => {
        globalScrollY.value = position
      }, delay)

      console.log(globalScrollY.value)
    }
  }

  return { smoothScroll }
}
