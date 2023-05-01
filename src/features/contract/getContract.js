import { abi as contractAbi } from './Greeter.json';
import Web3 from 'web3';

const contractAddress = '0x703Fdb1d145f225949A4B1A446Bbba5B6177aEBb';
var web3 = null;

const getBlockchain = () =>
    new Promise((resolve, reject) => {
        window.addEventListener('load', async () => {
            if (window.ethereum) {

                window.web3 = new Web3(window.ethereum);
                web3 = await window.web3;

                const networkId = await web3.eth.net.getId();

                console.log("getBlockNumber: ", web3.eth.getBlockNumber())
                console.log('networkId', networkId)

                const contract = new web3.eth.Contract(contractAbi, contractAddress);

                resolve({ contract });
            }
            resolve({ contract: undefined , resultOfFirstCandidate: undefined, resultOfSecCandidate: undefined});
        });
    });

export default getBlockchain;

