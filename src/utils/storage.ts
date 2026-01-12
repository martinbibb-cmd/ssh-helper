import type { Host } from '../types';

const STORAGE_VERSION = 1;
const HOSTS_KEY = 'ssh-helper-hosts';
const VERSION_KEY = 'ssh-helper-version';

const defaultHosts: Host[] = [
  {
    id: '1',
    name: 'Example NAS',
    username: 'admin',
    host: '192.168.1.10',
    port: 22,
    notes: 'Home network storage'
  },
  {
    id: '2',
    name: 'Raspberry Pi',
    username: 'pi',
    host: '192.168.1.20',
    notes: 'Home automation server'
  }
];

export const initStorage = (): void => {
  const version = localStorage.getItem(VERSION_KEY);
  if (!version) {
    localStorage.setItem(VERSION_KEY, STORAGE_VERSION.toString());
    saveHosts(defaultHosts);
  }
};

export const getHosts = (): Host[] => {
  const data = localStorage.getItem(HOSTS_KEY);
  if (!data) {
    return defaultHosts;
  }
  try {
    return JSON.parse(data);
  } catch {
    return defaultHosts;
  }
};

export const saveHosts = (hosts: Host[]): void => {
  localStorage.setItem(HOSTS_KEY, JSON.stringify(hosts));
};

export const addHost = (host: Omit<Host, 'id'>): Host => {
  const hosts = getHosts();
  const newHost: Host = {
    ...host,
    id: Date.now().toString()
  };
  hosts.push(newHost);
  saveHosts(hosts);
  return newHost;
};

export const updateHost = (id: string, updates: Partial<Host>): void => {
  const hosts = getHosts();
  const index = hosts.findIndex(h => h.id === id);
  if (index !== -1) {
    hosts[index] = { ...hosts[index], ...updates };
    saveHosts(hosts);
  }
};

export const deleteHost = (id: string): void => {
  const hosts = getHosts();
  const filtered = hosts.filter(h => h.id !== id);
  saveHosts(filtered);
};

export const exportHosts = (): string => {
  const hosts = getHosts();
  return JSON.stringify(hosts, null, 2);
};

export const importHosts = (jsonString: string): boolean => {
  try {
    const hosts = JSON.parse(jsonString);
    if (Array.isArray(hosts)) {
      saveHosts(hosts);
      return true;
    }
    return false;
  } catch {
    return false;
  }
};
