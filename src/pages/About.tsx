import './About.css';

export const About = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h2>About SSH Helper</h2>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h3>What is SSH?</h3>
          <p>
            SSH (Secure Shell) is a network protocol that allows you to securely access and manage remote computers over an unsecured network. It's commonly used by system administrators, developers, and anyone who needs to work with remote servers.
          </p>
          <p>
            SSH provides strong encryption to protect your connection from eavesdropping, hijacking, and other attacks. It's the standard way to access Linux servers, Raspberry Pi devices, NAS systems, and many other devices.
          </p>
        </section>

        <section className="about-section">
          <h3>What Does SSH Helper Do?</h3>
          <p>
            SSH Helper is a mobile-first web app designed to make SSH easier, especially when you're on the go. It provides:
          </p>
          <ul>
            <li><strong>Quick Commands:</strong> Common SSH commands ready to copy</li>
            <li><strong>Command Builder:</strong> Generate custom SSH commands with your specific parameters</li>
            <li><strong>Host Management:</strong> Save your frequently-used servers for quick access</li>
            <li><strong>Troubleshooting:</strong> Solutions for common SSH errors</li>
            <li><strong>Offline Access:</strong> Works without internet after first load</li>
          </ul>
        </section>

        <section className="about-section warning">
          <h3>⚠️ Important Safety Notes</h3>
          <ul>
            <li><strong>Never paste commands you don't understand.</strong> Always read what a command does before running it.</li>
            <li><strong>Keep your SSH keys secure.</strong> Never share your private key files.</li>
            <li><strong>Use strong passwords or key-based authentication.</strong> Disable password authentication when possible.</li>
            <li><strong>Verify host fingerprints.</strong> When connecting to a server for the first time, verify the fingerprint matches what you expect.</li>
            <li><strong>Keep software updated.</strong> Regularly update SSH clients and servers to patch security vulnerabilities.</li>
            <li><strong>Be cautious with root access.</strong> Only use root when necessary, and consider using sudo instead.</li>
          </ul>
        </section>

        <section className="about-section">
          <h3>Privacy & Data</h3>
          <p>
            SSH Helper stores all your data locally in your browser using localStorage. Nothing is sent to any server. Your host information never leaves your device.
          </p>
          <p>
            You can export your hosts as JSON for backup and import them on another device.
          </p>
        </section>

        <section className="about-section">
          <h3>How to Install</h3>
          <p><strong>On iOS (iPhone/iPad):</strong></p>
          <ol>
            <li>Open this site in Safari</li>
            <li>Tap the Share button (box with arrow)</li>
            <li>Scroll down and tap "Add to Home Screen"</li>
            <li>Tap "Add"</li>
          </ol>

          <p><strong>On Android:</strong></p>
          <ol>
            <li>Open this site in Chrome</li>
            <li>Tap the menu (three dots)</li>
            <li>Tap "Add to Home screen" or "Install app"</li>
            <li>Tap "Add" or "Install"</li>
          </ol>

          <p><strong>On Desktop:</strong></p>
          <ol>
            <li>Look for the install icon in your browser's address bar</li>
            <li>Click it and follow the prompts</li>
          </ol>
        </section>

        <section className="about-section">
          <h3>Open Source</h3>
          <p>
            SSH Helper is built with React, TypeScript, and Vite. It's designed to be simple, fast, and work completely offline after the initial load.
          </p>
        </section>
      </div>
    </div>
  );
};
