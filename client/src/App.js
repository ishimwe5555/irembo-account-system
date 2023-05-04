import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import UserProfile from './components/UserProfile';
import Protected from "./components/Authentication/IsAuthenticated";
// import AdminProtected from "./components/Authentication/isAdmin";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  let LoggedIn = false
  // let LoggedInAsAdmin = false
  // if (localStorage.getItem("cooltoken") && JSON.parse(localStorage.getItem("tempLog")).role === "ADMIN") {
  //   LoggedInAsAdmin = true
  // }
  if (localStorage.getItem("cooltoken") && localStorage.getItem("tempLog")) {
    LoggedIn = true
  }
  return (
    <Router>
    <div className="app">
    <Routes>
       <Route exact path='/' element={<Login />}></Route>
      <Route exact path='/signup' element={<Signup />}></Route>
      <Route exact path='/login' element={<Login />}></Route>
      <Route exact path='/profile' element = {<Protected isLoggedIn={LoggedIn}><UserProfile /></Protected>}> </Route>
      <Route exact path='/reset-password' element = {<ResetPassword />}> </Route>
      {/* <Route exact path='/verify-account' element = {<AdminProtected isLoggedIn={LoggedIn}><VerifyAccount /></AdminProtected>}> </Route> */}
    </Routes>
    </div>
    
  </Router>
  );
}

export default App;
