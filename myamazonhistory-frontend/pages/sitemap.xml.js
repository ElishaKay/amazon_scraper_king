import React from "react";
import { API, DOMAIN } from '../config';
const fetch = require("node-fetch");

const sitemapXML = data => {
  let latestPost = 0;
  let latestProfile = 0;
  let latestTag = 0;


  let projectsXML = "";
  let profilesXML = "";
  let tagsXML = "";


  data.tags.map(tag => {
    const tagDate = tag.updatedAt;
    if (!latestTag || tagDate > latestTag) {
      latestTag = tagDate;
    }

    const tagURL = `${DOMAIN}/tags/${tag.slug}`;
    tagsXML += `
      <url>
        <loc>${tagURL}</loc>
        <lastmod>${tagDate}</lastmod>
        <priority>0.50</priority>
      </url>`
  });

  data.users.map(user => {
    const profileDate = user.updatedAt;
    if (!latestProfile || profileDate > latestProfile) {
      latestProfile = profileDate;
    }

    const profileURL = `${DOMAIN}/profile/${user.username}`;
    profilesXML += `
      <url>
        <loc>${profileURL}</loc>
        <lastmod>${profileDate}</lastmod>
        <priority>0.50</priority>
      </url>`
  });

  data.blogs.map(post => {
    const postDate = post.updatedAt;
    if (!latestPost || postDate > latestPost) {
      latestPost = postDate;
    }

    const projectURL = `${DOMAIN}/blogs/${post.slug}`;
    projectsXML += `
      <url>
        <loc>${projectURL}</loc>
        <lastmod>${postDate}</lastmod>
        <priority>0.50</priority>
      </url>`
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${DOMAIN}</loc>
        <lastmod>${latestPost}</lastmod>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>${DOMAIN}/getting-started</loc>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${DOMAIN}/blogs</loc>
        <priority>0.80</priority>
      </url>
      ${tagsXML}
      ${profilesXML}
      ${projectsXML}
    </urlset>`;
};


class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    const data = await fetch(`${API}/urls-for-sitemap`, {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemapXML(data));
    res.end();
  }
}

export default Sitemap;


