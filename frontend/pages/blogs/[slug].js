import cheerio from 'cheerio';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { singleBlog, listRelated } from '../../actions/blog';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import SmallCard from '../../components/blog/SmallCard';
import SpotLight from '../../components/blog/SpotLight';

import DisqusThread from '../../components/DisqusThread';


const SingleBlog = ({ blog, query }) => {
    const [related, setRelated] = useState([]);

    const loadRelated = () => {
        listRelated({ blog }).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setRelated(data);
            }
        });
    };

    const getFeaturedImage = blog => {
        return blog.autoGenerated ? blog.product_imgurl : `${API}/blog/photo/${blog.slug}`;
    }

    useEffect(() => {
        loadRelated();
    }, []);

    const head = () => (
        <Head>
            <title>
                {blog.title} | {APP_NAME}
            </title>
            <meta name="description" content={blog.mdesc} />
            <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:title" content={`${blog.title}| ${APP_NAME}`} />
            <meta property="og:description" content={blog.mdesc} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={getFeaturedImage(blog)} />
            <meta property="og:image:secure_url" ccontent={getFeaturedImage(blog)} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

    const showBlogCategories = blog =>
        blog.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <a className="invisible btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ));

    const showBlogTags = blog =>
        blog.tags.map((t, i) => (
            <Link key={i} href={`/tags/${t.slug}`}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ));

    const showRelatedBlog = () => {
        return related.map((blog, i) => (
            <div className="col-md-4" key={i}>
                <article>
                    <SmallCard blog={blog} />
                </article>
            </div>
        ));
    };

    const fixReviewLinks = (html) => {
        const $ = cheerio.load(html);  
        $("a").each(function() {    
            var old_src = $(this).attr("href");
            var new_src = "https://www.amazon.com" + old_src + '&tag=mysidehussl08-20';
            $(this).attr("href", new_src);            
        });
        return $.html();
    }

    const showAllReviews = () => {
        if(blog.reviewsWithURLs){
            return blog.reviewsWithURLs.map((review, i) => {
                return (
                     <div key={i} className="card">
                        <div className="wrapper row">
                            {renderHTML(review.text.includes('<a data-hook=') ? fixReviewLinks(review.text) : review.text)}
                        </div>
                        <p className="pt-3"> - 
                            <Link href={`/profile/${review.url}`}>
                                <a> {review.url}</a>
                            </Link></p>
                    </div>
                );
            });
        } else {
            return blog.product_reviews.map((review, i) => {
                return (
                     <div key={i} className="card">
                        <div className="wrapper row">
                            {renderHTML(review)}
                        </div>
                        <p className="pt-3"> - Anonymous</p>
                    </div>
                );
            });
        }
        
    };

    const showComments = () => {
        return (
            <div>
                <DisqusThread id={blog.id} title={blog.title} path={`/blog/${blog.slug}`} />
            </div>
        );
    };

    return (
        <React.Fragment>
            {head()}
            <Layout>
                <main>
                    <article>
                        <div className="container-fluid">
                            <section>
                                <div className="row" style={{ marginTop: '-30px' }}>
                                    <img
                                        src={getFeaturedImage(blog)}
                                        alt={blog.title}
                                        className="img img-fluid featured-image"
                                    />
                                </div>
                            </section>

                            <section>
                                <div className="container">
                                    <h3 className="pb-3 pt-3 text-center font-weight-bold">{blog.title}</h3>
                                    <p className="lead mt-3 mark">
                                        Written by{' '}
                                        <Link href={`/profile/${blog.postedBy.username}`}>
                                            <a>{blog.postedBy.username}</a>
                                        </Link>{' '}
                                        | Published {moment(blog.updatedAt).fromNow()}
                                    </p>

                                    <div className="pb-3">
                                        {showBlogTags(blog)}
                                        <br />
                                        <br />
                                    </div>
                                </div>
                            </section>
                        </div>

                        {blog.autoGenerated && (
                          <div className="container">
                             <div className="card">
                                    <div className="wrapper row">
                                        <SpotLight blog={blog} />
                                    </div>
                              </div>
                          </div>
                        )}

                        

                        <div className="pt-5 container">
                            {showAllReviews(blog)}
                        </div>

                        {blog.body.includes('a story behind this purchase') ? '' : 

                        `<div className="pt-5 container">
                             <div className="card">
                                    <div className="wrapper row">
                                        ${renderHTML(blog.body)}
                                    </div>
                            </div>
                        </div>`}

                        <div className="container">
                            <h4 className="text-center pt-5 pb-5 h2">Related blogs</h4>
                            <div className="row">{showRelatedBlog()}</div>
                        </div>

                        <div className="container pt-5 pb-5">{showComments()}</div>
                    </article>
                </main>
            </Layout>
        </React.Fragment>
    );
};

SingleBlog.getInitialProps = ({ query }) => {
    return singleBlog(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            // console.log('GET INITIAL PROPS IN SINGLE BLOG', data);
            return { blog: data, query };
        }
    });
};

export default SingleBlog;
