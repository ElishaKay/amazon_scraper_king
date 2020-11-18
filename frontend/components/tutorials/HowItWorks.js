import Link from 'next/link';
import './HowItWorksStyling.css';
import '../blog/BlogPage.css';

const HowItWorks = () => {
    return (
            <div className="container-fluid">
                <div className="pt-5 pb-5 row">
                    <div className="col-md-8 offset-md-2">
                        <h2>How It Works</h2>
                        <hr />
                        <iframe 
                            className="iframe"
                            width="100%" 
                            src="https://www.youtube.com/embed/0UvTl3x3FQI" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen>
                        </iframe> 
                    </div>
                </div>
       
            </div>
    );
};

export default HowItWorks;




                