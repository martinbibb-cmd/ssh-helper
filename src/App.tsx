// Minimal test version - checking if React works
function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', background: '#f7fafc', minHeight: '100vh' }}>
      <h1 style={{ color: '#667eea' }}>SSH Helper - React Test</h1>
      <p>✅ If you can see this, React is working!</p>
      <p>Now check the browser console (F12) for any JavaScript errors.</p>
      <hr style={{ margin: '2rem 0' }} />
      <p><strong>If this works, the issue is with:</strong></p>
      <ul>
        <li>React Router compatibility with React 19</li>
        <li>One of the page components</li>
        <li>Or the service worker</li>
      </ul>
    </div>
  );
}

export default App;
