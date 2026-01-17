// リアクトアプリのエントリーポイント

import { StrictMode } from 'react' // 開発中のみ作用するストリクトモード
import { createRoot } from 'react-dom/client'
import './index.css' // グローバルCSS
import App from './App.tsx' // アプリ本体

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
