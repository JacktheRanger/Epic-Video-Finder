# 🔍 Epic Video Finder
<a id="top"></a>
<img align="right" src="https://img.shields.io/github/downloads/JacktheRanger/Epic-Video-Finder/total.svg?label=Downloads" alt="Downloads" />

**Language**: [English](#english) | [中文](#中文) 

**Homepage**: [https://epic-video-finder.pages.dev](https://epic-video-finder.pages.dev)

---

## English

A modern, beautiful, and powerful SOTA video **file** and **duplicate finder**. Featuring a stunning Material Design 3 interface built with **Flutter**, delivering native Windows performance with smooth animations. Quickly find, organize, analyze, and deduplicate video files in any directory.

> 🚀 **V4.0.0+**: Completely rewritten from Python/Flet to **Flutter/Dart**, delivering 10x faster startup, 100x faster large file scanning & duplicate detection, native Windows performance, smoother animations, and a more responsive UI.

> ⭐ **If you find this project useful, please consider giving it a Star!** Your support helps keep the project alive and motivates further development.

<!-- hero-en -->
<img width="2319" height="1841" alt="image" src="https://github.com/user-attachments/assets/e2fca70e-a58e-48c4-a895-2e417b9f0c95" />


<!-- gallery-1-en -->
<img width="2318" height="1842" alt="image" src="https://github.com/user-attachments/assets/75fb8846-3eab-4bbf-ae8e-227ee94ef6eb" />

<!-- gallery-2-en -->
<img width="2319" height="1775" alt="image" src="https://github.com/user-attachments/assets/41afe0b5-cded-4f03-a2e2-2c7dc0ede2c9" />

<!-- gallery-3-en -->
<img width="2325" height="1781" alt="image" src="https://github.com/user-attachments/assets/9cb87c76-f4ef-48ec-8b36-f8d4ac3d57d0" />

<!-- gallery-4-en -->
<img width="2313" height="1733" alt="image" src="https://github.com/user-attachments/assets/cb130398-0955-419c-beae-ddade1be51df" />












### ✨ Features

- **Modern GUI**: Beautiful light/dark-themed interface with Material Design 3 aesthetics and smooth animations.
- **Native Windows App**: Built with Flutter for fast startup and responsive UI, with native file pickers.
- **Deep Scanning**: Recursively finds 20+ video formats (`mp4`, `mkv`, `mov`, `avi`, etc.) in all subfolders.
- **Visual Statistics**: Real-time progress bar and scanning result bar charts with file size display.
- **Duplicate Detection**: Identify and manage duplicate video files with three detection modes:
  - **Very Fast Mode**: Instant detection by file size comparison.
  - **Balance Mode**: Accurate detection using SHA-256 hash verification.
  - **Audio (Chromaprint) Mode**: Content-aware detection using audio fingerprinting powered by Chromaprint/fpcalc, with configurable chunk length, overlap, threshold, and max lag settings.
- **Smart Selection**: Detailed checkboxes to select/deselect specific formats to scan.
- **Custom Formats**: Add your own extensions (comma separated, e.g. `.mxf, .m2v`) and optionally disable them with a checkbox.
- **High Performance**: Isolate-based background scanning keeps UI responsive; virtualized lists handle large file collections.
- **Quick Actions**: Open video, open containing folder, or delete files directly from the results list.
- **Always on Top**: Keep the window above other apps while reviewing results.
- **100% Offline**: Runs entirely on your local machine. No internet required. Deletions go to the **Recycle Bin**.
- **Settings & Cache**: Remember theme/language/formats/window state, display cache size, and clear cache to reset.
- **Bilingual**: One-click toggle between **English** and **Chinese** interface.
- **Export**: Save your scan results to a text file for reporting.

### 🔧 System Requirements

- **OS**: Windows 10/11 (64-bit)

### 🚀 How to Use

1. Go to [Releases](https://github.com/JacktheRanger/Epic-Video-Finder/releases)
2. Download `Vx.x.x.Epic.Video.Finder.zip`
3. Double-click to run. No installation required.

### ⚙️ Settings & Cache

- Settings and cache are stored under `%APPDATA%\EpicVideoFinderCache` (e.g. `settings.json`, `audio_fingerprints/`).
- Audio fingerprints are cached with gzip compression for faster subsequent scans.
- Turn off **Remember my settings** if you don't want the app to persist settings between launches.
- Use **Clear Cache** to reset saved settings (items are sent to the Recycle Bin).


### 📄 License
GNU AGPL-3.0

### 👤 Author
Jack Ji &nbsp;&nbsp;  [![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/jackji)

---

## 中文

**官网**: [https://epic-video-finder.pages.dev](https://epic-video-finder.pages.dev)

# 🔍 史诗级视频扫描 & 重复文件检测器

一款现代、美观且功能强大的SOTA视频**文件**与**重复检测工具**。采用 **Flutter** 构建，具有精美的 Material Design 3 界面，提供原生 Windows 性能与流畅动画。快速查找、整理、分析和去重任意目录中的视频文件。

> 🚀 **V4.0.0+**: 从 Python/Flet 完全重写为 **Flutter/Dart**，带来 10 倍更快的启动速度、100 倍更快的大文件扫描与重复检测、原生 Windows 性能、更流畅的动画和更灵敏的 UI 响应。

> ⭐ **如果喜欢这个项目，请给我一个 Star！** 谢谢~

<!-- hero-zh -->
<img width="2320" height="1843" alt="image" src="https://github.com/user-attachments/assets/6048866c-4e44-4d03-8e63-743fb5e74ae9" />

<!-- gallery-1-zh -->
<img width="2317" height="1841" alt="image" src="https://github.com/user-attachments/assets/78d1eaaf-09d9-432f-9ed6-bacddf35ce2f" />

<!-- gallery-2-zh -->
<img width="2315" height="1768" alt="image" src="https://github.com/user-attachments/assets/7f7d3bab-9696-4ea8-b41d-997877d8dc5b" />

<!-- gallery-3-zh -->
<img width="2322" height="1772" alt="image" src="https://github.com/user-attachments/assets/450775cc-478a-4e4b-80e1-f3c70a2ecc96" />

<!-- gallery-4-zh -->
<img width="2316" height="1723" alt="image" src="https://github.com/user-attachments/assets/6c47f4c2-829b-4cca-9b5c-6d0353d51616" />



















### ✨ 主要功能 

- **现代化界面**: 极具质感的 Material Design 3 设计与流畅动画。
- **原生体验**: 基于 Flutter 构建，启动快速、UI 响应灵敏，支持原生文件选择框。
- **深度扫描**: 递归查找子目录中 20+ 种常见及罕见的视频格式。
- **可视化统计**: 实时扫描进度条，扫描结果格式分布柱状图，显示文件大小。
- **重复文件检测**: 识别并管理重复的视频文件，提供三种检测模式：
  - **极速模式**: 通过文件大小瞬间对比检测。
  - **均衡模式**: 使用 SHA-256 哈希校验精准检测。
  - **音频 (Chromaprint) 模式**: 使用 Chromaprint/fpcalc 音频指纹进行内容感知检测，可配置分块长度、重叠、阈值和最大延迟等参数。
- **灵活筛选**: 支持全选/反选，或单独勾选需要查找的特定视频格式。
- **自定义格式**: 支持输入你自己的扩展名（逗号分隔，例如 `.mxf, .m2v`），并可通过勾选框启用/禁用。
- **高性能**: 基于 Isolate 的后台扫描保持 UI 流畅；虚拟化列表轻松处理大量文件。
- **快捷操作**: 在结果列表中可直接 **打开视频**、**打开所在文件夹**、或 **删除文件**。
- **窗口置顶**: 需要时可开启置顶，方便边查看结果边操作其它窗口。
- **100% 本地运行**: 完全在本地运行，无需联网。删除操作会发送到 **回收站**。
- **设置与缓存**: 记住主题/语言/格式/窗口状态，显示缓存大小，并可一键清除缓存重置。
- **双语支持**: 界面内置中/英文一键切换。
- **结果导出**: 支持将扫描到的文件列表和统计信息导出为文本文件。

### 🔧 环境要求

- **系统**: Windows 10/11 (64位)

### 🚀 如何使用

1. 前往 [Releases](https://github.com/JacktheRanger/Epic-Video-Finder/releases) 页面。
2. 下载 `Vx.x.x.Epic.Video.Finder.zip`。
3. 双击直接运行，无需安装任何环境。


### ⚙️ 设置与缓存

- 设置与缓存位于 `%APPDATA%\EpicVideoFinderCache`（例如 `settings.json`、`audio_fingerprints/`）。
- 音频指纹使用 gzip 压缩缓存，加速后续扫描。
- 关闭 **记住我的设置** 后，应用将不会在下次启动时保留设置。
- 使用 **清除缓存** 可重置已保存的设置（文件会发送到回收站）。


### 📄 许可证
GNU AGPL-3.0

### 👤 作者
Jack Ji &nbsp;&nbsp;   [![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/jackji)








---

<p align="center"><a href="#top">Back to Top</a></p>


























































































