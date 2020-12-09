import './signup.css';
import Head from 'next/head';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../config';
import Layout from '../components/Layout';
import SignupComponent from '../components/auth/SignupComponent';
import Link from 'next/link';

const Signup = () => {
    const head = () => (
        <Head>
            <title>
                Free Membership | {APP_NAME}
            </title>
            <meta property="og:title" content="Free Membership | Amazon Product King" />
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
            <div class="contact-us">
              <form>
                <div className="container-fluid">
                    <h2 className="text-center pt-4 pb-4">Free Membership</h2>
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <SignupComponent />
                        </div>
                    </div>
                </div>  

              </form>
            </div>
            
        </Layout>
    );
};

export default Signup;
