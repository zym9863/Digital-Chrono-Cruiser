/**
 * UI管理器
 * 负责管理用户界面的交互和状态
 */
export class UIManager {
  private infoPanel!: HTMLElement
  private infoPanelTitle!: HTMLElement
  private infoPanelDescription!: HTMLElement
  private infoPanelSpecs!: HTMLElement
  private closeInfoButton!: HTMLElement
  
  private isInfoPanelVisible = false

  constructor() {
    this.setupElements()
  }

  /**
   * 初始化UI管理器
   */
  init(): void {
    this.setupEventListeners()
    this.setupAnimations()
  }

  /**
   * 设置DOM元素
   */
  private setupElements(): void {
    this.infoPanel = document.getElementById('info-panel') as HTMLElement
    this.infoPanelTitle = document.getElementById('info-title') as HTMLElement
    this.infoPanelDescription = document.getElementById('info-description') as HTMLElement
    this.infoPanelSpecs = document.getElementById('info-specs') as HTMLElement
    this.closeInfoButton = document.getElementById('close-info') as HTMLElement
    
    console.log('UI元素查找结果:')
    console.log('infoPanel:', this.infoPanel)
    console.log('infoPanelTitle:', this.infoPanelTitle)
    console.log('infoPanelDescription:', this.infoPanelDescription)
    console.log('infoPanelSpecs:', this.infoPanelSpecs)
    console.log('closeInfoButton:', this.closeInfoButton)
    
    if (!this.infoPanel) {
      throw new Error('找不到信息面板元素 (#info-panel)')
    }
    
    if (!this.infoPanelTitle) {
      console.warn('找不到信息面板标题元素 (#info-title)')
    }
    
    if (!this.infoPanelDescription) {
      console.warn('找不到信息面板描述元素 (#info-description)')
    }
    
    if (!this.infoPanelSpecs) {
      console.warn('找不到信息面板规格元素 (#info-specs)')
    }
  }

  /**
   * 设置事件监听器
   */
  private setupEventListeners(): void {
    // 关闭信息面板
    this.closeInfoButton?.addEventListener('click', () => {
      this.hideInfoPanel()
    })

    // 点击面板外部关闭
    document.addEventListener('click', (event) => {
      if (this.isInfoPanelVisible && !this.infoPanel.contains(event.target as Node)) {
        // 检查是否点击的是3D场景中的对象
        const canvas = document.getElementById('three-canvas')
        if (canvas && canvas.contains(event.target as Node)) {
          this.hideInfoPanel()
        }
      }
    })

    // ESC键关闭面板
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        if (this.isInfoPanelVisible) {
          this.hideInfoPanel()
        }

        // 关闭帮助面板
        const helpPanel = document.getElementById('help-panel')
        if (helpPanel && !helpPanel.classList.contains('hidden')) {
          helpPanel.classList.add('hidden')
        }
      }
    })
  }

  /**
   * 设置动画
   */
  private setupAnimations(): void {
    // 为按钮添加悬停效果
    const buttons = document.querySelectorAll('button')
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        this.addButtonHoverEffect(button)
      })
      
      button.addEventListener('mouseleave', () => {
        this.removeButtonHoverEffect(button)
      })
    })
  }

  /**
   * 显示信息面板
   */
  showInfoPanel(data: any): void {
    if (!this.infoPanel) {
      console.error('信息面板元素未找到')
      return
    }

    console.log('显示信息面板:', data)

    // 更新面板内容
    this.updateInfoPanelContent(data)
    
    // 显示面板
    this.infoPanel.classList.add('active')
    this.isInfoPanelVisible = true
    
    // 添加显示动画
    this.animateInfoPanelIn()
    
    console.log('信息面板已显示')
  }

  /**
   * 隐藏信息面板
   */
  hideInfoPanel(): void {
    if (!this.infoPanel || !this.isInfoPanelVisible) return

    // 添加隐藏动画
    this.animateInfoPanelOut(() => {
      this.infoPanel.classList.remove('active')
      this.isInfoPanelVisible = false
    })
  }

  /**
   * 更新信息面板内容
   */
  private updateInfoPanelContent(data: any): void {
    console.log('更新信息面板内容:', data)
    
    if (this.infoPanelTitle) {
      this.infoPanelTitle.textContent = data.title || '未知设备'
    } else {
      console.error('找不到信息面板标题元素')
    }
    
    if (this.infoPanelDescription) {
      this.infoPanelDescription.textContent = data.description || '暂无描述信息'
    } else {
      console.error('找不到信息面板描述元素')
    }
    
    if (this.infoPanelSpecs && data.specs) {
      this.infoPanelSpecs.innerHTML = this.formatSpecs(data.specs)
    } else if (this.infoPanelSpecs) {
      this.infoPanelSpecs.innerHTML = '<p class="no-specs">暂无技术规格信息</p>'
    } else {
      console.error('找不到信息面板规格元素')
    }
  }

  /**
   * 格式化规格信息
   */
  private formatSpecs(specs: any): string {
    if (!specs || typeof specs !== 'object') {
      return '<p class="no-specs">暂无技术规格信息</p>'
    }

    let html = '<h5 style="color: var(--primary-color); margin-bottom: 10px;">技术规格</h5>'

    for (const [key, value] of Object.entries(specs)) {
      html += `
        <div class="spec-item">
          <span class="spec-label">${key}:</span>
          <span class="spec-value">${value}</span>
        </div>
      `
    }

    return html
  }

  /**
   * 信息面板进入动画
   */
  private animateInfoPanelIn(): void {
    if (!this.infoPanel) return
    
    // 重置变换
    this.infoPanel.style.transform = 'translateX(100%)'
    this.infoPanel.style.opacity = '0'
    
    // 强制重排
    this.infoPanel.offsetHeight
    
    // 应用动画
    this.infoPanel.style.transition = 'transform 0.3s ease, opacity 0.3s ease'
    this.infoPanel.style.transform = 'translateX(0)'
    this.infoPanel.style.opacity = '1'
  }

  /**
   * 信息面板退出动画
   */
  private animateInfoPanelOut(callback: () => void): void {
    if (!this.infoPanel) return
    
    this.infoPanel.style.transition = 'transform 0.3s ease, opacity 0.3s ease'
    this.infoPanel.style.transform = 'translateX(100%)'
    this.infoPanel.style.opacity = '0'
    
    setTimeout(callback, 300)
  }

  /**
   * 添加按钮悬停效果
   */
  private addButtonHoverEffect(button: Element): void {
    const htmlButton = button as HTMLElement
    htmlButton.style.transform = 'translateY(-2px) scale(1.05)'
    htmlButton.style.boxShadow = '0 8px 25px rgba(0, 212, 255, 0.4)'
  }

  /**
   * 移除按钮悬停效果
   */
  private removeButtonHoverEffect(button: Element): void {
    const htmlButton = button as HTMLElement
    htmlButton.style.transform = 'translateY(0) scale(1)'
    htmlButton.style.boxShadow = 'none'
  }

  /**
   * 显示通知消息
   */
  showNotification(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info'): void {
    const notification = document.createElement('div')
    notification.className = `notification notification-${type}`
    notification.textContent = message
    
    // 设置样式
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '15px 20px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '500',
      zIndex: '1000',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
      maxWidth: '300px',
      wordWrap: 'break-word'
    })
    
    // 设置背景色
    const colors = {
      info: '#00d4ff',
      success: '#4caf50',
      warning: '#ff9800',
      error: '#f44336'
    }
    notification.style.backgroundColor = colors[type]
    
    document.body.appendChild(notification)
    
    // 显示动画
    setTimeout(() => {
      notification.style.transform = 'translateX(0)'
    }, 100)
    
    // 自动隐藏
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)'
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }

  /**
   * 显示加载指示器
   */
  showLoadingIndicator(message: string = '加载中...'): HTMLElement {
    const loader = document.createElement('div')
    loader.className = 'loading-indicator'
    loader.innerHTML = `
      <div class="loading-spinner"></div>
      <p>${message}</p>
    `
    
    Object.assign(loader.style, {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '30px',
      borderRadius: '15px',
      textAlign: 'center',
      zIndex: '1000'
    })
    
    document.body.appendChild(loader)
    return loader
  }

  /**
   * 隐藏加载指示器
   */
  hideLoadingIndicator(loader: HTMLElement): void {
    if (loader && loader.parentNode) {
      loader.parentNode.removeChild(loader)
    }
  }

  /**
   * 更新时间轴显示
   */
  updateTimelineDisplay(timeInfo: any): void {
    const timelineLabels = document.querySelector('.timeline-labels')
    if (timelineLabels) {
      timelineLabels.innerHTML = `
        <span class="current-era">${timeInfo.current.label}</span>
        <span class="current-year">${timeInfo.current.year}</span>
        ${timeInfo.next ? `<span class="next-era">下一个: ${timeInfo.next.label}</span>` : ''}
      `
    }
  }

  /**
   * 切换全屏模式
   */
  toggleFullscreen(): void {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  /**
   * 检查是否为移动设备
   */
  isMobile(): boolean {
    return window.innerWidth <= 768
  }

  /**
   * 获取信息面板状态
   */
  isInfoPanelOpen(): boolean {
    return this.isInfoPanelVisible
  }

  /**
   * 销毁UI管理器
   */
  dispose(): void {
    // 清理事件监听器和DOM元素
    this.hideInfoPanel()
  }
}
