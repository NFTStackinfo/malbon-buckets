import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { isAndroid, isIOS } from "react-device-detect"
import { fetchData } from "../redux/data/dataActions"
import { connect } from "../redux/blockchain/blockchainActions"

const ConnectButton = () => {
    const [walletConnected, setWalletConnected] = useState(false)
    const [fallback, setFallback] = useState('')
    const [mintCount, setMintCount] = useState(1)
    const [connectingMobile, setConnectingMobile] = useState(false)
    const [disableMint, setDisableMint] = useState(false)

    const dispatch = useDispatch()
    const blockchain = useSelector((state) => state.blockchain)

    const minMintCount = 1
    const maxMintCount = 5

    const normalizeMintCount = count =>
        count > maxMintCount
            ? maxMintCount
            : count < minMintCount
            ? minMintCount
            : count

    const errorMessages = [
        'Change network to ETH.',
        'Something went wrong.'
    ]
    const metamaskError = 'Install Metamask.'

    const claimNFTs = async (_amount) => {
        const
            isMintActive = await blockchain.smartContract.methods.isMintActive().call(),
            isPreSaleMintActive = await blockchain.smartContract.methods.isPreSaleMintActive().call(),

            mint = isMintActive ? blockchain.smartContract.methods.mint(blockchain.account, _amount)
                : isPreSaleMintActive ? blockchain.smartContract.methods.preSaleMint(_amount)
                    : null;


        if (mint) {
            const mintPrice = isMintActive ? await blockchain.smartContract.methods?.mintPrice().call() / 10 ** 18
                : isPreSaleMintActive ? await blockchain.smartContract.methods?.preSaleMintPrice().call() / 10 ** 18 : 0

            const amount = await blockchain.web3.eth.getBalance(blockchain.account, async (err, result) => {
               return  blockchain.web3.utils.fromWei(result, "ether")

                // return asd/ 10 ** 18
            })
            const roundedAmount = amount / 10 ** 18
            if(roundedAmount < _amount * mintPrice) {
                // setDisableMint(true)
                return setFallback(`You don’t have enough funds to mint! Please, make sure to have ${(_amount * mintPrice).toFixed(4)} ETH + gas.`)
            }
            if(roundedAmount)
            mint.send({
                from: blockchain.account,
                value: blockchain.web3.utils.toWei((mintPrice * _amount).toString(), "ether")
            }).once("error", (err) => {
                if (err.code === -32000 || err.code === '-32000') {
                    setFallback('Insufficient funds, please add funds to your wallet and try again')
                } else {
                    setFallback('Sorry, something went wrong please try again')
                }
            }).then(receipt => {
                // window.location.replace('/success')
            });
        } else {
            setFallback('The mint is not open yet.')
        }
    }

    useEffect(() => {
        if (blockchain.account !== "" && blockchain.smartContract !== null) {
            dispatch(fetchData(blockchain.account));
            if (blockchain.account) {
                setWalletConnected(true)
            }
        }
    }, [blockchain.smartContract, dispatch]);

    const openMobileMetamask = () => {
        console.log(window.ethereum)
        if(typeof window.ethereum === 'undefined') {
            if (connectingMobile && !walletConnected && (isIOS || isAndroid)
                || blockchain.errorMsg === metamaskError) {

                window.location.replace('https://metamask.app.link/dapp/unusualguestsmint.com/')

            }
        }


    }


    useEffect(() => {
        setConnectingMobile(true)

        setFallback('')
        if (blockchain.errorMsg && errorMessages.includes(blockchain.errorMsg)) {
            setFallback(blockchain.errorMsg)
        }
        if(blockchain.errorMsg === metamaskError && !(isIOS || isAndroid)) {
            window.location.replace('https://metamask.app.link/dapp/unusualguestsmint.com/')
        }
    }, [blockchain.errorMsg])


    return (
        <>
            {walletConnected ? (
                <>
                    <div className='mint-content'>
                        <div className="mint-input">
                            <button>
                                <img
                                    src='assets/minus.svg'
                                    alt='minus'
                                    onClick={() => setMintCount(normalizeMintCount(mintCount - 1))}
                                />
                            </button>

                            <p>{mintCount}</p>
                            <button>
                                <img
                                    src='assets/plus.svg'
                                    alt='minus'
                                    onClick={() => setMintCount(normalizeMintCount(mintCount + 1))}
                                />
                            </button>
                        </div>

                        <button
                            className="btn btn-mint"
                            disabled={disableMint}
                            onClick={e => {
                                e.preventDefault();
                                setFallback('');
                                claimNFTs(mintCount);
                            }}
                        >
                            Mint Now
                        </button>
                    </div>
                    {fallback && <p className="warn-text">{fallback}</p>}
                </>

            ) : (
                <>
                    <button
                        className='btn'
                        id={"connectBtn"}
                        onClick={e => {
                            e.preventDefault();
                            dispatch(connect());
                            openMobileMetamask();
                        }}
                    >
                        Connect
                    </button>
                    {fallback && <p className="warn-text">{fallback}</p>}
                </>

            )}
        </>
    )
}

export default ConnectButton
