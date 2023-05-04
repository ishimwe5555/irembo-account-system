import React from 'react';
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container
} from '@material-ui/core';
import { useState } from "react";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from '../styles/useStyles';

export default function SignUp() {
  const classes = useStyles();
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [password, setPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pop, setPop] = useState('')
  const [icon, setIcon] = useState(false);
  const [btn, setBtn] = useState('Sign Up')

  function popContact(text, color) {
    setPop(text)
    document.getElementById('pop').style.background = color
    document.getElementById('pop').style.padding = '10px'

    setTimeout(() => {
        setPop('')
        document.getElementById('pop').style.padding = '0px'
    }, 5000);
}
function disableBtn(text, bt) {
    setBtn(text)
    document.getElementById('btn').disabled = bt
}
const handleSubmit = async e => {
    e.preventDefault()
    const detail = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
    }
    disableBtn("Loading...", true)
    const rawResponse = await fetch('https://my-brand-production.up.railway.app/users/signup', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(detail)
      });
      const content = await rawResponse.json();
      if (content.Error) {
        popContact(content.Error, "red")
      }
      if (content.message) {
        popContact(content.message, "green")
      }
      disableBtn("Sign Up", false)
    }
const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPassword(!password);
    setIcon(!icon)
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.header}>
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account?Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
