/**
 * 画像をプリロードするためのユーティリティ関数
 * @param imageSrc 画像のURL
 * @param onProgress 読み込み進捗のコールバック
 * @returns プリロードが完了したら解決するPromise
 */
export const preloadImage = (
  imageSrc: string,
  onProgress?: (progress: number) => void
): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Viteでの画像import対策 - ブラウザ環境でのみサイズチェックを行う
    const checkImageSize = async () => {
      try {
        // ブラウザ環境かどうかを確認
        if (typeof window === 'undefined') {
          return
        }
        
        // URLがdata URLまたはViteの処理済みURLかどうかを確認
        if (imageSrc.startsWith('data:') || imageSrc.includes('blob:')) {
          console.debug('data URLまたはblob URLはサイズチェックをスキップします:', imageSrc)
          return
        }
        
        // HTTP/HTTPS URLのみサイズチェックを行う
        if (imageSrc.startsWith('http://') || imageSrc.startsWith('https://')) {
          const response = await fetch(imageSrc, { method: 'HEAD' })
          const contentLength = response.headers.get('content-length')
          
          if (contentLength) {
            const fileSizeMB = parseInt(contentLength) / (1024 * 1024)
            if (fileSizeMB > 1) {
              console.warn(`⚠️ ${imageSrc} のサイズが ${fileSizeMB.toFixed(2)}MB と大きいです。画像の圧縮やWebP/AVIF形式への変換を検討してください。`)
            }
          }
        }
      } catch (error) {
        console.debug('画像サイズの確認に失敗しました:', error)
      }
    }
    
    // 非同期で画像サイズを確認
    checkImageSize()
    
    const img = new Image()
    
    // 画像の読み込み進捗を取得
    img.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const progress = Math.round((event.loaded / event.total) * 100)
        onProgress(progress)
      }
    }
    
    // 読み込み時間が長すぎる場合のタイムアウト対策
    const timeoutId = setTimeout(() => {
      console.warn('画像の読み込みが遅いです。ネットワーク環境を確認するか、画像の圧縮を検討してください。')
    }, 3000)
    
    // 読み込み完了 - メモリリーク防止とデコード最適化
    img.onload = () => {
      clearTimeout(timeoutId)
      
      // 読み込みが完了したら、即座にメモリに保持するためのデコード操作
      if (typeof img.decode === 'function') {
        // モダンブラウザでの最適なデコード
        img.decode()
          .then(() => {
            console.debug(`${imageSrc} のデコードが完了しました。`)
            // 画像をキャッシュに保持するための追加処理
            if (typeof window !== 'undefined') {
              // キャッシュストレージに画像を保存
              try {
                const cacheKey = 'img_' + imageSrc.replace(/[^a-z0-9]/gi, '_')
                window.sessionStorage.setItem(cacheKey, 'true')
              } catch (e) {
                console.debug('セッションストレージへの保存に失敗しました:', e)
              }
            }
            resolve()
          })
          .catch((decodeError) => {
            console.warn(`画像のデコードに失敗しましたが、表示を続行します: ${imageSrc}`, decodeError)
            // デコードに失敗しても画像は表示可能な場合があるのでresolve
            resolve()
          })
      } else {
        // 古いブラウザ用のフォールバック
        console.debug(`古いブラウザのため、デコード最適化をスキップします: ${imageSrc}`)
        // 画像が表示可能かどうかを確認
        if (img.width > 0 && img.height > 0) {
          resolve()
        } else {
          reject(new Error('画像の読み込みは成功しましたが、画像データが無効です'))
        }
      }
    }
    
    // 読み込みエラー - エラーハンドリング
    img.onerror = (error) => {
      clearTimeout(timeoutId) // エラー時もタイムアウトを解除
      console.error(`画像の読み込みエラー: ${imageSrc}`, error)
      reject(error)
    }
    
    // 画像読み込みを開始 - クロスオリジンの設定
    img.crossOrigin = 'anonymous'
    
    // リソースヒントを設定して、ブラウザに優先的に読み込むよう促す
    if (typeof document !== 'undefined') {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = imageSrc
      link.crossOrigin = 'anonymous'
      link.onload = () => {
        link.remove() // リソースヒントのクリーンアップ
      }
      document.head.appendChild(link)
    }
    
    // 画像の読み込みを開始
    img.src = imageSrc
  })
}

/**
 * 複数の画像を並列にプリロードする関数
 * @param imageSrcs 画像URLの配列
 * @param onProgress 読み込み進捗のコールバック
 * @returns すべての画像のプリロードが完了したら解決するPromise
 */
export const preloadImages = (
  imageSrcs: string[],
  onProgress?: (progress: number) => void
): Promise<void[]> => {
  let loadedCount = 0
  
  return Promise.all(
    imageSrcs.map((src) =>
      preloadImage(src, () => {
        loadedCount++
        if (onProgress) {
          onProgress(Math.round((loadedCount / imageSrcs.length) * 100))
        }
      })
    )
  )
}