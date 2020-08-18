import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin';
import Link from 'next/link';
import './styling.css';

const AdminIndex = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Admin Dashboard</h2>
                        </div>
                        <div className="col-md-4">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <Link href="/admin/crud/category-tag">
                                        <a>Create Category</a>
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link href="/admin/crud/category-tag">
                                        <a>Create Tag</a>
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link href="/admin/crud/blogs">
                                        <a>Manage Product Reviews</a>
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link href="/user/update">
                                        <a>Update Profile</a>
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <a href="/admin/crud/blog">Create New Post</a>
                                </li>

                            </ul>
                        </div>
                        <div className="col-md-8">
                            <iframe 
                                className='iframe' 
                                src="https://www.youtube.com/embed/iuSy6NgwhgU"
                                width="800px" 
                                height="400px"
                                frameBorder="0" 
                                allowFullScreen>
                            </iframe>
                        </div>
                    </div>                    
                </div>
            </Admin>
        </Layout>
    );
};

export default AdminIndex;

