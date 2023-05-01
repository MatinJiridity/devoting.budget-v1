import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getPollsStatus, getPollsError } from '../../features/polls/pollsSlice';
import { Button, Modal, TextField, Typography, Box, Paper, Card } from '@material-ui/core';
import useStyles from './styles';
import { Identity } from '@semaphore-protocol/identity';
import { selectContract } from "../../features/contract/contractSlice";
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CopyAllIcon from '@material-ui/icons/FileCopy'

const SinglePollPage = () => {
  const { pollId } = useParams() //get from url
  const pollsStatus = useSelector(getPollsStatus);
  const error = useSelector(getPollsError);
  const poll = useSelector((state) => state.polls.polls.find(poll => poll.groupId === Number(pollId)))
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [copy, setCoppied] = useState(false);
  const [identity, setIdentity] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [state, setState] = useState('...');
  const { contract } = useSelector(selectContract);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const loaction = useLocation();

  // dispatch getstatus(pollId)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const createIdentity = async () => {
    setIdentity(new Identity().toString());
  };

  const join = async (e) => {
    e.preventDefault();

    if (state == 'Created') {

      setIsDisabled(true);
      console.log(identity);

      const currentIdentity = new Identity(identity);
      // console.log(currentIdentity)
      const commitment = currentIdentity.commitment.toString();
      console.log(currentIdentity, commitment)
      setWaiting(true);

      var CancelToken = axios.CancelToken;
      var cancel;

      await axios({
        method: 'patch',
        url: `https://devotingversion02.onrender.com/user/${user?.result._id}/commit`,
        data: {
          pollId: pollId.toString(),
          identityCommitment: commitment
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
      cancel()
      setWaiting(false);
    } else {
      alert('Cannot participate in!')
    }
  }

  const getAStatus = async () => {
    if (contract) {
      const status = await contract.methods.getGroupStatus(pollId).call();
      if (status == 0) {
        setState ('Created');
      } else if (status == 1) {
        setState ('Ongoing');
      } else if (status == 2) {
        setState ('Ended');
      }
    }
  }
  
  const updateStatus = async (e) => {
    e.preventDefault();

    if(state === 'Created'){
      setWaiting(true);
      const userData = await axios.post(
        `https://devotingversion02.onrender.com/user/startPoll`,
        {
          pollId: pollId.toString(),
          encryptionKey: "123",
        }
      )
      setWaiting(false);
  
      alert(userData.data.message)
      return (userData);
    }else if (state === 'Ongoing'){
      setWaiting(true);
      const userData = await axios.post(
        `https://devotingversion02.onrender.com/user/endPoll`,
        {
          pollId: pollId.toString(),
          decryptionKey: "123",
        }
      )
      setWaiting(false);
  
      alert(userData.data.message)
      return (userData);
    }else{
      document.getElementById("updateStatus").disabled = true;
    } 
    
  }
  
  useEffect(() => {
    createIdentity();
    getAStatus();
    setUser(JSON.parse(localStorage.getItem('profile')));

  }, [contract, loaction])

  // console.log(poll)
  let content
  let candidateContent
  if (pollsStatus === 'loading') {
    content = <p>"Loading..."</p>;
  } else if (pollsStatus === 'succeeded') {
    candidateContent = poll.groupCandidates.map((candidate, i) => <p className='candidate'>{i + 1}. {candidate}</p>)
    content =
      <div className='poll' >
        <article >
          <h3>{poll.groupName}</h3>
          <p key={poll.groupId}>Poll Id {poll.groupId}</p>
          <p >Status: <p style={{ color: 'blue', textAlign: 'center', margin: '0.5rem 0' }}>{state}</p></p>
          <p className='description'>Description: {poll.groupDescription}</p>
          {candidateContent}
          <p className='postCredit'>
            <button disabled={waiting} id='updateStatus' onClick={updateStatus} style={{ marginTop: 20, margin: 30 }}>Edit Poll</button>
            <button onClick={handleOpen} style={{ marginTop: 20, margin: 30 }}>Join Poll</button>
          </p>
          <p>Allready joined this poll. <a href="https://devoting-ballotbox.onrender.com/" target="_blank">Cast Vote</a>.</p>

        </article>
      </div>
  } else if (pollsStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div>
      {content}
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box style={{
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
            textAlign:'center'
          }}>
            <Typography style={{marginTop: 20}} id="modal-modal-title" variant="h5" component="h2">
              Poll ID {pollId}
            </Typography>

            {
              !isDisabled ? (
                <Paper className={classes.paperJoin}>
                  <form className={`${classes.root} ${classes.form}`} >
                    <Typography variant="h6">1. Register Certificate, in fact, is your bill, in the next step of voting you need it so after creation keep it safely.</Typography>
                  </form>
                  <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                  {/* <Button className={classes.buttonSubmit} variant="contained" size='small' color="secondary" onClick={handleClose}>cancel</Button> */}
                  <Button style={{ margin:1 }} className={classes.buttonSubmit} variant="contained" size='small' color="primary" onClick={join}>Create Register Certificate</Button>
                </Paper>
              ) : (
                <div>
                  {
                    waiting ? (
                      <div>
                        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                        <Typography sx={{ marginTop: '50px', top: '50%' }} variant="h6" align="center">
                          ...pending
                        </Typography>
                      </div>
                    ) : (
                      <div>
                        <Paper className={classes.paperJoin}>
                          <Typography variant="h6">copy and keep it safely</Typography>
                          <Card className={classes.card} >
                            <Typography variant="body2" color="textSecondary" component="p">{identity}</Typography>
                          </Card>
                          <CopyToClipboard text={identity}>
                            <Button size="small" color="primary" onClick={() => setCoppied(true)}>
                              <CopyAllIcon fontSize="small" /> Copy
                            </Button>
                          </CopyToClipboard>
                          <br></br><br></br><br></br>
                          <Button className={classes.buttonSubmit} disabled={!copy} variant="contained" size='small' color="secondary" onClick={handleClose}>back</Button>
                        </Paper>
                      </div>
                    )
                  }
                </div>
              )
            }
          </Box>
        </Modal>
      </>
    </div>
  )
}

export default SinglePollPage

