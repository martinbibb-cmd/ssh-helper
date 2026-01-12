import { CommandCard } from '../components/CommandCard';
import { getQuickCommands } from '../utils/commands';
import './Home.css';

export const Home = () => {
  const commands = getQuickCommands();

  return (
    <div className="home">
      <div className="welcome">
        <h2>Quick SSH Commands</h2>
        <p>Common SSH operations at your fingertips. Tap to copy any command.</p>
      </div>

      <div className="commands-grid">
        {commands.map((cmd, index) => (
          <CommandCard
            key={index}
            title={cmd.title}
            command={cmd.command}
            expectedOutput={cmd.expectedOutput}
            tips={cmd.tips}
          />
        ))}
      </div>
    </div>
  );
};
