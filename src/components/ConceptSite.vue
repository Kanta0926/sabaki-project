<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'

import { FadeInOut } from '@/components/parts/FadeInOut'
import IconCircleArrow from './icons/IconCircleArrow.vue'

// 画像のインポート
import conceptLoop01 from '@/assets/bg/concept-img01.webp'
import conceptLoop02 from '@/assets/bg/concept-img02.webp'
import conceptLoop03 from '@/assets/bg/concept-img03.webp'
import conceptLoop04 from '@/assets/bg/concept-img04.webp'
import conceptLoop05 from '@/assets/bg/concept-img05.webp'
import padallaxImg from '@/assets/bg/yukilow1107SDIM1477260_TP_V.webp'

import { useSmoothScroll } from '@/components/parts/useSmoothScroll'

const { smoothScroll } = useSmoothScroll()

// PC or SPのフラグ受取
// SP or PC or nullだと、nullをキーにできないため
// safeDeviceTypeでnullの場合の初期値をPCに設定
const props = defineProps<{ deviceType: 'SP' | 'PC' }>()

const safeDeviceType = computed(() => props.deviceType ?? 'PC')

// elementごとに SP / PC で異なる threshold を定義
const thresholdMap = {
  element1: { SP: -400, PC: 200 },
  element2: { SP: -700, PC: 200 },
  element7: { SP: 200, PC: 200 },
  element8: { SP: -700, PC: 200 },
}

// deviceType に応じて threshold を取得する関数
// elementKeyを要素の識別、引数として受取、
// computedでリアクティブなelementKeyを取得
const getThreshold = (elementKey: keyof typeof thresholdMap) =>
  computed(() => thresholdMap[elementKey][safeDeviceType.value])

// 各要素に適用
const { element: element1, isActive: isActive1 } = FadeInOut(
  getThreshold('element1').value,
)
const { element: element2, isActive: isActive2 } = FadeInOut(
  getThreshold('element2').value,
)
const { element: element7, isActive: isActive7 } = FadeInOut(
  getThreshold('element7').value,
)
const { element: element8, isActive: isActive8 } = FadeInOut(
  getThreshold('element8').value,
)

// pallaxの記述
const parallaxRef = ref<HTMLElement | null>(null)
const scrollY = ref(window.scrollY) // スクロール位置をrefで管理
const translate = ref(0) // 計算結果をrefで管理
// let requestId: number | null = null
const wHeight = window.innerHeight

let isTicking = false // ← 追加

// const updateScroll = () => {
//   scrollY.value = window.scrollY // スクロール量を記録
// }

const updateTranslate = () => {
  if (!parallaxRef.value) return

  const top = parallaxRef.value.getBoundingClientRect().top + scrollY.value
  const nowWindow = scrollY.value + wHeight
  translate.value = (nowWindow - top) / 100 - 20 // 事前計算
}

const applyTransform = () => {
  if (!parallaxRef.value) return
  const img = parallaxRef.value.querySelector('img')
  if (img instanceof HTMLElement) {
    img.style.transform = `translate3d(0, ${translate.value}%, 0)`
  }
}

const handleScroll = () => {
  if (isTicking) return // すでにリクエスト済みならスキップ
  isTicking = true

  // updateScroll() // スクロール位置を更新
  updateTranslate() // ここでtranslateを計算

  requestAnimationFrame(() => {
    applyTransform()
    isTicking = false // 実行後にフラグをリセット
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  // requestAnimationFrame(handleScroll) // ← 初回実行を requestAnimationFrame に統一
})

// const handleScroll = () => {
//   // if (!parallaxRef.value) return
//   if (requestId) {
//     cancelAnimationFrame(requestId)
//   }

//   requestId = requestAnimationFrame(() => {
//     const now = window.scrollY
//     const wHeight = window.innerHeight
//     const target = parallaxRef.value!
//     const top = target.getBoundingClientRect().top + now
//     const nowWindow = now + wHeight
//     const translate = (nowWindow - top) / 100 - 10
//     const img = target.querySelector('img')
//     if (img instanceof HTMLElement) {
//       img.style.transform = `translate3d(0, ${translate}%, 0)`
//     }
//     // console.log('実行中')
//   })
// }

// onMounted(() => {
//   window.addEventListener('scroll', handleScroll, { passive: true })
//   handleScroll() // 初回実行
// })
</script>

<template>
  <section class="section concept-index" id="concept">
    <h2
      ref="element1"
      :class="['top-sec-ttl', 'effect-fade01-none', { active: isActive1 }]"
    >
      <span class="en serif">CONCEPT</span>
      <span class="ja serif">魚の調理代行サービス</span>
    </h2>
    <div class="top-sec-body">
      <div
        ref="element1"
        :class="['top-sec-loop', 'slide-fade', { active: isActive1 }]"
      >
        <ul>
          <li class="loop-item">
            <img :src="conceptLoop01" />
          </li>
          <li class="loop-item">
            <img :src="conceptLoop02" />
          </li>
          <li class="loop-item">
            <img :src="conceptLoop03" />
          </li>
          <li class="loop-item">
            <img :src="conceptLoop04" />
          </li>
          <li class="loop-item">
            <img :src="conceptLoop05" />
          </li>
        </ul>
        <ul>
          <li class="loop-item">
            <img :src="conceptLoop01" />
          </li>
          <li class="loop-item">
            <img :src="conceptLoop02" />
          </li>
          <li class="loop-item">
            <img :src="conceptLoop03" />
          </li>
          <li class="loop-item">
            <img :src="conceptLoop04" />
          </li>
          <li class="loop-item">
            <img :src="conceptLoop05" />
          </li>
        </ul>
      </div>

      <div class="top-sec-text serif">
        <div ref="element2" :class="['up-fade', { active: isActive2 }]">
          <p>
            釣った状態の魚を持ち込める<br
              class="br-sp"
            />代行サービスになります。<br />釣り後の魚処理を1コインで請負、<br
              class="br-sp"
            />新鮮な魚料理を提供致します。<br />最高の状態で魚料理を召し上がる<br
              class="br-sp"
            />ことができます。
          </p>
          <div class="top-sec-btn serif">
            <a href="#food-sample" @click="smoothScroll">
              <span>出来上がった料理例</span>
              <IconCircleArrow class="top-sec-arrow"></IconCircleArrow>
            </a>
          </div>
        </div>
      </div>

      <div class="top-sea-body" id="sea">
        <div class="sea-text-inner serif">
          <div ref="element7" :class="['slide-fade', { active: isActive7 }]">
            <span class="appeal-ttl-mini">釣り向きの海</span>
            <h3 class="appeal-ttl">
              <span>魚の宝庫、瀬戸内海</span>
            </h3>
          </div>

          <div
            ref="element8"
            :class="['sea-text', 'up-fade', { active: isActive8 }]"
          >
            <p>
              島の魚屋曰く、瀬戸内海は<br class="br-sp" />
              魚がうまくなる条件が<br class="br-tablet" />
              揃っているらしい。<br />
              魚の旨さは「何を食べてるか」や「締め方」<br class="br-sp" />
              など<br class="br-tablet" />
              にもよるが、「潮の質」にも<br class="br-pc" />
              関係がある。<br class="br-sp br-tablet" />
              瀬戸内の魚は全体的に身が固く筋肉質な魚が多い。<br />
              中でも代表的な「鯛」は甘みが非常に強い。<br />
              鯛は水深が深ぐ潮の流れが速い場所で<br class="br-sp" />
              暮らしている<br class="br-tablet" />
              ため、<br class="br-pc" />
              必然的に筋肉質な魚になる。
            </p>
          </div>
        </div>
        <div class="sea-image-inner">
          <div ref="parallaxRef" class="parallax-img">
            <img
              :src="padallaxImg"
              ref="element7"
              :class="['sea-img', 'slide-fade', { active: isActive7 }]"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section {
  width: 85%;
  margin-right: auto;
  margin-left: auto;
}

.concept-index {
  z-index: 50;
  display: flex;
  justify-content: space-between;
  margin-top: 180px;
  background-color: var(--bg);
}

.effect-fade01-none {
  clip-path: inset(0 0 100% 0);
}

.effect-fade01-none.active {
  animation: effect-fade01-active 0.9s cubic-bezier(0.8, 0, 0.2, 1) forwards;
}

@keyframes effect-fade01-active {
  0% {
    clip-path: inset(0 0 100% 0);
  }

  100% {
    clip-path: inset(0 0 0 0);
  }
}

/* 上下のアニメーション */

.slide-anime-up {
  opacity: 0;
  animation-name: slide-text-y;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
}

@keyframes slide-text-y {
  from {
    opacity: 0;

    /* 要素を上の枠外に移動 */
    transform: translateY(100%);
  }

  to {
    opacity: 1;

    /* 要素を元の位置に移動 */
    transform: translateY(0);
  }
}

.slide-anime-up {
  opacity: 0;
  animation-name: slide-text-y;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;
}

@keyframes slide-text-y {
  from {
    opacity: 0;

    /* 要素を下の枠外に移動 */
    transform: translateY(-100%);
  }

  to {
    opacity: 1;

    /* 要素を元の位置に移動 */
    transform: translateY(0);
  }
}

.top-sec-loop {
  display: flex;
  height: 36.6vw;
  margin-right: -7.4vw;
  overflow: hidden;
}

.top-sec-loop ul {
  display: flex;
  height: 100%;
}

.loop-item {
  width: auto;
  height: 100%;
  margin-right: 5px;
}

.loop-item img {
  width: auto;
  height: 100%;
}

.top-sec-loop ul:first-child {
  animation: loop 80s -40s linear infinite;
}

.top-sec-loop ul:last-child {
  animation: loop2 80s linear infinite;
}

@keyframes loop {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(-100%);
  }
}

@keyframes loop {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(-100%);
  }
}

@keyframes loop2 {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-200%);
  }
}

@keyframes loop2 {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-200%);
  }
}

.top-sec-text {
  position: relative;
  width: 55%;
  padding: 30px 3.9% 0 5px;
  margin-top: -10vw;
  background-color: var(--bg);
  border-radius: 0 20px 0 0;
}

.top-sec-text p {
  font-size: 2.4rem;
  font-weight: 600;
}

.top-sec-btn {
  margin-top: 70px;
  text-align: right;
}

.top-sec-btn a {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
}

.top-sec-btn span {
  margin-right: 20px;
  font-size: 2.2rem;
  font-weight: 600;
  color: #333;
}

.top-sec-arrow {
  width: 42px;
  height: 42px;
  stroke: #333;
  transition: all 0.8s;
}

.top-sec-btn a:hover .top-sec-arrow {
  transform: translateX(20%);
}

/* ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

sea-index

＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ */

.sea-image-inner {
  margin: 0;
}

.top-sea-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 120px;
  flex-direction: row;
}

.appeal-ttl-mini {
  margin-bottom: 14px;
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--textkey);
}

.appeal-ttl {
  margin-bottom: 78.4px;
}

.appeal-ttl span {
  display: inline-block;
  padding: 3px 15px;
  font-size: 3.2rem;
  font-weight: 800;
  color: #ffff;
  text-align: center;
  background-color: var(--textkey);
}

.sea-text {
  font-size: 2.4rem;
  font-weight: 600;
  line-height: 1.46;
}

.sea-image-inner {
  position: relative;
  top: 24px;
  filter: drop-shadow(0 0 8px grey);
}

.sea-img {
  width: 35vw;
  height: 35vw;
}

.parallax-img {
  width: 29.53vw;
  height: 29.53vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  clip-path: circle(50% at 50% 50%);
}

.parallax-img img {
  transition: transform 0.2s ease-out;
}

/* ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

/* タブレット対応：744px~1024px
============================================== */
@media screen and (min-width: 744px) and (max-width: 1024px) {
  .br-tb {
    display: none;
  }

  .concept-index {
    margin-top: 120px;
  }

  .top-sec-body {
    width: 100%;
    height: 100%;
  }

  .top-sec-ttl {
    position: static;
    flex-flow: column;
    margin-bottom: 25px;
  }

  .top-sec-ttl span {
    writing-mode: horizontal-tb;
  }

  .top-sec-loop {
    height: 64vw;
    min-height: initial;
    max-height: 413px;
    margin-right: -6.4vw;
    margin-left: 0;
  }

  .top-sec-text {
    width: 65%;
    min-width: initial;
    padding: 25px 0 0 6.4vw;
    margin-left: -6.4vw;
  }

  .top-sec-text p {
    font-size: 1.7rem;
  }

  .top-sec-btn {
    margin-top: 20px;
  }

  .top-sec-btn a {
    justify-content: start;
  }

  .top-sec-btn span {
    font-size: 1.7rem;
  }

  .top-sec-arrow {
    width: 26px;
    height: 26px;
  }

  .top-sea-body {
    flex-direction: row;
  }

  .appeal-ttl {
    margin-bottom: 24px;
  }

  .appeal-ttl span {
    padding: 3px;
    font-size: 2.4rem;
  }

  .sea-text {
    font-size: 1.7rem;
    padding-right: 2rem;
  }

  .parallax-img {
    width: 327px;
    height: 327px;
  }

  .sea-image-inner {
    margin: 0;
  }

  .sea-img {
    width: 94.67vw;
    height: 94.67vw;
  }
}

/* ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

/* SP、スマホ対応：743px以下
============================================== */

@media screen and (max-width: 743px) {
  .concept-index {
    margin-top: 120px;
  }

  .about-text-body {
    width: 100%;
  }

  .top-sec-body {
    width: 100%;
    height: 100%;
  }

  .top-sec-ttl {
    position: static;
    flex-flow: column;
    margin-bottom: 25px;
  }

  .top-sec-ttl span {
    writing-mode: horizontal-tb;
  }

  .top-sec-loop {
    height: 64vw;
    min-height: initial;
    max-height: 413px;
    margin-right: -6.4vw;
    margin-left: -6.4vw;
  }

  .top-sec-text {
    width: 80%;
    min-width: initial;
    padding: 25px 25px 0 6.4vw;
    margin-left: -6.4vw;
  }

  .top-sec-text p {
    font-size: 1.35rem;
  }

  .top-sec-btn {
    margin-top: 20px;
  }

  .top-sec-btn span {
    font-size: 1.3rem;
  }

  .top-sec-arrow {
    width: 26px;
    height: 26px;
  }

  .top-sea-body {
    flex-direction: column-reverse;
  }

  .appeal-ttl {
    margin-bottom: 24px;
  }

  .appea-ttl span {
    padding: 3px;
    font-size: 2.4rem;
  }

  .sea-text {
    font-size: 1.35rem;
  }

  .parallax-img {
    width: 87.2vw;
    height: 87.2vw;
  }

  .sea-image-inner {
    margin-bottom: 36px;
  }

  .sea-img {
    width: 110vw;
    height: 110vw;
  }
}
</style>
