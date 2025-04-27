<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

// THREEのインポート
import { WebGLRenderer } from 'three'
import { Scene } from 'three'
import { OrthographicCamera } from 'three'
import { TextureLoader } from 'three'
import { PlaneGeometry } from 'three'
import { ShaderMaterial } from 'three'
import { Mesh } from 'three'
import { Texture } from 'three'
import { NearestFilter } from 'three'

import { gsap } from 'gsap'

import FadeinOut from '@/components/parts/FadeinOut.vue'
import ClassInScroll from '@/components/parts/ClassInScroll.vue'

import { useScrollClass } from '@/components/parts/useScrollClass'

// PC or SPのフラグ受取
// const props = defineProps<{ deviceType: 'SP' | 'PC' }>()
// const safeDeviceType = computed(() => props.deviceType ?? 'PC')

// 画像のインポート
import topSP01 from '@/assets/bg/top-sp01.webp'
import topSP02 from '@/assets/bg/top-sp02.webp'
import topSP03 from '@/assets/bg/top-sp03.webp'

import topPC01 from '@/assets/bg/top-pc01.webp'
import topPC02 from '@/assets/bg/top-pc02.webp'
import topPC03 from '@/assets/bg/top-pc03.webp'

import topTextImg from '@/assets/deco/top-title.png'

const { active, activeClass } = useScrollClass(260, 'active')

const slider = ref<Slider | null>(null)

const firstRenderDone = ref<boolean>(false)

// 親にデータを送る関数
const emit = defineEmits<{
  (e: 'update:firstRenderDone', status: boolean): void
}>()

// 初期値をセット
class Slider {
  private scene: Scene
  private renderer: WebGLRenderer
  private camera: OrthographicCamera
  private textures: Texture[] = []
  private mat: ShaderMaterial | null = null
  private mesh: Mesh | null = null
  private vert: string
  private frag: string
  private disp: Texture | null = null
  private images: string[] = []
  private data = { current: 0, next: 1, total: 0 }
  private state = {
    // firstRenderDone: false, // 初回レンダリングの完了判定
    animating: false, // トランジションの制御
    renderFrameCount: 0, // 現在のレンダリング回数
  }
  private sliderInner: HTMLElement | null = null
  constructor() {
    this.scene = new Scene()
    this.renderer = new WebGLRenderer({ alpha: true })
    this.camera = new OrthographicCamera(0, 0, 0, 0, 1, 1000)
    this.camera.position.z = 1

    this.vert = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

    this.frag = `
      varying vec2 vUv;
      uniform sampler2D texture1;
      uniform sampler2D texture2;
      uniform sampler2D disp;
      uniform float dispPower;
      void main() {
        vec2 uv = vUv;
        vec4 disp = texture2D(disp, uv);
        vec2 dispVec = vec2(disp.r, disp.r);
        vec4 _texture1 = texture2D(texture1, uv + dispPower * dispVec);
        vec4 _texture2 = texture2D(texture2, uv - (1.0 - dispPower) * dispVec);
        gl_FragColor = mix(_texture1, _texture2, dispPower);
      }
    `

    this.init()
  }

  private setup() {
    const bp = 1024 // breakpoint for switching device types
    const width = window.innerWidth
    const canvasWidth = width // canvasWidthは再代入しないのでconstに変更
    let canvasHeight

    // デバイスの種類に応じた画像設定
    if (width > bp) {
      // PC用画像
      canvasHeight = width * 0.563
      this.images = [topPC01, topPC02, topPC03]
    } else {
      // スマホ用画像
      canvasHeight = width * 1.779
      this.images = [topSP01, topSP02, topSP03]
    }

    this.data.total = this.images.length - 1

    // canvas要素の設定
    const renderWidth = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0,
    )
    // const renderHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    const renderW = renderWidth > canvasWidth ? renderWidth : canvasWidth
    const renderH = canvasHeight

    // WebGLRendererの設定
    this.renderer = new WebGLRenderer({
      antialias: false,
    })

    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor(0xffffff, 1.0)
    this.renderer.setSize(renderW, renderH)

    // sliderInnerをquerySelectorで取得
    this.sliderInner = document.querySelector('.js-slider-inner')

    if (this.sliderInner) {
      // canvas要素を追加
      this.sliderInner.appendChild(this.renderer.domElement)

      // カメラの設定
      this.camera.left = renderW / -2
      this.camera.right = renderW / 2
      this.camera.top = renderH / 2
      this.camera.bottom = renderH / -2
      this.camera.updateProjectionMatrix()
    }
  }

  private loadTextures() {
    const loader = new TextureLoader()
    const texturePromises = this.images.map(
      img =>
        new Promise<Texture>(resolve => {
          loader.load(img, texture => {
            texture.minFilter = NearestFilter
            texture.magFilter = NearestFilter
            // texture.colorSpace = SRGBColorSpace // 色補正
            texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy() // 最大異方性フィルタ

            resolve(texture)
          })
        }),
    )

    Promise.all(texturePromises).then(textures => {
      this.textures = textures
      this.disp = loader.load(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/rock-_disp.png',
        () => {
          this.createMesh() // 画像ロード完了後にメッシュ作成
        },
      )
    })
  }

  private createMesh() {
    if (this.textures.length < 2 || !this.disp) return

    this.mat = new ShaderMaterial({
      uniforms: {
        dispPower: { value: 0.0 },
        texture1: { value: this.textures[0] },
        texture2: { value: this.textures[1] },
        disp: { value: this.disp },
      },
      transparent: true,
      vertexShader: this.vert,
      fragmentShader: this.frag,
    })

    const geometry = new PlaneGeometry(
      this.renderer.domElement?.offsetWidth,
      this.renderer.domElement?.offsetHeight,
    )
    this.mesh = new Mesh(geometry, this.mat)
    this.scene.add(this.mesh)
  }

  private transitionNext() {
    if (!this.mat || this.state.animating) return

    this.state.animating = true

    gsap.to(this.mat.uniforms.dispPower, {
      value: 1,
      duration: 2,
      ease: 'power2.inOut',
      onComplete: () => {
        if (!this.mat) return
        this.mat.uniforms.dispPower.value = 0
        this.changeTexture()
        this.state.animating = false
      },
    })
    this.render()
  }

  private nextSlide() {
    this.data.current = (this.data.current + 1) % this.images.length
    this.data.next = (this.data.current + 1) % this.images.length

    this.transitionNext()
  }

  private changeTexture() {
    if (!this.mat) return
    this.mat.uniforms.texture1.value = this.textures[this.data.current]
    this.mat.uniforms.texture2.value = this.textures[this.data.next]
  }

  private render() {
    // 初回レンダリング時は数フレーム継続して実行
    // 一回のレンダリングだけだと、テクスチャやシェーダーの初期化が遅いため表示されない
    if (!firstRenderDone.value) {
      this.renderer.render(this.scene, this.camera)

      this.state.renderFrameCount = (this.state.renderFrameCount || 0) + 1
      // console.log(this.state.renderFrameCount)

      if (this.state.renderFrameCount < 200) {
        requestAnimationFrame(() => this.render())
      } else {
        firstRenderDone.value = true // 初回レンダリング完了
      }
    }

    // トランジション中のみレンダリングを行う
    else if (this.state.animating) {
      // console.log('トランジション')

      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(() => this.render())
    }

    // this.renderer.render(this.scene, this.camera)
    // requestAnimationFrame(() => this.render())
  }

  private listeners() {
    setInterval(() => this.nextSlide(), 8000)
  }

  private init() {
    this.setup()
    this.loadTextures()
    this.render()
    this.listeners()
  }
}

onMounted(() => {
  slider.value = new Slider()

  // 初回描画が完了した際に親コンポーネントに通知
  // firstRenderDone が true になったら emit で親に通知
  watch(firstRenderDone, newVal => {
    if (newVal) {
      emit('update:firstRenderDone', true) // 親に通知
    }
  })
})

// watch(safeDeviceType, (newDevice, oldDevice) => {
//   if (newDevice !== oldDevice) {
//     console.log('デバイス変更')

//     // console.log(`デバイスタイプ変更: ${oldDevice} → ${newDevice}`)
//     // ✅ デバイスタイプが変わったらリロード
//     location.reload()
//   }
// })
</script>

<template>
  <div class="top-outer" :class="{ [activeClass]: active }">
    <div class="top">
      <div class="top-bg-inner">
        <!-- top可変画面 -->
        <div class="slider-inner js-slider-inner"></div>
        <div class="top-ttl-inner">
          <FadeinOut :src="topTextImg" class="top-text-img" alt="Image 1" />
        </div>
      </div>
    </div>
    <div id="about" class="about-inner serif">
      <div class="about-text">
        <div class="about-text-ttl">
          <span>釣りを</span><span>もっと日常へ</span>
        </div>

        <ClassInScroll
          class="about-text-body"
          initial-class="trans"
          activeClass="active"
        >
          <p>
            釣ったあとの魚を新鮮なお刺身、
            <br />
            煮付け、唐揚げにしませんか？
          </p>
          <p>
            釣り後、疲れ切った体で行う魚調理、
            <br />
            どうしても時間が掛かってしまいます。
          </p>
          <p>
            自分で釣った魚は、美味しく食べたいもの。
            <br />
            その調理代行してみませんか？
          </p>
          <p>
            料理のプロが
            <br />
            釣り後の料理をお手伝いします。
          </p>
          <p>釣りをもっと日常に。</p>
        </ClassInScroll>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

top

＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ */
.top-outer {
  height: calc(100vh + 2664px);
  padding-right: 100px;
}

.top {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  will-change: transform;

  /* レスポンシブ解除のため一旦100％ */

  /* height: 100%; */
}

.top-bg-inner {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.top::before {
  position: absolute;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  content: '';
  background-color: rgb(0 0 0 / 40%);
  opacity: 0;
  transition: opacity 1500ms linear;
  will-change: opacity;
}

.top-outer.active .top::before {
  opacity: 1;
}

.top-ttl-inner {
  position: absolute;
  top: 10%;
  left: 10%;
  z-index: 10;
  width: 12vw;
  min-width: 160px;
  height: auto;
  filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.6));
}

.logo-fix .top-txt-fix {
  opacity: 1;
}

.top-text-img {
  width: 100%;
  height: auto;
}

/* top-canvas設定 */
.slider-inner {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

/* ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

about

＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ */
.about-inner {
  position: relative;
  top: 220px;
  z-index: 10;
  width: 100%;
  height: 70%;
  color: #ffff;
  opacity: 1;
}

.about-text {
  position: sticky;
  top: 100px;
  display: flex;
  justify-content: center;
  height: 1200px;
  will-change: transform;
}

.about-text-ttl {
  position: absolute;
  top: -68px;
  text-align: center;
}

.about-text-ttl span {
  font-size: 8.4rem;
  font-weight: 600;
}

.about-text-body {
  position: absolute;
  top: 220px;
  width: auto;
  writing-mode: tb-rl;
  writing-mode: vertical-rl;
}

.about-text-body p {
  margin: 0 60px;
  font-size: 3rem;
  font-weight: 400;
  line-height: 50px;
}

/* .active {
  transition:
    all 3000ms cubic-bezier(0.07, 0.49, 0.52, 1.01),
    opacity 2400ms linear;
} */

.trans {
  opacity: 0;
  transform: translate3d(0, 40px, 0) scaleY(1.1) skew(0deg, -3deg);
  transform-origin: top right;
  will-change: transform, opacity;
}

.trans.active {
  opacity: 1;
  transform: translate3d(0, 0, 0) scaleY(1) skew(0deg, 0deg);
  transition:
    all 3000ms cubic-bezier(0.07, 0.49, 0.52, 1.01),
    opacity 2400ms linear;
}

/* ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

/* タブレット対応：744px~1024px
============================================== */
@media screen and (min-width: 744px) and (max-width: 1024px) {
  .top-outer {
    height: calc(100vh + 2664px);
    height: 400vh;
    padding-right: 0;
  }

  canvas {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 50%;
    z-index: 1;
    width: 100vw !important;
    min-width: calc(100vh * 750 / 1334) !important;
    height: 100vh !important;
    min-height: 100vh !important;
    transform: translate3d(-50%, 0, 0);
    object-fit: cover;
  }

  .top-ttl-inner {
    top: 38%;
    left: 38%;
    width: 30vw;
    min-width: 120px;
    max-width: 180px;
    filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.6));
  }

  .about-text {
    top: 50px;
  }

  .about-text-ttl {
    top: 40px;
    min-width: 163px;
  }

  .about-text-ttl span {
    font-size: 8rem;
  }

  .about-text-body {
    top: 340px;
    writing-mode: vertical-rl;
  }

  .about-text-body p {
    margin: 0 30px;
    text-align: initial;
  }
}

/* ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

/* SP、スマホ対応：743px以下
============================================== */

@media screen and (max-width: 743px) {
  .top-outer {
    height: calc(100vh + 2664px);
    height: 350vh;
    padding-right: 0;
  }

  canvas {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 50%;
    z-index: 1;
    width: 100vw !important;
    min-width: calc(100vh * 750 / 1334) !important;
    height: 100vh !important;
    min-height: 100vh !important;
    transform: translate3d(-50%, 0, 0);
    object-fit: cover;
  }

  .top-ttl-inner {
    top: 40%;
    left: 34%;
    width: 30vw;
    max-width: 160px;
    min-width: 120px;
  }

  .about-text {
    top: calc(50% - 308px);
  }

  .about-text-ttl {
    top: 0;
    min-width: 163px;
  }

  .about-text-ttl span {
    font-size: 5rem;
  }

  .about-text-body {
    top: 158px;
    writing-mode: horizontal-tb;
  }

  .about-text-body p {
    margin: 0;
    font-size: 1.8rem;
    text-align: center;
  }

  .about-text {
    height: 1000px;
  }
}
</style>
