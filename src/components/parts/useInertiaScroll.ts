import { ref, onMounted } from 'vue'

// スクロール位置なので、グローバルで管理
export const globalScrollY = ref(window.scrollY)

export function useInertiaScroll() {
  const scrollContainer = ref<HTMLElement | null>(null)
  let velocity = 0 // スクロール速度
  let isScrolling = false // スクロール中かどうか

  // マウスホイールイベントハンドラー
  const onWheel = (event: WheelEvent) => {
    // スクロール速度を計算
    velocity = event.deltaY * 0.1 // 速度を減衰する係数

    if (!isScrolling) {
      isScrolling = true
      inertiaScroll() // 慣性スクロール開始
      console.log(globalScrollY.value)
    }
  }

  // 慣性スクロール処理
  const inertiaScroll = () => {
    // ✨ スムーススクロールが実行中なら慣性スクロールを停止
    if (document.documentElement.style.scrollBehavior === 'smooth') {
      isScrolling = false
      return
    }

    if (Math.abs(velocity) < 0.1) {
      isScrolling = false
      velocity = 0
      return
    }
    console.log(globalScrollY.value)

    // 現在のスクロール位置を更新
    globalScrollY.value += velocity
    velocity *= 0.965 // 慣性の減衰率（0.95は調整可能）

    // スクロール位置の制限
    if (scrollContainer.value) {
      globalScrollY.value = Math.max(
        0,
        Math.min(
          globalScrollY.value,
          scrollContainer.value.scrollHeight - window.innerHeight,
        ),
      )

      window.scrollTo(0, globalScrollY.value)
    }

    if (Math.abs(velocity) > 0.5) {
      // ある程度速度があるときだけ実行
      requestAnimationFrame(inertiaScroll)
    } else {
      isScrolling = false
      velocity = 0
    }
  }

  // 初期化
  // **onMounted で `globalScrollY.value` を初期化**
  onMounted(() => {
    // 最上部からのクリックスクロールによって、window.scrollYが0になる
    // そのため、globalScrollYを保持する必要がある
    // globalScrollY.value = window.scrollY // **初回のスクロール位置を設定**
    // window.addEventListener('scroll', () => {
    //   globalScrollY.value = window.scrollY // **スクロール時に更新**
    // })

    console.log(globalScrollY.value)

    if (scrollContainer.value) {
      scrollContainer.value.addEventListener('wheel', onWheel, {
        passive: true,
      })
    }
  })

  // 関数外でもscrollContainerにアクセスするためreturn
  return {
    scrollContainer,
    globalScrollY,
  }
}
