import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserSearchPage } from './pages/UserSearchPage';
import { UserDetailPage } from './pages/UserDetailPage';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  { path: '/', element: <UserSearchPage /> },
  { path: '/user-detail/:userId', element: <UserDetailPage /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
