import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-col">
                <div className="footer-col-1">
                    <Link to={ './' }><div className="footer-brand-logo">CONCRETE</div></Link>
                    <div className="footer-brand-slogan">Meet your style</div>
                </div>
            </div>
            <div className="footer-col-2">
                <Link to={ '/' }><div className="footer-link-cat">Company</div></Link> 
                <Link to={ '/' }><div className="footer-link">About</div></Link> 
                <Link to={ '/' }><div className="footer-link">Store</div></Link> 
                <Link to={ '/' }><div className="footer-link">FAQ</div></Link> 
            </div>
            <div className="footer-col-2">
                <Link to={ '/' }><div className="footer-link-cat">Services</div></Link> 
                <Link to={ '/' }><div className="footer-link">Payment</div></Link> 
                <Link to={ '/' }><div className="footer-link">Delivery</div></Link> 
                <Link to={ '/' }><div className="footer-link">Contacts</div></Link> 
            </div>
            <div className="footer-col-2">
                <Link to={ '/' }><div className="footer-link-cat">Follow us</div></Link> 
                <Link to={ '/' }><div className="footer-link">Instagram</div></Link> 
                <Link to={ '/' }><div className="footer-link">Facebook</div></Link> 
                <Link to={ '/' }><div className="footer-link">Twitter</div></Link> 
            </div>
            
        </div>
    )
}

export default Footer
