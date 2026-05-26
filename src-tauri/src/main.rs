// EasyServe — Tauri Rust backend entry point.
// Registers all plugins and IPC command handlers.
// Actual logic lives in sub-modules.

#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod server_cmd;
mod file_mgr;
mod java_mgr;

fn main() {
    tauri::Builder::default()
        // ── Plugins ──────────────────────────────────────────────────
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_http::init())
        // ── IPC Handlers ─────────────────────────────────────────────
        .invoke_handler(tauri::generate_handler![
            server_cmd::start_server,
            server_cmd::stop_server,
            server_cmd::send_command,
            server_cmd::get_server_status,
            file_mgr::read_properties,
            file_mgr::write_property,
            file_mgr::write_eula,
            file_mgr::create_server_dir,
            java_mgr::detect_java,
            java_mgr::download_java,
        ])
        .setup(|app| {
            use tauri::Manager;
            let app_data_dir = app
                .path()
                .app_data_dir()
                .expect("Failed to resolve AppData directory");

            // Create base folder structure on first launch
            for sub in &["servers", "java", "playit"] {
                let dir = app_data_dir.join(sub);
                if !dir.exists() {
                    std::fs::create_dir_all(&dir)
                        .expect("Failed to create app directory");
                }
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("Error while running EasyServe");
}
