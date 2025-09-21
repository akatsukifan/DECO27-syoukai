/**
 * プロジェクト全体で使用する型定義
 */

/**
 * 画像の読み込みステータス
 */
export interface ImageLoadingStatus {
  loaded: number
  total: number
  progress: number
}

/**
 * パフォーマンスデータ
 */
export interface PerformanceData {
  loadTime: number
  networkQuality: 'slow-2g' | '2g' | '3g' | '4g' | 'unknown'
  memorySize: number
  batteryLevel: number | null
}

/**
 * アプリケーション設定
 */
export interface AppSettings {
  theme: 'light' | 'dark'
  language: 'ja' | 'en'
  animationEnabled: boolean
  highQualityImages: boolean
}

/**
 * ナビゲーションリンク
 */
export interface NavLink {
  id: string
  name: string
  path: string
  icon?: string
}

/**
 * タイムラインアイテム
 */
export interface TimelineItem {
  id?: string
  year?: string
  title?: string
  description?: string
  icon?: string
  image: string
  youtubeLink: string
}