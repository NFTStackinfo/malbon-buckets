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
                    <h1 className='page-title'>Lorem ipsum dolor sit amet</h1>
                    <p className='page-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras placerat congue lacus, ut rhoncus
                        lectus imperdiet sit amet. Vivamus elementum cursus pharetra. </p>
                    <div className="btn-wrapper">
                        <ConnectButton/>
                    </div>
                    <ul className="desc">
                        <li className='desc-item'>
                            <img src="assets/ether.png" alt=""/>
                            <div className='desc-content'>
                                <h3 className="desc-title">10,000</h3>
                                <p className='desc-text'>NFT membership cards</p>
                            </div>
                        </li>
                        <li className='desc-item'>
                            <img src="assets/wallet.png" alt=""/>
                            <div className='desc-content'>
                                <h3 className="desc-title">0.05 ETH</h3>
                                <p className='desc-text'>Price per NFT</p>
                            </div>
                        </li>
                        <li className='desc-item'>
                            <img src="assets/wallet.png" alt=""/>
                            <div className='desc-content'>
                                <h3 className="desc-title">500K+</h3>
                                <p className='desc-text'>Potential opportunity</p>
                            </div>
                        </li>
                    </ul>

                </div>
            </main>
            <div className="gallery">
                <ul className='gallery-row-1 gallery-row'>
                    <li>
                        <img src={`assets/gallery/1.jpg`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/2.jpg`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/1.jpg`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/2.jpg`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/3.jpg`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/2.jpg`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/1.jpg`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/2.jpg`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/1.jpg`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/2.jpg`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/3.jpg`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/2.jpg`} alt=""/>
                    </li>
                </ul>
                <ul className='gallery-row-2 gallery-row'>
                    <li>
                        <img src={`assets/gallery/2.jpg`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/1.jpg`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/2.jpg`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/1.jpg`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/2.jpg`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/3.jpg`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/2.jpg`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/1.jpg`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/2.jpg`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/3.jpg`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/2.jpg`} alt=""/>
                    </li>
                    <li>
                        <img src={`assets/gallery/1.jpg`} alt=""/>
                    </li>
                </ul>
            </div>

        </div>
    );
}

export default App;
