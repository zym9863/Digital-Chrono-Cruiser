import * as THREE from 'three'
import { OrbitControls } from 'three-stdlib'
import { SceneManager } from './SceneManager'
import { TimelineController } from './TimelineController'
import { UIManager } from './UIManager'
import { HistoryGallery } from './HistoryGallery'
import { ComponentEvolution } from './ComponentEvolution'

/**
 * 数位时空穿梭机主类
 * 负责整个应用的初始化和协调各个模块
 */
export class DigitalChronoCruiser {
  private canvas!: HTMLCanvasElement
  private renderer!: THREE.WebGLRenderer
  private scene!: THREE.Scene
  private camera!: THREE.PerspectiveCamera
  private controls!: OrbitControls
  
  // 核心模块
  private sceneManager!: SceneManager
  private timelineController!: TimelineController
  private uiManager!: UIManager
  private historyGallery!: HistoryGallery
  private componentEvolution!: ComponentEvolution
  
  // 应用状态
  private isInitialized = false
  private currentMode: 'gallery' | 'evolution' = 'gallery'

  // 性能监控
  private lastTime = 0
  private frameCount = 0
  private fps = 60
  
  constructor() {
    this.setupCanvas()
    this.setupRenderer()
    this.setupScene()
    this.setupCamera()
    this.setupControls()
    this.setupModules()
    this.setupEventListeners()
  }

  /**
   * 初始化应用
   */
  async init(): Promise<void> {
    try {
      // 显示加载界面
      this.showLoadingScreen()
      
      // 初始化各个模块
      await this.initializeModules()
      
      // 开始渲染循环
      this.startRenderLoop()
      
      // 隐藏加载界面
      this.hideLoadingScreen()
      
      this.isInitialized = true
      console.log('数位时空穿梭机初始化完成')
    } catch (error) {
      console.error('初始化失败:', error)
    }
  }

  /**
   * 设置画布
   */
  private setupCanvas(): void {
    this.canvas = document.getElementById('three-canvas') as HTMLCanvasElement
    if (!this.canvas) {
      throw new Error('找不到3D画布元素')
    }
  }

  /**
   * 设置渲染器
   */
  private setupRenderer(): void {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    })
    
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.2
  }

  /**
   * 设置场景
   */
  private setupScene(): void {
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x0a0a0a)
    this.scene.fog = new THREE.Fog(0x0a0a0a, 50, 200)
  }

  /**
   * 设置相机
   */
  private setupCamera(): void {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.camera.position.set(0, 10, 30)
  }

  /**
   * 设置控制器
   */
  private setupControls(): void {
    this.controls = new OrbitControls(this.camera, this.canvas)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.05
    this.controls.maxDistance = 100
    this.controls.minDistance = 5
    this.controls.maxPolarAngle = Math.PI * 0.8
  }

  /**
   * 设置模块
   */
  private setupModules(): void {
    this.sceneManager = new SceneManager(this.scene)
    this.timelineController = new TimelineController()
    this.uiManager = new UIManager()
    this.historyGallery = new HistoryGallery(this.scene)
    this.componentEvolution = new ComponentEvolution(this.scene)
  }

  /**
   * 初始化模块
   */
  private async initializeModules(): Promise<void> {
    await this.sceneManager.init()
    await this.historyGallery.init()
    await this.componentEvolution.init()

    // 设置相机引用
    this.historyGallery.setCamera(this.camera)
    this.componentEvolution.setCamera(this.camera)

    this.timelineController.init()
    this.uiManager.init()

    // 设置模块间的通信
    this.setupModuleCommunication()
  }

  /**
   * 设置模块间通信
   */
  private setupModuleCommunication(): void {
    // 时间轴变化事件
    this.timelineController.onTimeChangeCallback((time: number) => {
      if (this.currentMode === 'gallery') {
        this.historyGallery.updateTimeline(time)
      } else {
        this.componentEvolution.updateTimeline(time)
      }
    })

    // 历史节点点击事件
    this.historyGallery.onNodeClick((nodeData: any) => {
      this.uiManager.showInfoPanel(nodeData)
    })

    // 组件演进点击事件
    this.componentEvolution.onComponentClick((componentData: any) => {
      this.uiManager.showInfoPanel(componentData)
    })
  }

  /**
   * 设置事件监听器
   */
  private setupEventListeners(): void {
    // 窗口大小变化
    window.addEventListener('resize', this.onWindowResize.bind(this))
    
    // UI按钮事件
    this.setupUIEvents()
  }

  /**
   * 设置UI事件
   */
  private setupUIEvents(): void {
    // 重置相机按钮
    const resetCameraBtn = document.getElementById('reset-camera')
    resetCameraBtn?.addEventListener('click', () => {
      this.resetCamera()
    })

    // 切换模式按钮
    const toggleModeBtn = document.getElementById('toggle-mode')
    toggleModeBtn?.addEventListener('click', () => {
      this.toggleMode()
    })

    // 帮助按钮
    const helpBtn = document.getElementById('help-btn')
    helpBtn?.addEventListener('click', () => {
      this.toggleHelpPanel()
    })

    // 关闭帮助按钮
    const closeHelpBtn = document.getElementById('close-help')
    closeHelpBtn?.addEventListener('click', () => {
      this.hideHelpPanel()
    })

    // 组件选择器按钮
    this.setupComponentSelector()

    // 添加测试功能
    this.setupTestFeatures()
  }

  /**
   * 设置组件选择器
   */
  private setupComponentSelector(): void {
    const cpuBtn = document.getElementById('select-cpu')
    const memoryBtn = document.getElementById('select-memory')
    const storageBtn = document.getElementById('select-storage')

    cpuBtn?.addEventListener('click', () => {
      this.switchComponent('cpu')
      this.updateComponentButtonState('cpu')
    })

    memoryBtn?.addEventListener('click', () => {
      this.switchComponent('memory')
      this.updateComponentButtonState('memory')
    })

    storageBtn?.addEventListener('click', () => {
      this.switchComponent('storage')
      this.updateComponentButtonState('storage')
    })
  }

  /**
   * 切换组件类型
   */
  private async switchComponent(type: 'cpu' | 'memory' | 'storage'): Promise<void> {
    if (this.currentMode === 'evolution') {
      await this.componentEvolution.switchComponentType(type)
      this.uiManager.showNotification(`已切换到${this.getComponentTypeName(type)}演进视图`, 'info')
    }
  }

  /**
   * 获取组件类型名称
   */
  private getComponentTypeName(type: 'cpu' | 'memory' | 'storage'): string {
    const names = {
      cpu: '处理器',
      memory: '内存',
      storage: '存储器'
    }
    return names[type]
  }

  /**
   * 更新组件按钮状态
   */
  private updateComponentButtonState(activeType: 'cpu' | 'memory' | 'storage'): void {
    const buttons = ['select-cpu', 'select-memory', 'select-storage']
    const types = ['cpu', 'memory', 'storage']

    buttons.forEach((buttonId, index) => {
      const button = document.getElementById(buttonId)
      if (button) {
        if (types[index] === activeType) {
          button.classList.add('active')
        } else {
          button.classList.remove('active')
        }
      }
    })
  }

  /**
   * 设置测试功能
   */
  private setupTestFeatures(): void {
    // 测试信息面板
    setTimeout(() => {
      this.testInfoPanel()
    }, 3000)
  }

  /**
   * 测试信息面板
   */
  private testInfoPanel(): void {
    const testData = {
      title: '测试设备 - ENIAC',
      description: '这是一个测试信息面板的示例。ENIAC是世界上第一台通用电子数字计算机，标志着电子计算时代的开始。',
      specs: {
        '发明年份': '1946年',
        '真空管数量': '17,468个',
        '重量': '30吨',
        '占地面积': '167平方米',
        '功耗': '150千瓦',
        '计算速度': '每秒5000次加法运算'
      }
    }

    this.uiManager.showInfoPanel(testData)
    this.uiManager.showNotification('点击了历史节点！', 'info')
  }

  /**
   * 窗口大小变化处理
   */
  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  /**
   * 重置相机位置
   */
  private resetCamera(): void {
    this.camera.position.set(0, 10, 30)
    this.controls.target.set(0, 0, 0)
    this.controls.update()
  }

  /**
   * 切换模式
   */
  private toggleMode(): void {
    this.currentMode = this.currentMode === 'gallery' ? 'evolution' : 'gallery'

    if (this.currentMode === 'gallery') {
      this.historyGallery.show()
      this.componentEvolution.hide()
      this.hideComponentSelector()
    } else {
      this.historyGallery.hide()
      this.componentEvolution.show()
      this.showComponentSelector()
    }

    // 更新UI
    const toggleBtn = document.getElementById('toggle-mode')
    if (toggleBtn) {
      toggleBtn.textContent = this.currentMode === 'gallery' ? '组件演进' : '历史长廊'
    }

    // 显示切换通知
    this.uiManager.showNotification(
      `已切换到${this.currentMode === 'gallery' ? '历史长廊' : '组件演进'}模式`,
      'info'
    )
  }

  /**
   * 显示组件选择器
   */
  private showComponentSelector(): void {
    const selector = document.getElementById('component-selector')
    if (selector) {
      selector.classList.remove('hidden')
    }
  }

  /**
   * 隐藏组件选择器
   */
  private hideComponentSelector(): void {
    const selector = document.getElementById('component-selector')
    if (selector) {
      selector.classList.add('hidden')
    }
  }

  /**
   * 切换帮助面板
   */
  private toggleHelpPanel(): void {
    const helpPanel = document.getElementById('help-panel')
    if (helpPanel) {
      if (helpPanel.classList.contains('hidden')) {
        this.showHelpPanel()
      } else {
        this.hideHelpPanel()
      }
    }
  }

  /**
   * 显示帮助面板
   */
  private showHelpPanel(): void {
    const helpPanel = document.getElementById('help-panel')
    if (helpPanel) {
      helpPanel.classList.remove('hidden')
    }
  }

  /**
   * 隐藏帮助面板
   */
  private hideHelpPanel(): void {
    const helpPanel = document.getElementById('help-panel')
    if (helpPanel) {
      helpPanel.classList.add('hidden')
    }
  }

  /**
   * 开始渲染循环
   */
  private startRenderLoop(): void {
    const animate = (currentTime: number) => {
      requestAnimationFrame(animate)

      // 计算FPS
      this.updateFPS(currentTime)

      // 更新控制器
      this.controls.update()

      // 更新各个模块
      if (this.isInitialized) {
        this.sceneManager.update()
        this.historyGallery.update()
        this.componentEvolution.update()
      }

      // 渲染场景
      this.renderer.render(this.scene, this.camera)
    }

    animate(0)
  }

  /**
   * 更新FPS计算
   */
  private updateFPS(currentTime: number): void {
    this.frameCount++

    if (currentTime - this.lastTime >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime))
      this.frameCount = 0
      this.lastTime = currentTime

      // 更新FPS显示
      const fpsElement = document.getElementById('fps-value')
      if (fpsElement) {
        fpsElement.textContent = this.fps.toString()

        // 根据FPS设置颜色
        if (this.fps >= 50) {
          fpsElement.style.color = '#4caf50' // 绿色
        } else if (this.fps >= 30) {
          fpsElement.style.color = '#ff9800' // 橙色
        } else {
          fpsElement.style.color = '#f44336' // 红色
        }
      }
    }
  }

  /**
   * 显示加载界面
   */
  private showLoadingScreen(): void {
    const loadingScreen = document.getElementById('loading-screen')
    if (loadingScreen) {
      loadingScreen.classList.remove('hidden')
    }
  }

  /**
   * 隐藏加载界面
   */
  private hideLoadingScreen(): void {
    const loadingScreen = document.getElementById('loading-screen')
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.classList.add('hidden')
      }, 1000)
    }
  }

  /**
   * 销毁应用
   */
  dispose(): void {
    this.controls.dispose()
    this.renderer.dispose()
    this.sceneManager.dispose()
    this.historyGallery.dispose()
    this.componentEvolution.dispose()
  }
}
