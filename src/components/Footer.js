import React, { useEffect, useState, Component } from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
    let year = new Date().getFullYear();
    return (
            <section class="footer">
        {/*<div class="ml-150 mr-100">
            <div class="row">
                <div class="col-md-6">

        </div>
        <div class="col-md-6">
            { <div class="row text-right">
            <div class="col-md-7 col-xs-4 text-deep-blue">Terms & Conditions</div>
            <div class="col-md-3 col-xs-4 text-deep-blue">Privacy Policy</div>
            <div class="col-md-2 col-xs-4 text-deep-blue">FAQ</div>
        </div> }
        </div>
        </div>
        <hr></hr>
        </div>
        <div class="copyright text-center">
            <p>Copyright © {year}. All Rights Reserved.</p>
        </div>*/}
    </section>
    );
  }


export default Footer;