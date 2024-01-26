import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './containers/components/PrivateRoute';
import Home from './containers/Home/Loadable';

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
      </Routes>
    </>
  );
}

export default App;
