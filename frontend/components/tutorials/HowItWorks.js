import Link from 'next/link';
import './HowItWorksStyling.css';
import '../blog/BlogPage.css';

const HowItWorks = () => {
    return (
            <div className="container-fluid">
                <div className="pt-5 pb-5 row">
                    <div className="col-md-8 offset-md-2">
                        <h2>Get Started</h2>
                        <hr />
                        <h5>Ready to join the eCommerce Tidal Wave?</h5>
                        <h5>Use the Chrome Extension to Import Products into your Dashboard.</h5>
                        
                        <div className="action">
                             <Link prefetch={false} href="https://chrome.google.com/webstore/detail/my-amazon-history/epmjnoajehdombhjonaoifmhbkkflnli">
                                <a target={"_blank"} className="add-to-cart btn btn-default">Get The Chrome Extension</a>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <h2>How It Works</h2>
                        <hr />
                        <iframe 
                            className="iframe"
                            src="//www.slideshare.net/slideshow/embed_code/key/f813IqqXbOSRMX" 
                            width="100%" 
                            frameBorder="0" 
                            marginWidth="0" 
                            marginHeight="0" 
                            scrolling="no" 
                            allowFullScreen> 
                        </iframe> 
                    </div>
                </div>
       
            </div>
    );
};

export default HowItWorks;
