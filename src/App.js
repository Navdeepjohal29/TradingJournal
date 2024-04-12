import './App.scss';
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import PublicRoute from './Routes/PublicRoute';
import PrivateRoute from './Routes/PrivateRoute';



function App() {
  return (
   <>
   <Router>
       <PrivateRoute path={`/`} component={PrivateRoute} />
      <PublicRoute path={`/`} component={PublicRoute} />

   </Router>
   </>
  );
}

export default App;
