import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Theme accentColor="mint"
  grayColor="sage"
  panelBackground="translucent"
  scaling="100%"
  radius="medium"> <App /> </Theme>
    </BrowserRouter>
  </React.StrictMode>,
)
