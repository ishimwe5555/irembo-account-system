import { React,useState, useContext } from "react";
import { BrowserRouter as Router,Routes, Route, Link as RouterLink, useNavigate, Navigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import jwtDecode from 'jwt-decode';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "../styles/useStyles";
import fetch from '../api/fetch';

const LOGIN_URL = '/users/login';

function Login() {
  const classes = useStyles();

  // const { setAuth } = useContext(AuthContext)
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [pop, setPop] = useState('')
  const [password, setPassword] = useState(false);
  const [icon, setIcon] = useState(false);
  const [btn, setBtn] = useState('Log In');
  
  let LoggedIn = false
  if (localStorage.getItem("cooltoken") && localStorage.getItem("tempLog")) {
    return <Navigate to="/profile"/>
  }

  function popContact(text, color) {
    setPop(text);
    const popElement = document.getElementById('pop');
    if (popElement) {
      popElement.style.background = color;
      popElement.style.padding = '10px';
      setTimeout(() => {
        setPop('');
        popElement.style.padding = '0px';
      }, 5000);
    }
  }
  function disableBtn(text, bt) {
      setBtn(text)
      document.getElementById('btn').disabled = bt
  }
  const handleSubmit = async (e) => {
      e.preventDefault()
      const userCredentials = {
          email: email,
          password: pwd
      }
      try{
          disableBtn("Loading...", true)
          const response = await fetch.post(LOGIN_URL, userCredentials);
          disableBtn("Sign In", false)
              const statusCode = (response.Code) ? response.Code : response.code
              console.log(response)

              if (statusCode === 200) {
                  popContact(response.Message, "green")
                  const token = response.token
                  const userData = jwtDecode(token)
                  console.log(userData)
                  localStorage.setItem("tempLog", JSON.stringify(userData))
                  localStorage.setItem("cooltoken", token)
                  navigate(3)
              }
              if(response.error){
                  popContact(response.error, "red")
            }
            if(response.message){
                 popContact(response.message, "red")
            }
          
       }catch (err){
           disableBtn("Sign In", false)
          throw new Error(err)

       }
       }
  const togglePassword = () => {
      // When the handler is invoked
      // inverse the boolean state of passwordShown
      setPassword(!password);
      setIcon(!icon)
    };
  
  return (
    <div className={classes.formContainer}>
      <div className={classes.formWrapper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div className="pop-up" id='pop'>{pop}</div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submitButton}
            id='btn'
          >
            {btn}
          </Button>
          <Typography variant="body2" color="textSecondary" align="center">
            Don't have an account?{" "}
            <Link component={RouterLink} to="/signup">
              Sign Up
            </Link>
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            Forgot your password?{" "}
            <Link component={RouterLink} to="/reset-password">
              Reset Password
            </Link>
          </Typography>
        </form>
      </div>
    </div>
  );
}

export default Login;
