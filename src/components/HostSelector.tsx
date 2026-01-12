import type { Host } from '../types';
import './HostSelector.css';

interface HostSelectorProps {
  hosts: Host[];
  selectedHostId: string | null;
  onSelect: (host: Host | null) => void;
}

export const HostSelector = ({ hosts, selectedHostId, onSelect }: HostSelectorProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const hostId = e.target.value;
    if (hostId === '') {
      onSelect(null);
    } else {
      const host = hosts.find(h => h.id === hostId);
      if (host) {
        onSelect(host);
      }
    }
  };

  return (
    <div className="host-selector">
      <label htmlFor="host-select">Select a saved host:</label>
      <select
        id="host-select"
        value={selectedHostId || ''}
        onChange={handleChange}
        className="host-select"
      >
        <option value="">-- Custom --</option>
        {hosts.map(host => (
          <option key={host.id} value={host.id}>
            {host.name} ({host.username}@{host.host})
          </option>
        ))}
      </select>
    </div>
  );
};
