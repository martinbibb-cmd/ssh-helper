import { useState } from 'react';
import { copyToClipboard } from '../utils/clipboard';
import { Toast } from './Toast';
import './CommandCard.css';

interface CommandCardProps {
  title: string;
  command: string;
  expectedOutput: string;
  tips: string[];
  showDetails?: boolean;
}

export const CommandCard = ({
  title,
  command,
  expectedOutput,
  tips,
  showDetails = true
}: CommandCardProps) => {
  const [showToast, setShowToast] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(command);
    if (success) {
      setShowToast(true);
    }
  };

  return (
    <>
      <div className="command-card">
        <h3 className="command-title">{title}</h3>
        <div className="command-box">
          <code className="command-text">{command}</code>
          <button className="copy-button" onClick={handleCopy}>
            Copy
          </button>
        </div>

        {showDetails && (
          <>
            <button
              className="expand-button"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? '▼' : '▶'} {expanded ? 'Hide details' : 'Show details'}
            </button>

            {expanded && (
              <div className="command-details">
                <div className="detail-section">
                  <h4>Expected output:</h4>
                  <p>{expectedOutput}</p>
                </div>

                {tips.length > 0 && (
                  <div className="detail-section">
                    <h4>Tips:</h4>
                    <ul>
                      {tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {showToast && <Toast message="Copied!" onClose={() => setShowToast(false)} />}
    </>
  );
};
