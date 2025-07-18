/**
 * 计算机历史数据
 * 包含各个历史节点的详细信息
 */
export class HistoryData {
  private static historyNodes = [
    {
      id: 'abacus',
      title: '算盘',
      year: '公元前2700年',
      era: 'ancient',
      type: 'abacus',
      description: '世界上最早的计算工具之一，使用珠子在框架上移动来进行计算。算盘的发明标志着人类对计算工具需求的开始，为后续计算机的发展奠定了基础。',
      specs: {
        '材质': '木制框架，竹制或木制珠子',
        '计算能力': '加减乘除基本运算',
        '精度': '取决于使用者技能',
        '速度': '熟练使用者可达到很高速度',
        '存储': '无数据存储能力'
      },
      significance: '人类计算工具的起点，体现了早期对数值计算的需求',
      keyFigures: ['古代数学家', '商人', '会计师'],
      impact: '为商业贸易和数学计算提供了重要工具，影响了数千年的计算方式'
    },
    {
      id: 'pascaline',
      title: '帕斯卡计算器',
      year: '1642年',
      era: 'mechanical',
      type: 'mechanical',
      description: '由法国数学家布莱士·帕斯卡发明的机械计算器，被认为是第一台真正的计算机器。它使用齿轮和转盘来执行加法和减法运算。',
      specs: {
        '发明者': '布莱士·帕斯卡',
        '材质': '黄铜和钢制齿轮',
        '功能': '加法和减法运算',
        '数位': '最多8位数',
        '重量': '约1公斤'
      },
      significance: '第一台机械计算设备，开启了机械计算时代',
      keyFigures: ['布莱士·帕斯卡'],
      impact: '证明了机械设备可以执行数学运算，为后续计算机发展提供了概念基础'
    },
    {
      id: 'difference-engine',
      title: '差分机',
      year: '1822年',
      era: 'mechanical',
      type: 'mechanical',
      description: '查尔斯·巴贝奇设计的机械计算器，用于计算数学表格。虽然从未完全建成，但其设计理念极其先进，被认为是现代计算机的前身。',
      specs: {
        '设计者': '查尔斯·巴贝奇',
        '高度': '约2.4米',
        '重量': '约15吨',
        '齿轮数': '约25000个',
        '精度': '31位小数'
      },
      significance: '第一台设计用于自动计算的机器，引入了程序化计算的概念',
      keyFigures: ['查尔斯·巴贝奇'],
      impact: '奠定了自动计算的理论基础，影响了后续计算机的发展方向'
    },
    {
      id: 'analytical-engine',
      title: '分析机',
      year: '1837年',
      era: 'mechanical',
      type: 'analytical',
      description: '巴贝奇设计的通用计算机器，具有现代计算机的基本要素：输入、处理、存储和输出。阿达·洛夫莱斯为其编写了第一个计算机程序。',
      specs: {
        '设计者': '查尔斯·巴贝奇',
        '程序员': '阿达·洛夫莱斯',
        '存储': '1000个50位数字',
        '运算单元': '机械齿轮系统',
        '编程方式': '打孔卡片'
      },
      significance: '第一台通用计算机的设计，包含了现代计算机的所有基本概念',
      keyFigures: ['查尔斯·巴贝奇', '阿达·洛夫莱斯'],
      impact: '确立了可编程计算机的概念，阿达·洛夫莱斯被誉为第一位程序员'
    },
    {
      id: 'eniac',
      title: 'ENIAC电子计算机',
      year: '1946年',
      era: 'electronic',
      type: 'electronic',
      description: '世界上第一台通用电子数字计算机，使用真空管技术。ENIAC标志着电子计算时代的开始，计算速度比机械计算器快1000倍。',
      specs: {
        '真空管数量': '17468个',
        '重量': '30吨',
        '占地面积': '167平方米',
        '功耗': '150千瓦',
        '计算速度': '每秒5000次加法运算'
      },
      significance: '第一台电子通用计算机，开启了电子计算时代',
      keyFigures: ['约翰·莫克利', '普雷斯珀·埃克特'],
      impact: '证明了电子技术在计算领域的巨大潜力，为现代计算机奠定了基础'
    },
    {
      id: 'transistor-computer',
      title: '晶体管计算机',
      year: '1947年',
      era: 'transistor',
      type: 'transistor',
      description: '晶体管的发明革命性地改变了计算机技术。晶体管比真空管更小、更可靠、功耗更低，使计算机变得更加实用和普及。',
      specs: {
        '晶体管发明者': '巴丁、布拉顿、肖克利',
        '尺寸': '比真空管小100倍',
        '功耗': '比真空管低95%',
        '可靠性': '比真空管高100倍',
        '寿命': '几乎无限'
      },
      significance: '晶体管技术使计算机小型化和普及化成为可能',
      keyFigures: ['约翰·巴丁', '沃尔特·布拉顿', '威廉·肖克利'],
      impact: '开启了计算机小型化时代，为个人计算机的出现铺平了道路'
    },
    {
      id: 'integrated-circuit',
      title: '集成电路计算机',
      year: '1958年',
      era: 'integrated',
      type: 'integrated',
      description: '集成电路的发明将多个晶体管集成在单一芯片上，大大提高了计算机的性能和可靠性，同时降低了成本和体积。',
      specs: {
        '发明者': '杰克·基尔比、罗伯特·诺伊斯',
        '集成度': '数十个晶体管/芯片',
        '尺寸': '大幅缩小',
        '成本': '显著降低',
        '性能': '大幅提升'
      },
      significance: '集成电路技术推动了计算机的大规模普及',
      keyFigures: ['杰克·基尔比', '罗伯特·诺伊斯'],
      impact: '为大规模集成电路和微处理器的发展奠定了基础'
    },
    {
      id: 'microprocessor',
      title: '微处理器',
      year: '1971年',
      era: 'digital',
      type: 'microprocessor',
      description: 'Intel 4004微处理器的发布标志着微处理器时代的开始。它将整个CPU集成在单一芯片上，为个人计算机的发展奠定了基础。',
      specs: {
        '型号': 'Intel 4004',
        '晶体管数': '2300个',
        '时钟频率': '740 KHz',
        '数据位宽': '4位',
        '制程工艺': '10微米'
      },
      significance: '第一个商用微处理器，开启了个人计算时代',
      keyFigures: ['特德·霍夫', '费德里科·法金'],
      impact: '使个人计算机成为可能，推动了信息技术革命'
    },
    {
      id: 'personal-computer',
      title: '个人计算机',
      year: '1975年',
      era: 'digital',
      type: 'personal',
      description: 'Altair 8800被认为是第一台个人计算机，随后Apple II和IBM PC的推出使个人计算机真正走向普及，改变了人们的工作和生活方式。',
      specs: {
        '代表机型': 'Altair 8800, Apple II, IBM PC',
        '处理器': 'Intel 8080/8086',
        '内存': '4KB-64KB',
        '存储': '软盘驱动器',
        '显示': 'CRT显示器'
      },
      significance: '计算机从专业工具转变为个人工具',
      keyFigures: ['史蒂夫·乔布斯', '史蒂夫·沃兹尼亚克', '比尔·盖茨'],
      impact: '开启了信息时代，改变了人类的工作和生活方式'
    },
    {
      id: 'internet-era',
      title: '互联网时代',
      year: '1990年',
      era: 'digital',
      type: 'internet',
      description: '万维网的发明和互联网的普及将全世界的计算机连接起来，创造了信息共享和全球通信的新时代。',
      specs: {
        '发明者': '蒂姆·伯纳斯-李',
        '协议': 'HTTP/HTML',
        '第一个网站': 'info.cern.ch',
        '浏览器': 'WorldWideWeb',
        '影响范围': '全球'
      },
      significance: '将计算机从独立设备转变为全球网络的节点',
      keyFigures: ['蒂姆·伯纳斯-李', '文特·瑟夫', '罗伯特·卡恩'],
      impact: '创造了全球信息网络，推动了数字经济和社会的发展'
    },
    {
      id: 'modern-computer',
      title: '现代计算机',
      year: '2020年',
      era: 'modern',
      type: 'modern',
      description: '现代计算机集成了人工智能、云计算、移动计算等先进技术，具有强大的计算能力和智能化特性，正在推动第四次工业革命。',
      specs: {
        '处理器': '多核CPU + GPU + AI芯片',
        '制程工艺': '5纳米及以下',
        '内存': '数GB到数TB',
        '存储': 'SSD + 云存储',
        '连接': '5G + WiFi 6 + 蓝牙'
      },
      significance: '智能化、移动化、云端化的计算平台',
      keyFigures: ['众多科技公司和研究人员'],
      impact: '推动人工智能、物联网、大数据等新技术的发展和应用'
    }
  ]

  /**
   * 获取所有历史节点
   */
  static getAllNodes() {
    return this.historyNodes
  }

  /**
   * 根据ID获取历史节点
   */
  static getNodeById(id: string) {
    return this.historyNodes.find(node => node.id === id)
  }

  /**
   * 根据时代获取历史节点
   */
  static getNodesByEra(era: string) {
    return this.historyNodes.filter(node => node.era === era)
  }

  /**
   * 根据类型获取历史节点
   */
  static getNodesByType(type: string) {
    return this.historyNodes.filter(node => node.type === type)
  }

  /**
   * 获取时代列表
   */
  static getEras() {
    const eras = [...new Set(this.historyNodes.map(node => node.era))]
    return eras
  }

  /**
   * 获取类型列表
   */
  static getTypes() {
    const types = [...new Set(this.historyNodes.map(node => node.type))]
    return types
  }

  /**
   * 根据年份范围获取历史节点
   */
  static getNodesByYearRange(startYear: number, endYear: number) {
    return this.historyNodes.filter(node => {
      const year = parseInt(node.year.replace(/[^0-9]/g, ''))
      return year >= startYear && year <= endYear
    })
  }

  /**
   * 搜索历史节点
   */
  static searchNodes(keyword: string) {
    const lowerKeyword = keyword.toLowerCase()
    return this.historyNodes.filter(node => 
      node.title.toLowerCase().includes(lowerKeyword) ||
      node.description.toLowerCase().includes(lowerKeyword) ||
      node.keyFigures.some(figure => figure.toLowerCase().includes(lowerKeyword))
    )
  }
}
