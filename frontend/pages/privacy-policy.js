import Head from 'next/head';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../config';
import Layout from '../components/Layout';
import Link from 'next/link';
import '../components/blog/BlogPage.css';
import HowItWorks from '../components/tutorials/HowItWorks';

const PrivacyPolicy = () => {
	const head = () => (
        <Head>
            <title>
                Privacy Policy | {APP_NAME}
            </title>
            <meta property="og:title" content="Privacy Policy | Amazon Product King" />
            <meta
                property="og:description"
                content="The Amazon Scraper King Privacy Policy!"
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

            <div className="container-fluid">
                <div className="pt-5 pb-5 row">
                    <div className="col-md-8 offset-md-2">
                        <h2>Privacy Policy</h2>
            
                        <p><em>Amazon Scraper King</em> provides Amazon Shoppers the ability to export their Purchase History, "the Service".

                        This Privacy Policy describes how personal information is collected, used, and shared when you install or use the
                        Chrome Extension.</p>

                        <p>In order to export your Purchase Data, the Extension visits the relevant Amazon Pages in your Shopper Dashboard.
                            The URL is often: "https://www.amazon.com/gp/css/order-history", but it might be a different domain depending on where
                            you're shopping from in the world.</p>

                        <p>The Extension will then loop through items you bought & save it in the Scraper King Database</p>

                        <p>Shoppers can delete whatever data is saved by Scraper King, at any time, by logging into their Scraper King User Admin Dashboard 
                            & simply selecting the items they'd like to delete</p>
                        
                        <p>When you're ready, Scraper King can generate a unique shopping profile per Shopper that you can then share with your friends 
                            to bond over your purchases.</p>

                        <p>For any related questions, feel free to reach out to help@scraperking.app</p>

                        <p>We're always happy to help & do hope you enjoy the app & discover cool products along the way :)</p>
                    </div>
                </div>
            </div>
            
            <HowItWorks />
        	
        </Layout>
    );
};

export default PrivacyPolicy;
