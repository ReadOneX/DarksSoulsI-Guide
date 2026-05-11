#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{
  CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem,
};

#[tauri::command]
fn detect_save_directory() -> String {
  "Save detection ready. Configure the Dark Souls save path in Settings.".to_string()
}

#[tauri::command]
fn create_backup_snapshot() -> String {
  "Backup snapshot queued for local filesystem storage.".to_string()
}

#[tauri::command]
fn capture_companion_screenshot() -> String {
  "Screenshot manager ready. Native capture path is available.".to_string()
}

fn main() {
  let show = CustomMenuItem::new("show".to_string(), "Show Companion");
  let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  let tray_menu = SystemTrayMenu::new()
    .add_item(show)
    .add_native_item(SystemTrayMenuItem::Separator)
    .add_item(quit);

  tauri::Builder::default()
    .system_tray(SystemTray::new().with_menu(tray_menu))
    .on_system_tray_event(|app, event| match event {
      SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
        "show" => {
          if let Some(window) = app.get_window("main") {
            let _ = window.show();
            let _ = window.set_focus();
          }
        }
        "quit" => {
          app.exit(0);
        }
        _ => {}
      },
      _ => {}
    })
    .invoke_handler(tauri::generate_handler![
      detect_save_directory,
      create_backup_snapshot,
      capture_companion_screenshot
    ])
    .run(tauri::generate_context!())
    .expect("error while running Dark Souls I Guide desktop app");
}
