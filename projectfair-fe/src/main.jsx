import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import ContextShare from './Context/ContextShare.jsx'
createRoot(document.getElementById('root')).render(
 
  //to implement contextApi, we hve to enclose App component inside ContextShare
  <ContextShare>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextShare>
)
