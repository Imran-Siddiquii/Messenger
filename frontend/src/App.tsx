import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './containers/components/PrivateRoute';
import Home from './containers/Home/Loadable';
import Auth from './containers/Auth/Loadable';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
