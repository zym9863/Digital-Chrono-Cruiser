import * as THREE from 'three'
import { ComponentModel } from '../models/ComponentModel'
import { ComponentData } from '../data/ComponentData'

/**
 * 核心部件演进可视化
 * 负责展示计算机核心部件的演进过程
 */
export class ComponentEvolution {
  private scene: THREE.Scene
  private evolutionGroup!: THREE.Group
  private componentModels: ComponentModel[] = []
  private clickCallbacks: ((componentData: any) => void)[] = []
  private raycaster!: THREE.Raycaster
  private mouse!: THREE.Vector2
  private isVisible = false
  private camera!: THREE.Camera

  // 当前选中的组件类型
  private currentComponentType: 'cpu' | 'memory' | 'storage' = 'cpu'

  constructor(scene: THREE.Scene) {
    this.scene = scene
    this.setupRaycaster()
  }

  /**
   * 初始化组件演进模块
   */
  async init(): Promise<void> {
    this.evolutionGroup = new THREE.Group()
    this.evolutionGroup.name = 'ComponentEvolution'
    this.evolutionGroup.visible = false
    
    await this.createEvolutionStage()
    await this.createComponentModels()
    this.setupInteraction()
    
    this.scene.add(this.evolutionGroup)
  }

  /**
   * 设置射线检测
   */
  private setupRaycaster(): void {
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()
  }

  /**
   * 创建演进舞台
   */
  private async createEvolutionStage(): Promise<void> {
    // 创建展示台
    this.createDisplayPlatforms()
    
    // 创建背景环境
    this.createBackgroundEnvironment()
    
    // 创建标签和指示器
    this.createLabelsAndIndicators()
  }

  /**
   * 创建展示台
   */
  private createDisplayPlatforms(): void {
    const platformGeometry = new THREE.CylinderGeometry(3, 3, 0.5, 16)
    const platformMaterial = new THREE.MeshPhongMaterial({
      color: 0x2a2a3e,
      shininess: 50,
      transparent: true,
      opacity: 0.8
    })

    // 创建5个展示台，代表不同时代
    for (let i = 0; i < 5; i++) {
      const platform = new THREE.Mesh(platformGeometry, platformMaterial)
      platform.position.set((i - 2) * 15, 0, 0)
      platform.castShadow = true
      platform.receiveShadow = true
      
      // 添加发光边缘
      const edgeGeometry = new THREE.RingGeometry(2.8, 3.2, 16)
      const edgeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
      })
      
      const edge = new THREE.Mesh(edgeGeometry, edgeMaterial)
      edge.rotation.x = -Math.PI / 2
      edge.position.set((i - 2) * 15, 0.26, 0)
      
      this.evolutionGroup.add(platform)
      this.evolutionGroup.add(edge)
    }
  }

  /**
   * 创建背景环境
   */
  private createBackgroundEnvironment(): void {
    // 创建网格地面
    const gridHelper = new THREE.GridHelper(100, 20, 0x00d4ff, 0x16213e)
    gridHelper.position.y = -0.5
    gridHelper.material.transparent = true
    gridHelper.material.opacity = 0.3
    this.evolutionGroup.add(gridHelper)

    // 创建背景粒子
    this.createBackgroundParticles()
  }

  /**
   * 创建背景粒子
   */
  private createBackgroundParticles(): void {
    const particleCount = 500
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      positions[i3] = (Math.random() - 0.5) * 100
      positions[i3 + 1] = Math.random() * 30
      positions[i3 + 2] = (Math.random() - 0.5) * 100
      
      const color = new THREE.Color()
      color.setHSL(0.6 + Math.random() * 0.2, 0.7, 0.5)
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }
    
    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    })
    
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    this.evolutionGroup.add(particles)
  }

  /**
   * 创建标签和指示器
   */
  private createLabelsAndIndicators(): void {
    const timeLabels = ['1940s', '1950s', '1970s', '1990s', '2020s']
    
    timeLabels.forEach((label, index) => {
      // 创建时间标签（这里简化处理，实际应该使用文本几何体或HTML标签）
      const labelGeometry = new THREE.PlaneGeometry(2, 0.5)
      const labelMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
      })
      
      const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial)
      labelMesh.position.set((index - 2) * 15, 5, -5)
      labelMesh.lookAt(0, 5, 0)
      
      this.evolutionGroup.add(labelMesh)
    })
  }

  /**
   * 创建组件模型
   */
  private async createComponentModels(): Promise<void> {
    await this.loadComponentType(this.currentComponentType)
  }

  /**
   * 加载指定类型的组件
   */
  private async loadComponentType(type: 'cpu' | 'memory' | 'storage'): Promise<void> {
    // 清除现有模型
    this.clearComponentModels()
    
    const componentData = ComponentData.getComponentsByType(type)
    
    for (let i = 0; i < componentData.length && i < 5; i++) {
      const data = componentData[i]
      const position = new THREE.Vector3((i - 2) * 15, 2, 0)
      
      const componentModel = new ComponentModel(data, position)
      await componentModel.init()
      
      this.componentModels.push(componentModel)
      this.evolutionGroup.add(componentModel.getGroup())
    }
  }

  /**
   * 清除组件模型
   */
  private clearComponentModels(): void {
    this.componentModels.forEach(model => {
      this.evolutionGroup.remove(model.getGroup())
      model.dispose()
    })
    this.componentModels = []
  }

  /**
   * 设置交互
   */
  private setupInteraction(): void {
    const canvas = document.getElementById('three-canvas')
    if (!canvas) return

    canvas.addEventListener('click', (event) => {
      if (this.isVisible) {
        this.handleClick(event)
      }
    })

    canvas.addEventListener('mousemove', (event) => {
      if (this.isVisible) {
        this.handleMouseMove(event)
      }
    })
  }

  /**
   * 处理点击事件
   */
  private handleClick(event: MouseEvent): void {
    this.updateMousePosition(event)
    this.raycaster.setFromCamera(this.mouse, this.getCamera())

    const intersects = this.raycaster.intersectObjects(
      this.evolutionGroup.children, true
    )

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object
      const componentModel = this.findComponentModelByObject(clickedObject)
      
      if (componentModel) {
        componentModel.onClick()
        this.triggerComponentClick(componentModel.getData())
      }
    }
  }

  /**
   * 处理鼠标移动事件
   */
  private handleMouseMove(event: MouseEvent): void {
    this.updateMousePosition(event)
    this.raycaster.setFromCamera(this.mouse, this.getCamera())

    const intersects = this.raycaster.intersectObjects(
      this.evolutionGroup.children, true
    )

    // 重置所有模型的悬停状态
    this.componentModels.forEach(model => model.setHovered(false))

    if (intersects.length > 0) {
      const hoveredObject = intersects[0].object
      const componentModel = this.findComponentModelByObject(hoveredObject)
      
      if (componentModel) {
        componentModel.setHovered(true)
        document.body.style.cursor = 'pointer'
      } else {
        document.body.style.cursor = 'default'
      }
    } else {
      document.body.style.cursor = 'default'
    }
  }

  /**
   * 更新鼠标位置
   */
  private updateMousePosition(event: MouseEvent): void {
    const canvas = document.getElementById('three-canvas') as HTMLCanvasElement
    const rect = canvas.getBoundingClientRect()
    
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  }

  /**
   * 设置相机引用
   */
  setCamera(camera: THREE.Camera): void {
    this.camera = camera
  }

  /**
   * 获取相机
   */
  private getCamera(): THREE.Camera {
    return this.camera
  }

  /**
   * 根据3D对象找到对应的组件模型
   */
  private findComponentModelByObject(object: THREE.Object3D): ComponentModel | null {
    for (const model of this.componentModels) {
      if (model.getGroup().children.includes(object) || 
          model.getGroup() === object ||
          object.parent === model.getGroup()) {
        return model
      }
    }
    return null
  }

  /**
   * 更新时间轴
   */
  updateTimeline(time: number): void {
    this.componentModels.forEach((model, index) => {
      const modelTime = (index / (this.componentModels.length - 1)) * 100
      const isActive = time >= modelTime
      const isHighlighted = Math.abs(time - modelTime) < 10
      
      model.setActive(isActive)
      model.setHighlighted(isHighlighted)
    })
  }

  /**
   * 切换组件类型
   */
  async switchComponentType(type: 'cpu' | 'memory' | 'storage'): Promise<void> {
    if (this.currentComponentType !== type) {
      this.currentComponentType = type
      await this.loadComponentType(type)
    }
  }

  /**
   * 更新动画
   */
  update(): void {
    if (!this.isVisible) return
    
    this.componentModels.forEach(model => {
      model.update()
    })
    
    // 更新背景粒子动画
    this.updateParticleAnimation()
  }

  /**
   * 更新粒子动画
   */
  private updateParticleAnimation(): void {
    const particles = this.evolutionGroup.children.find(
      child => child instanceof THREE.Points
    ) as THREE.Points
    
    if (particles) {
      particles.rotation.y += 0.001
    }
  }

  /**
   * 显示组件演进
   */
  show(): void {
    this.isVisible = true
    this.evolutionGroup.visible = true
  }

  /**
   * 隐藏组件演进
   */
  hide(): void {
    this.isVisible = false
    this.evolutionGroup.visible = false
  }

  /**
   * 注册组件点击回调
   */
  onComponentClick(callback: (componentData: any) => void): void {
    this.clickCallbacks.push(callback)
  }

  /**
   * 触发组件点击事件
   */
  private triggerComponentClick(componentData: any): void {
    this.clickCallbacks.forEach(callback => {
      callback(componentData)
    })
  }

  /**
   * 销毁组件演进模块
   */
  dispose(): void {
    this.clearComponentModels()
    
    if (this.evolutionGroup) {
      this.scene.remove(this.evolutionGroup)
    }
    
    this.clickCallbacks = []
  }
}
