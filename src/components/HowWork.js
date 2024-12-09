import React, { Component } from 'react';
import unicornAmount from '../assets/img/CU Milk Truck - Web-08.png';
import farmAmount from '../assets/img/CU Milk Truck - Web-09.png';
import unicornReward from '../assets/img/CU Milk Truck - Web-10.png';


class HowWork extends Component {

    render() {
        return (
                <div class="how-works" id="how-works">
                    <div class="container">
                        <h2 class="text-center text-white">How It Works?</h2>
                        <p class="text-center">Everyday, the Unicorn Milk Truck will pick up fresh $UNIM supplies from our Unicorn Farm and deliver it right to your doorstep. No staking required.</p>
                        <h2 class="text-center text-white mt-5">Our Current Farm Size</h2>
                        <div class="row">
                            <div class="col-md-4">
                            <img src={unicornAmount} alt="Crypto Unicorn Milk Truck" />
                            <p><strong><span>800+</span><br></br>UNICORN NFT</strong></p>
                            </div>
                            <div class="col-md-4">
                            <img src={farmAmount} alt="Crypto Unicorn Milk Truck" />
                            <p><strong><span>120+</span><br></br>LAND NFT</strong></p>
                            </div>
                            <div class="col-md-4">
                            <img src={unicornReward} alt="Crypto Unicorn Milk Truck" />
                            <p><strong><span>400K+</span><br></br>$UNIM WEEKLY</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
      }
      
      export default HowWork;