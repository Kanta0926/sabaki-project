<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { FadeInOut } from '@/components/parts/FadeInOut'
import { useToggleClass } from '@/components/parts/useToggleClass'
import Swiper from 'swiper'
import 'swiper/css'

// 画像のインポート
import foodSample01 from '@/assets/bg/food-img01.webp'
import foodSample02 from '@/assets/bg/food-img02.webp'
import foodSample03 from '@/assets/bg/food-img03.webp'
import foodSample04 from '@/assets/bg/food-img04.webp'

// const { element, isActive } = FadeInOut(400)

// PC or SPのフラグ受取
const props = defineProps<{ deviceType: 'SP' | 'PC' }>()
const safeDeviceType = computed(() => props.deviceType ?? 'PC')

// elementごとに SP / PC で異なる threshold を定義
const thresholdMap = {
  element9: { SP: 200, PC: 400 },
}

// deviceType に応じて threshold を取得する関数
const getThreshold = (elementKey: keyof typeof thresholdMap) =>
  computed(() => thresholdMap[elementKey][safeDeviceType.value])

// 各要素に適用
const { element: element9, isActive: isActive9 } = FadeInOut(
  getThreshold('element9').value,
)

// トグルのつけ外しの記述
// useToggleClassにトグルのクラスを送る
const checkClass = 'osasimi'
const toggleClass = 'show'
const { toggleClassOnElement } = useToggleClass(checkClass, toggleClass) // toggleClassOnElement を取得
// const osasimiParents = ref<HTMLElement[]>([]) // クリック対象の親要素を配列で保持

// スワイパーの記述
const swiperContainer = ref<HTMLElement | null>(null) // Swiper のコンテナを参照

onMounted(() => {
  if (swiperContainer.value) {
    new Swiper(swiperContainer.value, {
      speed: 600,
      slidesPerView: 'auto',
      watchSlidesProgress: true,
      passiveListeners: true, // これを追加
    })
  }

  // foodElementsにクリックイベントをつけるため取得
  const foodElements = document.querySelectorAll('.food-image-item')

  // foodElementsにtoggleClassOnElementをクリックイベントとして追加
  // foodElementsクリックでtoggleClassOnElementsが呼び出される
  foodElements.forEach(el => {
    el.addEventListener('click', toggleClassOnElement)
  })
})
</script>

<template>
  <section class="section food-index" id="food-sample">
    <h2 class="top-sec-ttl effect-fade01-none">
      <span class="en serif">FOOD SAMPLE</span>
      <span class="ja serif">料理例</span>
    </h2>
    <div class="top-sec-body">
      <div class="swiper" ref="swiperContainer">
        <div class="food-image-inner swiper-wrapper" ref="osasimiParent">
          <div
            id="food-01"
            ref="element9"
            :class="[
              'food-image-item',
              'up-fade',
              'swiper-slide',
              { active: isActive9 },
            ]"
          >
            <img :src="foodSample01" class="food-image" />
            <span>お刺身</span>
            <svg viewBox="0 0 62 61">
              <use xlink:href="#circle-arrow"></use>
            </svg>
            <div class="osasimi">
              <p>
                新鮮なお刺身に仕上げます。<br />
                瀬戸内海の美味しさがぎゅっと<br />
                包まった魚を是非堪能ください。<br />
                家でのパーティーやリモート飲み会<br />
                にもピッタリのお刺身になります。
              </p>
              <svg viewBox="0 0 62 61">
                <use xlink:href="#circle-arrow"></use>
              </svg>
            </div>
          </div>

          <div
            id="food-02"
            ref="element9"
            :class="[
              'food-image-item',
              'up-fade',
              'swiper-slide',
              { active: isActive9 },
            ]"
          >
            <img :src="foodSample02" class="food-image" />
            <span>煮付け</span>
            <svg viewBox="0 0 62 61">
              <use xlink:href="#circle-arrow"></use>
            </svg>
            <div class="osasimi">
              <p>
                新鮮なお刺身に仕上げます。<br />
                瀬戸内海の美味しさがぎゅっと<br />
                包まった魚を是非堪能ください。<br />
                家でのパーティーやリモート飲み会<br />
                にもピッタリのお刺身になります。
              </p>
              <svg viewBox="0 0 62 61">
                <use xlink:href="#circle-arrow"></use>
              </svg>
            </div>
          </div>

          <div
            id="food-03"
            ref="element9"
            :class="[
              'food-image-item',
              'up-fade',
              'swiper-slide',
              { active: isActive9 },
            ]"
          >
            <img :src="foodSample03" class="food-image" />
            <span>魚焼き</span>
            <svg viewBox="0 0 62 61">
              <use xlink:href="#circle-arrow"></use>
            </svg>
            <div class="osasimi">
              <p>
                新鮮なお刺身に仕上げます。<br />
                瀬戸内海の美味しさがぎゅっと<br />
                包まった魚を是非堪能ください。<br />
                家でのパーティーやリモート飲み会<br />
                にもピッタリのお刺身になります。
              </p>
              <svg viewBox="0 0 62 61">
                <use xlink:href="#circle-arrow"></use>
              </svg>
            </div>
          </div>
          <div
            id="food-04"
            ref="element9"
            :class="[
              'food-image-item',
              'up-fade',
              'swiper-slide',
              { active: isActive9 },
            ]"
          >
            <img :src="foodSample04" class="food-image" />
            <span>あん肝</span>
            <svg viewBox="0 0 62 61">
              <use xlink:href="#circle-arrow"></use>
            </svg>
            <div class="osasimi">
              <p>
                新鮮なお刺身に仕上げます。<br />
                瀬戸内海の美味しさがぎゅっと<br />
                包まった魚を是非堪能ください。<br />
                家でのパーティーやリモート飲み会<br />
                にもピッタリのお刺身になります。
              </p>
              <svg viewBox="0 0 62 61">
                <use xlink:href="#circle-arrow"></use>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* swiper記述 */
.swiper {
  padding: 4px 24px 4px 4px;
  margin-right: -6.4vw;
  /* overflow: visible; */
}

.swiper-wrapper {
}

.swiper-slide {
  width: 100%;
  max-width: 647px;
  border-radius: 16px;
}

.swiper-slide:not(:last-child) {
  margin-right: 36px;
}

.swiper-slide:not(.swiper-slide-visible) {
  pointer-events: none;
  opacity: 0.3;
}

.food-index {
  z-index: 50;
  display: flex;
  justify-content: space-between;
  margin-top: 180px;
  background-color: var(--bg);
}

.food-image-inner {
  height: 100%;
}

.food-image-flex {
  display: flex;
  flex-direction: column;
  height: 29.27vw;
}

.food-image-flex li {
  display: flex;
  justify-content: center;
}

.food-image-item {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 0 8px grey;
  transition: 0.5s;
}

.food-image-item:nth-child(2n) {
  margin-top: 60px;
}

.food-image-item img {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease;
  object-fit: cover;
}

.food-image-item:hover .food-image {
  transform: scale(1.1);
}

.food-image-item::before {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
  pointer-events: none;
  content: '';
  background: linear-gradient(rgb(0 0 0 / 30%), rgb(0 0 0 / 60%));
  opacity: 0.3;
  transition: 0.5s;
}

.food-image-item:hover::before {
  opacity: 0;
}

.food-image-item span {
  position: absolute;
  top: 30%;
  left: 50%;
  z-index: 15;
  margin: auto;
  font-size: 7rem;
  font-weight: 400;
  color: #ffff;
  cursor: pointer;
  writing-mode: vertical-rl;
  transform: translateY(-50%) translateX(-50%);
}

.food-image-item svg {
  position: absolute;
  top: 60%;
  left: 50%;
  z-index: 15;
  width: 62px;
  height: 62px;
  fill: #ffff;
  stroke: #ffff;
  transition: all 0.8s;
  transform: translateY(-30%) translateX(-50%) rotate(90deg);
}

.osasimi svg {
  top: 80%;
  transform: translateY(-30%) translateX(-50%) rotate(270deg);
}

.food-image-item:hover .osasimi svg {
  top: 80%;
  transform: translateY(0%) translateX(-50%) rotate(270deg);
}

.food-image-item:hover svg {
  transform: translateY(0%) translateX(-50%) rotate(90deg);
}

.osasimi {
  position: absolute;
  top: -100%;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  margin: auto;
  cursor: pointer;
  background: var(--color);
  transition: all 0.4s;
}

.show {
  top: 0;
}

.osasimi p {
  margin: 30px auto;
  font-size: 2rem;
  font-weight: 600;
  line-height: 50px;
  color: #ffff;
  writing-mode: vertical-rl;
  max-width: 100%;
}

/* ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

/* タブレット対応：744px~1024px
============================================== */
@media screen and (min-width: 744px) and (max-width: 1024px) {
  .food-index {
    margin-top: 120px;
  }

  .food-image-flex {
    flex-direction: row;
  }

  .food-image-item {
    width: 56vw;
    height: 50vw;
  }

  .food-image-item span {
    top: 35%;
    font-size: 6rem;
  }

  .food-image-item svg {
    top: 70%;
  }

  .food-image-item .osasimi svg {
    top: 80%;
  }

  .osasimi p {
    margin: 45px auto;
    font-size: 1.7rem;
    line-height: 2.4;
  }
}

/* ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

/* SP、スマホ対応：743px以下
============================================== */

@media screen and (max-width: 743px) {
  .food-index {
    margin-top: 120px;
  }

  .food-image-flex {
    flex-direction: row;
  }

  .food-image-item {
    width: 75vw;
    height: 90vw;
  }

  .food-image-item span {
    top: 35%;
    font-size: 6rem;
  }

  .food-image-item svg {
    top: 70%;
  }

  .food-image-item .osasimi svg {
    top: 80%;
  }

  .osasimi p {
    font-size: 1.35rem;
    line-height: 2.4;
  }
}
</style>
