<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import SymbolTell from './icons/symbolTell.vue'
import { globalScrollY } from '@/components/parts/useInertiaScroll'
import { useSmoothScroll } from '@/components/parts/useSmoothScroll'

// 画像のインポート
import headerImg01 from '@/assets/bg/SABAK2.0.png'
import headerImg02 from '@/assets/bg/concept-img01.webp'

// スクロールイベント
import ClassInScroll from '@/components/parts/ClassInScroll.vue'
const { smoothScroll } = useSmoothScroll()

// PC or SPのフラグ受取
const props = defineProps<{
  deviceType: 'SP' | 'PC' | null
}>()

// deviceType の値を確認する
watchEffect(() => {
  console.log('Received deviceType:', props.deviceType)
})

const winPos = ref(0)
const flg = ref(false)

// const smoothScroll = (event: MouseEvent) => {
//   event.preventDefault() // デフォルトのリンクの動作を防止

//   const adjust = -30 // スクロール位置の調整
//   // const speed = 600; // スクロールの速度（ミリ秒）

//   const href = (event.target as HTMLAnchorElement).getAttribute('href') || ''
//   const target = document.querySelector(
//     href === '#' || href === '' ? 'html' : href,
//   ) as HTMLElement

//   if (target) {
//     const position = target.offsetTop + adjust // 目標位置の算出（調整を加える）
//     // スムーズスクロール
//     window.scrollTo({
//       top: position,
//       behavior: 'smooth',
//     })
//     //globalScrollY` を更新して、スクロールがリセットされるのを防ぐ
//     setTimeout(() => {
//       globalScrollY.value = position
//     }, 500)
//   }
// }

const toggleMenu = async () => {
  // flgでトグルの開閉を管理
  if (!flg.value) {
    // メニューを開く
    winPos.value = window.scrollY // 現在のスクロール位置を保存
    document.body.style.top = `-${winPos.value}px`

    console.log(window.scrollY)

    document.body.classList.add('scroll-stop')
    flg.value = true
  } else {
    // メニューを閉じる
    // document.documentElement.style.scrollBehavior = 'auto' // 一時的にスムーズスクロール無効化
    document.body.classList.remove('scroll-stop')

    // 現在のスクロール量を保持のため、top:-pxにしている、これを初期化
    document.body.style.position = ''
    document.body.style.top = ''

    window.scrollTo(0, winPos.value) // 元の位置に戻す

    // スムーズスクロールを元に戻す（遅延適用）
    // setTimeout(() => {
    //   document.documentElement.style.scrollBehavior = 'smooth'
    // }, 100)
    // document.documentElement.style.scrollBehavior = 'auto'

    flg.value = false
  }
}

const closeMenu = (event?: Event) => {
  event?.preventDefault() // デフォルトのリンク動作を防ぐ
  const href = (event?.target as HTMLAnchorElement).getAttribute('href') || ''
  const target = document.querySelector(
    href === '#' || href === '' ? 'html' : href,
  ) as HTMLElement

  // メニューを閉じる
  flg.value = false
  document.documentElement.style.scrollBehavior = 'auto' // 一時的にスムーズスクロール無効化
  document.body.classList.remove('scroll-stop')
  window.scrollTo(0, winPos.value) // 元の位置に戻す

  // targetに遷移
  const targetPosition = target.getBoundingClientRect().top + window.scrollY
  setTimeout(() => {
    window.scrollTo({ top: targetPosition, behavior: 'smooth' })

    //globalScrollY` を更新して、スクロールがリセットされるのを防ぐ
    setTimeout(() => {
      globalScrollY.value = targetPosition
    }, 500)
    // スクロールが完了した後に更新
  }, 100)
}

onMounted(() => {})
</script>

<template>
  <header>
    <div class="toggle-btn" @click="toggleMenu">
      <div class="btn-bar-inner">
        <span class="btn-bar btn-bar-01"></span>
        <span class="btn-bar btn-bar-02"></span>
        <span class="btn-bar btn-bar-03"></span>
        <span class="btn-bar btn-bar-04"></span>
      </div>
      <div class="btn-ttl"><span>MENU</span></div>
    </div>

    <div class="h-menue" :class="{ 'h-menue-active': flg }">
      <div class="section">
        <div class="h-logo">
          <img :src="headerImg01" />
        </div>
        <div class="h-menue-flex">
          <div class="h-image">
            <img :src="headerImg02" />
          </div>
          <div class="h-text-inner">
            <ul>
              <li class="h-text-item">
                <span class="appeal-ttl-mini">ABOUT</span>
                <a href="#about" @click="closeMenu($event)">SABAKIとは</a>
              </li>
              <li class="h-text-item">
                <span class="appeal-ttl-mini">WORK FLOW</span>
                <a href="#work-flow" @click="closeMenu($event)"
                  >サービスの流れ</a
                >
              </li>
              <li class="h-text-item">
                <span class="appeal-ttl-mini">PRICE</span>
                <a href="#price" @click="closeMenu($event)">お値段</a>
              </li>
            </ul>
            <ul>
              <li class="h-text-item">
                <span class="appeal-ttl-mini">SEA</span>
                <a href="#sea" @click="closeMenu($event)">瀬戸内海と釣り</a>
              </li>
              <li class="h-text-item">
                <span class="appeal-ttl-mini">FOOD SAMPLE</span>
                <a href="#food-sample" @click="closeMenu($event)">料理例</a>
              </li>
              <li class="h-text-item">
                <span class="appeal-ttl-mini">ACCESS</span>
                <a href="#access" @click="closeMenu($event)">アクセス</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="logo-inner">
      <div>
        <img :src="headerImg01" class="logo" />
      </div>
    </div>

    <ul v-if="deviceType === 'PC'" class="scroll-text-inner">
      <li><span class="scroll-text">scroll</span></li>
    </ul>
    <ClassInScroll
      v-else
      class="scroll-text-inner"
      initial-class="trans"
      activeClass="active"
      :threshold="0.92"
    >
      <li><span class="scroll-text">scroll</span></li>
    </ClassInScroll>

    <a class="contact-btn" href="#access">
      <SymbolTell />
      <span class="tell-text sans">予約する</span>
    </a>

    <nav class="header-nav">
      <ul class="heder-nav-list sans">
        <li class="header-nav-item" alt="SABAKIとは">
          <a href="#about" @click="smoothScroll">SABAKIとは</a>
        </li>
        <li class="header-nav-item" alt="サービスの流れ">
          <a href="#work-flow" @click="smoothScroll">サービスの流れ</a>
        </li>
        <li class="header-nav-item" alt="料理例">
          <a href="#food-sample" @click="smoothScroll">料理例</a>
        </li>
        <li class="header-nav-item" alt="アクセス">
          <a href="#access" @click="smoothScroll">アクセス</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
/* ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

ハンバーガーメニュー

＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ */
.toggle-btn {
  position: fixed;
  top: 27px;
  right: 24px;
  z-index: 999;
  width: 50px;
  height: 80px;
  cursor: pointer;
}

.btn-bar-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.btn-bar-01 {
}

.btn-bar-02 {
  top: 14px;
}

.btn-bar-03 {
  top: 28px;
}

.btn-bar-04 {
  top: 42px;
}

@media (hover: hover) {
  .toggle-btn:hover .btn-bar-01 {
    opacity: 0;
    transition: 0.24s ease;
  }

  .toggle-btn:hover .btn-bar-04 {
    opacity: 0;
    transition: 0.24s ease;
  }

  .toggle-btn:hover .btn-ttl {
    top: 42px;
    transition: 0.24s ease;
  }
}

.btn-ttl {
  position: absolute;
  top: 56px;
  color: #c7ab74;
}

.scroll-stop .btn-bar {
  top: 50px;
}

.btn-bar {
  position: absolute;
  display: block;
  width: 49px;
  height: 9px;
  background-color: #c7ab74;
  transition: 0.24s ease;
}

.scroll-stop .btn-bar:nth-child(1),
.scroll-stop .btn-bar:nth-child(4) {
  opacity: 0;
}

.scroll-stop .btn-ttl span {
  top: 57px;
  opacity: 1;
}

.scroll-stop .btn-bar-inner span:nth-child(2) {
  top: 28px;
  width: 40px;
  height: 6px;
  transform: rotate(45deg);
}

.scroll-stop .btn-bar-inner span:nth-child(3) {
  top: 28px;
  width: 40px;
  height: 6px;
  transform: rotate(-45deg);
}

.scroll-text-inner {
  position: fixed;
  top: 340px;
  right: 24px;
}

/* ハンバーガーメニュー画面 */
.h-menue {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 900;
  display: none;
  width: 100%;
  height: 100%;
  background: #1a1a1a;
  opacity: 0;
  transform: translateY(-100%);
  transition: transform 0.3s ease-in-out;
}

.h-menue-active {
  display: block;
  opacity: 0;
  animation-name: fade-nav-anime;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  transform: translateY(0);
}

@keyframes fade-nav-anime {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.h-logo {
  width: 178px;
  height: 178px;
  margin: 74px auto 100px;
}

.h-logo img {
  width: 100%;
  height: 100%;
}

.h-menue-flex {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.h-image {
  width: 35.42vw;
  height: 25.31vw;
  box-shadow: 0 0 8px white;
}

.h-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.h-text-inner {
  display: flex;
  align-items: center;
}

.h-text-inner ul:first-child {
  margin-right: 40px;
}

.h-text-inner a {
  display: block;
  font-size: 3.8rem;
  font-weight: bold;
  color: #ffff;
}

.h-text-item:not(:last-child) {
  margin-bottom: 60px;
}

.h-text-item .appeal-ttl-mini {
  margin: 0;
  font-size: 1.8rem;
}

.logo-inner {
  display: none;
}

.scroll-text {
  font-size: 1.8rem;
  color: #c7ab74;
  transform: rotate(90deg);
}

.scroll-text-inner::after {
  position: relative;
  top: 50px;
  left: 45%;
  display: inline-block;
  width: 2.5px;
  height: 40px;
  margin: 0 auto;
  text-align: center;
  content: '';
  background-color: #c7ab74;
  opacity: 0;
  animation: pathmove 2s ease-in-out infinite;
}

@keyframes pathmove {
  0% {
    top: 50px;
    height: 0;
    opacity: 0;
  }

  30% {
    height: 4.583vw;
    opacity: 1;
  }

  100% {
    height: 4.583vw;
    opacity: 0;
  }
}

.trans {
  opacity: 1;
}

.trans.active {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

/* 予約ボタン */
.contact-btn {
  position: fixed;
  right: 47px;
  bottom: 34px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 105px;
  height: 105px;
  background-color: #c7ab74;
  border-radius: 50%;
}

.contact-btn:hover {
  background-color: #ffff;
  border: 0.2rem solid #c7ab74;
  opacity: 1;
}

.contact-btn:hover .tell-text {
  color: #c7ab74;
}

.contact-btn:hover .symbol-tell {
  fill: #c7ab74;
}

.tell-text {
  font-size: 1.5rem;
  font-weight: bold;
}

.symbol-tell {
  width: 31.5px;
  height: 31.5px;
  margin-bottom: 13.5px;
  fill: white;
}

.header-nav {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
  padding: 30px 100px 30px 36px;
  background-color: var(--bg);
  border-radius: 0 0 0 40px;
}

.heder-nav-list {
  display: flex;
  justify-content: space-between;
  width: 822px;
}

.header-nav-item {
  font-size: 2.8rem;
  font-weight: 500;
  color: #333;
}

.header-nav-item a {
  color: #333;
}

.header-nav-item a::after {
  display: block;
  width: 0%;
  height: 3px;
  content: '';
  background: var(--color);
  transition: 0.3s;
}

.header-nav-item a:hover::after {
  width: 100%;
}

/* ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

/* タブレット対応：744px~1024px
============================================== */
@media screen and (min-width: 744px) and (max-width: 1024px) {
  .h-logo {
    width: 16vw;
    height: 16vw;
    margin: 84px auto;
  }

  .h-menue-flex {
    margin: 0 0 40px;
  }

  .h-image {
    display: none;
  }

  .h-text-inner {
    flex-direction: column;
    margin-left: 40px;
    font-size: 1.8rem;
  }

  .h-text-inner ul:first-child {
    margin-right: 0;
    margin-bottom: 46px;
  }

  .h-text-item:not(:last-child) {
    margin-bottom: 46px;
  }

  .h-text-item .appeal-ttl-mini {
    font-size: 1.4rem;
  }

  .h-text-inner a {
    font-size: 3.2rem;
  }

  .header-nav {
    display: none;
  }

  .toggle-btn {
    position: fixed;
    z-index: 999;
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    width: 70px;
    height: 70px;
    cursor: pointer;
    background-color: #c7ab74;
    border-radius: 50%;
  }

  .btn-bar-inner {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin-right: 4px;
  }

  .btn-bar:nth-child(1) {
    margin-top: 0;
  }

  .logo-inner {
    display: block;
    position: fixed;
    top: 2.8vh;
    left: 6vw;
  }

  .logo {
    width: 9.5vw;
    height: 8vh;
  }

  .scroll-text-inner {
    position: absolute;
    top: 95vh;
    left: 43%;
    right: 0;
    right: unset;
  }

  .scroll-text-inner::after {
    top: 10px;
    width: 0.4vw;
    animation: pathmove 2s ease-in-out infinite;
  }
  @keyframes pathmove {
    0% {
      height: 0;
      opacity: 0;
    }

    10% {
      height: 8vw;
      opacity: 1;
    }

    100% {
      height: 8vw;
      opacity: 0;
    }
  }

  .scroll-text {
    transform: none;
    font-size: 2.4rem;
  }

  .scroll-stop .btn-bar-inner span:nth-child(2) {
    position: absolute;
    top: 20px;
    width: 32px;
    height: 6px;
  }

  .scroll-stop .btn-bar-inner span:nth-child(3) {
    position: absolute;
    top: 20px;
    width: 32px;
    height: 6px;
  }

  .btn-ttl {
    position: static;
    display: flex;
    flex: 0 0 22px;
    align-items: center;
    justify-content: center;
    min-width: 0;
    margin-bottom: 4px;
    font-size: 1.4rem;
    color: #ffff;
  }

  .btn-ttl > span {
    transform: rotate(270deg);
  }

  .btn-bar {
    position: static;
    display: block;
    width: 22px;
    height: 8px;
    margin-top: 4px;
    background-color: #ffff;
    transition: 0.25s ease;
  }

  .scroll-stop .btn-bar {
    margin-top: 12px;
    transition: 0.25s ease;
  }

  .btn-bar:nth-child(1) {
    margin-top: 0;
  }

  /* .toggle-btn:hover .btn-bar-01 {
    opacity: 0;
    transition: none;
  }

  .toggle-btn:hover .btn-bar-04 {
    opacity: 0;
    transition: none;
  } */

  /* .scroll-text-inner {
    position: fixed;
    top: 387px;
    right: 24px;
    display: block;
  }

  .scroll-text-inner::after {
    position: relative;
    top: 50px;
    left: 45%;
    display: inline-block;
    width: 2.5px;
    height: 40px;
    margin: 0 auto;
    text-align: center;
    content: '';
    background-color: #c7ab74;
    opacity: 0;
    animation: pathmove 2s ease-in-out infinite;
  }

  @keyframes pathmove {
    0% {
      top: 50px;
      height: 0;
      opacity: 0;
    }

    30% {
      height: 6vw;
      opacity: 1;
    }

    100% {
      height: 6vw;
      opacity: 0;
    }
  } */

  .contact-btn {
    display: none;
  }

  .top-ttl-inner {
    top: 74px;
    left: 80px;
    min-width: 146px;
  }
}

/* ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

/* SP、スマホ対応：743px以下
============================================== */
@media screen and (max-width: 743px) {
  .h-logo {
    width: 30vw;
    height: 30vw;
    margin: 40px auto;
  }

  .h-menue-flex {
    margin: 0;
  }

  .h-image {
    display: none;
  }

  .h-text-inner {
    flex-direction: column;
    font-size: 1.8rem;
  }

  .h-text-inner ul:first-child {
    margin-right: 0;
    margin-bottom: 30px;
  }

  .h-text-item:not(:last-child) {
    margin-bottom: 30px;
  }

  .h-text-item .appeal-ttl-mini {
    font-size: 1.4rem;
  }

  .h-text-inner a {
    font-size: 1.6rem;
  }

  .header-nav {
    display: none;
  }

  .toggle-btn {
    position: fixed;
    z-index: 999;
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    width: 50px;
    height: 50px;
    cursor: pointer;
    background-color: #c7ab74;
    border-radius: 50%;
  }

  .btn-bar-inner {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin-right: 4px;
  }

  .btn-bar:nth-child(1) {
    margin-top: 0;
  }

  .scroll-stop .btn-bar-inner span:nth-child(2) {
    position: absolute;
    top: 20px;
    width: 26px;
    height: 5px;
  }

  .scroll-stop .btn-bar-inner span:nth-child(3) {
    position: absolute;
    top: 20px;
    width: 26px;
    height: 5px;
  }

  .btn-ttl {
    position: static;
    display: flex;
    flex: 0 0 15px;
    align-items: center;
    justify-content: center;
    min-width: 0;
    margin-bottom: 4px;
    font-size: 1rem;
    color: #ffff;
  }

  .btn-ttl > span {
    transform: rotate(270deg);
  }

  .btn-bar {
    position: static;
    display: block;
    width: 16px;
    height: 5px;
    margin-top: 4px;
    background-color: #ffff;
    transition: 0.24s ease;
  }

  .scroll-stop .btn-bar {
    margin-top: 2px;
  }

  .btn-bar:nth-child(1) {
    margin-top: 0;
  }

  .logo-inner {
    display: block;
    position: fixed;
    top: 2.8vh;
    left: 6vw;
  }

  .logo {
    width: 14vw;
    height: 7.4vh;
  }

  .scroll-text-inner {
    position: absolute;
    top: 95vh;
    left: 43%;
    right: 0;
    right: unset;
  }

  .scroll-text-inner::after {
    top: 10px;
    width: 0.4vw;
    animation: pathmove 2s ease-in-out infinite;
  }
  @keyframes pathmove {
    0% {
      height: 0;
      opacity: 0;
    }

    10% {
      height: 8vw;
      opacity: 1;
    }

    100% {
      height: 8vw;
      opacity: 0;
    }
  }

  .scroll-text {
    transform: none;
  }

  .contact-btn {
    display: none;
  }

  .top-ttl-inner {
    top: 10%;
    left: 8%;
    width: 34vw;
    min-width: 120px;
    max-width: 160px;
  }
}
</style>
