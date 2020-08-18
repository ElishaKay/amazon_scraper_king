const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');

module.exports = withCSS(withSass({
publicRuntimeConfig: {
      APP_NAME: 'Amazon Tech Network',
      API_DEVELOPMENT: 'http://localhost:8000/api',
      API_PRODUCTION: 'https://amazontech.network/api',
      PRODUCTION: true,
      DOMAIN_DEVELOPMENT: 'http://localhost:3000',
      DOMAIN_PRODUCTION:'https://amazontech.network',
      FB_APP_ID: '305241670454834',
      DISQUS_SHORTNAME: 'ampitup-io',
      GOOGLE_CLIENT_ID:'299145764723-o5k1tr51r339gua3cja4o02r0l2g4lkb.apps.googleusercontent.com'
},
webpack: function(config, options) {
     if (!options.dev) {
         config.module.rules.push({
           test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
           use: {
                   loader: 'url-loader',
                   options: {
                         limit: 100000
                   }
               }
          });
         return config;
     }

return config;
   }
}));
