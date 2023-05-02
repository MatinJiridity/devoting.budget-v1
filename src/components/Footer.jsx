import * as React from 'react';
import { Link, Typography, Container, Box } from '@material-ui/core';
import { GitHub } from '@material-ui/icons';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'My Github '} <GitHub style={{ width: '20px', height: '20px' }} />
      <Link style={{ margin: '10px' }} color="inherit" href="https://github.com/MatinJiridity/">
        matinjiridity
      </Link>{' '}
      {/* {new Date().getFullYear()}
      {'.'} */}
    </Typography>
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