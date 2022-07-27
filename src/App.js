import './App.scss';
import ConnectButton from "./Components/Button";

const App = () => {
    return (
        <div className="App">
            <main>
                <div className="container">
                    <header>
                        <a href="#" target='_blank'
                           className='logo'>
                            <img src="logo.png" alt="Malbon buckets"/>
                        </a>
                    </header>
                    <h1 className='page-title'>Buckets Club Front Nine Membership</h1>
                    <p className='page-description'>Join our members only golf club by minting one of our tokens. Limited spots.</p>
                    <div className="btn-wrapper">
                        <ConnectButton/>
                    </div>
                    <ul className="desc">
                        <li className='desc-item'>
                            <img src="assets/ether.png" alt=""/>
                            <div className='desc-content'>
                                <h3 className="desc-title">9,000</h3>
                                <p className='desc-text'>NFT membership cards</p>
                            </div>
                        </li>
                        <li className='desc-item'>
                            <img src="assets/wallet.png" alt=""/>
                            <div className='desc-content'>
                                {/*change price every time*/}
                                <h3 className="desc-title">0.1 ETH</h3>
                                <p className='desc-text'>Price per NFT</p>
                            </div>
                        </li>
                        {/*<li className='desc-item'>
                            <img src="assets/wallet.png" alt=""/>
                            <div className='desc-content'>
                                <h3 className="desc-title">500K+</h3>
                                <p className='desc-text'>Potential opportunity</p>
                            </div>
                        </li>*/}
                    </ul>

                </div>
            </main>
            <div className="gallery">
                <ul className='gallery-row-1 gallery-row'>
                    <li>
                        <img src={`assets/gallery/1.png`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/2.png`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/3.png`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/4.png`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/5.png`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/6.png`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/1.png`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/3.png`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/9.png`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/10.png`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/11.png`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/1.png`} alt=""/>
                    </li>
                </ul>
                <ul className='gallery-row-2 gallery-row'>
                    <li>
                        <img src={`assets/gallery/11.png`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/10.png`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/9.png`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/8.png`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/7.png`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/4.png`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/5.png`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/6.png`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/3.png`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/2.png`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/1.png`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/11.png`} alt=""/>
                    </li>
                </ul>
            </div>

        </div>
    );
}

export default App;
