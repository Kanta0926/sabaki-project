<script setup lang="ts">
import { computed } from 'vue'

import { FadeInOut } from '@/components/parts/FadeInOut'

// 画像のインポート
import pricePageImg01 from '@/assets/bg/price-img01.webp'

// PC or SPのフラグ受取
const props = defineProps<{ deviceType: 'SP' | 'PC' }>()
const safeDeviceType = computed(() => props.deviceType ?? 'PC')

// elementごとに SP / PC で異なる threshold を定義
const thresholdMap = {
  element4: { SP: 200, PC: -300 },
  element5: { SP: 100, PC: 200 },
}

// deviceType に応じて threshold を取得する関数
const getThreshold = (elementKey: keyof typeof thresholdMap) =>
  computed(() => thresholdMap[elementKey][safeDeviceType.value])

// 各要素に適用
const { element: element4, isActive: isActive4 } = FadeInOut(
  getThreshold('element4').value,
)
const { element: element5, isActive: isActive5 } = FadeInOut(
  getThreshold('element5').value,
)
</script>

<template>
  <section class="section price-index" id="price">
    <h2
      id="price"
      ref="element4"
      :class="['top-sec-ttl', 'effect-fade01-none', { active: isActive4 }]"
    >
      <span class="en serif">PRICE</span>
      <span class="ja serif">お値段</span>
    </h2>

    <div class="top-price-sec top-sec-body">
      <div class="price-image-inner">
        <img :src="pricePageImg01" />
        <div
          ref="element4"
          :class="[
            'appeal-ttl',
            'price-ttl',
            'slide-fade',
            { active: isActive4 },
          ]"
        >
          <span>1匹から利用可能</span>
          <span>1コイン500円</span>
          <span>最短所要時間30分</span>
        </div>
      </div>
      <div class="top-price-text serif">
        <p ref="element5" :class="['up-fade', { active: isActive5 }]">
          1匹300グラム、500円から利用可能です。<br />
          所要時間は1匹辺り15分見ほどですが、<br class="br-sp" />
          料理内容によって多少前後します。<br />
          日曜以外であれば、さばいた後お店で食事<br class="br-sp" />
          することもできます。<br class="br-tb" />
          詳しくは電話にてお尋ねください。
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.price-index {
  z-index: 50;
  display: flex;
  justify-content: space-between;
  margin-top: 180px;
  background-color: var(--bg);
}

.top-price-sec {
  display: flex;
  flex-flow: column;
}

.price-image-inner {
  position: relative;
  width: 100%;
  height: 36.6vw;
}

.price-image-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.top-price-appeal {
}

.price-ttl {
  position: absolute;
  top: 0;
  display: flex;
  flex-flow: column;
}

.price-ttl span:nth-child(n + 2) {
  margin: 16px 0;
}

.top-price-text {
  position: relative;
  width: 55%;
  padding: 30px 3.9% 0 5px;
  margin-top: -8vw;
  background-color: var(--bg);
  border-radius: 0 20px 0 0;
}

.top-price-text p {
  font-size: 2.4rem;
  font-weight: 600;
}

/* ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

/* タブレット対応：744px~1024px
============================================== */
@media screen and (min-width: 744px) and (max-width: 1024px) {
  .br-tb {
    display: none;
  }

  .price-index {
    margin-top: 120px;
  }

  .price-image-inner {
    height: 64vw;
    min-height: initial;
    max-height: 413px;
  }

  .price-ttl {
    display: flex;
  }

  .price-ttl span {
    padding: 0;
    font-size: 2.4rem;
  }

  .top-price-text {
    width: 65%;
    padding: 25px 25px 0 6.4vw;
    margin-top: -10vw;
    margin-left: -6.4vw;
  }

  .top-price-text p {
    font-size: 1.7rem;
  }
}

/* ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

/* SP、スマホ対応：743px以下
============================================== */

@media screen and (max-width: 743px) {
  .price-index {
    margin-top: 120px;
  }

  .price-image-inner {
    height: 64vw;
    min-height: initial;
    max-height: 413px;
  }

  .price-ttl {
  }

  .price-ttl span {
    padding: 0;
    font-size: 1.6rem;
    margin: 4px 0;
  }

  .price-ttl span:nth-child(n + 2) {
    margin: 8px 0;
  }
  .top-price-text {
    width: 80%;
    padding: 25px 25px 0 6.4vw;
    margin-top: -10vw;
    margin-left: -6.4vw;
  }

  .top-price-text p {
    font-size: 1.35rem;
  }
}
</style>
