import './signup.css';
import Layout from '../components/Layout';
import SignupComponent from '../components/auth/SignupComponent';
import Link from 'next/link';

const Signup = () => {
    return (
        <Layout>
            <div class="contact-us">
              <form>
                <div className="container-fluid">
                    <h2 className="text-center pt-4 pb-4">Signup</h2>
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
