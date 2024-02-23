import './App.css';

import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
function App() {
  return (
    <div className="font-mono max-w[1440px] mx-auto w-[95%] ">
      <Toaster />
      <RouterProvider router={router} >
      </RouterProvider>
    </div>
  );
}

export default App;
