import { onMounted, onBeforeUnmount, nextTick } from 'vue'

export function useToggleClass(checkClass: string, toggleClass: string) {
  // トグル用の関数
  const toggleClassOnElement = (event: Event) => {
    const target = event.currentTarget as HTMLElement
    const child = target.querySelector(`.${checkClass}`) as HTMLElement | null

    if (child) {
      child.classList.toggle(toggleClass)
    }
  }

  onMounted(async () => {
    await nextTick()

    // foodElementsに今回のトグル機能をつけるため取得
    const foodElements = document.querySelectorAll('.food-image-item')

    // foodElementsに今回のトグル機能をつける
    foodElements.forEach(el => {
      el.addEventListener('click', toggleClassOnElement)
    })
  })

  // クリーンアップ: イベントリスナーを削除
  onBeforeUnmount(() => {
    const foodElements = document.querySelectorAll('.food-image-item')

    foodElements.forEach(el => {
      el.removeEventListener('click', toggleClassOnElement)
    })
  })

  // 必要なものを返す
  return { toggleClassOnElement }
}
