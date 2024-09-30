use sysinfo::{System, SystemExt, CpuExt, DiskExt};
use tauri::command;

#[derive(serde::Serialize)]
struct SystemInfo {
    cpu_usage: f32,
    memory_usage: f32,
    network_speed: f32,
    disk_usage: f32,
    battery_level: f32,
}

#[command]
fn get_system_info() -> SystemInfo {
    let mut sys = System::new_all();
    sys.refresh_all();

    let cpu_usage = sys.global_cpu_info().cpu_usage();
    let total_memory = sys.total_memory();
    let used_memory = sys.used_memory();
    let memory_usage = (used_memory as f32 / total_memory as f32) * 100.0;

    // Note: Getting real-time network speed requires more complex logic
    // This is a placeholder value
    let network_speed = 10.0;

    let disk_usage = sys.disks().iter().next()
        .map(|disk| {
            let used = disk.total_space() - disk.available_space();
            (used as f32 / disk.total_space() as f32) * 100.0
        })
        .unwrap_or(0.0);

    // Note: Battery information might not be available on all systems
    // This is a placeholder value
    let battery_level = 80.0;

    SystemInfo {
        cpu_usage,
        memory_usage,
        network_speed,
        disk_usage,
        battery_level,
    }
}

#[tauri::command]
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_system_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
