# TTP Tournament Pro — Android APK starter

This repository contains a React + Vite + Capacitor starter UI and a GitHub Actions workflow to build a **debug APK**.

## Important: upload the project contents, not the ZIP file

On GitHub, the repository root should contain these items:

- `.github/workflows/build-apk.yml`
- `src/`
- `package.json`
- `vite.config.js`
- `capacitor.config.json`
- `index.html`

Do not upload only the ZIP as one file. Extract the ZIP first, then upload the files and folders inside it to the repository root. Do not create an extra nested project folder in the repository.

## Build APK on GitHub

1. Open the repository's **Actions** tab.
2. Select **Build Android APK**.
3. Tap **Run workflow** (or push a commit to `main`).
4. Wait for the run to finish successfully.
5. Open the successful run and find **Artifacts**.
6. Download `TTP-Tournament-debug-APK`, extract it, and install `app-debug.apk` on your Android phone. You may need to allow installation from your browser/file manager.

## Scope

This is a starter UI/demo, not a production online tournament service. Real accounts, live tournament data, matchmaking, admin tools, anti-cheat, and any payments/prizes require a backend and security work. The workflow builds a debug APK, not a Play Store signed release.
