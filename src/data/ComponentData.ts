/**
 * 计算机组件演进数据
 * 包含CPU、内存、存储器等核心组件的演进历史
 */
export class ComponentData {
  private static components = {
    cpu: [
      {
        id: 'vacuum-tube-cpu',
        name: '真空管处理器',
        era: 'early',
        year: '1946',
        type: 'cpu',
        description: '使用真空管技术的早期处理器，体积庞大但开创了电子计算的先河。',
        specs: {
          '技术': '真空管',
          '时钟频率': '100 Hz',
          '功耗': '150 kW',
          '体积': '房间大小',
          '可靠性': '低（真空管易损坏）'
        },
        advantages: ['开创电子计算', '比机械计算快1000倍'],
        disadvantages: ['体积巨大', '功耗极高', '可靠性差', '维护困难'],
        impact: '证明了电子技术在计算领域的可行性'
      },
      {
        id: 'transistor-cpu',
        name: '晶体管处理器',
        era: 'transistor',
        year: '1955',
        type: 'cpu',
        description: '使用晶体管技术的第二代处理器，大幅提高了可靠性并减少了体积。',
        specs: {
          '技术': '晶体管',
          '时钟频率': '1 MHz',
          '功耗': '1 kW',
          '体积': '柜子大小',
          '可靠性': '中等'
        },
        advantages: ['体积大幅缩小', '功耗显著降低', '可靠性提高', '维护简化'],
        disadvantages: ['仍然昂贵', '体积较大', '集成度低'],
        impact: '为计算机小型化奠定了基础'
      },
      {
        id: 'ic-cpu',
        name: '集成电路处理器',
        era: 'integrated',
        year: '1965',
        type: 'cpu',
        description: '使用集成电路技术的第三代处理器，将多个晶体管集成在单一芯片上。',
        specs: {
          '技术': '小规模集成电路',
          '时钟频率': '10 MHz',
          '功耗': '100 W',
          '体积': '桌面大小',
          '集成度': '数百个晶体管'
        },
        advantages: ['集成度提高', '成本降低', '性能提升', '体积进一步缩小'],
        disadvantages: ['制造工艺复杂', '设计难度增加'],
        impact: '推动了计算机的商业化普及'
      },
      {
        id: 'microprocessor',
        name: '微处理器',
        era: 'digital',
        year: '1971',
        type: 'cpu',
        description: 'Intel 4004等微处理器将整个CPU集成在单一芯片上，开启了个人计算时代。',
        specs: {
          '技术': '大规模集成电路',
          '时钟频率': '740 KHz - 5 MHz',
          '功耗': '1 W',
          '体积': '指甲大小',
          '集成度': '数千个晶体管'
        },
        advantages: ['高度集成', '成本极低', '功耗很低', '体积极小'],
        disadvantages: ['性能相对有限', '功能单一'],
        impact: '使个人计算机成为可能'
      },
      {
        id: 'modern-cpu',
        name: '现代多核处理器',
        era: 'modern',
        year: '2020',
        type: 'cpu',
        description: '现代多核处理器集成了数十亿个晶体管，支持并行计算和AI加速。',
        specs: {
          '技术': '5nm制程工艺',
          '时钟频率': '3-5 GHz',
          '功耗': '65-125 W',
          '体积': '硬币大小',
          '集成度': '数百亿个晶体管'
        },
        advantages: ['性能极强', '多核并行', 'AI加速', '能效比高'],
        disadvantages: ['设计复杂', '制造成本高', '散热要求高'],
        impact: '推动人工智能和高性能计算的发展'
      }
    ],
    memory: [
      {
        id: 'drum-memory',
        name: '磁鼓存储器',
        era: 'early',
        year: '1946',
        type: 'memory',
        description: '早期的主存储器，使用旋转磁鼓存储数据，访问速度相对较慢。',
        specs: {
          '技术': '磁性存储',
          '容量': '1-10 KB',
          '访问时间': '10-20 ms',
          '体积': '洗衣机大小',
          '可靠性': '中等'
        },
        advantages: ['非易失性存储', '容量相对较大'],
        disadvantages: ['访问速度慢', '体积庞大', '机械部件易损'],
        impact: '为早期计算机提供了主要的存储解决方案'
      },
      {
        id: 'core-memory',
        name: '磁芯存储器',
        era: 'transistor',
        year: '1955',
        type: 'memory',
        description: '使用磁芯技术的主存储器，具有非易失性和相对快速的访问速度。',
        specs: {
          '技术': '磁芯',
          '容量': '4-64 KB',
          '访问时间': '1-6 μs',
          '体积': '书本大小',
          '可靠性': '高'
        },
        advantages: ['非易失性', '访问速度快', '可靠性高'],
        disadvantages: ['制造复杂', '成本高', '容量有限'],
        impact: '成为第二代计算机的标准主存储器'
      },
      {
        id: 'semiconductor-memory',
        name: '半导体存储器',
        era: 'integrated',
        year: '1970',
        type: 'memory',
        description: '使用半导体技术的RAM，访问速度快但需要持续供电保持数据。',
        specs: {
          '技术': '半导体',
          '容量': '1-256 KB',
          '访问时间': '100-500 ns',
          '体积': '芯片大小',
          '可靠性': '高'
        },
        advantages: ['访问速度极快', '体积小', '功耗低'],
        disadvantages: ['易失性存储', '成本较高'],
        impact: '成为现代计算机主存储器的基础'
      },
      {
        id: 'dram',
        name: '动态随机存储器',
        era: 'digital',
        year: '1980',
        type: 'memory',
        description: 'DRAM技术大幅提高了存储密度，成为个人计算机的标准内存。',
        specs: {
          '技术': 'DRAM',
          '容量': '64 KB - 16 MB',
          '访问时间': '60-120 ns',
          '体积': '芯片大小',
          '刷新': '需要定期刷新'
        },
        advantages: ['高存储密度', '成本低', '容量大'],
        disadvantages: ['需要刷新', '功耗相对较高'],
        impact: '使大容量内存成为可能，推动了软件的发展'
      },
      {
        id: 'modern-memory',
        name: '现代高速内存',
        era: 'modern',
        year: '2020',
        type: 'memory',
        description: '现代DDR4/DDR5内存具有极高的带宽和容量，支持高性能计算需求。',
        specs: {
          '技术': 'DDR4/DDR5',
          '容量': '8-128 GB',
          '访问时间': '10-15 ns',
          '带宽': '25-50 GB/s',
          '功耗': '1.2V低电压'
        },
        advantages: ['超高带宽', '大容量', '低功耗', '高可靠性'],
        disadvantages: ['成本较高', '对时序要求严格'],
        impact: '支持现代高性能计算和大数据处理'
      }
    ],
    storage: [
      {
        id: 'punch-card',
        name: '打孔卡片',
        era: 'early',
        year: '1890',
        type: 'storage',
        description: '最早的数据存储介质之一，通过在卡片上打孔来存储信息。',
        specs: {
          '技术': '机械打孔',
          '容量': '80-960 字符/卡',
          '读取速度': '100-2000 卡/分钟',
          '体积': '卡片大小',
          '耐久性': '中等'
        },
        advantages: ['成本低', '易于处理', '可视化'],
        disadvantages: ['容量极小', '易损坏', '处理速度慢'],
        impact: '为早期数据处理和程序存储提供了解决方案'
      },
      {
        id: 'magnetic-tape',
        name: '磁带存储',
        era: 'electronic',
        year: '1951',
        type: 'storage',
        description: '使用磁带技术的大容量存储设备，主要用于数据备份和归档。',
        specs: {
          '技术': '磁性存储',
          '容量': '1-100 MB',
          '传输速度': '10-200 KB/s',
          '体积': '盒式磁带',
          '寿命': '10-30年'
        },
        advantages: ['大容量', '成本低', '长期保存'],
        disadvantages: ['顺序访问', '速度慢', '机械部件'],
        impact: '为大型机提供了主要的外部存储解决方案'
      },
      {
        id: 'hard-disk',
        name: '硬盘驱动器',
        era: 'digital',
        year: '1956',
        type: 'storage',
        description: 'IBM发明的硬盘驱动器提供了随机访问的大容量存储，革命性地改变了数据存储。',
        specs: {
          '技术': '磁性存储',
          '容量': '5 MB - 10 TB',
          '转速': '3600-15000 RPM',
          '访问时间': '3-15 ms',
          '接口': 'SATA/SAS'
        },
        advantages: ['随机访问', '大容量', '成本效益好'],
        disadvantages: ['机械部件', '功耗较高', '噪音'],
        impact: '成为个人计算机和服务器的主要存储设备'
      },
      {
        id: 'optical-storage',
        name: '光学存储',
        era: 'digital',
        year: '1982',
        type: 'storage',
        description: 'CD、DVD等光学存储技术提供了便携式的大容量存储解决方案。',
        specs: {
          '技术': '激光光学',
          '容量': '650 MB - 50 GB',
          '读取速度': '150 KB/s - 10 MB/s',
          '体积': '光盘大小',
          '寿命': '10-100年'
        },
        advantages: ['便携性好', '成本低', '标准化'],
        disadvantages: ['容量有限', '写入速度慢', '易划伤'],
        impact: '推动了多媒体内容的分发和存储'
      },
      {
        id: 'ssd',
        name: '固态硬盘',
        era: 'modern',
        year: '2007',
        type: 'storage',
        description: '使用闪存技术的固态存储设备，具有极快的访问速度和高可靠性。',
        specs: {
          '技术': 'NAND闪存',
          '容量': '128 GB - 8 TB',
          '读取速度': '500-7000 MB/s',
          '访问时间': '0.1 ms',
          '接口': 'SATA/NVMe'
        },
        advantages: ['极快速度', '无机械部件', '低功耗', '高可靠性'],
        disadvantages: ['成本较高', '写入寿命有限'],
        impact: '大幅提升了计算机的整体性能和响应速度'
      }
    ]
  }

  /**
   * 获取所有组件
   */
  static getAllComponents() {
    return this.components
  }

  /**
   * 根据类型获取组件
   */
  static getComponentsByType(type: 'cpu' | 'memory' | 'storage') {
    return this.components[type] || []
  }

  /**
   * 根据ID获取组件
   */
  static getComponentById(id: string) {
    for (const type of Object.keys(this.components)) {
      const component = this.components[type as keyof typeof this.components]
        .find((comp: any) => comp.id === id)
      if (component) return component
    }
    return null
  }

  /**
   * 根据时代获取组件
   */
  static getComponentsByEra(era: string) {
    const result: any[] = []
    for (const type of Object.keys(this.components)) {
      const components = this.components[type as keyof typeof this.components]
        .filter((comp: any) => comp.era === era)
      result.push(...components)
    }
    return result
  }

  /**
   * 获取组件类型列表
   */
  static getComponentTypes() {
    return Object.keys(this.components)
  }

  /**
   * 获取时代列表
   */
  static getEras() {
    const eras = new Set<string>()
    for (const type of Object.keys(this.components)) {
      this.components[type as keyof typeof this.components]
        .forEach((comp: any) => eras.add(comp.era))
    }
    return Array.from(eras)
  }

  /**
   * 比较两个组件
   */
  static compareComponents(id1: string, id2: string) {
    const comp1 = this.getComponentById(id1)
    const comp2 = this.getComponentById(id2)
    
    if (!comp1 || !comp2) return null
    
    return {
      component1: comp1,
      component2: comp2,
      comparison: {
        performance: this.comparePerformance(comp1, comp2),
        size: this.compareSize(comp1, comp2),
        power: this.comparePower(comp1, comp2),
        cost: this.compareCost(comp1, comp2)
      }
    }
  }

  /**
   * 比较性能
   */
  private static comparePerformance(comp1: any, comp2: any) {
    // 这里可以根据具体的性能指标进行比较
    const eraOrder = ['early', 'electronic', 'transistor', 'integrated', 'digital', 'modern']
    const era1Index = eraOrder.indexOf(comp1.era)
    const era2Index = eraOrder.indexOf(comp2.era)
    
    if (era1Index < era2Index) return 'component2 更快'
    if (era1Index > era2Index) return 'component1 更快'
    return '性能相近'
  }

  /**
   * 比较尺寸
   */
  private static compareSize(comp1: any, comp2: any) {
    const eraOrder = ['early', 'electronic', 'transistor', 'integrated', 'digital', 'modern']
    const era1Index = eraOrder.indexOf(comp1.era)
    const era2Index = eraOrder.indexOf(comp2.era)
    
    if (era1Index < era2Index) return 'component1 更大'
    if (era1Index > era2Index) return 'component2 更大'
    return '尺寸相近'
  }

  /**
   * 比较功耗
   */
  private static comparePower(comp1: any, comp2: any) {
    const eraOrder = ['early', 'electronic', 'transistor', 'integrated', 'digital', 'modern']
    const era1Index = eraOrder.indexOf(comp1.era)
    const era2Index = eraOrder.indexOf(comp2.era)
    
    if (era1Index < era2Index) return 'component1 功耗更高'
    if (era1Index > era2Index) return 'component2 功耗更高'
    return '功耗相近'
  }

  /**
   * 比较成本
   */
  private static compareCost(comp1: any, comp2: any) {
    const eraOrder = ['early', 'electronic', 'transistor', 'integrated', 'digital', 'modern']
    const era1Index = eraOrder.indexOf(comp1.era)
    const era2Index = eraOrder.indexOf(comp2.era)
    
    // 早期技术通常成本更高（相对于性能）
    if (era1Index < era2Index) return 'component1 成本更高'
    if (era1Index > era2Index) return 'component2 成本更高'
    return '成本相近'
  }

  /**
   * 搜索组件
   */
  static searchComponents(keyword: string) {
    const lowerKeyword = keyword.toLowerCase()
    const result: any[] = []
    
    for (const type of Object.keys(this.components)) {
      const components = this.components[type as keyof typeof this.components]
        .filter((comp: any) => 
          comp.name.toLowerCase().includes(lowerKeyword) ||
          comp.description.toLowerCase().includes(lowerKeyword) ||
          comp.era.toLowerCase().includes(lowerKeyword)
        )
      result.push(...components)
    }
    
    return result
  }
}
