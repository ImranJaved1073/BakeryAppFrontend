// import About from "./About";
// import Contact from "./Contact";
// import ProductList from "./ProductList";

// const Home = () => {
//     return ( 
//         <div className="home">
//             <h2>Welcome to Sweet Dreams Bakery</h2>
//             <p>Where all your sweet dreams come true!</p>
//             <ProductList />
//             <About />
//             <Contact />
//         </div>
//     );
// }
 
// export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; // Import external CSS file
import ProductList from './Products';
import About from './About';
import Contact from './Contact';

const Home = () => {
    return ( 
        <div className="home">
            {/* Hero Section */}
            <div className="hero-section mb-5">
                <div className="hero-content text-center text-white">
                    <h1 className="hero-title">Welcome to Buffer Bakery</h1>
                    <p className="hero-subtitle">Where every dessert tells a story!</p>
                    <Link to="/products" className="btn btn-lg btn-primary mt-3">
                        Explore Our Products
                    </Link>
                </div>
            </div>

            <ProductList />

            <About/>

            <Contact />
        </div>
    );
}
 
export default Home;
