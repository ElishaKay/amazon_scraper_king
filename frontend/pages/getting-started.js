import Head from 'next/head';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../config';
import Layout from '../components/Layout';
import Link from 'next/link';
import '../components/blog/BlogPage.css';
import HowItWorks from '../components/tutorials/HowItWorks';

const GettingStarted = () => {
	const head = () => (
        <Head>
            <title>
                Get Started | {APP_NAME}
            </title>
            <meta property="og:title" content="Getting Started | Amazon Product King" />
            <meta
                property="og:description"
                content="Check out what other users purchased, write reviews, comment on other people's posts, and make up to 10% commission when someone purchases an Amazon Product via one of your pages!"
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/static/images/large_rocket.jpeg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/large_rocket.jpeg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

    return (
        <Layout>
        	{head()}
            <HowItWorks />
        	}
        </Layout>
    );
};

export default GettingStarted;
