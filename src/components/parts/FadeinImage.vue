<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const src = ref('/path/to/image.jpg') // 画像のパス
const fadeIn = ref(false) // 初期状態はフェードアウト

const fadeAnime01 = () => {
  const targets = document.querySelectorAll<HTMLElement>('.up-fade')
  if (!targets.length) return null // undefined ではなく null を返す

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-active')
          entry.target.classList.remove('fade-out') // fade-outを外す

          obs.unobserve(entry.target) // 1回だけ実行
        }
      })
    },
    { root: null, rootMargin: '0px', threshold: 0.1 },
  )

  targets.forEach(target => observer.observe(target))

  return observer
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = fadeAnime01() // observer に null が入る可能性を考慮
  fadeIn.value = true // フェードインを有効にする
})

onUnmounted(() => {
  observer?.disconnect() // コンポーネントが破棄されたら監視を解除
})
</script>

<template>
  <img :src="src" class="up-fade fade-out" />
</template>

<style>
.fade-in {
  opacity: 1;
  transition: opacity 1s ease-in;
}
.fade-out {
  opacity: 0;
}

.up-fade {
  will-change: opacity; /* パフォーマンス向上のため */
}
</style>
