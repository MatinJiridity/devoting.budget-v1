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
      <section className='addPoll'>
        <h2>Add a New Poll</h2>
          {
            pending ? (
              <div>
                <h4>...pending</h4>
                <Loading size={'100px'}/>
              </div>
            ) : (
              <form>
              <label htmlFor="pollName">Poll Name:</label>
              <input
                type="text"
                id="pollName"
                name="name"
                onChange={(e) => setPollName(e.target.value.toString())}
    
              />
              <label htmlFor="pollDescription">Poll Description:</label>
              <textarea
                id="pollDescription"
                name="pollDescription"
                onChange={(e) => setPollDescription(e.target.value.toString())}
              />
              <label htmlFor="pollCandidates">Poll Candidates: <h7>(coma separated)</h7></label>
              <input
                id="pollCandidates"
                name="pollCandidates"
                onChange={(e) => setCandidateArrey(e.target.value.split(','))}
              />
              {
                contract?.methods ? (
                  <>
                    {
                      !isConnected ? (
                        <ConnectMetamask accounts={accounts} setAccounts={setAccounts} setIsConnected={setIsConnected} />
                      ) : (
                        <button
                          type="button"
                          onClick={createGroup}
                        >Add Poll</button>
                      )
                    }
                  </>
                ) : (
                  <h3>contrat did not find!(refresh)</h3>
                )
              }
            </form>
            )
          }
      </section>
    </div>
  )
}

export default AddPoll