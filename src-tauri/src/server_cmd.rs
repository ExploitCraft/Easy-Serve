// server_cmd.rs — Spawn, stop, and communicate with Minecraft Java processes.

use std::collections::HashMap;
use std::sync::Mutex;

pub struct RunningServers(pub Mutex<HashMap<String, u32>>);

#[tauri::command]
pub async fn start_server(server_id: String) -> Result<String, String> {
    // Stub — full implementation in Step 5
    Ok(format!("start_server called for: {server_id}"))
}

#[tauri::command]
pub async fn stop_server(server_id: String) -> Result<String, String> {
    // Stub — full implementation in Step 5
    Ok(format!("stop_server called for: {server_id}"))
}

#[tauri::command]
pub async fn send_command(server_id: String, command: String) -> Result<(), String> {
    // Stub — full implementation in Step 5
    println!("[EasyServe] command -> {server_id}: {command}");
    Ok(())
}

#[tauri::command]
pub async fn get_server_status(server_id: String) -> Result<String, String> {
    // Stub — returns "offline" until Step 5
    let _ = server_id;
    Ok("offline".to_string())
}
