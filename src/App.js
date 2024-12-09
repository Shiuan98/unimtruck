// Import dependencies
import React, { useEffect, useState, useRef, lazy} from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination , Navigation } from "swiper";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import WOW from 'wowjs';
import $ from 'jquery';
import MiddleEllipsis from "react-middle-ellipsis";

// Import class components
import Header from './components/Header';
import Footer from './components/Footer';
// import Sound from './components/Sound';
import HeroBanner from './components/HeroBanner';
import WeeklyRaffle from './components/WeeklyRaffle';
import HowWork from './components/HowWork';
import TruckReturn from './components/TruckReturn';
import Faq from './components/Faq';

// Import image
import TruckMint from './assets/img/CU Milk Truck - Web-07.png';
import TrucksMint from './assets/img/truck.gif';

import { BrowserRouter as Router,Route,Routes,Link,useParams} from 'react-router-dom';

function App() {

  // Initiate animations
  AOS.init();

  // Define variables & set states
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState('Connect Metamask.');
  const [mintSuccess, setMintSucess] = useState(false);
  const [mintQuantity, setMintQuantity] = useState(1);

  const handleChange = (selection) => {
    if (selection.target.value <= 0 || selection.target.value == null || selection.target.value == '') {
      setMintQuantity(1);
      setFeedback("Please mint at least 1 Truck.");
      setMintingNFT(true);
    } else if (selection.target.value > 10) {
      setMintQuantity(10);
      setFeedback("Max. 10 Trucks per transaction.");
      setMintingNFT(true);
    } else {
      setMintQuantity(selection.target.value);
      setFeedback("");
      setMintingNFT(false);
    }
  }
  
  const [mintingNFT, setMintingNFT] = useState(false);

  // Public mint
  const publicMint = (mintQuantity) => {
    setMintingNFT(true);
    setMintSucess(false);
    blockchain.smartContract.methods
      .mintTruck(blockchain.account, mintQuantity)
      .send({
        gasLimit: 160000*mintQuantity,
        maxPriorityFeePerGas: "40000000000",
        maxFeePerGas: "60000000000",
        from: blockchain.account,
        value: blockchain.web3.utils.toWei((15*mintQuantity).toString(), "ether"),
      })
      // Transaction fail / Error
      .once("error", (err) => {
        console.log(err);
        setFeedback("Transaction rejected. Please try again.");
        setMintingNFT(false);
      })
      // Transaction success / Minting completed
      .then((receipt) => {
        setMintingNFT(false);
        setMintSucess(true);
        setTimeout(() => dispatch(fetchData(blockchain.account)), 2200);
        setFeedback("Mint success. $UNIM claim coming soon!");
      });
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      setFeedback("");
      dispatch(fetchData(blockchain.account));
    }
  };

  useEffect(() => {
    getData();
  }, [blockchain.account]);


  /*Switch Network*/
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
      setError(err.message);
    }
  };

  const [error, setError] = useState();

  const handleNetworkSwitch = async (networkName) => {
    setError();
    await changeNetwork({ networkName, setError });
  };

  const networkChanged = (chainId) => {
    dispatch(connect());
    getData();
    console.log({ chainId });
  };

  useEffect(() => {
    if(window.ethereum) {
    window.ethereum.on("chainChanged", networkChanged);
    }
    return () => {
      window.ethereum.removeListener("chainChanged", networkChanged);
    };
  }, []);

  useEffect(() => {
    new WOW.WOW({
      boxClass:     'wow',      // animated element css class (default is wow)
      animateClass: 'animated', // animation css class (default is animated)
      offset:       0,          // distance to the element when triggering the animation (default is 0)
      mobile:       true,       // trigger animations on mobile devices (default is true)
      live:         true,       // act on asynchronously loaded content (default is true)
      callback:     function(box) {
        // the callback is fired every time an animation is started
        // the argument that is passed in is the DOM node being animated
      },
      scrollContainer: null,    // optional scroll container selector, otherwise use window,
      resetAnimation: true, 
    }).init();
  }, [])

  window.addEventListener('scroll', function(e) {
        if( $(window).scrollTop() <= 50) {
            $('.wow').removeClass('animated');
            $('.wow').removeAttr('style');
          new WOW.WOW({ }).init();
        }
  });

  const [faqs, setfaqs] = useState([

    {
      question: 'What is the Unicorn Milk (UNIM) token?',
      answer: 'UNIM is the utility token used in Crypto Unicorns, a blockchain play-to-earn game developed by Laguna Games. UNIM can be earned by playing the Crypto Unicorns game.',
      open: false    
    },
    {
      question: 'What is the use of a UNIM token?',
      answer: 'UNIM can be used in the Crypto Unicorns game for breeding & evolving unicorns, crafting materials and other in-game upgrades as players progress through the game.',
      open: false    
    },
    {
      question: 'Can I swap my UNIM for other tokens?',
      answer: 'Yes, all UNIM tokens earned from the UNIM Truck can be swapped to other cryptocurrencies (ETH, MATIC, USDC, etc) anytime within the Polygon Blockchain. We recommend using Decentralised Exchange (DEX) like balancer.fi or swap directly on Metamask wallet.',
      open: false    
    },
    {
      question: 'What is the mint price of UNIM Truck NFT?',
      answer: 'Public mint: 15 $MATIC. Maximum mint of 10 Unicorn Milk Truck per transaction.',
      open: false    
    },
    {
      question: 'Why should I mint a UNIM Truck NFT?',
      answer: 'The entry cost of the Crypto Unicorns game starts around $150 USD, which can be quite expensive for some players. The UNIM Truck NFT offers a low entry cost (less than $15 USD) for new players to start earning UNIM through our Crypto Unicorns Farms.',
      open: false    
    },
    {
      question: 'What is the total supply of UNIM Truck NFT?',
      answer: 'A total of 10,000 Unicorn Milk Truck will be delivering UNIM tokens on the Polygon Blockchain.',
      open: false    
    },
    {
      question: 'Why Polygon Blockchain?',
      answer: 'The based game - Crypto Unicorns are developed and launched on the Polygon Blockchain, this means that UNIM token will be distributed on the same blockchain, as well as our UNIM Trucks. Many new blockchain play-to-earn games are launched on the Polygon Blockchain because of the lower gas fee as most games require a lot of in-game transactions.',
      open: false    
    }

  ]);

  const toggleFAQ = index =>{
    setfaqs(faqs.map((faq, i) =>{
      if (i === index) {
        faq.open = !faq.open
      } else {
        faq.open = false;
      }
      return faq;
    }))
  };

  return (
    <Router>
      <div>
        <Header/>
        <div>
          {/* <Sound/> */}
          <HeroBanner />
          <div>     
          <div class="truck-mint" id="truck-mint">     
            <div class="row">
              <div class="col-md-5">
                <img src={TrucksMint} class="mint-truck" alt="Crypto Unicorn Milk Truck" />
                {blockchain.account === "" || blockchain.smartContract === null ? (
                  <div>
                  </div>
                ):(
                  <div>
                    <p>{data.totalSupply} / 10000 <br></br>UNIM Trucks Minted</p>
                  </div>
                )}
                </div>
                <div class="col-md-7 mt-3 mt-md-0">
                  <h2 class="text-white">Mint a UNIM Truck<br></br> & get daily $UNIM delivery!</h2>
                  <h3><img src={TruckMint} class="small-truck" alt="Crypto Unicorn Milk Truck"/> <span>= 15 $MATIC</span></h3>

                  {blockchain.account === "" || blockchain.smartContract === null ? (
                    <div class="">
                      <button class="connect-metamask text-uppercase" onClick={(e) => {                
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}>
                        Connect
                      </button>
                      <br></br>
                    </div>
                  ) : (
                    <div class="mint">
                      {mintSuccess == false ? (
                        <div>
                          <input class="mint-quantity" type="number" min={1} max={10} defaultValue={mintQuantity} onChange={handleChange}/>
                          <button class="connect-metamask mint-btn text-uppercase" id="" type="submit" disabled={mintingNFT ? 1 : 0} onClick={(e) => {
                            setFeedback("Minting Unicorn Milk Truck...");
                            publicMint(mintQuantity);
                          }}>
                            MINT
                          </button>
                          <br></br>
                          <p class="feedback-text mt-3">{feedback}</p>
                        </div>
                      ):(
                        <div>
                        <div class="success-section">
                          <a href='https://opensea.io/collection/unim-truck-polygon' target="_blank">
                            <button class="connect-metamask mint-btn text-uppercase">View OpenSea</button>
                          </a>
                          </div>
                          <p class="feedback-text mt-3">{feedback}</p>
                        </div>
                      )}
                    </div>
                  )}
                  </div>
                  </div>
                  </div>
          </div>
          <HowWork />
          <WeeklyRaffle />
          <TruckReturn />
          <div class="faq">  
            <div class="container">
                <h2 class="text-center">FAQ</h2>
                <div class="faq-list">
                {faqs.map((faq, i) => (
                <Faq faq={faq} index={i} toggleFAQ={toggleFAQ} />
                  ))}
                </div>
                </div>
            </div>
        </div>    
        <Footer />
      </div>          
    </Router>
  );
}

export default App;
