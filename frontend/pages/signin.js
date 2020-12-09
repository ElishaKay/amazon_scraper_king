import Layout from '../components/Layout';
import Head from 'next/head';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../config';
import { withRouter } from 'next/router';
import SigninComponent from '../components/auth/SigninComponent';

const Signin = ({ router }) => {
      const head = () => (
        <Head>
            <title>
                Log in | {APP_NAME}
            </title>
            <meta property="og:title" content="Login | Amazon Product King" />
            <meta
                property="og:description"
                content="Check out what other users purchased, write reviews, comment on other people's posts, and make up to 10% commission when someone purchases an Amazon Product via one of your pages!"
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/static/images/large_rocket.jpeg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/large_rocket.jpeg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

    const showRedirectMessage = () => {
        if (router.query.message) {
            return <div className="alert alert-danger">{router.query.message}</div>;
        } else {
            return;
        }
    };

    return (
        <Layout>
            {head()}
             <div className="contact-us">
              <form>
                    <div className="container-fluid">
                        <h2 className="text-center pt-4 pb-4">Log in</h2>

                        <div className="row">
                            <div className="col-md-6 offset-md-3">{showRedirectMessage()}</div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                                <SigninComponent />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default withRouter(Signin);
