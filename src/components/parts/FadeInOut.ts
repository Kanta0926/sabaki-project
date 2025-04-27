import { ref, onMounted } from 'vue'

export function FadeInOut(threshold: number = 100) {
  const isActive = ref(false)
  const element = ref<HTMLElement | null>(null)

  const handleScroll = () => {
    // nullか判定、isActiveがtrueの場合は処理しない
    if (!element.value || isActive.value) return

    const rect = element.value.getBoundingClientRect()
    const windowHeight = window.innerHeight

    // rect.topは要素の上端の座標、スクロールによって座標までの距離は変わる
    if (rect.top < windowHeight - threshold) {
      isActive.value = true
    }
    // console.log(rect.top)
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // 初回実行
  })

  return { element, isActive }
}
