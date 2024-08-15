import Layout from "../components/Layout";
import logo from '../Images/AboutUs2.png';

const About = () => {
    return (
        <Layout title={'About us'}>
            <div className="about-page">
                <div className="about-grid">
                    <div className="about-content">
                        <h1>About Us</h1>
                        <p>
                            Welcome to Happiness Harbor, your sanctuary for mental well-being. Our mission is to provide
                            resources and support to help you anchor your mind in tranquility and find lasting happiness.
                            We offer a range of tools and insights to help you navigate the challenges of life and find
                            inner peace.
                        </p>
                    </div>
                    <div className="about-image">
                        <img
                            src={logo}
                            alt="About Us"
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default About;
