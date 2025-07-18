# [English Version](./README_EN.md) | [中文版](./README.md)
# Digital Chrono-Cruiser

An interactive 3D computer history showcase app that takes you through the timeline of computing evolution.

## 🌟 Features

### 🏛️ Interactive 3D Computer History Gallery
- **Immersive Experience**: Freely explore a virtual 3D exhibition hall
- **Historical Nodes**: Complete timeline from abacus to modern computers
- **Interactive Models**: Click on history nodes for details and specs
- **Dynamic Animations**: Stunning 3D model animations and particle effects

### 🔧 Core Component Evolution Visualization
- **Component Comparison**: Evolution of CPU, memory, storage, and more
- **Exploded View**: Click components to see internal structure animations
- **Technical Specs**: Detailed parameters and performance comparison
- **Era Changes**: Visualize the impact of technological innovation

### ⏱️ Smart Timeline Control
- **Time Travel**: Control historical progress via timeline
- **Auto Play**: Supports automatic playback of evolution
- **Quick Actions**: Keyboard shortcuts and mouse interactions
- **Real-Time Feedback**: Dynamic display of current era info

## 🎮 Controls

### Mouse
- **Left Drag**: Rotate 3D view
- **Scroll Wheel**: Zoom view
- **Right Drag**: Pan view
- **Click Model**: View details
- **Double Click Timeline**: Play/Pause

### Keyboard Shortcuts
- **Space**: Play/Pause timeline
- **←/→**: Previous/Next time point
- **Home**: Go to start
- **End**: Go to end
- **ESC**: Close panel

### Function Buttons
- **Reset View**: Restore default camera position
- **Switch Mode**: Toggle between history gallery and component evolution
- **Help**: View detailed guide

## 🛠️ Tech Stack

- **Three.js** - 3D graphics rendering
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool
- **GSAP** - High-performance animation library
- **pnpm** - Efficient package manager

## 📦 Installation & Run

### Requirements
- Node.js 16+
- pnpm

### Install dependencies
```bash
pnpm install
```

### Development mode
```bash
pnpm run dev
```

### Build production
```bash
pnpm run build
```

### Preview production
```bash
pnpm run preview
```

## 🏗️ Project Structure

```
src/
├── core/                    # Core modules
│   ├── DigitalChronoCruiser.ts  # Main app class
│   ├── SceneManager.ts          # Scene manager
│   ├── TimelineController.ts    # Timeline controller
│   ├── UIManager.ts             # UI manager
│   ├── HistoryGallery.ts        # History gallery
│   └── ComponentEvolution.ts    # Component evolution
├── models/                  # 3D model classes
│   ├── HistoryNode.ts           # History node model
│   └── ComponentModel.ts        # Component model
├── data/                    # Data files
│   ├── HistoryData.ts           # History data
│   └── ComponentData.ts         # Component data
├── style.css               # Styles
└── main.ts                 # Entry file
```

## 🎯 Core Features

### History Gallery Mode
- Show 11 key nodes in computer history
- From abacus (2700 BC) to modern computers (2020)
- Each node includes background, specs, and impact

### Component Evolution Mode
- Evolution of CPU, memory, and storage
- Performance comparison and technical analysis
- Interactive exploded view of internal structure

### Timeline System
- Smooth timeline control
- Auto play
- Real-time history info update

## 🎨 Design Highlights

- **Tech UI**: Dark theme with neon colors
- **Smooth Animation**: GSAP-powered high-performance animation
- **Responsive Design**: Adapts to different screens
- **Performance Monitor**: Real-time FPS display
- **Accessibility**: Keyboard navigation support

## 📱 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

Feel free to submit Issues and Pull Requests to improve the project!

## 📄 License

MIT License

## 🙏 Acknowledgements

Thanks to all pioneers who contributed to the development of computers. Their efforts created today's digital world.

---

**Explore computer history and feel the charm of technology!** 🚀
