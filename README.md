# 🔍 Epic Video Scanner
<a id="top"></a>
<img align="right" src="https://img.shields.io/github/downloads/JacktheRanger/Epic-Video-Finder/total.svg?label=Downloads" alt="Downloads" />

**Language**: [English](#english) | [中文](#中文)

---

## English

A modern, beautiful, and powerful video file scanner. Now featuring a stunning bright and dark-themed GUI built with **Flet** and rock-solid file handling via **Tkinter**. Quickly find, organize, and analyze video files in any directory.

<img width="1988" height="1600" alt="image" src="https://github.com/user-attachments/assets/d69c84b1-76da-4fd6-af93-d7236ca7058e" />






### ✨ Features

- **🎨 Modern GUI**: Beautiful light-themed interface with Material Design aesthetics.
- **📁 Native Dialogs**: Uses Windows native directory and file pickers (via Tkinter) for 100% reliability.
- **🔄 Deep Scanning**: Recursively finds 18+ video formats (`mp4`, `mkv`, `mov`, `avi`, etc.) in all subfolders.
- **📊 Visual Statistics**: Real-time progress ring and scanning result bar charts.
- **☑️ Smart Selection**: Detailed checkboxes to select/deselect specific formats to scan.
- **🌍 Bilingual**: One-click toggle between **English** and **Chinese** interface.
- **💾 Export**: Save your scan results to a text file for reporting.

### 🔧 System Requirements

- **OS**: Windows 10/11 (64-bit)
- **Python**: 3.7+ (Only if running from source)

### 🚀 Installation

#### Option A: Download EXE (Recommended)
1. Go to [Releases](https://github.com/JacktheRanger/Epic-Video-Scanner/releases)
2. Download `Vx.x.x.Epic.Video.Finder.exe`
3. Double-click to run. No installation required.

#### Option B: Run from Source
1. Install Python 3.7+
2. Install dependencies:
   ```bash
   pip install flet
   ```
3. Run the script:
   ```bash
   python Vx.x.x.Epic.Video.Finder.py
   ```

### 📖 Usage

1. **Select Directory**: Click "Browse" to choose the folder you want to scan.
2. **Choose Formats**: Check/Uncheck video formats you want to include (or use "Select All").
3. **Start Scan**: Click the big search button. The app will scan in the background.
4. **View Results**: See the file count, format distribution, and scrollable file list.
5. **Save**: Click "Save Results" to export the list to a `.txt` file.

### 📋 Supported Formats

| Priority | Others |
|----------|--------|
| `.mp4` `.mov` `.mkv` | `.wmv` `.flv` `.webm` |
| `.ts` `.mts` `.m2ts` | `.m4v` `.mpg` `.mpeg` |
| `.avi` | `.3gp` `.f4v` `.vob` `.rmvb` `.rm` |

### ⚠️ Notes
- Does not modify your files (read-only scan).
- Uses System Native Dialogs (via Tkinter) for maximum compatibility on Windows.

### 📄 License
GNU GPL v3.0

### 👤 Author
Jack Ji

---

## 中文

# 🔍 史诗级视频扫描器

一款现代、美观且功能强大的视频文件扫描工具。新版本采用 **Flet** 构建了精美的亮色与暗色主题图形界面，并结合 **Tkinter** 实现原生系统的文件交互。

<img width="1986" height="1593" alt="image" src="https://github.com/user-attachments/assets/00e41319-100e-48d4-8623-eb40ecce4d6a" />






### ✨ 主要功能 

- **🎨 现代化界面**: 极具质感的亮色主题 (Light Mode) 与 Material Design 设计。
- **📁 原生体验**: 集成 Windows 原生文件/目录选择框 (Tkinter 引擎)，稳定可靠。
- **🔄 深度扫描**: 递归查找子目录中 18+ 种常见及罕见的视频格式。
- **📊 可视化统计**: 实时扫描进度环，以及扫描结果的格式分布柱状图。
- **☑️ 灵活筛选**: 支持全选/反选，或单独勾选需要查找的特定视频格式。
- **🌍 双语支持**: 界面内置中/英文一键切换。
- **💾 结果导出**: 支持将扫描到的文件列表和统计信息导出为文本文件。

### 🔧 环境要求

- **系统**: Windows 10/11 (64位)
- **Python**: 3.7+ (仅源码运行需要)

### 🚀 安装与运行

#### 方式 A：下载 EXE（推荐）
1. 前往 [Releases](https://github.com/JacktheRanger/Epic-Video-Scanner/releases) 页面。
2. 下载 `Vx.x.x.Epic.Video.Finder.exe`。
3. 双击直接运行，无需安装任何环境。

#### 方式 B：源码运行
1. 确保安装了 Python 3.7+。
2. 安装依赖库：
   ```bash
   pip install flet
   ```
3. 运行脚本：
   ```bash
   python Vx.x.x.Epic.Video.Finder.py
   ```

### 📖 使用说明

1. **选择目录**: 点击 "浏览 (Browse)" 按钮选择要扫描的文件夹。
2. **格式筛选**: 勾选你想要查找的视频格式（支持快捷全选/反选）。
3. **开始扫描**: 点击搜索图标按钮，扫描将在后台即时进行。
4. **查看结果**: 扫描完成后展示文件总数、格式统计图表和详细文件列表。
5. **保存结果**: 点击 "保存结果 (Save Results)" 将列表导出为 `.txt` 文件。

### 📋 支持格式

| 常用格式 | 其他格式 |
|----------|--------|
| `.mp4` `.mov` `.mkv` | `.wmv` `.flv` `.webm` |
| `.ts` `.mts` `.m2ts` | `.m4v` `.mpg` `.mpeg` |
| `.avi` | `.3gp` `.f4v` `.vob` `.rmvb` `.rm` |

### ⚠️ 注意事项
- 本工具为**只读扫描**，绝对不会修改或移动您的任何文件。

### 📄 许可证
GNU GPL v3.0

### 👤 作者
Jack Ji

---

[Back to Top](#top)
















