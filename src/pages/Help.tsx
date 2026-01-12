import { useState } from 'react';
import { getTroubleshooting } from '../utils/commands';
import { copyToClipboard } from '../utils/clipboard';
import { Toast } from '../components/Toast';
import './Help.css';

export const Help = () => {
  const [toast, setToast] = useState<string | null>(null);
  const troubleshooting = getTroubleshooting();

  const handleCopy = async (text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setToast('Copied!');
    }
  };

  return (
    <div className="help-page">
      <div className="help-header">
        <h2>Troubleshooting</h2>
        <p>Common SSH errors and how to fix them</p>
      </div>

      <div className="troubleshooting-grid">
        {troubleshooting.map((item, index) => (
          <div key={index} className="troubleshooting-card">
            <h3 className="error-title">{item.error}</h3>

            <div className="meaning-section">
              <h4>What it means:</h4>
              <p>{item.meaning}</p>
            </div>

            <div className="fixes-section">
              <h4>How to fix:</h4>
              <div className="fixes-list">
                {item.fixes.map((fix, fixIndex) => (
                  <div key={fixIndex} className="fix-item">
                    <code className="fix-command">{fix}</code>
                    <button
                      className="fix-copy-btn"
                      onClick={() => handleCopy(fix)}
                      title="Copy command"
                    >
                      Copy
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="help-tip">
        <h3>General Debugging Tips</h3>
        <ul>
          <li>Use <code>ssh -v user@host</code> for verbose output to see what's happening</li>
          <li>Use <code>ssh -vv user@host</code> for even more detailed debugging info</li>
          <li>Check server logs: <code>sudo tail -f /var/log/auth.log</code> (Ubuntu/Debian) or <code>sudo tail -f /var/log/secure</code> (CentOS/RHEL)</li>
          <li>Verify SSH service is running: <code>sudo systemctl status sshd</code></li>
          <li>Test network connectivity: <code>ping hostname</code> or <code>telnet hostname 22</code></li>
        </ul>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};
