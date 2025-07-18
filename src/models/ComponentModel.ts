import * as THREE from 'three'
import { gsap } from 'gsap'

/**
 * 组件模型
 * 代表计算机核心组件的3D模型
 */
export class ComponentModel {
  private group!: THREE.Group
  private mainModel!: THREE.Mesh
  private detailParts: THREE.Mesh[] = []
  private glowEffect!: THREE.Mesh
  private data: any
  private position: THREE.Vector3
  
  // 状态
  private isActive = false
  private isHighlighted = false
  private isHovered = false
  private isExploded = false
  
  constructor(data: any, position: THREE.Vector3) {
    this.data = data
    this.position = position.clone()
  }

  /**
   * 初始化组件模型
   */
  async init(): Promise<void> {
    this.group = new THREE.Group()
    this.group.position.copy(this.position)
    
    await this.createMainModel()
    this.createDetailParts()
    this.createGlowEffect()
    this.setupAnimations()
  }

  /**
   * 创建主模型
   */
  private async createMainModel(): Promise<void> {
    const geometry = this.getGeometryByComponent()
    const material = this.getMaterialByComponent()
    
    this.mainModel = new THREE.Mesh(geometry, material)
    this.mainModel.castShadow = true
    this.mainModel.receiveShadow = true
    
    this.group.add(this.mainModel)
  }

  /**
   * 根据组件类型获取几何体
   */
  private getGeometryByComponent(): THREE.BufferGeometry {
    switch (this.data.type) {
      case 'cpu':
        return this.createCPUGeometry()
      case 'memory':
        return this.createMemoryGeometry()
      case 'storage':
        return this.createStorageGeometry()
      default:
        return new THREE.BoxGeometry(1, 1, 1)
    }
  }

  /**
   * 创建CPU几何体
   */
  private createCPUGeometry(): THREE.BufferGeometry {
    const size = this.getSizeByEra()
    return new THREE.BoxGeometry(size.width, size.height, size.depth)
  }

  /**
   * 创建内存几何体
   */
  private createMemoryGeometry(): THREE.BufferGeometry {
    const size = this.getSizeByEra()
    return new THREE.BoxGeometry(size.width, size.height, size.depth)
  }

  /**
   * 创建存储器几何体
   */
  private createStorageGeometry(): THREE.BufferGeometry {
    const size = this.getSizeByEra()
    
    if (this.data.era === 'modern') {
      // 现代SSD - 扁平
      return new THREE.BoxGeometry(size.width, size.height * 0.3, size.depth)
    } else if (this.data.era === 'digital') {
      // 硬盘 - 圆柱形
      return new THREE.CylinderGeometry(size.width * 0.8, size.width * 0.8, size.height, 16)
    } else {
      // 早期存储 - 方形
      return new THREE.BoxGeometry(size.width, size.height, size.depth)
    }
  }

  /**
   * 根据时代获取尺寸
   */
  private getSizeByEra(): { width: number, height: number, depth: number } {
    const sizeMap = {
      'early': { width: 3, height: 2.5, depth: 2.5 },
      'electronic': { width: 2.5, height: 2, depth: 2 },
      'transistor': { width: 2, height: 1.5, depth: 1.5 },
      'integrated': { width: 1.5, height: 1, depth: 1 },
      'digital': { width: 1.2, height: 0.8, depth: 0.8 },
      'modern': { width: 1, height: 0.5, depth: 0.8 }
    }
    
    return sizeMap[this.data.era as keyof typeof sizeMap] || sizeMap.modern
  }

  /**
   * 根据组件获取材质
   */
  private getMaterialByComponent(): THREE.Material {
    const colorMap = {
      cpu: {
        early: 0x8B4513,     // 棕色
        electronic: 0xFFD700, // 金色
        transistor: 0x708090, // 石板灰
        integrated: 0x2E8B57, // 海绿色
        digital: 0x4169E1,   // 皇家蓝
        modern: 0x9370DB     // 紫色
      },
      memory: {
        early: 0x654321,     // 深棕色
        electronic: 0xFFA500, // 橙色
        transistor: 0x696969, // 暗灰色
        integrated: 0x20B2AA, // 浅海绿色
        digital: 0x1E90FF,   // 道奇蓝
        modern: 0x8A2BE2     // 蓝紫色
      },
      storage: {
        early: 0x2F4F4F,     // 深石板灰
        electronic: 0xCD853F, // 秘鲁色
        transistor: 0x778899, // 浅石板灰
        integrated: 0x48D1CC, // 中绿松石色
        digital: 0x00CED1,   // 深青色
        modern: 0x7B68EE     // 中石板蓝
      }
    }
    
    const typeColors = colorMap[this.data.type as keyof typeof colorMap]
    const color = typeColors?.[this.data.era as keyof typeof typeColors] || 0x888888
    
    return new THREE.MeshPhongMaterial({
      color: color,
      shininess: 60,
      transparent: true,
      opacity: 0.9
    })
  }

  /**
   * 创建细节部件
   */
  private createDetailParts(): void {
    this.createComponentDetails()
  }

  /**
   * 创建组件细节
   */
  private createComponentDetails(): void {
    switch (this.data.type) {
      case 'cpu':
        this.createCPUDetails()
        break
      case 'memory':
        this.createMemoryDetails()
        break
      case 'storage':
        this.createStorageDetails()
        break
    }
  }

  /**
   * 创建CPU细节
   */
  private createCPUDetails(): void {
    const size = this.getSizeByEra()
    
    // 创建引脚或连接器
    if (this.data.era !== 'modern') {
      const pinCount = this.data.era === 'early' ? 8 : 64
      this.createPins(pinCount, size)
    }
    
    // 创建散热器（现代CPU）
    if (this.data.era === 'modern' || this.data.era === 'digital') {
      this.createHeatSink(size)
    }
  }

  /**
   * 创建内存细节
   */
  private createMemoryDetails(): void {
    const size = this.getSizeByEra()
    
    // 创建内存芯片
    this.createMemoryChips(size)
    
    // 创建连接器
    this.createConnector(size)
  }

  /**
   * 创建存储器细节
   */
  private createStorageDetails(): void {
    const size = this.getSizeByEra()
    
    if (this.data.era === 'digital') {
      // 硬盘细节
      this.createDiskDetails(size)
    } else if (this.data.era === 'modern') {
      // SSD细节
      this.createSSDDetails(size)
    }
  }

  /**
   * 创建引脚
   */
  private createPins(count: number, size: any): void {
    const pinGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 4)
    const pinMaterial = new THREE.MeshPhongMaterial({ color: 0xC0C0C0 })
    
    const pinsPerSide = Math.sqrt(count)
    const spacing = size.width / (pinsPerSide + 1)
    
    for (let i = 0; i < pinsPerSide; i++) {
      for (let j = 0; j < pinsPerSide; j++) {
        const pin = new THREE.Mesh(pinGeometry, pinMaterial)
        pin.position.set(
          -size.width / 2 + (i + 1) * spacing,
          -size.height / 2 - 0.15,
          -size.depth / 2 + (j + 1) * spacing
        )
        this.detailParts.push(pin)
        this.group.add(pin)
      }
    }
  }

  /**
   * 创建散热器
   */
  private createHeatSink(size: any): void {
    const heatSinkGeometry = new THREE.BoxGeometry(size.width * 1.2, 0.5, size.depth * 1.2)
    const heatSinkMaterial = new THREE.MeshPhongMaterial({ color: 0xC0C0C0 })
    
    const heatSink = new THREE.Mesh(heatSinkGeometry, heatSinkMaterial)
    heatSink.position.y = size.height / 2 + 0.25
    
    this.detailParts.push(heatSink)
    this.group.add(heatSink)
  }

  /**
   * 创建内存芯片
   */
  private createMemoryChips(size: any): void {
    const chipGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.2)
    const chipMaterial = new THREE.MeshPhongMaterial({ color: 0x2F2F2F })
    
    const chipCount = this.data.era === 'modern' ? 8 : 4
    const spacing = size.width / (chipCount + 1)
    
    for (let i = 0; i < chipCount; i++) {
      const chip = new THREE.Mesh(chipGeometry, chipMaterial)
      chip.position.set(
        -size.width / 2 + (i + 1) * spacing,
        size.height / 2 + 0.05,
        0
      )
      this.detailParts.push(chip)
      this.group.add(chip)
    }
  }

  /**
   * 创建连接器
   */
  private createConnector(size: any): void {
    const connectorGeometry = new THREE.BoxGeometry(size.width, 0.2, 0.1)
    const connectorMaterial = new THREE.MeshPhongMaterial({ color: 0xFFD700 })
    
    const connector = new THREE.Mesh(connectorGeometry, connectorMaterial)
    connector.position.set(0, -size.height / 2 - 0.1, size.depth / 2 + 0.05)
    
    this.detailParts.push(connector)
    this.group.add(connector)
  }

  /**
   * 创建硬盘细节
   */
  private createDiskDetails(size: any): void {
    // 创建磁盘盘片
    const diskGeometry = new THREE.CylinderGeometry(size.width * 0.7, size.width * 0.7, 0.05, 32)
    const diskMaterial = new THREE.MeshPhongMaterial({ color: 0x2F2F2F })
    
    const disk = new THREE.Mesh(diskGeometry, diskMaterial)
    this.detailParts.push(disk)
    this.group.add(disk)
  }

  /**
   * 创建SSD细节
   */
  private createSSDDetails(size: any): void {
    // 创建控制芯片
    const chipGeometry = new THREE.BoxGeometry(0.4, 0.05, 0.3)
    const chipMaterial = new THREE.MeshPhongMaterial({ color: 0x2F2F2F })
    
    const chip = new THREE.Mesh(chipGeometry, chipMaterial)
    chip.position.y = size.height / 2 + 0.025
    
    this.detailParts.push(chip)
    this.group.add(chip)
  }

  /**
   * 创建发光效果
   */
  private createGlowEffect(): void {
    const glowGeometry = this.mainModel.geometry.clone()
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0,
      side: THREE.BackSide
    })
    
    this.glowEffect = new THREE.Mesh(glowGeometry, glowMaterial)
    this.glowEffect.scale.setScalar(1.1)
    this.group.add(this.glowEffect)
  }

  /**
   * 设置动画
   */
  private setupAnimations(): void {
    // 基础旋转动画
    gsap.to(this.group.rotation, {
      y: Math.PI * 2,
      duration: 15,
      repeat: -1,
      ease: "none"
    })
  }

  /**
   * 点击处理
   */
  onClick(): void {
    this.toggleExplodedView()
  }

  /**
   * 切换爆炸视图
   */
  private toggleExplodedView(): void {
    this.isExploded = !this.isExploded
    
    if (this.isExploded) {
      this.explodeComponents()
    } else {
      this.assembleComponents()
    }
  }

  /**
   * 爆炸组件
   */
  private explodeComponents(): void {
    this.detailParts.forEach((part) => {
      const direction = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        Math.random() + 0.5,
        (Math.random() - 0.5) * 2
      ).normalize()
      
      const distance = 2 + Math.random() * 2
      const targetPosition = direction.multiplyScalar(distance)
      
      gsap.to(part.position, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        duration: 1,
        ease: "power2.out"
      })
      
      gsap.to(part.rotation, {
        x: Math.random() * Math.PI,
        y: Math.random() * Math.PI,
        z: Math.random() * Math.PI,
        duration: 1,
        ease: "power2.out"
      })
    })
  }

  /**
   * 组装组件
   */
  private assembleComponents(): void {
    this.detailParts.forEach(part => {
      gsap.to(part.position, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: "power2.out"
      })
      
      gsap.to(part.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: "power2.out"
      })
    })
  }

  /**
   * 设置激活状态
   */
  setActive(active: boolean): void {
    this.isActive = active
    
    const opacity = active ? 1 : 0.3
    gsap.to(this.mainModel.material, {
      opacity: opacity,
      duration: 0.5
    })
  }

  /**
   * 设置高亮状态
   */
  setHighlighted(highlighted: boolean): void {
    this.isHighlighted = highlighted
    
    if (highlighted) {
      gsap.to(this.glowEffect.material, {
        opacity: 0.3,
        duration: 0.3
      })
    } else {
      gsap.to(this.glowEffect.material, {
        opacity: 0,
        duration: 0.3
      })
    }
  }

  /**
   * 设置悬停状态
   */
  setHovered(hovered: boolean): void {
    this.isHovered = hovered
    
    const scale = hovered ? 1.1 : 1
    gsap.to(this.group.scale, {
      x: scale,
      y: scale,
      z: scale,
      duration: 0.2
    })
  }

  /**
   * 获取激活状态
   */
  getActive(): boolean {
    return this.isActive
  }

  /**
   * 获取高亮状态
   */
  getHighlighted(): boolean {
    return this.isHighlighted
  }

  /**
   * 获取悬停状态
   */
  getHovered(): boolean {
    return this.isHovered
  }

  /**
   * 更新动画
   */
  update(): void {
    // 这里可以添加实时更新的动画逻辑
  }

  /**
   * 获取组
   */
  getGroup(): THREE.Group {
    return this.group
  }

  /**
   * 获取数据
   */
  getData(): any {
    return this.data
  }

  /**
   * 销毁模型
   */
  dispose(): void {
    // 清理几何体和材质
    this.mainModel.geometry.dispose()
    if (Array.isArray(this.mainModel.material)) {
      this.mainModel.material.forEach(material => material.dispose())
    } else {
      this.mainModel.material.dispose()
    }
    
    this.detailParts.forEach(part => {
      part.geometry.dispose()
      if (Array.isArray(part.material)) {
        part.material.forEach(material => material.dispose())
      } else {
        part.material.dispose()
      }
    })
    
    this.glowEffect.geometry.dispose()
    if (Array.isArray(this.glowEffect.material)) {
      this.glowEffect.material.forEach(material => material.dispose())
    } else {
      this.glowEffect.material.dispose()
    }
  }
}
