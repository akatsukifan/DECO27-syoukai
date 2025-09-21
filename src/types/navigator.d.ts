/**
 * Navigator APIの拡張型定義
 */

declare global {
  interface Navigator {
    connection?: {
      effectiveType: 'slow-2g' | '2g' | '3g' | '4g'
      rtt: number
      downlink: number
      saveData: boolean
    }
    deviceMemory?: number
    getBattery?: () => Promise<BatteryManager>
  }

  interface BatteryManager {
    level: number
    charging: boolean
    chargingTime: number
    dischargingTime: number
    addEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void
    removeEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void
  }
}