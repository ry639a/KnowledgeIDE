import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Tiptap from './Tiptap.tsx'
import App from './App.tsx'
import Query from './Query.tsx'
import "./PartitionPage.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <title>IDE</title>
    <div className="page-container">
      <div className="left-panel">
        <Tiptap />
      </div>
      <div className="right-panel">
        <App />
      </div>
    </div>
  </StrictMode>,
)
