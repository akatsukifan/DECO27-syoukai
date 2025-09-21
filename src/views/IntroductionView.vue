<template>
  <div class="introduction-page">
    <!-- ソーシャルメディアリンクコンポーネント -->
    <SocialMediaLinks />

    <!-- メインコンテンツ -->
    <div class="content-container">
      <!-- タイトルセクション -->
      <div class="title-section">
        <h1 class="main-title">DECO*27</h1>
        <p class="subtitle">音楽家・VOCALOIDプロデューサー</p>
      </div>

      <!-- 紹介セクション -->
      <div class="introduction-section">
        <div class="introduction-text-container">
          <p class="introduction-text">
            DECO*27は、日本の音楽家・VOCALOIDプロデューサーとして、2008年より活動を開始しました。
            独特のポップセンスとメロディー、リリックによって多くのファンを魅了しています。
          </p>
          <p class="introduction-text">
            初音ミクやGUMIなどのボーカロイドを使った楽曲制作から、自身のヴォーカルを披露する作品まで幅広く手がけています。
          </p>
          <p class="introduction-text">
            音楽だけでなく、アートディレクションやMV制作にも関わるなど、多岐に渡る才能を発揮しています。
          </p>
        </div>
      </div>

      <!-- 代表曲タイムラインコンポーネント -->
      <Timeline
        :title="'代表曲タイムライン'"
        :items="timelineItems"
        :on-heart-click="handleHeartClick"
        :on-item-click="handleItemClick"
      />
    </div>

    <!-- いいねモーダルコンポーネント -->
    <HeartModal
      :show-modal="showHeartModal"
      :like-count="likeCount"
      :on-close="handleModalClose"
    />

    <!-- ページナビゲーションコンポーネント -->
    <PageNavigation
      :can-go-back="true"
      :on-back-click="goToHome"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { TimelineItem } from '../types'

// コンポーネントのインポート
import SocialMediaLinks from '../components/SocialMediaLinks.vue'
import Timeline from '../components/Timeline.vue'
import HeartModal from '../components/HeartModal.vue'
import PageNavigation from '../components/PageNavigation.vue'

const router = useRouter()
const showHeartModal = ref(false)
const likeCount = ref(12543)

// タイムラインデータ
const timelineItems: TimelineItem[] = [
  {
    image: '/image/3.png',
    youtubeLink: 'https://www.youtube.com/watch?v=e1xCOsgWG0M'
  },
  {
    image: '/image/4.png',
    youtubeLink: 'https://www.youtube.com/watch?v=eSW2LVbPThw'
  },
  {
    image: '/image/5.png',
    youtubeLink: 'https://www.youtube.com/watch?v=-H2PCK7DJsQ'
  },
  {
    image: '/image/6.png',
    youtubeLink: 'https://www.youtube.com/watch?v=BI9Ue6JwJic'
  },
  {
    image: '/image/7.png',
    youtubeLink: 'https://www.youtube.com/watch?v=C-CYwNz3z8w'
  },
  {
    image: '/image/8.png',
    youtubeLink: 'https://www.youtube.com/watch?v=kbNdx0yqbZE'
  }
]

// ホームページに戻る
const goToHome = () => {
  router.push('/')
}

// ハートアイコンがクリックされたときのハンドラ
const handleHeartClick = () => {
  console.log('IntroductionView: handleHeartClick called, showHeartModal before:', showHeartModal.value)
  showHeartModal.value = true
  console.log('IntroductionView: showHeartModal after:', showHeartModal.value)
  // いいね数を増やす
  likeCount.value++
  console.log('IntroductionView: likeCount increased to:', likeCount.value)
}

// タイムラインアイテムがクリックされたときのハンドラ
const handleItemClick = (index: number) => {
  console.log(`タイムラインアイテムがクリックされました: ${index}`)
}

// モデルを閉じるときのハンドラ
const handleModalClose = () => {
  showHeartModal.value = false
}
</script>

<style>
/* スタイルはshared-styles.cssに記述されています */
@import '../assets/shared-styles.css';

/* 紹介ページ固有のスタイル */
.introduction-page {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
  background-attachment: fixed;
  background-size: 400% 400%;
  position: relative;
  overflow: hidden;
  animation: gradientBG 15s ease infinite;
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* タイトルセクション */
.title-section {
  text-align: center;
  margin-top: 5rem;
  margin-bottom: 3rem;
}

.main-title {
  font-size: 4rem;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
  background: linear-gradient(90deg, #ff69b4, #ff85c0);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
}

.subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.7);
}

/* 紹介セクション */
.introduction-section {
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 4rem;
}

.introduction-text-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(255, 105, 180, 0.15);
  border: 1px solid rgba(255, 105, 180, 0.3);
}

.introduction-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: white;
  margin-bottom: 1.5rem;
}

.introduction-text:last-child {
  margin-bottom: 0;
}

/* レスポンシブデザイン - タブレット用 */
@media (max-width: 768px) {
  .title-section {
    margin-top: 4rem;
  }

  .main-title {
    font-size: 3rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .introduction-text-container {
    padding: 1.5rem;
  }

  .introduction-text {
    font-size: 1rem;
  }
}

/* レスポンシブデザイン - モバイル用 */
@media (max-width: 480px) {
  .title-section {
    margin-top: 3rem;
  }

  .main-title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .introduction-text-container {
    padding: 1.2rem;
  }

  .introduction-text {
    font-size: 0.9rem;
  }
}
</style>
