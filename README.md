# 🔍 Epic Video Scanner

<img align="right" src="https://img.shields.io/github/downloads/JacktheRanger/Epic-Video-Finder/total.svg?label=Downloads" alt="Downloads" />

**Language**: [English](#english) | [中文](#中文)

---

## English

A lightweight yet powerful video file scanner with a beautiful CLI interface. Quickly find and catalog all video files in any directory with format-specific filtering, detailed statistics, and export capabilities. Fully bilingual (English/Chinese).


### ✨ Features

- **Universal Format Support**: Scan for 18+ video formats including `.mp4`, `.mov`, `.mkv`, `.ts`, `.mts`, `.m2ts`, `.avi`, `.wmv`, `.flv`, `.webm`, `.m4v`, `.mpg`, `.mpeg`, `.3gp`, `.f4v`, `.vob`, `.rmvb`, `.rm`
- **Format Filtering**: Interactive per-format selection - choose exactly which formats to scan or ignore
- **Deep Scanning**: Recursively scans all subdirectories to find every video file
- **Format Statistics**: Visual bar charts showing file count per format
- **Detailed File List**: Complete paths organized by format type
- **Export Results**: Save scan results to a text file for later reference
- **Bilingual UI**: Full English and Chinese language support
- **Beautiful Interface**: Modern CLI design with colors, icons, and ASCII art banner

### 🔧 System Requirements

- **OS**: Windows 10/11 (64-bit)
- **Python**: 3.8+ (3.12 recommended)
- **Dependencies**: None - uses only built-in Python modules

### 🚀 Installation

#### Option A: Download EXE (Recommended - Easiest)

1. Go to [Releases](https://github.com/JacktheRanger/Epic-Video-Scanner/releases) page
2. Download `Vx.x.x.Epic.Video.Finder.exe`
3. That's it! No Python required.

#### Option B: Run from Source (For developers)

1. **Install Python (3.8+, recommended 3.12)**
   - Download from: [https://www.python.org/downloads/](https://www.python.org/downloads/)
   - No additional pip packages required - uses only built-in modules

2. **Download the script**
   - Clone or download `Vx.x.x.Epic.Video.Finder.py`

### 📖 Usage

#### Using EXE Version

1. Place `Vx.x.x.Epic.Video.Finder.exe` anywhere on your system
2. Double-click the EXE to run
3. Select language (English/Chinese)
4. Enter the directory path to scan (or press Enter for current directory)
5. Select which formats to scan
6. View results and optionally save to file

#### Using Python Script

1. Double-click the script or run from terminal:
   ```
   python "Vx.x.x.Epic.Video.Finder.py"
   ```
2. Select language and follow prompts

#### Workflow

```
┌─────────────────────────────────────────────────────┐
│ 1. Banner → Select Language                        │
│ 2. Directory Setup → Enter path or use current     │
│ 3. Format Selection → Choose formats to scan       │
│ 4. Deep Scan → Recursively find all video files    │
│ 5. Results → Format statistics with visual bars    │
│ 6. File List → Detailed paths organized by format  │
│ 7. Export → Optionally save results to text file   │
└─────────────────────────────────────────────────────┘
```

### 📋 Supported Formats

| Priority Formats | Other Formats |
|-----------------|---------------|
| `.mp4` | `.wmv` |
| `.mov` | `.flv` |
| `.mkv` | `.webm` |
| `.ts` | `.m4v` |
| `.mts` | `.mpg` |
| `.m2ts` | `.mpeg` |
| `.avi` | `.3gp` |
|  | `.f4v` |
|  | `.vob` |
|  | `.rmvb` |
|  | `.rm` |

### ⚠️ Notes

- The scanner only reads file metadata - it does not modify or move any files
- Results are sorted by format with the most common formats shown first
- Permission errors are gracefully handled with informative messages

### 📄 License

GNU GPL v3.0

### 👤 Author

Jack Ji

---

## 中文

# 🔍 史诗级视频扫描工具

一款轻量但功能强大的视频文件扫描工具，配备精美的命令行界面。可以快速查找并整理任意目录中的所有视频文件，支持格式筛选、详细统计和结果导出。配备全双语界面（中/英）。

### ✨ 功能特点

- **通用格式支持**: 扫描 18+ 种视频格式，包括 `.mp4`、`.mov`、`.mkv`、`.ts`、`.mts`、`.m2ts`、`.avi`、`.wmv`、`.flv`、`.webm`、`.m4v`、`.mpg`、`.mpeg`、`.3gp`、`.f4v`、`.vob`、`.rmvb`、`.rm`
- **格式筛选**: 交互式逐格式选择 - 精确选择要扫描或忽略的格式
- **深度扫描**: 递归扫描所有子目录，查找每个视频文件
- **格式统计**: 可视化柱状图显示每种格式的文件数量
- **详细文件列表**: 按格式类型整理的完整文件路径
- **导出结果**: 将扫描结果保存到文本文件以便日后查阅
- **双语界面**: 完整的中英文语言支持
- **精美界面**: 现代CLI设计，配有颜色、图标和ASCII艺术横幅

### 🔧 环境要求

- **操作系统**: Windows 10/11 (64位)
- **Python**: 3.8+（推荐 3.12）
- **依赖**: 无 - 仅使用 Python 内置模块

### 🚀 安装步骤

#### 方式 A：下载 EXE（推荐 - 最简单）

1. 前往 [Releases](https://github.com/JacktheRanger/Epic-Video-Scanner/releases) 页面
2. 下载 `Vx.x.x.Epic.Video.Finder.exe`
3. 完成！无需安装 Python。

#### 方式 B：运行源代码（适合开发者）

1. **安装 Python（3.8+，推荐 3.12）**
   - 下载地址：[https://www.python.org/downloads/](https://www.python.org/downloads/)
   - 无需安装额外的 pip 包 - 仅使用内置模块

2. **下载脚本**
   - 克隆或下载 `Vx.x.x.Epic.Video.Finder.py`

### 📖 使用方法

#### 使用 EXE 版本

1. 将 `Vx.x.x.Epic.Video.Finder.exe` 放置在系统任意位置
2. 双击 EXE 运行
3. 选择语言（中文/英文）
4. 输入要扫描的目录路径（或按回车使用当前目录）
5. 选择要扫描的格式
6. 查看结果并可选保存到文件

#### 使用 Python 脚本

1. 双击脚本或从终端执行：
   ```
   python "Vx.x.x.Epic.Video.Finder.py"
   ```
2. 选择语言并按提示操作

#### 工作流程

```
┌─────────────────────────────────────────────────────┐
│ 1. 横幅 → 选择语言                                   │
│ 2. 目录设置 → 输入路径或使用当前目录                    │
│ 3. 格式选择 → 选择要扫描的格式                         │
│ 4. 深度扫描 → 递归查找所有视频文件                      │
│ 5. 结果 → 带可视化柱状图的格式统计                      │
│ 6. 文件列表 → 按格式整理的详细路径                      │
│ 7. 导出 → 可选将结果保存到文本文件                      │
└─────────────────────────────────────────────────────┘
```

### 📋 支持的格式

| 优先格式 | 其他格式 |
|---------|---------|
| `.mp4` | `.wmv` |
| `.mov` | `.flv` |
| `.mkv` | `.webm` |
| `.ts` | `.m4v` |
| `.mts` | `.mpg` |
| `.m2ts` | `.mpeg` |
| `.avi` | `.3gp` |
|  | `.f4v` |
|  | `.vob` |
|  | `.rmvb` |
|  | `.rm` |

### ⚠️ 注意事项

- 扫描器只读取文件元数据 - 不会修改或移动任何文件
- 结果按格式排序，最常见的格式显示在前面
- 权限错误会被优雅处理并显示信息性消息

### 📄 许可证

GNU GPL v3.0

### 👤 作者

Jack Ji




