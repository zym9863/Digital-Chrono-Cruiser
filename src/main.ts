import './style.css'
import { DigitalChronoCruiser } from './core/DigitalChronoCruiser'

// 初始化数位时空穿梭机
console.log('开始初始化数位时空穿梭机...')

try {
  const app = new DigitalChronoCruiser()
  app.init().then(() => {
    console.log('数位时空穿梭机初始化成功！')
  }).catch((error) => {
    console.error('初始化失败:', error)
  })
} catch (error) {
  console.error('创建应用失败:', error)
}
