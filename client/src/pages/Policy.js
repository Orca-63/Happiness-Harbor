import Layout from "../components/Layout";
import policyImage from "../Images/Policy.png"; // Update with your actual image path

const Policy = () => {
    return (
        <Layout title={'Privacy Policy'}>
            <div className="privacy-page">
                <div className="privacy-grid">
                    <div className="privacy-content">
                        <h1>Privacy Policy</h1>
                        <p>
                            At Happiness Harbor, your privacy is important to us. We are committed to protecting your
                            personal information and ensuring a safe and secure experience on our website. Please read our
                            privacy policy to understand how we collect, use, and safeguard your information.
                        </p>
                    </div>
                    <div className="privacy-image">
                        <img
                            src={policyImage}
                            alt="Privacy Policy"
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Policy;
