<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

// 画像のインポート
import loadingIcon01 from '@/assets/bg/SABAK1.9.png'

// props で firstRenderDone を受け取る
const props = defineProps<{
  firstRenderDone: boolean
}>()

const currentPercent = ref(0) // 現在のパーセント
// const gaugeMax = 100
const gaugeWidth = ref('0%')
// const imgCount = ref(0) // 読み込み画像数のカウント
const baseCount = ref(0)
const isLoading = ref(true) // ローディングの表示管理

let animationCompleted = false // 進捗100%になったかどうかのフラグ

// firstRenderDone が true になったらローディング終了処理を開始
watch(
  () => props.firstRenderDone,
  newVal => {
    if (newVal && animationCompleted) {
      //loading処理フラグをfalse
      isLoading.value = false
    }
  },
)

const startLoadingAnimation = () => {
  const easeOutQuad = (t: number) => t * (2 - t) // イージング関数

  let progress = 0
  const maxProgress = 100 // 余裕をもたせて 120 まで増加させる
  const interval = setInterval(() => {
    if (baseCount.value < 100) {
      // ランダムな増加量 (1〜5の範囲で変動)
      const increment = Math.floor(Math.random() * 5) + 1
      // 120 以上にならないようにする
      progress = Math.min(maxProgress, progress + increment)

      // イージングを適用
      baseCount.value = Math.min(
        100,
        Math.floor(easeOutQuad(progress / maxProgress) * 100), // maxProgress を考慮
      )
      currentPercent.value = baseCount.value
      gaugeWidth.value = `${baseCount.value}%`
    } else {
      clearInterval(interval)
      animationCompleted = true // 進行が100%になったことを記録
      // console.log('アニメーション完了, firstRenderDone待ち')
      // console.log(props.firstRenderDone)

      // firstRenderDone が true ならローディングを終了
      if (props.firstRenderDone) {
        // console.log('firstRenderDone なのでローディング終了')
        isLoading.value = false
      }
    }
  }, 50)
}

onMounted(() => {
  // 初期状態でバーを動かし始める（オプション）
  // console.log(props.firstRenderDone)

  startLoadingAnimation()
})
</script>

<!-- loading -->
<template>
  <Transition name="fade">
    <div v-if="isLoading" class="loading">
      <div class="loading-main">
        <div class="loading-img-inner">
          <img :src="loadingIcon01" />
        </div>
        <div class="bar-inner">
          <div class="bar" :style="{ width: gaugeWidth }"></div>
          <p class="percent-text">{{ currentPercent }}%</p>
          <p>loading</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: var(--bg);
  transition: opacity 5s ease-out;
}

.loading-img-inner {
  width: 178px;
  height: 178px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.loading img {
  width: 90%;
  height: 100%;
}

.percent {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
  font-size: 16px;
  color: var(--color);
}

.bar-inner {
  text-align: center;
}

.bar {
  width: 0%;
  height: 5px;
  background: #4d4d4d;
}

.loading-text p {
  position: relative;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 900;
  color: var(--color);
  text-align: center;
  letter-spacing: 1px;
}

/* VueのトランジションタグのCSS */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

/* タブレット対応：744px~1024px
============================================== */
.bar-inner {
  font-size: 2rem;
}

/* ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

/* SP、スマホ対応：743px以下
============================================== */

@media screen and (max-width: 743px) {
  .loading-img-inner {
    width: 100px;
    height: 100px;
  }
  .bar-inner {
    font-size: 1.6rem;
  }

  .bar {
    height: 3px;
  }
}
</style>
