import React from 'react'
import unicornCommon from '../assets/img/CU Milk Truck - Web-11.png';
import unicornRare from '../assets/img/CU Milk Truck - Web-12.png';
import unicornMythic from '../assets/img/CU Milk Truck - Web-13.png';


function TruckReturn() {
  return (
    <div class="truck-return">
                    <div class="container-fluid">
                        <h2 class="text-center text-white">Unicorn Milk Truck</h2>
                        <div class="row">
                            <div class="col-md-4">
                            <img src={unicornCommon} alt="Crypto Unicorn Milk Truck" />
                            <p class="common-word">Common <br></br>~200% APR</p>
                            </div>
                            <div class="col-md-4">
                            <img src={unicornRare} alt="Crypto Unicorn Milk Truck" />
                            <p class="rare-word">Rare <br></br>~350% APR</p>
                            </div>
                            <div class="col-md-4">
                            <img src={unicornMythic} alt="Crypto Unicorn Milk Truck" />
                            <p class="mythic-word">Mythic <br></br>~600% APR</p>
                            </div>
                        </div>
                </div>
                </div>
  )
}

export default TruckReturn