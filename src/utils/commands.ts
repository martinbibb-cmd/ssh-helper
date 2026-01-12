import type { CommandInfo, TroubleshootingItem } from '../types';

export const getQuickCommands = (): CommandInfo[] => [
  {
    title: 'Connect to SSH',
    command: 'ssh user@host',
    expectedOutput: 'You should see a password prompt or be logged in directly if using keys.',
    tips: [
      'Replace "user" with your username',
      'Replace "host" with the IP address or hostname',
      'On first connection, type "yes" when asked to verify the host key'
    ]
  },
  {
    title: 'Copy Public Key',
    command: 'cat ~/.ssh/id_ed25519.pub',
    expectedOutput: 'Your public key will be displayed, starting with "ssh-ed25519"',
    tips: [
      'If the file doesn\'t exist, generate a key first with: ssh-keygen -t ed25519',
      'For RSA keys, use: cat ~/.ssh/id_rsa.pub',
      'Copy the entire output including the email at the end'
    ]
  },
  {
    title: 'Install Key on Server',
    command: 'ssh-copy-id user@host',
    expectedOutput: 'You\'ll be asked for your password, then the key will be installed.',
    tips: [
      'After this, you can log in without a password',
      'Ensure you have a public key generated first',
      'Test with: ssh user@host (should not ask for password)'
    ]
  },
  {
    title: 'Run Remote Command',
    command: 'ssh user@host "uptime"',
    expectedOutput: 'The command output will appear in your terminal, then disconnect.',
    tips: [
      'Replace "uptime" with any command',
      'Use quotes around the command',
      'Good for quick status checks without full login'
    ]
  },
  {
    title: 'Copy File TO Server',
    command: 'scp /local/file.txt user@host:/remote/path/',
    expectedOutput: 'Progress bar shows transfer, then returns to prompt.',
    tips: [
      'Replace paths with actual file locations',
      'For directories, add -r flag: scp -r /local/dir/ user@host:/remote/',
      'Paths must exist on both sides'
    ]
  },
  {
    title: 'Copy File FROM Server',
    command: 'scp user@host:/remote/file.txt /local/path/',
    expectedOutput: 'File downloads with progress indicator.',
    tips: [
      'Make sure local directory exists',
      'For directories, add -r flag',
      'Use . to download to current directory'
    ]
  }
];

export const getTroubleshooting = (): TroubleshootingItem[] => [
  {
    error: 'Permission denied (publickey)',
    meaning: 'Server is rejecting your authentication. Either no key is installed, or the wrong key is being used.',
    fixes: [
      'ssh-copy-id user@host',
      'ssh -v user@host',
      'Check ~/.ssh/authorized_keys on server',
      'Ensure correct permissions: chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys'
    ]
  },
  {
    error: 'Host key verification failed',
    meaning: 'The server\'s fingerprint has changed since you last connected. This could be a security issue or the server was reinstalled.',
    fixes: [
      'ssh-keygen -R hostname',
      'ssh-keygen -R ip_address',
      'rm ~/.ssh/known_hosts',
      'Then reconnect and type "yes" to accept the new key'
    ]
  },
  {
    error: 'Connection timed out',
    meaning: 'Cannot reach the server. Network issue, firewall, or server is down.',
    fixes: [
      'ping hostname',
      'Check if server is powered on',
      'Verify you\'re on the correct network',
      'Check firewall rules on server: sudo ufw status',
      'Try different port: ssh -p 2222 user@host'
    ]
  },
  {
    error: 'No route to host',
    meaning: 'Your computer cannot find a network path to the server.',
    fixes: [
      'Check IP address is correct',
      'Ensure both devices are on same network (or proper routing exists)',
      'Restart router/switch',
      'Check network cables'
    ]
  },
  {
    error: 'Could not resolve hostname',
    meaning: 'DNS cannot find the hostname you entered.',
    fixes: [
      'Use IP address instead: ssh user@192.168.1.10',
      'Check spelling of hostname',
      'Try: ping hostname',
      'Check /etc/hosts file for local entries',
      'Verify DNS settings'
    ]
  },
  {
    error: 'Connection refused',
    meaning: 'Server is reachable but SSH service is not running or wrong port.',
    fixes: [
      'Check SSH service on server: sudo systemctl status sshd',
      'Start SSH service: sudo systemctl start sshd',
      'Try different port: ssh -p 2222 user@host',
      'Check server firewall allows port 22'
    ]
  }
];
