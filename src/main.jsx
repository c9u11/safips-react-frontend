import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ApiClientSetting } from '@/apis/apiClient';

createRoot(document.getElementById('root')).render(
  <>
    <ApiClientSetting />
    <App />
  </>
);
