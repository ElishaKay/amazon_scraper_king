┴──────────┴──────────┘
historyadmin@My-Amazon-History:~$ pm2 logs (only works when you turn off the process running on port 8000 with `pm2 stop server`)

[TAILING] Tailing last 15 lines for [all] processes (change the value with --lines option)

/home/historyadmin/.pm2/pm2.log last 15 lines:
PM2        | 2020-04-07T11:58:25: PM2 log: App [server:0] exited with code [1] via signal [SIGINT]
PM2        | 2020-04-07T11:58:25: PM2 log: App [server:0] starting in -fork mode-
PM2        | 2020-04-07T11:58:25: PM2 log: App [server:0] online
PM2        | 2020-04-07T11:58:26: PM2 log: App [server:0] exited with code [1] via signal [SIGINT]
PM2        | 2020-04-07T11:58:26: PM2 log: App [server:0] starting in -fork mode-
PM2        | 2020-04-07T11:58:26: PM2 log: App [server:0] online
PM2        | 2020-04-07T11:58:28: PM2 log: App [server:0] exited with code [1] via signal [SIGINT]
PM2        | 2020-04-07T11:58:28: PM2 log: App [server:0] starting in -fork mode-
PM2        | 2020-04-07T11:58:28: PM2 log: App [server:0] online
PM2        | 2020-04-07T11:58:29: PM2 log: App [server:0] exited with code [1] via signal [SIGINT]
PM2        | 2020-04-07T11:58:29: PM2 log: App [server:0] starting in -fork mode-
PM2        | 2020-04-07T11:58:29: PM2 log: App [server:0] online
PM2        | 2020-04-07T11:58:30: PM2 log: Stopping app:server id:0
PM2        | 2020-04-07T11:58:30: PM2 log: App [server:0] exited with code [0] via signal [SIGINT]
PM2        | 2020-04-07T11:58:30: PM2 log: pid=1571 msg=process killed

/home/historyadmin/.pm2/logs/npm-out.log last 15 lines:
1|npm      |   slug: 'trump:-the-art-of-the-deal',
1|npm      |   mdesc:
1|npm      |    'Trump: The Art of the Deal\nBy: Trump, Donald J.\n\nThere\'s a story behind this purchase, but it hasn\'t been written yet.\nPurchased At: $10.45\n\nView on Amazon',
1|npm      |   postedBy:
1|npm      |    { _id: '5e81ff6a6a683a0c6048318f',
1|npm      |      name: 'Elisha Kramer',
1|npm      |      profile: 'http://localhost:3000/profile/TlPCxVhXS',
1|npm      |      username: 'leeshkay' },
1|npm      |   createdAt: '2020-04-05T10:40:44.211Z',
1|npm      |   updatedAt: '2020-04-05T10:40:45.117Z' }
1|npm      |
1|npm      | > frontend@1.0.0 start /home/historyadmin/myamazonhistory-frontend
1|npm      | > next start
1|npm      |
1|npm      | > Ready on http://localhost:3000

/home/historyadmin/.pm2/logs/npm-error.log last 15 lines:
1|npm      |     at a.b.render (/home/historyadmin/myamazonhistory-frontend/node_modules/react-dom/cjs/react-dom-server.node.production.min.js:44:476)
1|npm      |     at a.b.read (/home/historyadmin/myamazonhistory-frontend/node_modules/react-dom/cjs/react-dom-server.node.production.min.js:44:18)
1|npm      |     at renderToString (/home/historyadmin/myamazonhistory-frontend/node_modules/react-dom/cjs/react-dom-server.node.production.min.js:54:364)
1|npm      |     at render (/home/historyadmin/myamazonhistory-frontend/node_modules/next/dist/next-server/server/render.js:82:16)
1|npm      |     at Object.renderPage (/home/historyadmin/myamazonhistory-frontend/node_modules/next/dist/next-server/server/render.js:404:16)
1|npm      |     at Function.getInitialProps (/home/historyadmin/myamazonhistory-frontend/.next/server/static/2jImnbMBl4g2u6uZu4Ny7/pages/_document.js:359:19)
1|npm      | TypeError: Cannot read property 'error' of null
1|npm      |     at Object.then.data (/home/historyadmin/myamazonhistory-frontend/.next/server/static/jhZAaROUcGoKtWfe84XMN/pages/blogs/[slug].js:804:14)
1|npm      |     at process._tickCallback (internal/process/next_tick.js:68:7)
1|npm      | TypeError: Cannot read property 'error' of null
1|npm      |     at Object.then.data (/home/historyadmin/myamazonhistory-frontend/.next/server/static/jhZAaROUcGoKtWfe84XMN/pages/blogs/[slug].js:804:14)
1|npm      |     at process._tickCallback (internal/process/next_tick.js:68:7)
1|npm      | TypeError: Cannot read property 'error' of null
1|npm      |     at Object.then.data (/home/historyadmin/myamazonhistory-frontend/.next/server/static/jhZAaROUcGoKtWfe84XMN/pages/blogs/[slug].js:804:14)
1|npm      |     at process._tickCallback (internal/process/next_tick.js:68:7)

/home/historyadmin/.pm2/logs/server-out.log last 15 lines:
0|server   |   name: 'MongoError',
0|server   |   index: 0,
0|server   |   code: 11000,
0|server   |   errmsg:
0|server   |    'E11000 duplicate key error index: myfaveproducts.blogs.$slug_1 dup key: { : "idea-man:-a-memoir-by-the-cofounder-of-microsoft" }',
0|server   |   [Symbol(mongoErrorContextSymbol)]: {} }
0|server   | POST /api/extension/login 200 1620.696 ms - 311
0|server   | GET / 404 0.457 ms - 139
0|server   | POST /api/blogs-categories-tags 200 306.485 ms - 9466
0|server   | POST /api/blogs-categories-tags 200 332.121 ms - 9466
0|server   | POST /api/blogs-categories-tags 200 322.045 ms - 9466
0|server   | POST /api/blogs-categories-tags 200 301.718 ms - 9466
0|server   | GET /api/signout 304 0.522 ms - -
0|server   | POST /api/pre-signup 200 883.571 ms - 113
0|server   | POST /api/google-login - - ms - -

/home/historyadmin/.pm2/logs/web-interface-error.log last 15 lines:
2|web-inte |     at Module.load (internal/modules/cjs/loader.js:653:32)
2|web-inte |     at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
2|web-inte |     at Function.Module._load (internal/modules/cjs/loader.js:585:3)
2|web-inte |     at Object.<anonymous> (/usr/lib/node_modules/pm2/lib/ProcessContainerFork.js:32:23)
2|web-inte |     at Module._compile (internal/modules/cjs/loader.js:778:30)
2|web-inte |     at Object.Module._extensions..js (internal/modules/cjs/loader.js:789:10)
2|web-inte |     at Module.load (internal/modules/cjs/loader.js:653:32)
2|web-inte |     at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
2|web-inte |     at Function.Module._load (internal/modules/cjs/loader.js:585:3)
2|web-inte |   code: 'EADDRINUSE',
2|web-inte |   errno: 'EADDRINUSE',
2|web-inte |   syscall: 'listen',
2|web-inte |   address: '::',
2|web-inte |   port: 8000 }
2|web-inte | (node:1251) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.

/home/historyadmin/.pm2/logs/web-interface-out.log last 15 lines:
2|web-inte | POST /api/blogs/related 200 148.424 ms - 2030
2|web-inte | GET /api/blog/undefined&tag=undefined 200 73.684 ms - 4
2|web-inte | GET /api/blog/undefined&tag=undefined 200 71.812 ms - 4
2|web-inte | GET /api/blog/the-innovators:-how-a-group-of-hackers-geniuses-and-geeks-created-the-digital-revolution 200 147.195 ms - 2250
2|web-inte | POST /api/blogs/related 200 147.101 ms - 2030
2|web-inte | POST /api/blogs/related 200 147.799 ms - 2030
2|web-inte | POST /api/blogs-categories-tags 200 304.194 ms - 9466
2|web-inte | GET /api/blog/high-output-management 200 149.405 ms - 1972
2|web-inte | POST /api/blogs/related 200 149.452 ms - 2030
2|web-inte | GET /api/blog/high-output-management 200 150.294 ms - 1972
2|web-inte | POST /api/blogs/related 200 154.379 ms - 2030
2|web-inte | Server is running on port 8000
2|web-inte | DB connected
2|web-inte | POST /api/blogs-categories-tags 200 363.498 ms - 9466
2|web-inte | POST /api/google-login 200 1315.060 ms - 311

/home/historyadmin/.pm2/logs/server-error.log last 15 lines:
0|server   |     at Object.Module._extensions..js (internal/modules/cjs/loader.js:789:10)
0|server   |     at Module.load (internal/modules/cjs/loader.js:653:32)
0|server   |     at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
0|server   |     at Function.Module._load (internal/modules/cjs/loader.js:585:3)
0|server   |     at Object.<anonymous> (/usr/lib/node_modules/pm2/lib/ProcessContainerFork.js:32:23)
0|server   |     at Module._compile (internal/modules/cjs/loader.js:778:30)
0|server   |     at Object.Module._extensions..js (internal/modules/cjs/loader.js:789:10)
0|server   |     at Module.load (internal/modules/cjs/loader.js:653:32)
0|server   |     at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
0|server   |     at Function.Module._load (internal/modules/cjs/loader.js:585:3)
0|server   |   code: 'EADDRINUSE',
0|server   |   errno: 'EADDRINUSE',
0|server   |   syscall: 'listen',
0|server   |   address: '::',
0|server   |   port: 8000 }
