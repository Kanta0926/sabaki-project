<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { FadeInOut } from '@/components/parts/FadeInOut'
import mapPin from './icons/mapPin.vue'

// 画像のインポート
import accessPage01 from '@/assets/bg/220409-0008_TP_V.webp'

// PC or SPのフラグ受取
const props = defineProps<{ deviceType: 'SP' | 'PC' }>()
const safeDeviceType = computed(() => props.deviceType ?? 'PC')

// elementごとに SP / PC で異なる threshold を定義
const thresholdMap = {
  element9: { SP: -100, PC: 200 },
}

// deviceType に応じて threshold を取得する関数
const getThreshold = (elementKey: keyof typeof thresholdMap) =>
  computed(() => thresholdMap[elementKey][safeDeviceType.value])

// 各要素に適用
const { element: element3, isActive: isActive3 } = FadeInOut(
  getThreshold('element9').value,
)

onMounted(() => {
  // document.addEventListener('touchstart', function () {}, { passive: true })
})
</script>

<template>
  <div class="sec-outer-white" id="access">
    <section class="section map-index">
      <h2 class="top-sec-ttl effect-fade01-none">
        <span class="en serif">ACCESS</span>
        <span class="ja serif">アクセス</span>
      </h2>
      <div class="top-sec-body">
        <div class="map-text-inner">
          <div ref="element3" :class="['up-fade', { active: isActive3 }]">
            <span class="appeal-ttl-mini">昔ながらの居酒屋</span>
            <h3 class="appeal-ttl">
              <span>尾虎</span>
            </h3>
          </div>

          <div
            ref="element3"
            :class="['map-text', 'up-fade', { active: isActive3 }]"
          >
            <p class="map-text-pc">
              〒733-0333<br />
              広島市中区八丁堀31-48<br />
              TEL 090-9730-2884<br />
              OPEN 9:00/CLOSE 23:00
            </p>
            <p class="map-text-sp">
              〒733-0333<br />
              広島市中区<br />
              八丁堀31-48<br />
              TEL 090-9730-2884<br />
              OPEN 9:00<br />
              CLOSE 23:00
            </p>
          </div>
          <div class="map-btn-inner">
            <a href="https://goo.gl/maps/4hpx62YDBFU2yt1Q9" class="map-btn">
              <mapPin class="map-pin" />
              <span class="map-text-pc serif">Google mapで経路を見る</span>
              <span class="map-text-sp serif">Google map</span>
            </a>
          </div>
        </div>
        <div>
          <ul class="map-image-flex">
            <li class="gmap">
              <!-- <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3292.23197386877!2d132.4630278!3d34.395449299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x355aa2062cb8140d%3A0xee37d05e8cb007fc!2z5bGF6YWS5bGLIOWFpeiInw!5e0!3m2!1sja!2sjp!4v1743206676860!5m2!1sja!2sjp"
                width="600"
                height="450"
                style="border: 0"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe> -->
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3291.9447582480943!2d132.45653057478748!3d34.40274999914317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x355a98a6eaf7e7c3%3A0xf57be92cb5339632!2z5bqD5bO25Z-O!5e0!3m2!1sja!2sjp!4v1743577063916!5m2!1sja!2sjp"
                width="600"
                height="450"
                style="border: 0"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </li>
            <li class="shop-img-inner">
              <img :src="accessPage01" />
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.sec-outer-white {
  padding-top: 100px;
  padding-bottom: 100px;
  margin-top: 120px;
  background: #ffff;
}

.sec-outer-white .section {
  background: #ffff;
}

.map-index {
  display: flex;
  justify-content: space-between;
  margin-top: 180px;
}

.map-text-inner {
  text-align: center;
}

.map-text {
  margin-bottom: 73.8px;
}

.map-text p {
  font-size: 3.8rem;
  font-weight: 800;
  line-height: 1.44;
}

.map-text-pc {
  display: block;
}

.map-text-sp {
  display: none;
}

.map-btn-inner {
  display: flex;
  justify-content: center;
  margin-bottom: 73.8px;
}

.map-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 21.5px;
  margin: 0 auto;
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffff;
  background-color: var(--color);
  border: 0.2rem solid var(--color);
  border-radius: 50vh;
  transition: all 0.5s;
}

.map-btn:hover {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color);
  background-color: #ffff;
}

.map-btn span {
  margin-right: 5px;
  font-size: 2.8rem;
}

.map-pin {
  width: 27px;
  height: 33px;
  margin-right: 10px;
  fill: #ffff;
}

.map-btn:hover .map-pin {
  fill: var(--color);
}

.map-image-flex {
  display: flex;
  justify-content: space-between;
}

.gmap {
  position: relative;
  width: 45%;
  height: 470px;
}

.gmap iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 8px grey;
}

.shop-img-inner {
  position: relative;
  width: 45%;
  height: 470px;
}

.shop-img-inner img {
  width: 100%;
  height: 100%;
  box-shadow: 0 0 8px grey;
  object-fit: cover;
}

/* ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

/* タブレット対応：744px~1024px
============================================== */
@media screen and (min-width: 744px) and (max-width: 1024px) {
  .top-sec-ttl {
    margin: 0 auto;
    margin-bottom: 4vh;
    align-items: center;
    padding-top: 8vh;
  }

  .sec-outer-white {
    padding-top: 0;
    padding-bottom: 100px;
    margin-top: 40px;
    background: #ffff;
  }

  .map-image-flex {
    flex-direction: column;
  }

  .map-index {
    margin-top: 80px;
  }

  .map-image-flex {
    flex-direction: row;
  }

  .map-btn {
    /* align-items: start; */
  }

  .map-btn span {
    font-size: 2.4rem;
  }

  .map-pin {
    width: 3vw;
    height: 3vh;
  }

  .map-text p {
    font-size: 2.4rem;
    line-height: 1.8;
  }

  .map-text-pc {
    display: none;
  }

  .map-text-sp {
    display: block;
  }

  .gmap {
    width: 45%;
    height: 38vw;
    min-height: initial;
    max-height: 413px;
    margin-bottom: 73.8px;
  }

  .shop-img-inner {
    width: 45%;
    height: 38vw;
  }
}

/* ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

/* SP、スマホ対応：743px以下
============================================== */

@media screen and (max-width: 743px) {
  .top-sec-ttl {
    padding-top: 4vh;
    margin: 0 auto;
    margin-bottom: 4vh;
    align-items: center;
  }

  .sec-outer-white {
    padding-top: 0;
    padding-bottom: 100px;
    margin-top: 40px;
    background: #ffff;
  }

  .map-image-flex {
    flex-direction: column;
  }

  .map-index {
    margin-top: 80px;
  }

  .map-text p {
    font-size: 2.4rem;
    line-height: 1.8;
  }

  .map-text-pc {
    display: none;
  }

  .map-text-sp {
    display: block;
  }

  .map-btn span {
    font-size: 2rem;
  }

  .map-pin {
    width: 6vw;
    height: 4vh;
  }

  .map-btn {
    align-items: start;
  }

  .gmap {
    width: 100%;
    height: 90vw;
    min-height: initial;
    max-height: 413px;
    margin-bottom: 73.8px;
  }

  .shop-img-inner {
    width: 100%;
    height: 90vw;
  }
}
</style>
