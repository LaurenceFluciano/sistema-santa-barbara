import AppRoutes from '@/application/routes/AppRoutes';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@/ui/styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
)
