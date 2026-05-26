# ⛏ EasyServe — Minecraft Server Manager

> A fast, beautiful Windows desktop app for installing, running, and managing Minecraft servers — no command line required.

![EasyServe Screenshot](docs/screenshot.png)

---

## ✨ Features

- **One-click server creation** — Vanilla, Paper, Fabric, Forge, and Purpur support
- **Live console** — Full ANSI-colour terminal output with command input, powered by xterm.js
- **Server settings GUI** — Edit `server.properties` visually, including cracked mode toggle
- **Plugin & mod browser** — Search and install from Modrinth and Hangar with one click
- **Geyser + Floodgate** — Bedrock crossplay setup in two clicks
- **playit.gg tunnel** — Free public IP for your server, no port forwarding needed
- **Java auto-manager** — Downloads the correct JRE (8 / 17 / 21) automatically per version
- **Tiny footprint** — Built with Tauri + Rust; uses your OS's native WebView2, not a bundled Chromium

---

## 🖥 System Requirements

| Requirement | Minimum |
|---|---|
| OS | Windows 10 (1803+) or Windows 11 |
| RAM | 512 MB for the app itself (plus RAM for your servers) |
| Disk | 200 MB for the app; ~500 MB per server instance |
| Runtime | [Microsoft WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/) (pre-installed on Win 11) |

---

## 🚀 Installation (End Users)

1. Go to the [**Releases**](../../releases) page
2. Download `EasyServe_x.x.x_x64-setup.exe`
3. Run the installer — Windows may show a SmartScreen warning since the app is unsigned; click **More info → Run anyway**
4. Launch **EasyServe** from your Start menu or Desktop shortcut

> Java is **not** required beforehand — EasyServe downloads the correct version automatically.

---

## 🛠 Development Setup

### Prerequisites

Install these tools before cloning the repo:

```bash
# 1. Rust (includes cargo)
#    → https://rustup.rs
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 2. Node.js 20 LTS
#    → https://nodejs.org

# 3. Visual Studio C++ Build Tools  (required by Rust on Windows)
#    → https://visualstudio.microsoft.com/visual-cpp-build-tools/
#    Install workload: "Desktop development with C++"

# 4. WebView2 Runtime  (Windows 10 only — already present on Win 11)
#    → https://developer.microsoft.com/en-us/microsoft-edge/webview2/

# 5. Tauri CLI
cargo install tauri-cli --version "^2.0"
```

### Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/easyserve.git
cd easyserve
npm install
```

### Run in Development Mode

```bash
npm run tauri dev
```

> The first run takes **3–5 minutes** while Rust compiles all dependencies.  
> Subsequent runs are much faster. React hot-reload works instantly during development.

### Build for Production

```bash
npm run tauri build
```

The installer and portable `.exe` will appear in:

```
src-tauri/target/release/bundle/
├── msi/          ← Windows Installer (.msi)
└── nsis/         ← NSIS installer (.exe)  ← recommended
```

---

## 📁 Project Structure

```
easyserve/
├── src/                        # React + TypeScript frontend
│   ├── components/
│   │   ├── Layout.tsx          # Sidebar + topbar shell
│   │   └── NewServerModal.tsx  # New server wizard
│   ├── pages/
│   │   ├── Dashboard.tsx       # Server cards grid
│   │   ├── Console.tsx         # Live terminal + controls
│   │   ├── Settings.tsx        # server.properties GUI
│   │   ├── Plugins.tsx         # Modrinth/Hangar plugin browser
│   │   ├── Mods.tsx            # Modrinth mod browser
│   │   ├── Network.tsx         # playit.gg tunnel manager
│   │   └── JavaManager.tsx     # JRE downloader / detector
│   ├── stores/
│   │   └── serverStore.ts      # Zustand global state
│   ├── App.tsx                 # Router root
│   ├── main.tsx                # React entry point
│   └── index.css               # Global styles + CSS variables
│
├── src-tauri/                  # Rust backend (Tauri)
│   ├── src/
│   │   ├── main.rs             # Entry point + plugin registration
│   │   ├── server_cmd.rs       # Java process management (start/stop/pipe)
│   │   ├── file_mgr.rs         # server.properties + eula.txt I/O
│   │   └── java_mgr.rs         # JRE detection + Adoptium downloader
│   ├── Cargo.toml
│   ├── build.rs
│   └── tauri.conf.json         # App config (window, permissions, bundle)
│
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## 🗺 Roadmap

| Step | Feature | Status |
|------|---------|--------|
| 1 | Project scaffold + folder structure | ✅ Done |
| 2 | Main window shell + sidebar navigation | 🔄 Next |
| 3 | Dashboard / home screen | ⏳ Planned |
| 4 | New server wizard (type, version, RAM, port) | ⏳ Planned |
| 5 | Server console & controls (start/stop/restart + live logs) | ⏳ Planned |
| 6 | Settings panel (all server.properties + cracked mode) | ⏳ Planned |
| 7 | Plugin browser (Modrinth + Hangar, one-click install) | ⏳ Planned |
| 8 | Mod browser (Modrinth, one-click install) | ⏳ Planned |
| 9 | Geyser + Floodgate auto-setup | ⏳ Planned |
| 10 | playit.gg tunnel integration | ⏳ Planned |
| 11 | Java auto-detection & installer | ⏳ Planned |
| 12 | Final polish, error handling & Windows packaging | ⏳ Planned |

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Desktop framework | [Tauri 2](https://tauri.app) (Rust + WebView2) |
| Frontend | [React 18](https://react.dev) + [TypeScript](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
| State management | [Zustand](https://zustand-demo.pmnd.rs) |
| Terminal emulator | [xterm.js](https://xtermjs.org) |
| Icons | [Lucide React](https://lucide.dev) |
| Fonts | [Outfit](https://fonts.google.com/specimen/Outfit) + [JetBrains Mono](https://www.jetbrains.com/legalnotice/jetbrainsmono/) |
| Server APIs | Mojang, PaperMC, Modrinth, Hangar, Adoptium, GeyserMC |

---

## 🤝 Contributing

Contributions are welcome! Please open an issue before submitting a large PR so we can discuss the approach.

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: describe your change"
git push origin feature/your-feature-name
# Open a Pull Request
```

---

## ⚖️ License

MIT — see [LICENSE](LICENSE) for details.

---

## ⚠️ Disclaimer

EasyServe is an independent project and is not affiliated with Mojang Studios or Microsoft. By using EasyServe to create a server you agree to the [Minecraft End User License Agreement](https://www.minecraft.net/en-us/eula). Always use servers responsibly.
