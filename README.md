# 🔍 Epic Video Finder
<a id="top"></a>
<img align="right" src="https://img.shields.io/github/downloads/JacktheRanger/Epic-Video-Finder/total.svg?label=Downloads" alt="Downloads" />

**Language**: [English](#english) | [中文](#中文)
**Homepage**: [https://epic-video-finder.pages.dev/](https://epic-video-finder.pages.dev/)

---

## English

A modern, beautiful, and powerful SOTA video **file** and **duplicate finder**. Now featuring a stunning bright and dark-themed GUI built with Flet and rock-solid file handling via Tkinter. Quickly find, organize, analyze, and deduplicate video files in any directory.

> ⭐ **If you find this project useful, please consider giving it a Star!** Your support helps keep the project alive and motivates further development.

<img width="2216" height="1863" alt="image" src="https://github.com/user-attachments/assets/c60c56b7-cbf8-445c-8c0d-7f587e84db73" />

<img width="2212" height="1858" alt="image" src="https://github.com/user-attachments/assets/cc6a7f1b-406b-46bb-a535-e8b9fdb62209" />

<img width="2203" height="1318" alt="image" src="https://github.com/user-attachments/assets/f7a559e9-443d-4659-b2ed-e0d0d329de76" />







### ✨ Features

- **🎨 Modern GUI**: Beautiful light/dark-themed interface with Material Design aesthetics.
- **📁 Native Dialogs**: Uses Windows native directory and file pickers (via Tkinter) for 100% reliability.
- **🔄 Deep Scanning**: Recursively finds 18+ video formats (`mp4`, `mkv`, `mov`, `avi`, etc.) in all subfolders.
- **📊 Visual Statistics**: Real-time progress bar and scanning result bar charts with file size display.
- **🔍 Duplicate Detection**: Identify and manage duplicate video files with two detection modes:
  - **Very Fast Mode**: Instant detection by file size comparison.
  - **Balance Mode**: Accurate detection using SHA-256 hash verification.
- **☑️ Smart Selection**: Detailed checkboxes to select/deselect specific formats to scan.
- **🧩 Custom Formats**: Add your own extensions (comma separated, e.g. `.mxf, .m2v`) and optionally disable them with a checkbox.
- **⏱️ Include Duration (Optional)**: Toggle **Include Duration** to show video length (uses Windows Shell metadata; will slow down scanning).
- **🗂️ Quick Actions**: Open video, open containing folder, or delete files directly from the results list.
- **📌 Always on Top**: Keep the window above other apps while reviewing results.
- **🗑️ Safe Deletion**: Deletes are sent to the **Recycle Bin** (including duplicate deletion and cache clearing).
- **⚙️ Settings & Cache**: Remember theme/language/formats/window state, display cache size, and clear cache to reset.
- **🌍 Bilingual**: One-click toggle between **English** and **Chinese** interface.
- **💾 Export**: Save your scan results to a text file for reporting.

### 🔧 System Requirements

- **OS**: Windows 10/11 (64-bit)
- **Python**: 3.7+ (Only if running from source)

### 🚀 How to Use

1. Go to [Releases](https://github.com/JacktheRanger/Epic-Video-Finder/releases)
2. Download `Vx.x.x.Epic.Video.Finder.exe`
3. Double-click to run. No installation required.

### 📖 Usage

1. **Select Directory**: Click "Browse" to choose the folder you want to scan.
2. **Choose Formats**: Check/Uncheck video formats you want to include (or use "Select All"). Optionally add **Custom formats** (comma separated).
3. **(Optional) Include Duration**: Turn on **Include Duration** if you want to display video length in results.
4. **Start Scan**: Click the big search button. The app will scan in the background with real-time progress.
5. **View & Manage Results**: See counts/sizes, format distribution, and use the action buttons to **open**, **open folder**, or **delete** (Recycle Bin). Toggle **Always on Top** if needed.
6. **Detect Duplicates**: Choose a mode, run detection, then delete selected duplicates (Recycle Bin).
7. **Save**: Click "Save Results" to export the list to a `.txt` file.

### ⚙️ Settings & Cache

- Settings and cache are stored under `%APPDATA%\EpicVideoScanner` (e.g. `settings.json`).
- Turn off **Remember my settings** if you don't want the app to persist settings between launches.
- Use **Clear Cache** to reset saved settings (items are sent to the Recycle Bin).

### 📋 Supported Formats

| Priority | Others |
|----------|--------|
| `.mp4` `.mov` `.mkv` | `.wmv` `.flv` `.webm` |
| `.ts` `.mts` `.m2ts` | `.m4v` `.mpg` `.mpeg` |
| `.avi` | `.3gp` `.f4v` `.vob` `.rmvb` `.rm` |


### 📄 License
GNU AGPL-3.0

### 👤 Author
Jack Ji &nbsp;&nbsp;  [![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/jackji)

---

## 中文

# 🔍 史诗级视频扫描 & 重复文件检测器

一款现代、美观且功能强大的SOTA视频**文件**与**重复检测工具**。新版本采用Flet构建了精美的亮色与暗色主题图形界面，并结合Tkinter实现原生系统的文件交互。

> ⭐ **如果觉得这个项目有用，请给我一个 Star！** 谢谢~

<img width="2210" height="1861" alt="image" src="https://github.com/user-attachments/assets/4c07c249-2f54-4a2e-98c2-218daeec5331" />

<img width="2208" height="1864" alt="image" src="https://github.com/user-attachments/assets/b6a42b68-468b-4b91-a522-fd12470eaf26" />

<img width="2201" height="1316" alt="image" src="https://github.com/user-attachments/assets/48cabba9-851d-4911-923a-5dc2b34efc22" />












### ✨ 主要功能 

- **🎨 现代化界面**: 极具质感的色彩主题与 Material Design 设计。
- **📁 原生体验**: 集成 Windows 原生文件/目录选择框 (Tkinter 引擎)，稳定可靠。
- **🔄 深度扫描**: 递归查找子目录中 18+ 种常见及罕见的视频格式。
- **📊 可视化统计**: 实时扫描进度条，扫描结果格式分布柱状图，显示文件大小。
- **🔍 重复文件检测**: 识别并管理重复的视频文件，提供两种检测模式：
  - **极速模式**: 通过文件大小瞬间对比检测。
  - **均衡模式**: 使用 SHA-256 哈希校验精准检测。
- **☑️ 灵活筛选**: 支持全选/反选，或单独勾选需要查找的特定视频格式。
- **🧩 自定义格式**: 支持输入你自己的扩展名（逗号分隔，例如 `.mxf, .m2v`），并可通过勾选框启用/禁用。
- **⏱️ 包含视频长度（可选）**: 开启 **包含视频长度** 后会显示视频时长（使用 Windows Shell 元数据；会降低扫描速度）。
- **🗂️ 快捷操作**: 在结果列表中可直接 **打开视频**、**打开所在文件夹**、或 **删除文件**。
- **📌 窗口置顶**: 需要时可开启置顶，方便边查看结果边操作其它窗口。
- **🗑️ 安全删除**: 删除操作会发送到 **回收站**（包含重复删除与清缓存）。
- **⚙️ 设置与缓存**: 记住主题/语言/格式/窗口状态，显示缓存大小，并可一键清除缓存重置。
- **🌍 双语支持**: 界面内置中/英文一键切换。
- **💾 结果导出**: 支持将扫描到的文件列表和统计信息导出为文本文件。

### 🔧 环境要求

- **系统**: Windows 10/11 (64位)
- **Python**: 3.7+ (仅源码运行需要)

### 🚀 如何使用

1. 前往 [Releases](https://github.com/JacktheRanger/Epic-Video-Finder/releases) 页面。
2. 下载 `Vx.x.x.Epic.Video.Finder.exe`。
3. 双击直接运行，无需安装任何环境。

### 📖 使用说明

1. **选择目录**: 点击 "浏览 (Browse)" 按钮选择要扫描的文件夹。
2. **格式筛选**: 勾选你想要查找的视频格式（支持快捷全选/反选），并可选填 **自定义格式**（逗号分隔）。
3. **（可选）包含视频长度**: 如需在结果中显示时长，请开启 **包含视频长度**。
4. **开始扫描**: 点击搜索图标按钮，扫描将在后台即时进行，实时显示进度。
5. **查看与管理结果**: 查看统计信息，并使用按钮 **打开** / **打开文件夹** / **删除**（回收站）。需要时可开启 **窗口置顶**。
6. **检测重复**: 选择模式后开始检测，并删除选中的重复文件（回收站）。
7. **保存结果**: 点击 "保存结果 (Save Results)" 将列表导出为 `.txt` 文件。

### ⚙️ 设置与缓存

- 设置与缓存位于 `%APPDATA%\EpicVideoScanner`（例如 `settings.json`）。
- 关闭 **记住我的设置** 后，应用将不会在下次启动时保留设置。
- 使用 **清除缓存** 可重置已保存的设置（文件会发送到回收站）。

### 📋 支持格式

| 常用格式 | 其他格式 |
|----------|--------|
| `.mp4` `.mov` `.mkv` | `.wmv` `.flv` `.webm` |
| `.ts` `.mts` `.m2ts` | `.m4v` `.mpg` `.mpeg` |
| `.avi` | `.3gp` `.f4v` `.vob` `.rmvb` `.rm` |

### 📄 许可证
GNU AGPL-3.0

### 👤 作者
Jack Ji &nbsp;&nbsp;  [![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/jackji)








---

<p align="center"><a href="#top">Back to Top</a></p>

























































