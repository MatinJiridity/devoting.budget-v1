import React, { useEffect, useState } from 'react'
import { Button, Typography, Box, Paper, Container, TextField, Grid } from '@material-ui/core';
import useStyles from './styles';
import { getContractError, getContractStatus, selectContract } from '../../features/contract/contractSlice';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Loading from 'react-simple-loading';
import Error from '../Error';
import ConnectMetamask from '../ConnectWallet/ConnectMetamask';
import axios from 'axios';

const AddPoll = () => {
  const [pending, setPending] = useState(false);
  const [pollName, setPollName] = useState('');
  const [pollDescription, setPollDescription] = useState('');
  const [candidateArrey, setCandidateArrey] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const loaction = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const error = useSelector(getContractError);
  const status = useSelector(getContractStatus);
  const { contract } = useSelector(selectContract);
  // console.log(contract)

  const classes = useStyles();

  const createGroup = async (e) => {
    e.preventDefault();

    if (contract?.methods) {
      setPending(true)
      await contract.methods.createPoll(
        "0xA09945A8bc3B65FC4580CD020CaaD54360a322a4", '20', pollName, pollDescription, candidateArrey
      ).send({ from: accounts[0] }).then(async (instance) => {
        const pollId = instance.events.PollCreated.returnValues[0];

        var CancelToken = axios.CancelToken;
        var cancel;

        await axios({
          method: 'patch',
          url: `https://devotingversion02.onrender.com/user/${user?.result._id}/createPoll`,
          data: {
            pollId: pollId,
          },
          cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c;
          })
        }).then((newData) => console.log('success', newData)).catch(function (err) {

          if (axios.isCancel(err)) {

            console.log('im canceled');
          }
          else {
            console.log('im server response error');
          }

        });
        // this cancel the request
        cancel()
        alert(`poll id ${pollId} created`);
        setPending(false);
      }).catch((error) => {
        alert(error.message);
        setPending(false);
      })
    } else {
      alert('contract did not find!')
    }
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));

  }, [accounts, loaction])
  
  return (
    <div>
      <Container component="main" maxWidth="sm">
        <Paper className={classes.paper} style={{ backgroundColor: '#eeeeee', }}>
          <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}>
            {
              contract?.methods ? (
                <div>
                  <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    height: 600,
                    backgroundColor: '#eeeeee',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                  }}>


                    {
                      pending ? (
                        <div>
                          <Typography align='center' variant='h4' component='h1' >
                            ...pending
                          </Typography>
                          <Loading size={'100px'} />
                        </div>
                      ) : (
                        <div>
                          <Typography id="modal-modal-title" variant="h5" component="h2">
                            Poll Form
                          </Typography>
                          <Grid container spacing={1}>
                            <Grid item xs={9}>
                              {error && <Error>contract not found: {error}</Error>}
                            </Grid>
                          </Grid>
                          <Paper className={classes.paper} style={{}}>
                            <form className={`${classes.root} ${classes.form}`} >
                              <Typography variant="h6"></Typography>
                              <TextField name="title" variant="outlined" label="name" fullWidth onChange={(e) => setPollName(e.target.value.toString())} />
                              <TextField name="message" variant="outlined" label="description" fullWidth multiline rows={4} onChange={(e) => setPollDescription(e.target.value.toString())} />
                              <TextField name="tags" variant="outlined" label="candidate (coma separated)" fullWidth onChange={(e) => setCandidateArrey(e.target.value.split(','))} />
                            </form>
                          </Paper>

                          <br></br>
                          {
                            !isConnected ? (
                              <ConnectMetamask accounts={accounts} setAccounts={setAccounts} setIsConnected={setIsConnected} />
                            ) : (
                              <Button style={{ marginLeft: '20px' }} className={classes.buttonSubmit} variant="contained" size='small' color="primary" onClick={createGroup}>comfirm</Button>
                            )
                          }

                        </div>
                      )
                    }
                  </Box>
                </div>
              ) : (
                <Typography>
                  contrat did not find!(refresh)
                </Typography>
              )
            }
          </form>
        </Paper>
      </Container>
    </div>
  )
}

export default AddPoll