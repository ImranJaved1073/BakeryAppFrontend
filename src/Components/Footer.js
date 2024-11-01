import React from 'react';
import { NavLink } from 'react-router-dom';
import '../index.css'; // Ensure to import your CSS file

const Footer = () => {
    return ( 
        <footer className="footer text-white">
            <div className="container py-4">
                <div className="row">
                    {/* Navigation Links */}
                    <div className="col-md-4">
                        <h5 className="footer-title">Navigation</h5>
                        <ul className="list-unstyled">
                            <li><NavLink className="footer-link" to="/">Home</NavLink></li>
                            <li><NavLink className="footer-link" to="/products">Products</NavLink></li>
                            <li><NavLink className="footer-link" to="/about">About</NavLink></li>
                            <li><NavLink className="footer-link" to="/contact">Contact</NavLink></li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="col-md-4">
                        <h5 className="footer-title">Follow Us</h5>
                        <ul className="list-unstyled">
                            <li><a className="footer-link" href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i> Facebook</a></li>
                            <li><a className="footer-link" href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i> Instagram</a></li>
                            <li><a className="footer-link" href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i> Twitter</a></li>
                        </ul>
                    </div>

                    {/* Additional Information */}
                    <div className="col-md-4">
                        <h5 className="footer-title">Contact Us</h5>
                        <p>If you have any questions, feel free to reach out to us!</p>
                        <p>Email: <a className="footer-link" href="mailto:sweetDreams231@sweetBakersbakery.com">sweetBakers231@gmail.com</a></p>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <p>CopyRight &copy; 2024 Buffer Bakery. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
