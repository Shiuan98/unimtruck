import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import SmartContract from "../../contracts/SmartContract.json";
import { fetchData } from "../data/dataActions";
import { useEffect, useState} from "react";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      Web3EthContract.setProvider(ethereum);
      let web3 = new Web3(ethereum);
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await ethereum.request({
          method: "net_version",
        });
        if (networkId == 137) {
          const SmartContractObj = new Web3EthContract(
            SmartContract.abi,
            "0x919F56F5953Ee233F0DB81551E47784ef0e99310"
          );
          dispatch(
            connectSuccess({
              account: accounts[0],
              smartContract: SmartContractObj,
              web3: web3,
            })
          );
          // Add listeners start
          ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          // Switch Network
            const networks = {
              polygon: {
                chainId: `0x${Number(137).toString(16)}`,
                chainName: "Polygon Mainnet",
                nativeCurrency: {
                  name: "MATIC",
                  symbol: "MATIC",
                  decimals: 18
                },
                rpcUrls: ["https://polygon-rpc.com/"],
                blockExplorerUrls: ["https://polygonscan.com/"]
              }
            };

            const changeNetwork = async ({ networkName, setError }) => {
              try {
                if (!window.ethereum) throw new Error("No crypto wallet found");
                await window.ethereum.request({
                  method: "wallet_addEthereumChain",
                  params: [
                    {
                      ...networks[networkName]
                    }
                  ]
                });
              } catch (err) {
                alert("Wallet connection rejected.\nPlease connect with Metamask wallet to use our application.");
              }
            };

  // const [error, setError] = useState();

  const handleNetworkSwitch = async (networkName, setError) => {
    await changeNetwork({ networkName, setError });
  };

  const networkChanged = (chainId) => {
    console.log({ chainId });
  };

  // useEffect(() => {
  //   window.ethereum.on("chainChanged", networkChanged);

  //   return () => {
  //     window.ethereum.removeListener("chainChanged", networkChanged);
  //   };
  // }, []);
  handleNetworkSwitch("polygon");
        }
      } catch (err) {
        // dispatch(connectFailed("Something went wrong."));
      }
    } else {
      // dispatch(connectFailed("Please install Metamask to use our application."));
      alert("Please install Metamask to use our application.");
      window.open("https://metamask.io/download");
    }
  };
  
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};

