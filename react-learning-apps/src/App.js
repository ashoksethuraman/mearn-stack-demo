import './App.css';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from "./components/Router";
import { AuthProvider } from './context/AuthContext';

function App() {
  return <div className="App">
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </div>
}

export default App;
