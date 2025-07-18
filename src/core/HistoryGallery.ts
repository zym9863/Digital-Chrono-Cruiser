import * as THREE from 'three'
import { HistoryNode } from '../models/HistoryNode'
import { HistoryData } from '../data/HistoryData'

/**
 * 历史长廊
 * 负责管理3D历史展示长廊
 */
export class HistoryGallery {
  private scene: THREE.Scene
  private galleryGroup!: THREE.Group
  private historyNodes: HistoryNode[] = []
  private clickCallbacks: ((nodeData: any) => void)[] = []
  private raycaster!: THREE.Raycaster
  private mouse!: THREE.Vector2
  private isVisible = true
  private camera!: THREE.Camera

  constructor(scene: THREE.Scene) {
    this.scene = scene
    this.setupRaycaster()
  }

  /**
   * 初始化历史长廊
   */
  async init(): Promise<void> {
    this.galleryGroup = new THREE.Group()
    this.galleryGroup.name = 'HistoryGallery'
    
    await this.createGalleryStructure()
    await this.createHistoryNodes()
    this.setupInteraction()
    
    this.scene.add(this.galleryGroup)
  }

  /**
   * 设置射线检测
   */
  private setupRaycaster(): void {
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()
  }

  /**
   * 创建长廊结构
   */
  private async createGalleryStructure(): Promise<void> {
    // 创建长廊地面
    const floorGeometry = new THREE.PlaneGeometry(200, 20)
    const floorMaterial = new THREE.MeshLambertMaterial({
      color: 0x2a2a3e,
      transparent: true,
      opacity: 0.8
    })
    
    const floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.rotation.x = -Math.PI / 2
    floor.position.y = 0
    floor.receiveShadow = true
    this.galleryGroup.add(floor)

    // 创建长廊墙壁
    this.createWalls()
    
    // 创建装饰性柱子
    this.createPillars()
    
    // 创建天花板
    this.createCeiling()
  }

  /**
   * 创建墙壁
   */
  private createWalls(): void {
    const wallGeometry = new THREE.PlaneGeometry(200, 15)
    const wallMaterial = new THREE.MeshLambertMaterial({
      color: 0x1a1a2e,
      transparent: true,
      opacity: 0.6
    })

    // 左墙
    const leftWall = new THREE.Mesh(wallGeometry, wallMaterial)
    leftWall.position.set(0, 7.5, -10)
    leftWall.receiveShadow = true
    this.galleryGroup.add(leftWall)

    // 右墙
    const rightWall = new THREE.Mesh(wallGeometry, wallMaterial)
    rightWall.position.set(0, 7.5, 10)
    rightWall.receiveShadow = true
    this.galleryGroup.add(rightWall)
  }

  /**
   * 创建柱子
   */
  private createPillars(): void {
    const pillarGeometry = new THREE.CylinderGeometry(0.5, 0.8, 15, 8)
    const pillarMaterial = new THREE.MeshPhongMaterial({
      color: 0x4a4a6a,
      shininess: 30
    })

    for (let i = -8; i <= 8; i += 4) {
      // 左侧柱子
      const leftPillar = new THREE.Mesh(pillarGeometry, pillarMaterial)
      leftPillar.position.set(i * 10, 7.5, -8)
      leftPillar.castShadow = true
      this.galleryGroup.add(leftPillar)

      // 右侧柱子
      const rightPillar = new THREE.Mesh(pillarGeometry, pillarMaterial)
      rightPillar.position.set(i * 10, 7.5, 8)
      rightPillar.castShadow = true
      this.galleryGroup.add(rightPillar)
    }
  }

  /**
   * 创建天花板
   */
  private createCeiling(): void {
    const ceilingGeometry = new THREE.PlaneGeometry(200, 20)
    const ceilingMaterial = new THREE.MeshLambertMaterial({
      color: 0x0f0f1a,
      transparent: true,
      opacity: 0.4
    })
    
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial)
    ceiling.rotation.x = Math.PI / 2
    ceiling.position.y = 15
    this.galleryGroup.add(ceiling)
  }

  /**
   * 创建历史节点
   */
  private async createHistoryNodes(): Promise<void> {
    const historyData = HistoryData.getAllNodes()
    
    for (let i = 0; i < historyData.length; i++) {
      const nodeData = historyData[i]
      const position = this.calculateNodePosition(i, historyData.length)
      
      const historyNode = new HistoryNode(nodeData, position)
      await historyNode.init()
      
      this.historyNodes.push(historyNode)
      this.galleryGroup.add(historyNode.getGroup())
    }
  }

  /**
   * 计算节点位置
   */
  private calculateNodePosition(index: number, total: number): THREE.Vector3 {
    const spacing = 180 / (total - 1)
    const x = -90 + index * spacing
    const y = 3
    const z = (index % 2 === 0) ? -5 : 5 // 交替放置在左右两侧
    
    return new THREE.Vector3(x, y, z)
  }

  /**
   * 设置交互
   */
  private setupInteraction(): void {
    const canvas = document.getElementById('three-canvas')
    if (!canvas) return

    canvas.addEventListener('click', (event) => {
      this.handleClick(event)
    })

    canvas.addEventListener('mousemove', (event) => {
      this.handleMouseMove(event)
    })
  }

  /**
   * 处理点击事件
   */
  private handleClick(event: MouseEvent): void {
    if (!this.isVisible) return

    this.updateMousePosition(event)
    this.raycaster.setFromCamera(this.mouse, this.getCamera())

    const intersects = this.raycaster.intersectObjects(
      this.galleryGroup.children, true
    )

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object
      const historyNode = this.findHistoryNodeByObject(clickedObject)
      
      if (historyNode) {
        historyNode.onClick()
        this.triggerNodeClick(historyNode.getData())
      }
    }
  }

  /**
   * 处理鼠标移动事件
   */
  private handleMouseMove(event: MouseEvent): void {
    if (!this.isVisible) return

    this.updateMousePosition(event)
    this.raycaster.setFromCamera(this.mouse, this.getCamera())

    const intersects = this.raycaster.intersectObjects(
      this.galleryGroup.children, true
    )

    // 重置所有节点的悬停状态
    this.historyNodes.forEach(node => node.setHovered(false))

    if (intersects.length > 0) {
      const hoveredObject = intersects[0].object
      const historyNode = this.findHistoryNodeByObject(hoveredObject)
      
      if (historyNode) {
        historyNode.setHovered(true)
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
   * 根据3D对象找到对应的历史节点
   */
  private findHistoryNodeByObject(object: THREE.Object3D): HistoryNode | null {
    for (const node of this.historyNodes) {
      if (node.getGroup().children.includes(object) || 
          node.getGroup() === object ||
          object.parent === node.getGroup()) {
        return node
      }
    }
    return null
  }

  /**
   * 更新时间轴
   */
  updateTimeline(time: number): void {
    this.historyNodes.forEach((node, index) => {
      const nodeTime = (index / (this.historyNodes.length - 1)) * 100
      const isActive = time >= nodeTime
      const isHighlighted = Math.abs(time - nodeTime) < 5
      
      node.setActive(isActive)
      node.setHighlighted(isHighlighted)
    })
  }

  /**
   * 更新动画
   */
  update(): void {
    if (!this.isVisible) return
    
    this.historyNodes.forEach(node => {
      node.update()
    })
  }

  /**
   * 显示长廊
   */
  show(): void {
    this.isVisible = true
    this.galleryGroup.visible = true
  }

  /**
   * 隐藏长廊
   */
  hide(): void {
    this.isVisible = false
    this.galleryGroup.visible = false
  }

  /**
   * 注册节点点击回调
   */
  onNodeClick(callback: (nodeData: any) => void): void {
    this.clickCallbacks.push(callback)
  }

  /**
   * 触发节点点击事件
   */
  private triggerNodeClick(nodeData: any): void {
    this.clickCallbacks.forEach(callback => {
      callback(nodeData)
    })
  }

  /**
   * 销毁历史长廊
   */
  dispose(): void {
    this.historyNodes.forEach(node => {
      node.dispose()
    })
    this.historyNodes = []
    
    if (this.galleryGroup) {
      this.scene.remove(this.galleryGroup)
    }
    
    this.clickCallbacks = []
  }
}
