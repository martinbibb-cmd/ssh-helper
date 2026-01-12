export interface Host {
  id: string;
  name: string;
  username: string;
  host: string;
  port?: number;
  notes?: string;
}

export interface CommandInfo {
  title: string;
  command: string;
  expectedOutput: string;
  tips: string[];
}

export interface TroubleshootingItem {
  error: string;
  meaning: string;
  fixes: string[];
}
