import './App.scss';
import ConnectButton from "./Components/Button";

function App() {
  return (
    <div className="App">
        <picture>
            <source media='(max-width: 991px)' srcSet='/assets/asset1-mobile.svg'/>
            <img className='asset-1' src="/assets/asset1.svg" alt="" />
        </picture>
        <picture>
            <source media='(max-width: 991px)' srcSet='/assets/asset2-mobile.svg'/>
            <img className='asset-2' src="/assets/asset2.svg" alt="" />
        </picture>
            <main>
                <div className="container">
                <header>
                    <a href="https://opensea.io/collection/unusual-guests-collection" target='_blank' className='logo'>
                        <img src="logo.svg" alt="unusual guests"/>
                    </a>
                </header>
                    <div className="btn-wrapper">
                        <ConnectButton />
                    </div>
                <p className='text'>By clicking Mint I agree to the Terms and Conditions</p>
                <ul className='gallery'>
                    {
                        [...Array(4)].map((item, index) => {
                            return (
                                <li key={index}>
                                    <img src={`assets/gallery/${index + 1}.png`} alt=""/>
                                </li>
                            )
                        })
                    }
                </ul>

                </div>
            </main>
            <footer>
                <div className="container">
                    <img src="assets/asset3.svg" alt=""/>
                    <ul>
                        <li>
                            <a href="/disclaimer_unusual_guests.pdf" target='_blank'>Disclaimer</a>
                        </li>
                        <li>
                            <a href="/privacy policy_unusual_guests.pdf" target='_blank'>Privacy Policy</a>
                        </li>
                        <li>
                            <a href="/terms_and_conditions_unusual_guests.pdf" target='_blank'>Terms and Conditions</a>
                        </li>
                    </ul>
                    <div className='footer-bottom'>
                        <p>Smart Contract & Mint Page</p>
                        <a href="https://nftstack.info/" target='_blank' rel='noreferrer'>
                            <img src="nftstack.svg" alt="nftstack.info"/>
                        </a>
                    </div>
                </div>

            </footer>

    </div>
  );
}

export default App;
