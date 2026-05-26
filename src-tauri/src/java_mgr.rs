// java_mgr.rs — Detect installed portable JREs and download from Adoptium.

use std::path::PathBuf;

#[tauri::command]
pub async fn detect_java(app_data_dir: String, version: u8) -> Result<String, String> {
    let java_exe = PathBuf::from(&app_data_dir)
        .join("java")
        .join(version.to_string())
        .join("bin")
        .join("java.exe");
    if java_exe.exists() {
        Ok(java_exe.to_string_lossy().to_string())
    } else {
        Ok(String::new())
    }
}

#[tauri::command]
pub async fn download_java(app_data_dir: String, version: u8) -> Result<String, String> {
    // Stub — full implementation in Step 11
    Ok(format!("download_java stub: will install Java {version} to {app_data_dir}"))
}
