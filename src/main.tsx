import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme accentColor="mint"
      grayColor="sage"
      panelBackground="translucent"
      scaling="100%"
      radius="medium"> <App /> </Theme>
  </React.StrictMode>,
)
