import React, { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Loading from 'react-simple-loading';
import TopBarProgress from "react-topbar-progress-indicator"
import Icon from './icon';
import useStyles from './styles';
import Input from './Input';

import { signup, signin } from '../../features/auth/authActions';
import Error from '../Error';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', isAdmin: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const { loading, userInfo, error, success, userToken } = useSelector(
    (state) => state.auth
  )

  // console.log("Auth: userInfo", userInfo)
  // console.log("Auth: form", form)
  
  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    // .dispacth an action and give two thing form and history 
    if (isSignup) {
      if (form.password !== form.confirmPassword) {
        alert('Password mismatch')
        return
      }
      dispatch(signup(form));
    } else {
      dispatch(signin(form));      
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    if(userInfo) navigate(`/auth/${userInfo._id}`)
  }, [userInfo])
  

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={5}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {error && <Error>{error}</Error>}
        <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
        {
          loading ? (
            <div>
              <TopBarProgress></TopBarProgress>
              <Loading
                color={'firebrick'}
                stroke={'5px'}
                size={'70px'} />
            </div>

          ) : (
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {isSignup && (
                  <>
                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                  </>
                )}
                <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
              </Grid>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                {isSignup ? 'Sign Up' : 'Sign In'}
              </Button>
              <GoogleLogin
                clientId="564033717568-e5p23rhvcs4i6kffgsbci1d64r8hp6fn.apps.googleusercontent.com"
                render={(renderProps) => (
                  <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                    Google Sign In
                  </Button>
                )}
                // onSuccess={googleSuccess}
                // onFailure={googleError}
                cookiePolicy="single_host_origin"
              />
              <Grid container justify="flex-end">
                <Grid item>
                  <Button onClick={switchMode}>
                    {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          )
        }
      </Paper>
    </Container>
  );
};

export default SignUp;
