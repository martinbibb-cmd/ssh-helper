import { useState, useEffect } from 'react';
import type { Host } from '../types';
import { getHosts } from '../utils/storage';
import { HostSelector } from '../components/HostSelector';
import { CommandCard } from '../components/CommandCard';
import './Builder.css';

export const Builder = () => {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [selectedHostId, setSelectedHostId] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [host, setHost] = useState('');
  const [port, setPort] = useState('22');
  const [identityFile, setIdentityFile] = useState('');
  const [remoteCommand, setRemoteCommand] = useState('');
  const [localPath, setLocalPath] = useState('');
  const [remotePath, setRemotePath] = useState('');

  useEffect(() => {
    setHosts(getHosts());
  }, []);

  const handleHostSelect = (selectedHost: Host | null) => {
    if (selectedHost) {
      setSelectedHostId(selectedHost.id);
      setUsername(selectedHost.username);
      setHost(selectedHost.host);
      setPort(selectedHost.port?.toString() || '22');
    } else {
      setSelectedHostId(null);
    }
  };

  const buildCommand = (type: string): string => {
    const portNum = port && port !== '22' ? port : '';
    const identity = identityFile ? ` -i ${identityFile}` : '';

    switch (type) {
      case 'ssh':
        return `ssh ${username}@${host}`;
      case 'ssh-port':
        return `ssh -p ${portNum || '22'} ${username}@${host}`;
      case 'ssh-key':
        return `ssh${identity} ${username}@${host}`;
      case 'ssh-command':
        return `ssh ${username}@${host} "${remoteCommand || 'uptime'}"`;
      case 'ssh-copy-id':
        return `ssh-copy-id${identity} ${username}@${host}`;
      case 'scp-upload':
        return `scp ${localPath || '/local/file.txt'} ${username}@${host}:${remotePath || '/remote/path/'}`;
      case 'scp-download':
        return `scp ${username}@${host}:${remotePath || '/remote/file.txt'} ${localPath || '/local/path/'}`;
      case 'rsync-upload':
        return `rsync -avz ${localPath || '/local/dir/'} ${username}@${host}:${remotePath || '/remote/dir/'}`;
      case 'rsync-download':
        return `rsync -avz ${username}@${host}:${remotePath || '/remote/dir/'} ${localPath || '/local/dir/'}`;
      default:
        return '';
    }
  };

  const commands = [
    {
      title: 'Basic SSH Connection',
      type: 'ssh',
      expectedOutput: 'Password prompt or direct login',
      tips: ['Most basic form of SSH connection', 'Uses default port 22']
    },
    {
      title: 'SSH with Custom Port',
      type: 'ssh-port',
      expectedOutput: 'Connects to server on specified port',
      tips: ['Use when SSH runs on non-standard port', 'Common alternative ports: 2222, 22000']
    },
    {
      title: 'SSH with Identity File',
      type: 'ssh-key',
      expectedOutput: 'Connects using specified private key',
      tips: ['Useful when you have multiple SSH keys', 'Key file must have correct permissions (chmod 600)']
    },
    {
      title: 'SSH with Remote Command',
      type: 'ssh-command',
      expectedOutput: 'Command runs on server, output shows locally',
      tips: ['Executes command without interactive session', 'Good for scripting and automation']
    },
    {
      title: 'Install SSH Key',
      type: 'ssh-copy-id',
      expectedOutput: 'Prompts for password, then installs key',
      tips: ['Run this once to enable passwordless login', 'Requires password authentication to be enabled first']
    },
    {
      title: 'SCP Upload to Server',
      type: 'scp-upload',
      expectedOutput: 'Shows progress bar during transfer',
      tips: ['Add -r for directories', 'Ensure remote path exists']
    },
    {
      title: 'SCP Download from Server',
      type: 'scp-download',
      expectedOutput: 'Downloads file with progress indicator',
      tips: ['Use . as local path to download to current directory', 'Add -r for directories']
    },
    {
      title: 'Rsync Upload',
      type: 'rsync-upload',
      expectedOutput: 'Syncs files with detailed progress',
      tips: ['More efficient than scp for large transfers', 'Only transfers changed files', 'Flags: -a (archive), -v (verbose), -z (compress)']
    },
    {
      title: 'Rsync Download',
      type: 'rsync-download',
      expectedOutput: 'Syncs files from server to local',
      tips: ['Resume interrupted transfers', 'Preserves permissions and timestamps']
    }
  ];

  const isFormValid = username && host;

  return (
    <div className="builder-page">
      <div className="builder-header">
        <h2>Command Builder</h2>
        <p>Generate SSH commands with your custom parameters</p>
      </div>

      <div className="builder-form">
        <HostSelector
          hosts={hosts}
          selectedHostId={selectedHostId}
          onSelect={handleHostSelect}
        />

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="username">Username *</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. root"
            />
          </div>

          <div className="form-group">
            <label htmlFor="host">Host *</label>
            <input
              id="host"
              type="text"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              placeholder="e.g. 192.168.1.10"
            />
          </div>

          <div className="form-group">
            <label htmlFor="port">Port</label>
            <input
              id="port"
              type="text"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              placeholder="22"
            />
          </div>

          <div className="form-group">
            <label htmlFor="identityFile">Identity File</label>
            <input
              id="identityFile"
              type="text"
              value={identityFile}
              onChange={(e) => setIdentityFile(e.target.value)}
              placeholder="~/.ssh/id_ed25519"
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="remoteCommand">Remote Command</label>
            <input
              id="remoteCommand"
              type="text"
              value={remoteCommand}
              onChange={(e) => setRemoteCommand(e.target.value)}
              placeholder="e.g. uptime"
            />
          </div>

          <div className="form-group">
            <label htmlFor="localPath">Local Path</label>
            <input
              id="localPath"
              type="text"
              value={localPath}
              onChange={(e) => setLocalPath(e.target.value)}
              placeholder="/local/file.txt"
            />
          </div>

          <div className="form-group">
            <label htmlFor="remotePath">Remote Path</label>
            <input
              id="remotePath"
              type="text"
              value={remotePath}
              onChange={(e) => setRemotePath(e.target.value)}
              placeholder="/remote/path/"
            />
          </div>
        </div>
      </div>

      {!isFormValid && (
        <div className="validation-message">
          Please enter username and host to generate commands
        </div>
      )}

      {isFormValid && (
        <div className="commands-section">
          <h3>Generated Commands</h3>
          <div className="commands-grid">
            {commands.map((cmd, index) => (
              <CommandCard
                key={index}
                title={cmd.title}
                command={buildCommand(cmd.type)}
                expectedOutput={cmd.expectedOutput}
                tips={cmd.tips}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
