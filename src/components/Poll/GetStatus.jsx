import { useSelector } from "react-redux";
import { selectContract } from "../../features/contract/contractSlice";
import { useEffect, useState } from "react";
import { TableCell } from "@material-ui/core";

const GetStatus = ({pollId}) => {
  const { contract } = useSelector(selectContract);
  const [state, setState] = useState('...');

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

  useEffect(() => {
    getAStatus();
  }, [contract])
  
  return (
    <TableCell align="center">{state}</TableCell>
  )
}

export default GetStatus