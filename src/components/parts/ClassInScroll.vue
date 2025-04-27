<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  activeClass?: string
  initialClass?: string
  threshold?: number
}>()

const isVisible = ref(false) // 表示状態を管理
const element = ref<HTMLElement | null>(null)
let ticking = false // スクロール処理が重複しないようにする

const handleScroll = () => {
  if (ticking) return
  if (!element.value) return

  const rect = element.value.getBoundingClientRect()
  const windowHeight = window.innerHeight
  const threshold = props.threshold ?? 0.8

  ticking = true
  requestAnimationFrame(() => {
    isVisible.value = rect.top < windowHeight * threshold
    ticking = false
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})
</script>

<template>
  <div
    ref="element"
    :class="[initialClass, { [activeClass || 'active']: isVisible }]"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
/* 初期クラス（フェードアウト） */
.fade-out {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.5s,
    transform 0.5s;
}

/* フェードイン時のクラス */
.active {
  opacity: 1;
  transform: translateY(0);
}
</style>
