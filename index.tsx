
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// ピンチイン/ピンチアウトを防ぐ
const preventZoom = () => {
  let lastTouchEnd = 0;
  
  document.addEventListener('touchend', (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

  // viewportの変更を監視
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    const observer = new MutationObserver(() => {
      const currentContent = viewport.getAttribute('content');
      if (!currentContent?.includes('user-scalable=no')) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover');
      }
    });
    observer.observe(viewport, { attributes: true, attributeFilter: ['content'] });
  }
};

// DOMContentLoaded後に実行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', preventZoom);
} else {
  preventZoom();
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
