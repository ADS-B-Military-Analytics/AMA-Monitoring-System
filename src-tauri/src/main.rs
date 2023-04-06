#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use chrono::offset::Utc;
use chrono::DateTime;
use std::time::SystemTime;

#[tauri::command]
fn adsb() -> String {
    let now: DateTime<Utc> = SystemTime::now().into();
    let now = now.format("%Y-%m-%d %H:%M:%S").to_string();
    let adsb = format!("Hello from Rust at {}", now);
    adsb
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![adsb])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
