<div id="top"></div>

## 🔧 Technologies & Tools
<!-- シールド一覧 -->

![](https://img.shields.io/badge/UI-AdobeXD-informational?logo=figma&logoColor=white&color=2bbc8a)
![](https://img.shields.io/badge/Code-Vue-informational?style=flat&logo=vuedotjs&logoColor=white&color=2bbc8a)
![](https://img.shields.io/badge/Code-Node.js-informational?logo=nodedotjs&logoColor=white&color=2bbc8a)
![](https://img.shields.io/badge/Plugins-Swiper-informational?logo=swiper&logoColor=white&color=2bbc8a)
![](https://img.shields.io/badge/Plugins-Gsap-informational?logo=greensock&logoColor=white&color=2bbc8a)
![](https://img.shields.io/badge/Library-Three.js-informational?logo=threedotjs&logoColor=white&color=2bbc8a)
![](https://img.shields.io/badge/Editor-VScode-informational?style=flat&logo=intellijidea&logoColor=white&color=2bbc8a)
![](https://img.shields.io/badge/Tool-Photoshop-informational?style=flat&logo=affinityphoto&logoColor=white&color=2bbc8a)
![](https://img.shields.io/badge/Tool-illustrator-informational?logo=affinitydesigner&logoColor=white&color=2bbc8a)

## 目次

1. [プロジェクト](#プロジェクト)
2. [作成意図](#作成意図)
3. [プロジェクト概要](#プロジェクト概要)
4. [ディレクトリ構成](#ディレクトリ構成)
5. [今後の修正](#今後の修正)

## プロジェクト名

SABAKI-project
 - [SABAKIへのリンク](https://kancha.org/sabaki-project)

## 💡プロジェクトについて
釣りの調理サービスを想定したサイトになります。<br/>
Vueを基本としつつ、Three.jsでTOPの描画を表示してます。<br/>
その他には、GSAP、Swiperを使用しました。

## ⚡作成意図
1. Vueで構築を行う
初めてVueを使用しました。
コンポジションAPIの概念理解や、ライフサイクルフック・SPAの学習に努めました。
またbuild時は、webpackの勉強にもなりました。


3. Three.jsでの描画
Three.jsでの3Dレンダリングをしてみたく、使用しました。
TOP、トランジションを表示させるシェーダーを作成し、描画を行いました。
ただ高頻度でのレンダリングになるので、ただ画像を表示させるにはオーバースペックだったと
あとから感じました。


3. サイトのアップロード
実際にサイトを作ってみたく、サーバーにアップを行いました。
FTPでのアップロードの学習になりました。


 ## プロジェクト概要
・all<br>
スムーススクロールをJSで処理し、
ハンバーガーメニュー開閉時、スクロールが禁止するような構成になってます。<br>
フェード処理は、composableにまとめました。<br>
スクロールバーの装飾を行いましたが、最近のアップデートでChromeのスクロールバーが<br>
変わったのであまり目立たなくなりました。<br>
<br>
<br>
・トップ<br>
3枚の画像が移り変わる仕様になってます。<br>
通常のレンダリングでは重たくなってしまったので、初期表示と、移り変わるときのみに<br>
レンダリングをする仕様になってます。<br>
<br>
<br>
・About<br>
stickyでテキストが一時的に止まるような仕様にしました。<br>
円形の画像では窓をイメージしての作りました。<br>
<br>
<br>
・Concept<br>
swiperで画像が右から流れてくる構成になってます。<br>
円形の画像では、窓のような疑似パララックスを模してつくりました。<br>
<br>
<br>
・Work Flow<br>
Swiperでカルーセルのようにし、トグルで説明分が見れる構成になってます。<br>
<br>
<br>
・Access<br>
GoogleMAPを埋め込んでます。<br>

## 今後の修正
1. TOPの描画がどうしても重たいので改善
2. TOPのアスペクトがズレている気がする

<p align="right">(<a href="#top">トップへ</a>)</p>
