import * as THREE from 'three'

/**
 * 场景管理器
 * 负责管理3D场景的基础设置，包括光照、环境等
 */
export class SceneManager {
  private scene: THREE.Scene
  private lights: THREE.Light[] = []
  private environment!: THREE.Group
  
  constructor(scene: THREE.Scene) {
    this.scene = scene
  }

  /**
   * 初始化场景
   */
  async init(): Promise<void> {
    this.setupLighting()
    this.setupEnvironment()
    this.setupParticles()
  }

  /**
   * 设置光照系统
   */
  private setupLighting(): void {
    // 环境光
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3)
    this.scene.add(ambientLight)
    this.lights.push(ambientLight)

    // 主光源 - 模拟太阳光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
    directionalLight.position.set(50, 50, 50)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    directionalLight.shadow.camera.near = 0.5
    directionalLight.shadow.camera.far = 200
    directionalLight.shadow.camera.left = -50
    directionalLight.shadow.camera.right = 50
    directionalLight.shadow.camera.top = 50
    directionalLight.shadow.camera.bottom = -50
    this.scene.add(directionalLight)
    this.lights.push(directionalLight)

    // 补光 - 蓝色调
    const fillLight = new THREE.DirectionalLight(0x4080ff, 0.3)
    fillLight.position.set(-30, 20, -30)
    this.scene.add(fillLight)
    this.lights.push(fillLight)

    // 点光源 - 营造科技感
    const pointLight1 = new THREE.PointLight(0x00d4ff, 0.8, 30)
    pointLight1.position.set(20, 15, 20)
    this.scene.add(pointLight1)
    this.lights.push(pointLight1)

    const pointLight2 = new THREE.PointLight(0xff6b35, 0.6, 25)
    pointLight2.position.set(-20, 10, -15)
    this.scene.add(pointLight2)
    this.lights.push(pointLight2)

    // 聚光灯 - 突出重点区域
    const spotLight = new THREE.SpotLight(0xffd700, 1.0, 40, Math.PI / 6, 0.3)
    spotLight.position.set(0, 30, 0)
    spotLight.target.position.set(0, 0, 0)
    spotLight.castShadow = true
    this.scene.add(spotLight)
    this.scene.add(spotLight.target)
    this.lights.push(spotLight)
  }

  /**
   * 设置环境
   */
  private setupEnvironment(): void {
    this.environment = new THREE.Group()
    
    // 创建地面
    this.createGround()
    
    // 创建背景网格
    this.createBackgroundGrid()
    
    // 创建装饰性几何体
    this.createDecorations()
    
    this.scene.add(this.environment)
  }

  /**
   * 创建地面
   */
  private createGround(): void {
    const groundGeometry = new THREE.PlaneGeometry(200, 200)
    const groundMaterial = new THREE.MeshLambertMaterial({
      color: 0x1a1a2e,
      transparent: true,
      opacity: 0.8
    })
    
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -5
    ground.receiveShadow = true
    
    this.environment.add(ground)
  }

  /**
   * 创建背景网格
   */
  private createBackgroundGrid(): void {
    const gridHelper = new THREE.GridHelper(200, 50, 0x00d4ff, 0x16213e)
    gridHelper.position.y = -4.9
    gridHelper.material.transparent = true
    gridHelper.material.opacity = 0.3
    
    this.environment.add(gridHelper)
  }

  /**
   * 创建装饰性几何体
   */
  private createDecorations(): void {
    // 创建一些浮动的几何体作为装饰
    const decorations = new THREE.Group()
    
    for (let i = 0; i < 20; i++) {
      const geometry = Math.random() > 0.5 
        ? new THREE.BoxGeometry(0.5, 0.5, 0.5)
        : new THREE.SphereGeometry(0.3, 8, 6)
      
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5),
        transparent: true,
        opacity: 0.6
      })
      
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(
        (Math.random() - 0.5) * 100,
        Math.random() * 20 + 10,
        (Math.random() - 0.5) * 100
      )
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )
      
      decorations.add(mesh)
    }
    
    this.environment.add(decorations)
  }

  /**
   * 设置粒子系统
   */
  private setupParticles(): void {
    const particleCount = 1000
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // 位置
      positions[i3] = (Math.random() - 0.5) * 200
      positions[i3 + 1] = Math.random() * 50
      positions[i3 + 2] = (Math.random() - 0.5) * 200
      
      // 颜色
      const color = new THREE.Color()
      color.setHSL(Math.random() * 0.2 + 0.5, 0.7, 0.5)
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
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    })
    
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    this.scene.add(particles)
  }

  /**
   * 更新场景
   */
  update(): void {
    // 更新光照动画
    this.updateLightAnimation()
    
    // 更新装饰物动画
    this.updateDecorations()
  }

  /**
   * 更新光照动画
   */
  private updateLightAnimation(): void {
    const time = Date.now() * 0.001
    
    // 让点光源缓慢移动
    if (this.lights.length >= 4) {
      const pointLight1 = this.lights[3] as THREE.PointLight
      const pointLight2 = this.lights[4] as THREE.PointLight
      
      pointLight1.position.x = Math.sin(time * 0.5) * 20
      pointLight1.position.z = Math.cos(time * 0.5) * 20
      
      pointLight2.position.x = Math.cos(time * 0.3) * -20
      pointLight2.position.z = Math.sin(time * 0.3) * -15
    }
  }

  /**
   * 更新装饰物动画
   */
  private updateDecorations(): void {
    if (this.environment.children.length >= 3) {
      const decorations = this.environment.children[2] as THREE.Group
      const time = Date.now() * 0.001
      
      decorations.children.forEach((child, index) => {
        child.rotation.x += 0.01
        child.rotation.y += 0.005
        child.position.y += Math.sin(time + index) * 0.01
      })
    }
  }

  /**
   * 设置环境光强度
   */
  setAmbientLightIntensity(intensity: number): void {
    if (this.lights[0]) {
      this.lights[0].intensity = intensity
    }
  }

  /**
   * 设置主光源强度
   */
  setDirectionalLightIntensity(intensity: number): void {
    if (this.lights[1]) {
      this.lights[1].intensity = intensity
    }
  }

  /**
   * 销毁场景管理器
   */
  dispose(): void {
    this.lights.forEach(light => {
      this.scene.remove(light)
    })
    this.lights = []
    
    if (this.environment) {
      this.scene.remove(this.environment)
    }
  }
}
