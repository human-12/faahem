// Types for ESP32-S3 3D Hardware Laboratory Experience

export type ESP32ComponentId =
  | 'chip'
  | 'gpio_left'
  | 'gpio_right'
  | 'usb_c'
  | 'boot_btn'
  | 'reset_btn'
  | 'led_power'
  | 'led_status'
  | 'led_gpio4'
  | 'antenna'
  | 'ldo_regulator'
  | 'camera_module'
  | 'temp_sensor';

export interface ComponentInfo {
  id: ESP32ComponentId;
  name: string;
  category: string;
  role: string;
  details: string[];
  specs: { [key: string]: string };
}

export interface GPIOPin {
  pin: number;
  label: string;
  side: 'left' | 'right';
  mode: 'INPUT' | 'OUTPUT' | 'PWM' | 'ADC';
  state: 'LOW' | 'HIGH';
  function: string;
  isSpecial?: boolean;
}

export interface HardwareObjective {
  id: 'activate_led' | 'connect_sensor' | 'sync_twin';
  title: string;
  description: string;
  isCompleted: boolean;
  xpReward: number;
}

export interface EdgeAIPipelineStage {
  id: 'camera' | 'capture' | 'edge_proc' | 'inference' | 'result';
  title: string;
  subtitle: string;
  description: string;
  status: 'IDLE' | 'ACTIVE' | 'PROCESSING' | 'COMPLETE';
}

export interface SensorTelemetry {
  temperature: number;
  humidity: number;
  voltage: number;
  connected: boolean;
  bus: 'I2C (GPIO 1 / GPIO 2)' | 'SPI' | 'DISCONNECTED';
}

export interface DigitalTwinState {
  isSynced: boolean;
  syncRate: string;
  latencyMs: number;
  packetCount: number;
  twinTemperature: number;
}
