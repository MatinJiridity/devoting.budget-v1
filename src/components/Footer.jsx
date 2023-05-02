import * as React from 'react';
import { Link, Typography, Container, Box, Avatar } from '@material-ui/core';
import { GitHub, HowToVote } from '@material-ui/icons';

function Copyright() {
  return (
    <div>
    <Typography variant="h5" color="text.secondary" align="center">
      <HowToVote style={{width: '30px', height: '30px'}}/>
      <Link style={{ margin: '10px' }} color="inherit" href="https://devoting-ballotbox.onrender.com/">
        Cast a Vote
      </Link>{' '}
      {/* {new Date().getFullYear()}
      {'.'} */}
    </Typography>
    <Typography variant="body2" color="text.secondary" align="center">
      {'My Github '} <GitHub style={{ width: '20px', height: '20px' }} />
      <Link style={{ margin: '10px' }} color="inherit" href="https://github.com/MatinJiridity/devoting.budget-v1/tree/master/">
        matinjiridity
      </Link>{' '}
      {/* {new Date().getFullYear()}
      {'.'} */}
    </Typography>
    </div>
  );
}

function Footer(props) {
  const { description, title } = props;

  return (
    <footer>
      <Box component="footer" style={{ marginTop: '60px', bgcolor: 'background.paper', py: 4, borderRadius: '10px', maxHeight: '10px' }}>
        <Container maxWidth="lg">
          <Typography variant="h6" align="center" gutterBottom>
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            {description}
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </footer>
  );
}


export default Footer;