import * as THREE from 'three'
import { gsap } from 'gsap'

/**
 * 历史节点3D模型
 * 代表计算机历史上的重要节点
 */
export class HistoryNode {
  private group!: THREE.Group
  private mainModel!: THREE.Mesh
  private glowEffect!: THREE.Mesh
  private particles!: THREE.Points
  private data: any
  private position: THREE.Vector3
  
  // 状态
  private isActive = false
  private isHighlighted = false
  private isHovered = false
  private animationMixer?: THREE.AnimationMixer
  
  constructor(data: any, position: THREE.Vector3) {
    this.data = data
    this.position = position.clone()
  }

  /**
   * 初始化历史节点
   */
  async init(): Promise<void> {
    this.group = new THREE.Group()
    this.group.position.copy(this.position)
    
    await this.createMainModel()
    this.createGlowEffect()
    this.createParticleEffect()
    this.setupAnimations()
  }

  /**
   * 创建主模型
   */
  private async createMainModel(): Promise<void> {
    const geometry = this.getGeometryByType(this.data.type)
    const material = this.getMaterialByEra(this.data.era)
    
    this.mainModel = new THREE.Mesh(geometry, material)
    this.mainModel.castShadow = true
    this.mainModel.receiveShadow = true
    
    // 根据设备类型调整大小和旋转
    this.adjustModelTransform()
    
    this.group.add(this.mainModel)
  }

  /**
   * 根据类型获取几何体
   */
  private getGeometryByType(type: string): THREE.BufferGeometry {
    switch (type) {
      case 'abacus':
        return new THREE.BoxGeometry(2, 0.3, 1.5)
      case 'mechanical':
        return new THREE.CylinderGeometry(1, 1.2, 1.5, 8)
      case 'analytical':
        return new THREE.BoxGeometry(1.8, 2, 1.2)
      case 'electronic':
        return new THREE.BoxGeometry(3, 2.5, 2)
      case 'transistor':
        return new THREE.BoxGeometry(2.5, 2, 1.8)
      case 'integrated':
        return new THREE.BoxGeometry(2, 1.5, 1.5)
      case 'microprocessor':
        return new THREE.BoxGeometry(1.5, 0.3, 1.5)
      case 'personal':
        return new THREE.BoxGeometry(2, 1.8, 1.5)
      case 'internet':
        return new THREE.SphereGeometry(1.2, 16, 12)
      case 'modern':
        return new THREE.BoxGeometry(1.8, 0.2, 1.2)
      default:
        return new THREE.BoxGeometry(1, 1, 1)
    }
  }

  /**
   * 根据时代获取材质
   */
  private getMaterialByEra(era: string): THREE.Material {
    const colors = {
      ancient: 0x8B4513,    // 棕色 - 古代
      mechanical: 0x708090, // 石板灰 - 机械时代
      electronic: 0xFFD700, // 金色 - 电子时代
      digital: 0x00CED1,    // 深青色 - 数字时代
      modern: 0x9370DB      // 紫色 - 现代
    }
    
    const color = colors[era as keyof typeof colors] || 0x888888
    
    return new THREE.MeshPhongMaterial({
      color: color,
      shininess: 50,
      transparent: true,
      opacity: 0.9
    })
  }

  /**
   * 调整模型变换
   */
  private adjustModelTransform(): void {
    // 根据设备类型调整旋转和缩放
    switch (this.data.type) {
      case 'abacus':
        this.mainModel.rotation.y = Math.PI / 4
        break
      case 'mechanical':
        this.mainModel.rotation.x = Math.PI / 6
        break
      case 'internet':
        // 球体不需要特殊旋转
        break
      default:
        this.mainModel.rotation.y = Math.random() * Math.PI / 4
        break
    }
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
   * 创建粒子效果
   */
  private createParticleEffect(): void {
    const particleCount = 20
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // 在模型周围随机分布
      const radius = 2 + Math.random() * 2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.cos(phi)
      positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta)
      
      // 设置颜色
      const color = new THREE.Color()
      color.setHSL(0.6, 0.7, 0.5)
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }
    
    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    })
    
    this.particles = new THREE.Points(particleGeometry, particleMaterial)
    this.group.add(this.particles)
  }

  /**
   * 设置动画
   */
  private setupAnimations(): void {
    // 基础旋转动画
    gsap.to(this.mainModel.rotation, {
      y: this.mainModel.rotation.y + Math.PI * 2,
      duration: 20,
      repeat: -1,
      ease: "none"
    })
    
    // 浮动动画
    gsap.to(this.group.position, {
      y: this.position.y + 0.5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    })
  }

  /**
   * 点击处理
   */
  onClick(): void {
    // 点击动画
    gsap.to(this.mainModel.scale, {
      x: 1.2,
      y: 1.2,
      z: 1.2,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    })
    
    // 粒子爆发效果
    this.triggerParticleBurst()
  }

  /**
   * 触发粒子爆发
   */
  private triggerParticleBurst(): void {
    gsap.to(this.particles.material, {
      opacity: 1,
      duration: 0.3,
      onComplete: () => {
        gsap.to(this.particles.material, {
          opacity: 0,
          duration: 1,
          delay: 0.5
        })
      }
    })
  }

  /**
   * 设置激活状态
   */
  setActive(active: boolean): void {
    if (this.isActive === active) return
    
    this.isActive = active
    
    if (active) {
      gsap.to(this.mainModel.material, {
        opacity: 1,
        duration: 0.5
      })
    } else {
      gsap.to(this.mainModel.material, {
        opacity: 0.3,
        duration: 0.5
      })
    }
  }

  /**
   * 设置高亮状态
   */
  setHighlighted(highlighted: boolean): void {
    if (this.isHighlighted === highlighted) return
    
    this.isHighlighted = highlighted
    
    if (highlighted) {
      gsap.to(this.glowEffect.material, {
        opacity: 0.3,
        duration: 0.3
      })
      gsap.to(this.glowEffect.scale, {
        x: 1.3,
        y: 1.3,
        z: 1.3,
        duration: 0.3
      })
    } else {
      gsap.to(this.glowEffect.material, {
        opacity: 0,
        duration: 0.3
      })
      gsap.to(this.glowEffect.scale, {
        x: 1.1,
        y: 1.1,
        z: 1.1,
        duration: 0.3
      })
    }
  }

  /**
   * 设置悬停状态
   */
  setHovered(hovered: boolean): void {
    if (this.isHovered === hovered) return
    
    this.isHovered = hovered
    
    if (hovered) {
      gsap.to(this.mainModel.scale, {
        x: 1.1,
        y: 1.1,
        z: 1.1,
        duration: 0.2
      })
    } else {
      gsap.to(this.mainModel.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.2
      })
    }
  }

  /**
   * 更新动画
   */
  update(): void {
    if (this.animationMixer) {
      this.animationMixer.update(0.016) // 假设60fps
    }
    
    // 更新粒子旋转
    if (this.particles) {
      this.particles.rotation.y += 0.01
    }
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
   * 销毁节点
   */
  dispose(): void {
    if (this.animationMixer) {
      this.animationMixer.stopAllAction()
    }
    
    // 清理几何体和材质
    this.mainModel.geometry.dispose()
    if (Array.isArray(this.mainModel.material)) {
      this.mainModel.material.forEach(material => material.dispose())
    } else {
      this.mainModel.material.dispose()
    }
    
    this.glowEffect.geometry.dispose()
    if (Array.isArray(this.glowEffect.material)) {
      this.glowEffect.material.forEach(material => material.dispose())
    } else {
      this.glowEffect.material.dispose()
    }
    
    this.particles.geometry.dispose()
    if (Array.isArray(this.particles.material)) {
      this.particles.material.forEach(material => material.dispose())
    } else {
      this.particles.material.dispose()
    }
  }
}
