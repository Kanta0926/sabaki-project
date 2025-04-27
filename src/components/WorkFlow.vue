<script setup lang="ts">
import { computed } from 'vue'

import { FadeInOut } from '@/components/parts/FadeInOut'

// 画像のインポート
import workFlowImg01 from '@/assets/bg/work-flow-img01.webp'
import workFlowImg02 from '@/assets/bg/work-flow-img02.webp'
import workFlowImg03 from '@/assets/bg/work-flow-img03.webp'

// PC or SPのフラグ受取
const props = defineProps<{ deviceType: 'SP' | 'PC' }>()

const safeDeviceType = computed(() => props.deviceType ?? 'PC')

// elementごとに SP / PC で異なる threshold を定義
const thresholdMap = {
  element6: { SP: -100, PC: 100 },
}

// deviceType に応じて threshold を取得する関数
const getThreshold = (elementKey: keyof typeof thresholdMap) =>
  computed(() => thresholdMap[elementKey][safeDeviceType.value])

// 各要素に適用
const { element: element6, isActive: isActive6 } = FadeInOut(
  getThreshold('element6').value,
)
</script>

<template>
  <section class="section workflow-index" id="work-flow">
    <h2
      ref="element6"
      :class="['top-sec-ttl', 'effect-fade01-none', { active: isActive6 }]"
    >
      <span class="en serif">WORK FLOW</span>
      <span class="ja serif">サービスの流れ</span>
    </h2>
    <div class="top-wf-body">
      <div class="wf-inner">
        <div class="wf-item">
          <div class="wf-img">
            <img :src="workFlowImg01" />
          </div>

          <div class="wf-text">
            <div ref="element6" :class="['up-fade', { active: isActive6 }]">
              <span class="sans">STEP1</span>
              <p class="serif">
                お店へ連絡を入れる。<br />
                捌く数をお教えください。
              </p>
            </div>
          </div>
        </div>

        <div class="wf-item">
          <div class="wf-img">
            <img :src="workFlowImg02" />
          </div>
          <div class="wf-text">
            <div ref="element6" :class="['up-fade', { active: isActive6 }]">
              <span class="sans">STEP2</span>
              <p class="serif">
                お店へ向かう。<br />
                広島市内の町中に店舗が<br class="br-sp br-tablet" />
                ございます。
              </p>
            </div>
          </div>
        </div>

        <div class="wf-item">
          <div class="wf-img">
            <img :src="workFlowImg03" />
          </div>
          <div class="wf-text">
            <div ref="element6" :class="['up-fade', { active: isActive6 }]">
              <span class="sans">STEP3</span>
              <p class="serif">
                出来上がりを受け取る。<br />
                お店で召し上がる<br class="br-sp br-tablet" />
                こともできます。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.workflow-index {
  z-index: 50;
  display: flex;
  justify-content: space-between;
  margin-top: 180px;
  background-color: var(--bg);
}

.top-wf-body {
  background-color: #ffff;
  border-radius: 50px;
}

.wf-inner {
  display: flex;
  padding: 5.08vw 4.14vw;
}

.wf-border {
  overflow: hidden;
}

.wf-border::after {
  position: relative;
  top: 0;
  left: 10%;
  display: inline-block;
  width: 80%;
  height: 2px;
  margin-top: 96px;
  content: '';
  background-color: var(--color);
}

.wf-text::before {
  position: relative;
  top: 0;
  left: 10%;
  display: inline-block;
  width: 80%;
  height: 2px;
  margin-top: 96px;
  content: '';
  background-color: var(--color);
}

.wf-item + div {
  margin-left: 60px;
}

.wf-img {
  width: 20.83vw;
  height: 20.83vw;
  box-shadow: 0 0 8px grey;
}

.wf-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wf-item span {
  margin-top: 46px;
  font-size: 3.2rem;
  font-weight: 600;
  text-align: center;
}

.wf-item p {
  margin-top: 26px;
  font-size: 2.4rem;
  font-weight: 700;
  text-align: center;
}

/* ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

/* タブレット対応：744px~1024px
============================================== */
@media screen and (min-width: 744px) and (max-width: 1024px) {
  .workflow-index {
    margin-top: 120px;
  }

  .wf-inner {
    flex-direction: column;
    padding: 0;
    margin: 40px 0;
  }

  .wf-item + div {
    margin-left: 0;
  }

  .wf-item {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: auto;
    margin: 20px 0;
  }

  .wf-item span {
    margin: 0;
    font-size: 1.8rem;
  }

  .wf-item p {
    margin-top: 20px;
    font-size: 1.8rem;
  }

  .wf-img {
    width: 40vw;
    height: auto;
  }

  .wf-border::after {
    content: none;
  }

  .wf-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 150px;
    margin-right: 20px;

    /* テキストを折り返さないため */
    white-space: nowrap;
  }

  .wf-text::before {
    content: none;
  }
}

/* ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

/* SP、スマホ対応：743px以下
============================================== */

@media screen and (max-width: 743px) {
  .workflow-index {
    margin-top: 120px;
  }

  .wf-inner {
    flex-direction: column;
    padding: 0;
    margin: 40px 0;
  }

  .wf-item + div {
    margin-left: 0;
  }

  .wf-item {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: auto;
    margin: 20px 0;
  }

  .wf-img {
    width: 40vw;
    height: auto;
  }

  .wf-item span {
    margin: 0;
    font-size: 1.8rem;
  }

  .wf-item p {
    margin-top: 8px;
    font-size: 1.35rem;
  }

  .wf-border::after {
    content: none;
  }

  .wf-text {
    width: 150px;

    /* テキストを折り返さないため */
    white-space: nowrap;
  }

  .wf-text::before {
    content: none;
  }
}
</style>
