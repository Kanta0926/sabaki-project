<script setup lang="ts">
import { ref, onMounted } from 'vue'
const src = ref('/path/to/image.jpg') // 画像のパス
const currentScroll = ref(0)

// スクロールフェード関数
type ScrollFadeOptions = {
  start: number
  end: number
  selector: string
}

const scrollFade = ({ start, end, selector }: ScrollFadeOptions) => {
  const elements = document.querySelectorAll<HTMLElement>(selector)
  currentScroll.value = window.scrollY
  if (document.body.classList.contains('scroll-stop')) return

  elements.forEach(el => {
    const fadeStart = start
    const fadeEnd = fadeStart + end

    if (currentScroll.value >= fadeEnd) {
      el.style.opacity = '0' // フェードアウト
    } else if (currentScroll.value >= fadeStart) {
      const opacity =
        1 - (currentScroll.value - fadeStart) / (fadeEnd - fadeStart)
      el.style.opacity = opacity.toString()
    } else {
      el.style.opacity = '1' // フェードイン
    }
  })
}

const handleScroll = () => {
  // コンポーネントごとに設定可能
  scrollFade({ start: 0, end: 100, selector: '.fadein-anime' })
  // scrollFade({ start: 1800, end: 530, selector: '.about-txt-body' })
}

onMounted(() => {
  handleScroll() // 初期実行
  window.addEventListener('scroll', handleScroll, { passive: true })
})
</script>

<template>
  <img :src="src" class="fadein-anime" />
</template>

<style scoped>
.fadein-anime {
  transition: opacity 0.3s ease-in-out;
  opacity: 1;
  will-change: opacity;
}
</style>
