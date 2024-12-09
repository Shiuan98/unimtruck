import React, { Component } from 'react';
import unicornBg from '../assets/img/CU-Milk-Truck-Web-02.png';
import unicornTruck from '../assets/img/CU Milk Truck - Web-03.png';
import unicornEgg from '../assets/img/CU Milk Truck - Web-05.png';
import useSound from 'use-sound';
import horseSound from '../assets/sounds/ES_Horse Neigh 5 - SFX Producer.mp3';
import FlipCountdown from '@rumess/react-flip-countdown';

import { Link, animateScroll as scroll } from "react-scroll";

const HeroBanner = () => {
  const [play, { stop }] = useSound(horseSound);
    return (
        <div class="hero-banner">
          <div class="container-fluid">
            <div class="row first-row">
              <div class="col-md-7">
           <h1>Unicorn Milk Truck</h1>
           <p>While the unicorns in our farm are training for the jousting arena,<br></br> we have decided to giveaway some Unicorn Milk!</p>
           <div class="hero-btn">
           <Link  activeClass="active"
            to="truck-mint"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500} >
           <button class="mb-3 mint-truck-btn">Mint Truck</button>
           </Link>
           <Link  activeClass="active"
            to="how-works"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500} >
           <button class="mb-3 works-btn">How It Works</button>
           </Link>
           <a href='https://app.unimtruck.fun/' target="_blank">
           <button class="mb-3 garage-btn">Claim $UNIM</button>
           </a>
           </div>
           </div>
           <div class="col-md-5">
            <div class="countdown-timer">
              <img src={unicornEgg} class="unicorn-egg" alt="Crypto Unicorn Milk Truck" />
              <h2>NFT Raffle Coming Soon</h2>
              <FlipCountdown
                size='small' // Options (Default: medium): large, medium, small, extra-small.
                theme='dark'
                hideYear
                hideMonth
                hideSecond
                endAtZero
                onTimeUp={() => console.log("Time's up ⏳")}
                endAt={'2022-10-30 22:00:00'} // Date/Time
            />             
            </div>
            <img src={unicornTruck} onMouseEnter={play} onMouseLeave={stop} class="unicorn-truck" alt="Crypto Unicorn Milk Truck"/>
           </div>
           </div>
           </div>
          <img src={unicornBg} class="unicorn-bg" alt="Crypto Unicorn Milk Truck"/>
        </div>
    );
}

export default HeroBanner;