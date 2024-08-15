import Layout from "../components/Layout";
import logo from "../Images/Contact.png";

const Contact = () => {
    return (
        <Layout title={'Contact Us'}>
            <div className="contact-page">
                <div className="contact-grid">
                    <div className="contact-content">
                        <h1>Contact Us</h1>
                        <p>If you have any questions, feel free to reach out to us at:</p>
                        <ul>
                            <li>Email: contact@happinessharbor.com</li>
                            <li>Phone: +1 (123) 456-7890</li>
                            <li>Address: 123 Harbor Lane, Tranquility Bay</li>
                        </ul>
                    </div>
                    <div className="contact-image">
                        <img
                            src={logo}
                            alt="Contact Us"
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Contact;
