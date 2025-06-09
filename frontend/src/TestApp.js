import React from 'react';

function TestApp() {
  return (
    <div style={{ padding: '20px', background: '#f0f0f0', minHeight: '100vh' }}>
      <h1>3D Kitchen Designer - Loading Test</h1>
      <p>If you can see this, React is working correctly!</p>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
        <h2>Application Status:</h2>
        <ul>
          <li>✅ React is mounting</li>
          <li>✅ JavaScript is executing</li>
          <li>✅ CSS is loading</li>
        </ul>
      </div>
    </div>
  );
}

export default TestApp;