import React, { Component } from 'react';
import unicornEggs from '../assets/img/CU Milk Truck - Web-06.png';
import FlipCountdown from '@rumess/react-flip-countdown';


class WeeklyRaffle extends Component {

    render() {
        return (
            <div class="weekly-raffle">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-5">
                            <img src={unicornEggs} class="unicorn-eggs" alt="Crypto Unicorn Milk Truck" />
                        </div>
                        <div class="col-md-7">
                            <h2 class="text-white">Holders are eligible for weekly NFT raffle!</h2>
                            <FlipCountdown
                                size='medium' // Options (Default: medium): large, medium, small, extra-small.
                                theme='dark'
                                hideYear
                                hideMonth
                                endAtZero
                                onTimeUp={() => console.log("Time's up ⏳")}
                                endAt={'2022-10-30 22:00:00'} // Date/Time
                            />
                        </div>
                    </div>
                </div>
            </div>
            );
        }
      }
      
      export default WeeklyRaffle;