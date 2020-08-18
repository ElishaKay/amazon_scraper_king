import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import SmallCard from '../../components/blog/SmallCard';
import { userPublicProfile } from '../../actions/user';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import moment from 'moment';
import ContactForm from '../../components/form/ContactForm';

const UserProfile = ({ user, blogs, query }) => {
    const head = () => (
        <Head>
            <title>
                {user.username} | {APP_NAME}
            </title>
            <meta name="description" content={`Amazon products recommended by ${user.username}`} />
            <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
            <meta property="og:title" content={`${user.username}| ${APP_NAME}`} />
            <meta property="og:description" content={`Amazon products recommended by ${user.username}`} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/profile/${query.username}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/static/images/lrgfbimg.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/lrgfbimg.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

    const showUserBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <div className="col-md-4" key={i}>
                    <article>
                        <SmallCard blog={blog} />
                    </article>
                </div>
            );
        });
    };

    // const getFeaturedImage = user => {
    //     console.log('user:', user)
    //     return user.popUser == true ? '' : `${API}/user/photo/${user.username}`;
    // }

    return (
        <React.Fragment>
            {head()}
            <Layout>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <h5>{user.name}</h5>
                                            <p className="text-muted">Joined {moment(user.createdAt).fromNow()}</p>
                                        </div>
                                        <div className="col-md-4">
                                         
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <h5 className="card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-white">
                                            {user.name.split(' ')[0]}'s Favorites
                                        </h5>
                                    </div>
                                    <div className="row">
                                        {showUserBlogs()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <br />

                <div className="container pb-5">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-white">
                                        Recent posts by {user.name}
                                    </h5>

                                    
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-light">
                                        Message {user.name}
                                    </h5>
                                    <br />
                                    <ContactForm authorEmail={user.email} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </React.Fragment>
    );
};

UserProfile.getInitialProps = ({ query }) => {
    // console.log(query);
    return userPublicProfile(query.username).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            // console.log(data);
            return { user: data.user, blogs: data.blogs, query };
        }
    });
};

export default UserProfile;


   // 
// <img
//      src={getFeaturedImage(user)}
//     className="img img-fluid img-thumbnail mb-3"
//     style={{ maxHeight: '100px', maxWidth: '100%' }}
//     alt="user profile"
// />