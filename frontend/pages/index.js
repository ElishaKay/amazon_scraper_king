//HOMEPAGE
import './signup.css';
import Layout from '../components/Layout';
import Link from 'next/link';
import '../components/blog/BlogPage.css';

import Head from 'next/head';
import { withRouter } from 'next/router';
import { useState } from 'react';
import { listBlogsWithCategoriesAndTags } from '../actions/blog';
import FlipCard from '../components/blog/FlipCard';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../config';

const Index = ({ blogs, categories, tags, totalBlogs, blogsLimit, blogSkip, router }) => {
    const head = () => (
        <Head>
            <title>{APP_NAME}</title>
            <meta
                name="description"
                content="Check out our community's Favorite Products - which they actually purchased on Amazon!"
            />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`${APP_NAME} - For Fans, By Fans`} />
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

    const [limit, setLimit] = useState(blogsLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalBlogs);
    const [loadedBlogs, setLoadedBlogs] = useState([]);

    const loadMore = () => {
        let toSkip = skip + limit;
        listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setLoadedBlogs([...loadedBlogs, ...data.blogs]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
                    Load more
                </button>
            )
        );
    };

    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <div key={i} className="col-md-4">
                    <FlipCard blog={blog} />
                </div>
            );
        });
    };

    const showAllCategories = () => {
        return categories.map((c, i) => (
            <Link href={`/categories/${c.slug}`} key={i}>
                <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ));
    };

    const showAllTags = () => {
        return tags.map((t, i) => (
            <Link href={`/tags/${t.slug}`} key={i}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ));
    };

    const showLoadedBlogs = () => {
        return loadedBlogs.map((blog, i) => (
            <div key={i} className="col-md-4">
                <FlipCard blog={blog} />
            </div>
        ));
    };


    return (
    <React.Fragment>
        {head()}
        <Layout>
            <div className="container-fluid">
                <header>
                    <section>
                     <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-4 font-weight-bold">
                                    Social Shopping Is Finally Here
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center pt-4 pb-2">
                                <p className="lead">
                                    Share your Amazon history with friends and family. Use the Chrome Extension to generate your listings within minutes.
                                </p>
                                 <div className="pt-3 pb-3 action">
                                     <Link prefetch={false} href="https://chrome.google.com/webstore/detail/my-amazon-history/epmjnoajehdombhjonaoifmhbkkflnli">
                                        <a target={"_blank"} className="add-to-cart btn btn-default">Get The Chrome Extension</a>
                                    </Link>
                                </div>
                                <p className="lead">
                                    The Amazon Wave is sweeping the world economy. Check out what other users purchased, write reviews, comment on other people's posts, 
                                    and make up to 10% commission when someone purchases an Amazon Product via one of your pages. 
                                </p>
                            </div>
                        </div>
                    </div>

                <div className="pb-5 text-center">
                         {showAllTags()}
                </div>

                <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>

                <div className="container-fluid">
                    <div className="row">{showLoadedBlogs()}{showAllBlogs()}</div>
                </div>


                </section>
                </header>      
                </div>
        </Layout>
     </React.Fragment>
    );
};

Index.getInitialProps = () => {
    let skip = 0;
    let limit = 9;
    return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return {
                blogs: data.blogs,
                categories: data.categories,
                tags: data.tags,
                totalBlogs: data.size,
                blogsLimit: limit,
                blogSkip: skip
            };
        }
    });
};

export default withRouter(Index);


// <div className="pb-5 text-center">
//     {showAllCategories()}
//     <br />
//     {showAllTags()}
// </div>