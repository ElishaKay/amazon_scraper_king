import Link from 'next/link';
import renderHTML from 'react-render-html';
import StarRatings from 'react-star-ratings';

import moment from 'moment';
import { API } from '../../config';
import './BlogPage.css';

const SpotLight = ({ blog }) => {
    return (
					<div className="wrapper row">
						<div className="preview col-md-6">
							
							<div className="preview-pic tab-content">
							  <div className="tab-pane active" id="pic-1"><img src={blog.product_imgurl} /></div>
							</div>
							
						</div>
						<div className="details col-md-6">
							<h3 className="product-title">{blog.product_title}</h3>
							{blog.product_rating &&
								<div>
									<StarRatings
							          rating={blog.product_rating}
							          starRatedColor="rgb(255, 161, 34)"
							          numberOfStars={5}
							          name='rating'
							        />
							        <p>With {blog.total_ratings} ratings</p>
						        </div>
					    	}
							{blog.product_by ? <h4 className="price">By: {blog.product_by}<span></span></h4> : ''}	
							<h4 className="price">Purchased At: <span>{blog.product_cost}</span></h4>						
							<span>{blog.product_summary ? renderHTML(blog.product_summary): ''}</span>

							<div className="action">
								<Link prefetch={false} href={`${blog.product_link}&tag=${blog.postedBy && blog.postedBy.trackingID ? blog.postedBy.trackingID : 'mysidehussl08-20'}`}>
									<a target={"_blank"} className="add-to-cart btn btn-default">View on Amazon</a>
								</Link>
							</div>
						</div>
					</div>
				
	);
};



export default SpotLight;