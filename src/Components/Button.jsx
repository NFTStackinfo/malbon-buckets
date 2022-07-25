import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {isAndroid, isIOS} from 'react-device-detect';
import {fetchData} from '../redux/data/dataActions';
import {connect} from '../redux/blockchain/blockchainActions';
import addressList from '../data';

const {MerkleTree} = require('merkletreejs');
const keccak256 = require('keccak256');

const ConnectButton = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [fallback, setFallback] = useState('');
  const [mintCount, setMintCount] = useState(1);
  const [connectingMobile, setConnectingMobile] = useState(false);
  const [disableMint, setDisableMint] = useState(false);
  const [mintPrice, setMintPrice] = useState(null);
  const [numberMintWallet, setNumberMintWallet] = useState(null);
  const [maxTotalSupply, setMaxTotalSupply] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);
  const [publicMintActive, setPublicMintActive] = useState(false);
  const [maxMintCount, setMaxMintCount] = useState(null);
  const [notSelected, setNotSelected] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);

  const minMintCount = 1;

  const normalizeMintCount = count =>
      count > maxMintCount
          ? maxMintCount
          : count < minMintCount
              ? minMintCount
              : count;

  const errorMessages = [
    'Change network to ETH.',
    'Something went wrong.',
  ];
  const metamaskError = 'Install Metamask.';

  const fixImpreciseNumber = (number) => {
    return (parseFloat(number.toPrecision(12)));
  };

  const claimNFTs = async (_amount) => {
    setLoading(true);
    let tree;

    const createMerkleTree = () => {
      const leaves = addressList.map(v => keccak256(v));
      tree = new MerkleTree(leaves, keccak256, {sort: true});
    };

    const getProof = (address) => {
      const leaf = keccak256(address);
      return tree.getHexProof(leaf);
    };

    createMerkleTree();

    const isMintActive = await blockchain.smartContract.methods.isMintActive().
        call();
    const isRaffleActive = await blockchain.smartContract.methods.isRaffleActive().
        call();
    const mint = isMintActive
        ?
        await blockchain.smartContract.methods.mint(blockchain.account, _amount)
        :
        isRaffleActive
            ? await blockchain.smartContract.methods.raffleMint(
                _amount,
                getProof(blockchain.account),
            )
            : null;

    if (mint && !disableMint) {
      // const mintPrice = await blockchain.smartContract.methods?.mintPrice().call() / 10 ** 18

      const balance = await blockchain.web3.eth.getBalance(
          blockchain.account,
          async (err, result) => {
            return blockchain.web3.utils.fromWei(result, 'ether');
          },
      );
      const roundedBalance = balance / 10 ** 18;
      if (roundedBalance < fixImpreciseNumber(_amount * mintPrice)) {
        setLoading(false);
        return setFallback(
            `You don’t have enough funds to mint! Please, make sure to have ${fixImpreciseNumber(
                _amount * mintPrice,
            )} ETH + gas.`,
        );
      }
      if (roundedBalance) setLoading(false);
      mint.send({
        from: blockchain.account,
        value: blockchain.web3.utils.toWei(
            fixImpreciseNumber(mintPrice * _amount).toString(),
            'ether',
        ),
      }).once('error', err => {
        if (err.code === -32000 || err.code === '-32000') {
          setFallback(
              'Insufficient funds, please add funds to your wallet and try again',
          );
        } else {
          setFallback('Sorry, something went wrong please try again');
        }
      }).then(receipt => {
        setFallback('Thanks! You have successfully minted.');
      });
    } else {
      setLoading(false);
      setFallback('The mint is not open yet.');
    }
  };

  useEffect(async () => {
    if (blockchain.account !== '' && blockchain.smartContract !== null) {

      dispatch(fetchData(blockchain.account));
      if (blockchain.account) {

        const isMintActive = await blockchain.smartContract.methods.isMintActive().
            call();
        const isRaffleActive = await blockchain.smartContract.methods.isRaffleActive().
            call();


        const price = isMintActive
            ?
            await blockchain.smartContract.methods.mintPrice().call() / 10 ** 18
            :
            await blockchain.smartContract.methods.raffleMintPrice().call() /
            10 ** 18;
        setMintPrice(price);

        const maximumMintSupply = await blockchain?.smartContract?.methods.maximumMintSupply().
            call();
        setMaxTotalSupply(+maximumMintSupply);

        if (isMintActive) {
          setPublicMintActive(true);
          const publicMintMaxMint = await blockchain.smartContract.methods.maximumAllowedTokensPerWallet().
              call();
          setMaxMintCount(+publicMintMaxMint);

          const publicMintedWallet = await blockchain?.smartContract?.methods.publicMintClaimed(
              blockchain.account).call();
          setNumberMintWallet(+publicMintedWallet);
        }

        if (isRaffleActive) {
          const raffleMaxMint = await blockchain.smartContract.methods.allowListMaxMint().
              call();
          setMaxMintCount(+raffleMaxMint);

          const raffleMintedWallet = await blockchain?.smartContract?.methods.allowListClaimedBy(
              blockchain.account).call();
          setNumberMintWallet(+raffleMintedWallet);
          if(raffleMaxMint === raffleMintedWallet) {
            setDisableMint(true)
          }
        }



        if (!isMintActive && !isRaffleActive) {
          return setFallback('The minting is closed');
        }
        if (totalSupply > maxTotalSupply) {
          return setFallback('No more NFTs are left to mint for this stage.');
        }

        const getTotalSupply = await blockchain?.smartContract?.methods.getTotalSupply().
            call();
        setTotalSupply(Number(getTotalSupply));

        const root = await blockchain?.smartContract?.methods.getRoot().call();
        let tree;

        const createMerkleTree = () => {
          const leaves = addressList.map(v => keccak256(v));
          tree = new MerkleTree(leaves, keccak256, {sort: true});
        };

        const getRoot = () => {
          return tree.getHexRoot();
        };

        setWalletConnected(true);



        createMerkleTree();
        const localRoot = getRoot();

        const account = await blockchain.account;

        //uncomment this for seeing root in console

        console.log({root});
        console.log({localRoot});

        if (root === localRoot && addressList.includes(account) ||
            publicMintActive) {
          return setNotSelected(false);
        }

        if (notSelected && !publicMintActive) {
          setFallback('Unfortunately you have not been selected to mint.');
        }

      }
    }
  }, [
    blockchain.smartContract,
    totalSupply,
    maxMintCount,
    blockchain.account,
    maxTotalSupply,
    dispatch,
    walletConnected,
    notSelected,
    publicMintActive
  ]);

  useEffect(() => {
    setConnectingMobile(true);

    setFallback('');
    if (blockchain.errorMsg && errorMessages.includes(blockchain.errorMsg)) {
      setFallback(blockchain.errorMsg);
    }
    if (blockchain.errorMsg === metamaskError && !(isIOS || isAndroid)) {
      window.location.replace(
          'https://metamask.app.link/dapp/unusualguestsmint.com/');
    }
  }, [blockchain.errorMsg]);

  const openMobileMetamask = () => {
    if (typeof window.ethereum === 'undefined') {
      if (connectingMobile && !walletConnected && (isIOS || isAndroid)
          || blockchain.errorMsg === metamaskError) {

        window.location.replace(
            'https://metamask.app.link/dapp/unusualguestsmint.com/');

      }
    }

  };

  const handleMint = (e, count) => {
    e.preventDefault();
    setFallback('');
    claimNFTs(count);
  };
  return (
      <>
        {walletConnected && !notSelected && !publicMintActive ? (

            <>
              <div className="mint-content">
                <div className="mint-input">
                  <button
                      onClick={() => {
                        setMintCount(normalizeMintCount(mintCount - 1));
                      }}
                      disabled={mintCount === minMintCount}
                  >
                    <img
                        src="assets/minus.svg"
                        alt="minus"
                    />
                  </button>

                  <p>{mintCount}</p>
                  <button
                      onClick={() => setMintCount(
                          normalizeMintCount(mintCount + 1))}
                      disabled={mintCount + numberMintWallet >= maxMintCount ||
                          mintCount + totalSupply >= maxTotalSupply}
                  >
                    <img
                        src="assets/plus.svg"
                        alt="minus"
                    />
                  </button>
                </div>

                <button
                    className="btn btn-mint"
                    disabled={disableMint}
                    onClick={e => handleMint(e, mintCount)}
                >
                  Mint Now
                  {loading &&
                      <div className="lds-ring">
                        <div/>
                        <div/>
                        <div/>
                        <div/>
                      </div>}
                </button>
              </div>
              {fallback && <p className="warn-text">{fallback}</p>}
            </>

        ) : (
            <>
              <button
                  className="btn"
                  id={'connectBtn'}
                  onClick={e => {
                    e.preventDefault();
                    dispatch(connect());
                    openMobileMetamask();
                  }}
              >
                Connect
                {loading &&
                    <div className="lds-ring">
                      <div/>
                      <div/>
                      <div/>
                      <div/>
                    </div>}
              </button>
              {fallback && <p className="warn-text">{fallback}</p>}
            </>

        )}
      </>
  );
};

export default ConnectButton;
