import { useSelector } from "react-redux";
import { selectAllPolls, getPollsStatus, getPollsError } from "../../features/polls/pollsSlice";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer } from '@material-ui/core';
import useStyles from './styles';
import { Link } from "react-router-dom";
import GetStatus from "./GetStatus";

function PollsList() {
  const polls = useSelector((state) => state.polls.polls)
  const pollsStatus = useSelector(getPollsStatus);
  const error = useSelector(getPollsError);
  const classes = useStyles();

  console.log(polls, pollsStatus, error)

  let content;
  if (pollsStatus === 'loading') {
    content = <p>"Loading..."</p>;
  } else if (pollsStatus === 'succeeded') {
    // const orderedPolls = polls.slice(0).reverse()
    // console.log(typeof(orderedPolls), orderedPolls)
    // content = orderedPolls.map(poll => <li key={poll._id}>{JSON.stringify(poll)}</li>)
      content = 
        <TableContainer className={classes.table} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <caption>connect to your wallet to create another poll</caption>
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell sx={{ color: 'blue' }}>poll&nbsp;id</TableCell>
                <TableCell align="center">admin&nbsp;address</TableCell>
                <TableCell align="center">poll&nbsp;name</TableCell>
                <TableCell align="center">poll&nbsp;candidates</TableCell>
                <TableCell align="center">description</TableCell>
                <TableCell align="center">status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {polls.slice(0).reverse().map((poll) => (
                <TableRow key={poll.groupId}>
                  <TableCell component="th" scope="row">
                    
                    {poll.groupId}
                    <p  key={poll.groupId} className='postCredit'><Link style={{color: '#008000'}} to={`/poll/${poll.groupId}`}>Join</Link></p>
                    
                    {/* <JoinPoll pollId={poll.groupId} contract={contract} /> */}
                  </TableCell>
                  {
                    poll.coordinator == "0xA09945A8bc3B65FC4580CD020CaaD54360a322a4" ? (<TableCell align="center">server</TableCell>) : (<TableCell align="center">{poll.coordinator}</TableCell>)
                  }
                  <TableCell align="center">{poll?.groupName}</TableCell>
                  <TableCell align="center">{poll?.groupCandidates.map((c) => { return ` ${c} ,` })}</TableCell>
                  <TableCell align="center">{poll?.groupDescription}</TableCell>
                  <GetStatus key={poll.groupId} pollId={poll.groupId} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      
  } else if (pollsStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <section>
      {content}
    </section>
  )
}

export default PollsList
