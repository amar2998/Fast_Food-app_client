import React from 'react'
import logo from '../assets/images/logo.png'
import { MdEmail } from "react-icons/md";
import { FaMobileButton } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { IoLogoGithub } from "react-icons/io";
import { TiSocialLinkedin } from "react-icons/ti";
const Footer = () => {
    return (
        <div>
            <footer className="footer xl:px-24 py-10 px-4 text-base-content p-10">
                <aside>
                    <img src={logo}/>
                  
                </aside>
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">About us</a>
                    
                    <a className="link link-hover" href='https://www.linkedin.com/in/amar-sonu-nath-156bb11aa/'>Blogs</a>
                    <a className="link link-hover" href='https://www.instagram.com/amar_sonu_nath/'>FAQ</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Main menu</h6>
                    <a className="link link-hover" href='/'>Home </a>
                    <a className="link link-hover" href='/offer'>Offer</a>
                    <a className="link link-hover" href='/menu'>Menu</a>
                    
                </nav>
                <nav>
                    <h6 className="footer-title">Contact</h6>
                    <a className="link link-hover"><MdEmail />amarsonunath1998@gmail.com</a>
                    <a className="link link-hover"><FaMobileButton />8910346685</a>
                    
                </nav>
                <nav>
                    <h6 className="footer-title">Social</h6>
                    
                    <a className="link link-hover" href='https://www.instagram.com/amar_sonu_nath/'><BsInstagram /></a>
                    <a className="link link-hover" href='https://github.com/amar2998'><IoLogoGithub /></a>
                    <a className="link link-hover" href='https://www.linkedin.com/in/amar-sonu-nath-156bb11aa/'><TiSocialLinkedin /></a>

                </nav>
            </footer>
        </div>
    )
}

export default Footer