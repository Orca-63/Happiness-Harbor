import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Layout = ({ children, title, description, author, keywords }) => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>

            </Helmet>
            <Header />
            <main style={{ minHeight: "80vh" }}>
                <ToastContainer />
                {children}
            </main>
            <Footer />

        </>
    )
}



Layout.defaultProps = {
    title: 'Happiness Harbor',
    description: 'Happiness Harbor: Anchor Your Mind in Tranquility',
    keywords: 'MongoDB, Express, React, Node.js',
    author: 'Happiness Harbor'

}
export default Layout;