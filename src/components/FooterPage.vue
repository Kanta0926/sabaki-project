<script setup lang="ts">
// 画像のインポート
import footerImg01 from '@/assets/bg/SABAK2.0.png'

import { useSmoothScroll } from '@/components/parts/useSmoothScroll'

const { smoothScroll } = useSmoothScroll()
</script>

<template>
  <footer>
    <div class="footer-inner">
      <div class="footer-img-inner">
        <div class="footer-img"></div>
      </div>
      <div class="section footer-main">
        <div class="footer-logo">
          <img :src="footerImg01" />
        </div>
        <div class="footer-nav serif">
          <div class="footer-nav-inner">
            <ul>
              <li class="footer-nav-item">
                <span class="appeal-ttl-mini">ABOUT</span>
                <a href="#about" @click="smoothScroll">SABAKIとは</a>
              </li>
              <li class="footer-nav-item">
                <span class="appeal-ttl-mini">WORK FLOW</span>
                <a href="#work-flow" @click="smoothScroll">サービスの流れ</a>
              </li>
              <li class="footer-nav-item">
                <span class="appeal-ttl-mini">PRICE</span>
                <a href="#price" @click="smoothScroll">お値段</a>
              </li>
            </ul>
            <ul>
              <li class="footer-nav-item">
                <span class="appeal-ttl-mini">SEA</span>
                <a href="#sea" @click="smoothScroll">瀬戸内海と釣り</a>
              </li>
              <li class="footer-nav-item">
                <span class="appeal-ttl-mini">FOOD SAMPLE</span>
                <a href="#food-sample" @click="smoothScroll">料理例</a>
              </li>
              <li class="footer-nav-item">
                <span class="appeal-ttl-mini">ACCESS</span>
                <a href="#access" @click="smoothScroll">アクセス</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-copyright sans">
        <p class="copyright-text">© 2023 SABAKI</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  overflow: hidden;
  background: #1a1a1a;
}

.footer-inner {
  position: relative;
  width: 100%;
  height: 100%;
}

.footer-img-inner {
  width: 100%;
  height: auto;
  min-height: 40px;
  object-fit: contain;
}

.footer-img {
  width: 100%;
  height: 500px;
  min-height: 500px;
  overflow: hidden;
  background-image: url('@/assets/bg/top-pc03.webp');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: 30% 50%;
  background-size: cover;
}

.footer-main {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 120px;
}

.h-text-inner ul:first-child {
  margin-right: 40px;
}

.footer-logo {
  width: 13.02vw;
  min-width: 200px;
  height: 13.02vw;
  min-height: 200px;
  margin: 0 120px;
}

.footer-logo img {
  width: 100%;
  height: 100%;
}

.footer-nav {
  display: flexbox;
  display: flex;
  justify-content: center;

  /* margin: 40px 140px 0; */
  margin-top: 40px;
}

.footer-nav-inner {
  display: flex;
  align-items: center;
}

.footer-nav-inner a {
  display: block;
  font-size: 3.8rem;
  font-weight: bold;
  color: #ffff;
}

.footer-nav-inner span {
  margin: 0;
}

.footer-nav-inner ul:first-child {
  margin-right: 80px;
}

.footer-nav-item:not(:last-child) {
  margin-bottom: 60px;
}

.footer-copyright {
  margin: 120px 0 50px;
}

.copyright-text {
  font-size: 1.5rem;
  color: #ffff;
  text-align: center;
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
      font-size: 1.5rem;
      line-height: 2.4;
    }
  }

  /* ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

/* タブレット対応：744px~1024px
============================================== */
  @media screen and (min-width: 744px) and (max-width: 1024px) {
    .footer-main {
      flex-direction: row;
      margin-top: 120px;
    }

    .footer-logo {
      width: 20vw;
      min-width: initial;
      height: 20vw;
      min-height: initial;
    }

    .footer-logo img {
      margin: 0 auto;
    }

    .footer-img {
      height: 46vw;
      min-height: inherit;
      background-position: 30%;
    }

    .footer-nav {
      margin: 0;
    }

    .footer-nav-inner {
      flex-direction: row;
      margin-left: 36px;
    }

    .footer-nav-inner ul:first-child {
      margin-right: 0;
      margin-right: 40px;
      margin-bottom: 0;
    }

    .footer-nav-inner a {
      font-size: 2.4rem;
    }

    .footer-text-item:not(:last-child) {
      margin-bottom: 30px;
    }
  }

  /* ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

/* SP、スマホ対応：743px以下
============================================== */

  @media screen and (max-width: 743px) {
    .footer-main {
      flex-direction: column;
      margin-top: 120px;
    }

    .footer-logo {
      width: 40vw;
      min-width: initial;
      height: 40vw;
      min-height: initial;
      margin: 0 auto 80px;
    }

    .footer-logo img {
      margin: 0 auto;
    }

    .footer-img {
      height: 80vw;
      min-height: inherit;
      background-position: 30%;
    }

    .footer-nav {
      margin: 0;
    }

    .footer-nav-inner {
      flex-direction: column;
      margin-left: 20px;
    }

    .footer-nav-inner ul:first-child {
      margin-right: 0;
      margin-bottom: 30px;
    }

    .footer-nav-inner a {
      font-size: 2.4rem;
    }

    .footer-text-item:not(:last-child) {
      margin-bottom: 30px;
    }
  }
}
</style>
