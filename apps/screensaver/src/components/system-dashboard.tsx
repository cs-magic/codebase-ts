import React, { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Activity, Cpu, Zap, Wifi, Globe, Database } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// import "./app/App.css";

const SystemDashboard = () => {
  const [time, setTime] = useState(new Date());
  const [systemInfo, setSystemInfo] = useState({
    cpu_usage: 0,
    memory_usage: 0,
    network_speed: 0,
    disk_usage: 0,
    battery_level: 0,
  });

  useEffect(() => {
    const updateInfo = async () => {
      setTime(new Date());
      const info = await invoke("get_system_info");
      console.log({ info });
      setSystemInfo(info);
    };

    updateInfo();
    const interval = setInterval(updateInfo, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (num) => num.toString().padStart(2, "0");

  const MetricCard = ({ Icon, title, value, unit }) => (
    <div className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4">
      <Icon size={24} className="text-cyan-400" />
      <div>
        <h3 className="text-sm text-gray-400">{title}</h3>
        <p className="text-xl font-bold">
          {value?.toFixed(2)} {unit}
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-screen h-screen bg-black text-cyan-400 flex flex-col justify-center items-center p-8 overflow-hidden">
      {/* Main Clock Display */}
      <div className="text-[320px] font-bold mb-8 relative">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          {`${formatTime(time.getHours())}:${formatTime(time.getMinutes())}`}
        </span>
        <span className="text-4xl ml-4 text-cyan-300">
          {formatTime(time.getSeconds())}
        </span>
      </div>

      {/* Date Display */}
      <div className="text-2xl mb-8">
        {time.toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
      {/* System Metrics Grid */}
      <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
        <MetricCard
          Icon={Cpu}
          title="CPU Usage"
          value={systemInfo.cpu_usage}
          unit="%"
        />
        <MetricCard
          Icon={Database}
          title="Memory Usage"
          value={systemInfo.memory_usage}
          unit="%"
        />
        <MetricCard
          Icon={Globe}
          title="Disk Usage"
          value={systemInfo.disk_usage}
          unit="%"
        />

        <MetricCard
          Icon={Activity}
          title="Network Speed"
          value={systemInfo.network_speed}
          unit="Mbps"
        />
        <MetricCard
          Icon={Zap}
          title="Battery Level"
          value={systemInfo.battery_level}
          unit="%"
        />
        <div className="bg-gray-800 p-4 rounded-lg flex flex-col justify-center">
          <h3 className="text-sm text-gray-400 mb-2">System Health</h3>
          <Progress value={100 - systemInfo.cpu_usage} className="h-2" />
          <p className="text-right text-sm mt-1">
            {(100 - systemInfo.cpu_usage).toFixed(2)}%
          </p>
        </div>
      </div>
      {/* System Status Message */}
      <div className="mt-8 text-sm">
        <p className="typing-effect">系统状态监控中...</p>
      </div>
    </div>
  );
};

export default SystemDashboard;
