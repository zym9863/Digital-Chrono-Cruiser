/**
 * 时间轴控制器
 * 负责管理时间轴的交互和时间变化事件
 */
export class TimelineController {
  private slider!: HTMLInputElement
  private timeLabels!: HTMLElement
  private currentTime = 0
  private timeChangeCallbacks: ((time: number) => void)[] = []
  private isAutoPlaying = false
  private autoPlaySpeed = 0.5 // 每秒移动的时间单位
  
  // 时间节点定义
  private timePoints = [
    { value: 0, label: '古代算盘', year: '公元前2700年' },
    { value: 10, label: '机械计算器', year: '1642年' },
    { value: 20, label: '差分机', year: '1822年' },
    { value: 30, label: '分析机', year: '1837年' },
    { value: 40, label: '电子管计算机', year: '1946年' },
    { value: 50, label: '晶体管计算机', year: '1947年' },
    { value: 60, label: '集成电路', year: '1958年' },
    { value: 70, label: '微处理器', year: '1971年' },
    { value: 80, label: '个人计算机', year: '1975年' },
    { value: 90, label: '互联网时代', year: '1990年' },
    { value: 100, label: '现代计算机', year: '2020年' }
  ]

  constructor() {
    this.setupElements()
  }

  /**
   * 初始化时间轴控制器
   */
  init(): void {
    this.setupEventListeners()
    this.updateTimeLabels()
    this.updateSliderBackground()
  }

  /**
   * 设置DOM元素
   */
  private setupElements(): void {
    this.slider = document.getElementById('timeline-slider') as HTMLInputElement
    this.timeLabels = document.querySelector('.timeline-labels') as HTMLElement
    
    if (!this.slider) {
      throw new Error('找不到时间轴滑块元素')
    }
    
    if (!this.timeLabels) {
      throw new Error('找不到时间轴标签元素')
    }
  }

  /**
   * 设置事件监听器
   */
  private setupEventListeners(): void {
    // 滑块值变化事件
    this.slider.addEventListener('input', (event) => {
      const target = event.target as HTMLInputElement
      this.currentTime = parseFloat(target.value)
      this.onTimeChange()
    })

    // 滑块拖拽开始
    this.slider.addEventListener('mousedown', () => {
      this.slider.classList.add('dragging')
    })

    // 滑块拖拽结束
    this.slider.addEventListener('mouseup', () => {
      this.slider.classList.remove('dragging')
    })

    // 键盘控制
    document.addEventListener('keydown', (event) => {
      this.handleKeyboardInput(event)
    })

    // 双击播放/暂停
    this.slider.addEventListener('dblclick', () => {
      this.toggleAutoPlay()
    })

    // 播放/暂停按钮
    const playPauseBtn = document.getElementById('play-pause-btn')
    playPauseBtn?.addEventListener('click', () => {
      this.toggleAutoPlay()
      this.updatePlayPauseButton()
    })

    // 重置按钮
    const resetBtn = document.getElementById('reset-timeline-btn')
    resetBtn?.addEventListener('click', () => {
      this.goToTime(0)
      this.stopAutoPlay()
      this.updatePlayPauseButton()
    })
  }

  /**
   * 处理键盘输入
   */
  private handleKeyboardInput(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ArrowLeft':
        event.preventDefault()
        this.previousTimePoint()
        break
      case 'ArrowRight':
        event.preventDefault()
        this.nextTimePoint()
        break
      case 'Home':
        event.preventDefault()
        this.goToTime(0)
        break
      case 'End':
        event.preventDefault()
        this.goToTime(100)
        break
      case 'Space':
        event.preventDefault()
        this.toggleAutoPlay()
        break
    }
  }

  /**
   * 时间变化处理
   */
  private onTimeChange(): void {
    this.updateTimeLabels()
    this.updateSliderBackground()
    
    // 触发回调函数
    this.timeChangeCallbacks.forEach(callback => {
      callback(this.currentTime)
    })
  }

  /**
   * 更新时间标签
   */
  private updateTimeLabels(): void {
    const currentPoint = this.getCurrentTimePoint()
    const nextPoint = this.getNextTimePoint()

    if (this.timeLabels) {
      this.timeLabels.innerHTML = `
        <div class="timeline-info">
          <span class="current-era">${currentPoint.label}</span>
          <span class="current-year">${currentPoint.year}</span>
        </div>
        ${nextPoint ? `<div class="next-info"><span class="next-era">下一个: ${nextPoint.label}</span></div>` : '<div class="next-info"><span class="next-era">时间轴末端</span></div>'}
      `
    }
  }

  /**
   * 更新滑块背景渐变
   */
  private updateSliderBackground(): void {
    const progress = this.currentTime / 100
    const hue1 = 15 // 橙色
    const hue2 = 195 // 蓝色
    const currentHue = hue1 + (hue2 - hue1) * progress
    
    this.slider.style.background = `linear-gradient(90deg, 
      hsl(${hue1}, 70%, 50%) 0%, 
      hsl(${currentHue}, 70%, 50%) ${progress * 100}%, 
      hsl(${hue2}, 70%, 50%) 100%)`
  }

  /**
   * 获取当前时间点
   */
  private getCurrentTimePoint() {
    let currentPoint = this.timePoints[0]
    
    for (const point of this.timePoints) {
      if (point.value <= this.currentTime) {
        currentPoint = point
      } else {
        break
      }
    }
    
    return currentPoint
  }

  /**
   * 获取下一个时间点
   */
  private getNextTimePoint() {
    for (const point of this.timePoints) {
      if (point.value > this.currentTime) {
        return point
      }
    }
    return null
  }

  /**
   * 跳转到上一个时间点
   */
  previousTimePoint(): void {
    const currentIndex = this.timePoints.findIndex(point => point.value >= this.currentTime)
    const targetIndex = Math.max(0, currentIndex - 1)
    this.goToTime(this.timePoints[targetIndex].value)
  }

  /**
   * 跳转到下一个时间点
   */
  nextTimePoint(): void {
    const currentIndex = this.timePoints.findIndex(point => point.value > this.currentTime)
    if (currentIndex !== -1 && currentIndex < this.timePoints.length) {
      this.goToTime(this.timePoints[currentIndex].value)
    }
  }

  /**
   * 跳转到指定时间
   */
  goToTime(time: number): void {
    this.currentTime = Math.max(0, Math.min(100, time))
    this.slider.value = this.currentTime.toString()
    this.onTimeChange()
  }

  /**
   * 播放时间轴动画
   */
  playTimeline(duration: number = 10000): void {
    const startTime = this.currentTime
    const endTime = 100
    const startTimestamp = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTimestamp
      const progress = Math.min(elapsed / duration, 1)
      
      // 使用缓动函数
      const easeProgress = this.easeInOutCubic(progress)
      const currentTime = startTime + (endTime - startTime) * easeProgress
      
      this.goToTime(currentTime)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    animate()
  }

  /**
   * 缓动函数
   */
  private easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  /**
   * 切换自动播放
   */
  toggleAutoPlay(): void {
    this.isAutoPlaying = !this.isAutoPlaying

    if (this.isAutoPlaying) {
      this.startAutoPlay()
    } else {
      this.stopAutoPlay()
    }

    this.updatePlayPauseButton()
  }

  /**
   * 开始自动播放
   */
  private startAutoPlay(): void {
    if (this.currentTime >= 100) {
      this.goToTime(0) // 如果已经到末尾，从头开始
    }

    const animate = () => {
      if (!this.isAutoPlaying) return

      this.currentTime += this.autoPlaySpeed

      if (this.currentTime >= 100) {
        this.currentTime = 100
        this.isAutoPlaying = false
      }

      this.slider.value = this.currentTime.toString()
      this.onTimeChange()

      if (this.isAutoPlaying) {
        setTimeout(animate, 100) // 每100ms更新一次
      }
    }

    animate()
  }

  /**
   * 停止自动播放
   */
  private stopAutoPlay(): void {
    this.isAutoPlaying = false
  }

  /**
   * 设置自动播放速度
   */
  setAutoPlaySpeed(speed: number): void {
    this.autoPlaySpeed = Math.max(0.1, Math.min(5, speed))
  }

  /**
   * 更新播放/暂停按钮
   */
  private updatePlayPauseButton(): void {
    const playPauseBtn = document.getElementById('play-pause-btn')
    if (playPauseBtn) {
      playPauseBtn.textContent = this.isAutoPlaying ? '⏸️' : '▶️'
      playPauseBtn.title = this.isAutoPlaying ? '暂停' : '播放'
    }
  }

  /**
   * 注册时间变化回调
   */
  onTimeChangeCallback(callback: (time: number) => void): void {
    this.timeChangeCallbacks.push(callback)
  }

  /**
   * 移除时间变化回调
   */
  removeTimeChangeCallback(callback: (time: number) => void): void {
    const index = this.timeChangeCallbacks.indexOf(callback)
    if (index > -1) {
      this.timeChangeCallbacks.splice(index, 1)
    }
  }

  /**
   * 获取当前时间
   */
  getCurrentTime(): number {
    return this.currentTime
  }

  /**
   * 获取时间点信息
   */
  getTimePoints() {
    return this.timePoints
  }

  /**
   * 获取当前时间点信息
   */
  getCurrentTimePointInfo() {
    return {
      current: this.getCurrentTimePoint(),
      next: this.getNextTimePoint(),
      progress: this.currentTime / 100
    }
  }

  /**
   * 销毁时间轴控制器
   */
  dispose(): void {
    this.timeChangeCallbacks = []
  }
}
