import {Button} from '@material-ui/core'
import {Facebook, Instagram, Twitter, YouTube} from '@material-ui/icons'
import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <div className="footer">
      <div className="footer__left">
        <h4>GET DEALS AND NEWS SENT STRAIGHT TO YOUR EMAIL</h4>
        <input type="text"/>
        <Button>SUBMIT</Button>
      </div>
      <div className="footer__center">
        <ul className="footer__list">
          <li className="footer__listHeader">NEWS</li>
          <li>Latest News</li>
          <li>Playstation 5</li>
          <li>Xbox Series X</li>
          <li>Nintendo Switch</li>
          <li>PC</li>
          <li>Playstation 4</li>
          <li>Xbox One</li>
        </ul>
        <ul className="footer__list">
          <li className="footer__listHeader">SHOP</li>
          <li>Upcoming Releases</li>
          <li>Consoles</li>
          <li>PC</li>
          <li>Accessories</li>
          <li>Hottest Games</li>
          <li>PC Parts</li>
        </ul>
        <ul className="footer__list">
          <li className="footer__listHeader">ABOUT</li>
          <li>Contact</li>
          <li>Careers</li>
          <li>About Us</li>
        </ul>
      </div>
      <div className="footer__right">
        <h4>CHECK OUT THE SOCIALS</h4>
        <div className="footer__rightSocials">
          <Twitter />
          <Facebook />
          <Instagram />
          <YouTube />
        </div>
      </div>
    </div>
  )
}

export default Footer
