import { ref, onMounted } from 'vue'

export function useScrollClass(threshold: number, activeClass: string) {
  const active = ref(false)

  const handleScroll = () => {
    active.value = window.scrollY > threshold
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // 初回チェック
  })

  return { active, activeClass }
}
