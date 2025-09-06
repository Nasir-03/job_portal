// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import App from './App.jsx';
// import { Provider } from 'react-redux';
// import store from './slices/Store'; // ✅ fixed path

// createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <StrictMode>
//       <App />
//     </StrictMode>
//   </Provider>
// );


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';      // ✅ from react-redux
import store from './slices/store';                // your configured store

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
