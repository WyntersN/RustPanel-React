export interface AntdConfig {
  configProvider?: { [x: string]: any };
  dark?: boolean;
  compact?: boolean;
  import?: boolean;
  style?: "less" | "css" | undefined;
  theme?: { [x: string]: any };
  appConfig?: { [x: string]: any };
  momentPicker?: boolean;
  styleProvider?: { [x: string]: any };
}
