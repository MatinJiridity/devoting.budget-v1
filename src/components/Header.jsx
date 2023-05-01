import { Link } from "react-router-dom";
import { AppBar, Typography } from '@material-ui/core';
import useStyles from './styles';
import { useEffect, useState } from "react";
import { logOut } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import decode from 'jwt-decode';

const Header = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loaction = useLocation();

  // console.log('Header: user ', user)

  const logout = () => {
    dispatch(logOut());
    setUser(null);

    navigate('/auth')

  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [loaction]);

  return (
    <header className="Header">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
          <Typography component={Link} to="/" className={classes.heading} variant="h4" align="center">DeVoting</Typography>
        </div>
        <nav>
          <ul>
            <li><Link to='/' >Home</Link></li>
            <li><Link to='poll' >Polls</Link></li>
            {user?.result ? (
              <div>
                <li><Link to={`auth/${user.result._id}`} >Add Poll</Link></li>
                <button  onClick={logout}>logout</button>
              </div>
            ) : (
              <li><Link to='auth' >Sign in</Link></li>
            )}
          </ul>
        </nav>
      </AppBar>

    </header>
  )
}

export default Header