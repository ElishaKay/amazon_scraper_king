import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { list, removeBlog, toggleBlogVisibility } from '../../actions/blog';
import moment from 'moment';
import ToggleButton from 'react-toggle-button';
import HowItWorks from '../tutorials/HowItWorks';

const BlogRead = ({ username }) => {
    const [blogs, setBlogs] = useState([]);
    const [loaded, setLoaded] = useState({value: false});
    const [message, setMessage] = useState('');
    const [toggleValue, setToggleValue] = useState(true);
    const token = getCookie('token');

    useEffect(() => {
        loadBlogs();
    }, []);

    const hideShowBlog = slug => {
        toggleBlogVisibility(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                console.log('data',data);
                loadBlogs();
            }
        });
    };

    const deleteBlog = slug => {
        removeBlog(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                loadBlogs();
            }
        });
    };


    const loadBlogs = () => {
        list(username).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log('blog array after updating: ',data);
                setBlogs(data);
                setLoaded(true);
            }
        });
    };

    
    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete your blog?');
        if (answer) {
            deleteBlog(slug);
        }
    };

    const showUpdateButton = blog => {
        if (isAuth() && isAuth().role === 0) {
            return (
                <Link href={`/user/crud/${blog.slug}`}>
                    <a className="ml-2 btn btn-sm btn-warning">Update</a>
                </Link>
            );
        } else if (isAuth() && isAuth().role === 1) {
            return (
                <Link href={`/admin/crud/${blog.slug}`}>
                    <a className="ml-2 btn btn-sm btn-warning">Update</a>
                </Link>
            );
        }
    };

    const showViewButton = blog => {
        let blogPublicLink = "https://www.myamazonhistory.com/blogs/" + blog.slug;
        if(blog.hidden!=true){
            return (
                <Link prefetch={false} href={blogPublicLink}>
                    <a target={"_blank"} className="ml-2 btn btn-sm btn-warning">View</a>
                </Link>
          )
        }
    };

    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <div key={i} className="pb-5">
                    <ToggleButton
                      value={ !blog.hidden }
                      activeLabel=' Public '
                      inactiveLabel=' Hidden '
                       onToggle={() => {
                        hideShowBlog(blog.slug)
                      }} />
                    <h3>{blog.title}</h3>

                    <p className="mark">
                        Posted by {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()}
                    </p>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(blog.slug)}>
                        Delete
                    </button>
                    {showUpdateButton(blog)}
                    {showViewButton(blog)}
                    
                </div>
            );
        });
    };

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-12">
                    {message && <div className="alert alert-warning">{message}</div>}

                    {loaded && blogs.length == 0
                        ? <HowItWorks />
                        : <div className="row">
                                <div className="col-md-12 pt-5 pb-5">
                                    <h2>Manage Product Pages</h2>
                                </div>
                                <div className="col-md-12">
                                    {showAllBlogs()}
                                </div>
                          </div>
                  }

                </div>
            </div>
        </React.Fragment>
    );
};

export default BlogRead;

