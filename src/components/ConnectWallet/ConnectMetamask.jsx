import React from "react";
import { Typography, Button } from "@material-ui/core";
import Web3 from "web3";
import useStyles from './styles';

const ConnectMetamask = ({ accounts, setAccounts, setIsConnected }) => {
    const isConnected = Boolean(accounts[0]);
    const classes = useStyles();

    async function connectAccount() {

        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            const { ethereum } = window;
            await ethereum.request({ method: "eth_requestAccounts" }).then(function (account) {
                setAccounts(account)
                setIsConnected(true)
            });
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
            setIsConnected(true)
        } else {
            window.alert(" Non-Ethereum browser detected")
        }
    }

    return (
        <>
            {isConnected ? (accounts) : (<button type="button" onClick={connectAccount}>Connect to Metamask</button>)}
        </>
    )
}

export default ConnectMetamask;

