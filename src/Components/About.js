import React from 'react';
import '../index.css'; // Import external CSS file

const About = () => {
    return (
        <div className="about-page">
            <h1 className="mx-5">About Us</h1>
            <div className="container my-5">
                {/* About Us Section */}
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <p className="lead">
                            At Buffer Bakery, we are passionate about bringing the finest baked goods to our community.
                            Our expert bakers use the freshest ingredients to craft a delightful variety of treats, from traditional
                            cakes and pastries to innovative seasonal specials.
                        </p>
                        <p>
                            Whether you're stopping by for a quick coffee and cupcake, or ordering a custom cake for a special occasion,
                            our bakery provides a welcoming atmosphere and a delicious experience. We are more than just a bakery – we are a community hub
                            where sweet dreams come true.
                        </p>
                        <a href="#team" className="btn btn-lg btn-outline-primary mb-5 mb-md-0">Meet Our Team</a>
                    </div>
                    <div className="col-md-6">
                        <img
                            src="/Images/bakeryText.png"
                            alt="Bakery Interior"
                            className="img-fluid rounded shadow-lg"
                        />
                    </div>
                </div>

                {/* Our Specialties Section */}
                <div className="specialties my-5">
                    <h2 className="text-center fw-bold">Our Specialties</h2>
                    <div className="row">
                        <div className="col-md-4 text-center">
                            <img src="/Images/cake.jpeg" alt="Custom Cakes" className="img-fluid rounded-circle shadow-sm mb-3" />
                            <h4>Custom Cakes</h4>
                            <p>From birthdays to weddings, our custom cakes are designed to make your special day even more memorable.</p>
                        </div>
                        <div className="col-md-4 text-center">
                            <img src="/Images/pastery.jpeg" alt="Pastries" className="img-fluid rounded-circle shadow-sm mb-3" />
                            <h4>Fresh Pastries</h4>
                            <p>Delicious, flaky, and made fresh every day. Pair them with our artisanal coffee for the perfect start to your morning.</p>
                        </div>
                        <div className="col-md-4 text-center">
                            <img src="/Images/cookies.jpeg" alt="Cookies" className="img-fluid rounded-circle shadow-sm mb-3" />
                            <h4>Gourmet Cookies</h4>
                            <p>Indulge in our selection of handcrafted cookies, from classic chocolate chip to innovative seasonal flavors.</p>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div id="team" className="team-section py-5">
                    <h2 className="text-center fw-bold">Meet Our Team</h2>
                    <p className="text-center mb-5">Our talented team of bakers and pastry chefs work with passion and dedication to create the finest baked goods.</p>
                    <div className="row">
                        <div className="col-md-4 text-center">
                            <img src="/Images/headBaker.jpeg" alt="Head Baker" className="img-fluid rounded-circle shadow-sm mb-3" />
                            <h5>Jane Doe</h5>
                            <p>Head Baker</p>
                        </div>
                        <div className="col-md-4 text-center">
                            <img src="/Images/pasteryChief.jpeg" alt="Pastry Chef" className="img-fluid rounded-circle shadow-sm mb-3" />
                            <h5>John Smith</h5>
                            <p>Pastry Chef</p>
                        </div>
                        <div className="col-md-4 text-center">
                            <img src="/Images/cakeArtist.jpeg" alt="Cake Artist" className="img-fluid rounded-circle shadow-sm mb-3" />
                            <h5>Emily Brown</h5>
                            <p>Cake Artist</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
