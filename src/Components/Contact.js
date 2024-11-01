import React, { useState } from 'react';

const Contact = () => {
    // State for form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const sendMessage = (e) => {
        e.preventDefault();
        // Implement your message sending logic here
        console.log({ name, email, subject, message });
        // Clear form fields after submission
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
    };

    return (
        <section className="contact">
            <h1 className="mx-5">Contact Information</h1>
            <div className="container my-5">
                <div className="contact-info mb-5">
                    <p className='text-center mb-5'>If you have any questions or need assistance, feel free to reach out to us!<br></br> Our team is here to assist you with any inquiries you may have. Reach out to us via the following methods:</p>
                    <p><strong>Phone:</strong> <a href="tel:+11234567890">123-456-7890</a></p>
                    <p><strong>Email:</strong> <a href="mailto:sweetBakers231@gmail.com">sweetBakers231@gmail.com</a></p>
                    <p><strong>Office Hours:</strong> Mon-Fri: 9 AM - 5 PM</p>
                    <p><strong>Address:</strong> 123 Business Ave, Suite 100, Cityville, ST 12345</p>
                </div>
                <h2 className="text-center fw-bold">Send Message</h2>
                <div className="container" data-aos="fade-up" data-aos-delay="100">
                    <div className="row gy-4">
                        <div className="col-lg-6">
                            <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="200">
                                <i className="bi bi-envelope" ></i>
                                <a href="mailto:sweetBakers231@pucit.edu.pk" className="mt-2 text-decoration-none">sweetBakers231@pucit.edu.pk</a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="300">
                                <i className="bi bi-instagram"></i>
                                <a href="https://instagram.com" className="mt-2" target="_blank" rel="noopener noreferrer">Instagram</a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="400">
                                <i className="bi bi-facebook"></i>
                                <a href="https://www.facebook.com" className="mt-2" target="_blank" rel="noopener noreferrer">Visit Facebook</a>
                            </div>
                        </div>
                    </div>
                    <div className="row gy-4 mt-1">
                        <div className="col-lg-6" data-aos="fade-up" data-aos-delay="300">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3399.316627966318!2d74.30704911009545!3d31.570364044564617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39191ca7d960f837%3A0xc0bb6ddf0568a651!2sPunjab%20University%20College%20of%20Information%20Technology%20Old%20Campus!5e0!3m2!1sen!2s!4v1725917891907!5m2!1sen!2s"
                                className="w-100 h-100 me-1"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                        <div className="col-lg-6">
                            <form id="sendMessageForm" onSubmit={sendMessage} className="php-email-form" data-aos="fade-up" data-aos-delay="400">
                                <div className="row gy-4">
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-control"
                                            placeholder="Your Name"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Your Email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            className="form-control"
                                            placeholder="Subject"
                                            required
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <textarea
                                            className="form-control"
                                            id="message"
                                            name="message"
                                            rows="6"
                                            placeholder="Message"
                                            required
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className="col-md-12 text-center">
                                        <button type="submit" className="btn btn-sendMessage">
                                            Send Message
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
