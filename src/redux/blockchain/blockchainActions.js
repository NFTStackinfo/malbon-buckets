// constants
import Web3 from "web3"
import SmartContract from "../../contracts/BucketsClubFrontNine.json"
// log
import { fetchData } from "../data/dataActions"

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  }
}

const connectSuccess = payload => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  }
}

const connectFailed = payload => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  }
}

const updateAccountRequest = payload => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  }
}

export const connect = () => {
  return async dispatch => {
    dispatch(connectRequest())
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum)
      try {
        await window.ethereum.enable()

        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        })
        const networkId = await window.ethereum.request({
          method: "net_version",
        })
        // console.log(networkId)
        //const NetworkData = await SmartContract.networks[networkId];
        if (networkId === "1" || networkId === 1) {
          const SmartContractObj = new web3.eth.Contract(
            SmartContract.abi,
            "0x470c27a0Ed83f44B09aCAE49e6cefFd1C7FaA6F0"
          )
          dispatch(
            connectSuccess({
              account: accounts[0],
              smartContract: SmartContractObj,
              web3: web3,
            })
          )
          // Add listeners start
          window.ethereum.on("accountsChanged", accounts => {
            dispatch(updateAccount(accounts[0]))
          })
          window.ethereum.on("chainChanged", () => {
            window.location.reload()
          })
          // Add listeners end
        } else {
          dispatch(connectFailed("Change network to ETH."))
        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong."))
      }
    } else {
      dispatch(connectFailed("Install Metamask."))
    }
  }
}

export const updateAccount = account => {
  return async dispatch => {
    dispatch(updateAccountRequest({ account: account }))
    dispatch(fetchData(account))
  }
}
