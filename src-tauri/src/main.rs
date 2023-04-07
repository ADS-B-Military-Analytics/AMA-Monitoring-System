#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

pub mod mongo;

#[tauri::command]
async fn mongo_count() -> u64 {
    let count = mongo::mongo().await;
    count
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![mongo_count])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
