import React, { useEffect, useState, useRef, Component } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../redux/blockchain/blockchainActions";
import { fetchData } from "../redux/data/dataActions";
import HeaderLogo from '../assets/img/CU Milk Truck - Web-04.png';
import OpenSeaIcon from '../assets/img/OpenSea-Logo.png';

const Header = () => {

    return (
    
  <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar ftco-navbar-light" id="ftco-navbar">
        <a class="navbar-brand" href="/" target="_blank">
            <img src={HeaderLogo} class="logo" alt="Crypto Unicorn Milk Truck"></img>
        </a>
        <a href="https://opensea.io/collection/unim-truck-polygon" target="_blank">
            <img src={OpenSeaIcon} class="sea-icon" alt="Crypto Unicorn Milk Truck"></img>
        </a>
        
        <button class="navbar-toggler d-none" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="fa fa-bars"></span>
        </button>
        
    <div class="collapse navbar-collapse text-uppercase" id="ftco-nav">
      <ul class="nav navbar-nav ml-auto">
      </ul>
  </div>
 </nav>
    );
  
}

export default Header;