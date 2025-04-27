<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import { useInertiaScroll } from '@/components/parts/useInertiaScroll'
const { scrollContainer } = useInertiaScroll()

// 各セクションのインポート
import LoadingAnimation from './components/LoadingAnimation.vue'
import HeaderParts from './components/HeaderParts.vue'
import TopView from './components/TopView.vue'
import ConceptSite from './components/ConceptSite.vue'

import WorkFlow from './components/WorkFlow.vue'
import PricePage from './components/PricePage.vue'
import FoodSample from './components/FoodSample.vue'
import AccessPage from './components/AccessPage.vue'
import FooterPage from './components/FooterPage.vue'

// 初回のThreeレンダリングが行われたかのフラグ
const firstRenderDone = ref(false)

// PC or SP　の判別管理
const deviceType = ref<'SP' | 'PC'>(getDeviceType())
function getDeviceType(): 'SP' | 'PC' {
  return window.innerWidth <= 1024 ? 'SP' : 'PC'
}

// 画面サイズが変わるたびに判定を更新
const updateDeviceType = () => {
  deviceType.value = getDeviceType()
}

onMounted(() => {
  deviceType.value = getDeviceType()
  console.log(deviceType.value)

  window.addEventListener('resize', updateDeviceType)
})

watch(deviceType, (newDevice, oldDevice) => {
  if (newDevice !== oldDevice) {
    console.log('デバイス変更')

    // console.log(`デバイスタイプ変更: ${oldDevice} → ${newDevice}`)
    // ✅ デバイスタイプが変わったらリロード
    location.reload()
  }
})
</script>

<template>
  <div ref="scrollContainer" class="scroll-area">
    <LoadingAnimation :firstRenderDone="firstRenderDone" />
    <HeaderParts :deviceType="deviceType" />
    <TopView
      v-model:firstRenderDone="firstRenderDone"
      :deviceType="deviceType"
    />
    <ConceptSite :deviceType="deviceType" />
    <WorkFlow :deviceType="deviceType" />
    <PricePage :deviceType="deviceType" />
    <FoodSample :deviceType="deviceType" />
    <AccessPage :deviceType="deviceType" />
    <FooterPage :deviceType="deviceType" />
  </div>
</template>

<style scoped></style>
