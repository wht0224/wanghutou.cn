# 梵高 - 第一章：吃土豆的人

一个基于Web的互动叙事游戏，讲述梵高早期在荷兰的故事。

## 🎮 游戏特色

- 精美的像素艺术风格
- 丰富的互动系统
- 物品收集与谜题
- 对话选择影响剧情
- 情绪管理系统
- 音效反馈
- 键盘控制支持

## 🚀 运行方式

直接在浏览器中打开 `index.html` 文件即可。

## 🎯 游戏操作

- **鼠标点击**: 与场景中的物品和角色互动
- **↑↓ 箭头键**: 在对话中选择选项
- **Enter**: 确认选择
- **Esc**: 关闭对话框
- **M键**: 切换音效

## 📁 项目结构

```
van-gogh-game/
├── index.html                  # 主入口文件
└── js/
    ├── logger.js              # 日志系统
    ├── gameState.js           # 游戏状态管理
    ├── renderer.js            # 基础渲染工具
    ├── soundManager.js        # 音效系统
    ├── animationSystem.js     # 动画系统
    ├── inputManager.js        # 输入管理
    ├── data.js                # 游戏数据（对话、物品、角色）
    ├── uiManager.js           # UI界面管理
    ├── sceneRenderer.js       # 场景渲染
    ├── characterRenderer.js    # 角色渲染
    ├── itemRenderer.js        # 物品渲染
    ├── interactionManager.js   # 交互管理
    └── game.js                # 游戏主逻辑
```

## 🎨 游戏系统

### 对话系统
玩家可以通过点击角色进行对话，对话选项会影响角色的情绪和游戏进度。

### 物品系统
收集三种颜料（猩红、钴蓝、铬黄）来完成画作《吃土豆的人》。

### 情绪系统
玩家的选择会影响梵高的情绪值（0-100），情绪状态分为：低落、平和、振作、激昂。

## 🛠️ 技术栈

- HTML5 Canvas
- Vanilla JavaScript
- Web Audio API
- CSS3

## 📜 许可证

MIT License
