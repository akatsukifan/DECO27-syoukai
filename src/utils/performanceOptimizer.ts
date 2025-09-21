/**
 * パフォーマンス最適化のためのユーティリティ関数
 */

/**
 * ユーザーのネットワーク接続の品質を検出する
 * @returns ネットワークの接続速度の推定レベル
 */
export const detectNetworkQuality = (): 'slow-2g' | '2g' | '3g' | '4g' | 'unknown' => {
  if (typeof navigator !== 'undefined' && 'connection' in navigator) {
    const nav = navigator as any
    if (nav.connection?.effectiveType) {
      return nav.connection.effectiveType as 'slow-2g' | '2g' | '3g' | '4g' | 'unknown'
    }
  }
  return 'unknown'
}

/**
 * デバイスのメモリ状態を検出する
 * @returns デバイスのメモリサイズ（GB単位の概算）
 */
export const detectMemoryStatus = (): number => {
  if (typeof navigator !== 'undefined' && 'deviceMemory' in navigator) {
    const nav = navigator as any
    return nav.deviceMemory
  }
  return 4 // デフォルト値として4GBを設定
}

/**
 * ページの読み込み速度を測定する
 * @param startTime 開始時間（performance.now()から取得したもの）
 * @returns ページの読み込みにかかった時間（ミリ秒）
 */
export const measurePageLoadTime = (startTime: number): number => {
  if (typeof performance !== 'undefined') {
    return performance.now() - startTime
  }
  return Date.now() - startTime
}

/**
 * バッテリー状態を検出する
 * @returns バッテリーレベル（0-1の範囲）またはnull（検出不能の場合）
 */
export const detectBatteryStatus = async (): Promise<number | null> => {
  if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
    try {
      const nav = navigator as any
      const battery = await nav.getBattery()
      return battery.level
    } catch (error) {
      console.debug('バッテリー状態の検出に失敗しました:', error)
    }
  }
  return null
}

/**
 * パフォーマンスのベストプラクティスに基づいて画像の最適化を行う
 * @param imageSrc 元の画像URL
 * @param options 最適化オプション
 * @returns 最適化された可能性のある画像URL
 */
export const optimizeImageUrl = (
  imageSrc: string,
  options: { width?: number; height?: number; quality?: number } = {}
): string => {
  // この関数はCDNを使用している場合の例です
  // 実際の実装では、プロジェクトの画像配信システムに合わせて調整してください
  
  const { width, height, quality = 80 } = options
  
  // 既にパラメータが含まれているかチェック
  if (imageSrc.includes('?')) {
    return imageSrc
  }
  
  // パフォーマンス最適化のためのクエリパラメータを追加する例
  // 注意: これは単なる例であり、実際のCDNの設定に合わせて変更する必要があります
  let optimizedUrl = imageSrc
  const params = new URLSearchParams()
  
  if (width) params.append('w', width.toString())
  if (height) params.append('h', height.toString())
  params.append('q', quality.toString())
  
  if (params.toString()) {
    optimizedUrl = `${imageSrc}?${params.toString()}`
  }
  
  return optimizedUrl
}