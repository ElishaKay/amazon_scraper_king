Amazon Affiliate Tag: mysidehussl08-20

"TV","Headphones","Speakers"

When running the Chrome Extension (always use the relevant Scraping Profile) 
- this will remove the bug of the user._id not getting saved in the blog record
- it will also make it easier to keep track of which keywords are being scraped per site.

-------------------

How To Enter
ssh historyadmin@138.197.196.165
or (for new domains): ssh root@138.197.196.165 
password: BazookaB42B

After making any edits on the frontend, you must navigate to the '/frontend' folder and run:
sudo npm run build
and: pm2 start npm -- start 

To start the server
Navigate to the /backend folder and run:
pm2 start server.js 
or: pm2 restart server.js 

-----------------------------

To Debug (ie see logs) - run the frontend and backend as you would in dev:
cd into backend:
pm2 stop server
node server


cd into frontend:
pm2 stop npm
npm run dev

------------------

Installation Instructions:
ssh root@206.189.193.103
(to paste password, right-click terminal input space)

1) Getting Latest versions of Node & NPM:
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -       
apt -y install nodejs make gcc g++



2) Setup nginx
sudo apt update
sudo apt install nginx

cd /etc/nginx/sites-available
sudo vim default
//check that all is good
sudo nginx -t
sudo systemctl restart nginx


3) Cloning backend and frontend:
(save creds in cache)
git config --global credential.helper store

git clone https://github.com/ElishaKay/myamazonhistory-backend
git clone https://github.com/ElishaKay/myamazonhistory-frontend


3) Globally Install PM2
npm install -g pm2


3) Nameservers to insert in NameCheap Domains

anna.ns.cloudflare.com
odin.ns.cloudflare.com

On Cloudflare, you will handle the DNS.
Step 1: Create an "A" record for the domain pointing to the IP from Digital Ocean
Type: A
Name: @
Content: 67.205.136.120 (Custom IP)

Step 2: Create a "CNAME" record
Type: CNAME
Name: www
Content: amazonfashion.app (Domain Name)

Step 3: To authenticate with Google OAuth
Within Google Cloud Console, Press "Domain Verification" Tab
Press "Add Domain", and paste the domain in there.
It will take you to a new page that asks for your Domain Provider, choose other.
Go into the relevant Cloudflare account, and add a text record with the code you got from Google:

Type: TXT
Name: @
Content: google-site-verification=9TQeCTw9wpJO7XSGX7sil2KbYOIZenDYzkwdgJazozA

Step 4: Within Digital Ocean:
Go to Networking tab.
Add a new record:

Type: A
Name: @
Content: choose the app from dropdown (auto-points to IP of app)


npm -v
nodejs -v

sudo apt-get install nginx

password: BazookaB42B

New Jungle Tribe Databases:
mongodb://root:leeshtime83@ds147599.mlab.com:47599/amazon-fashion-app
67.205.136.120

mongodb://root:leeshtime83@ds125255.mlab.com:25255/amazon-music-best
208.68.37.181

mongodb://root:leeshtime83@ds125255.mlab.com:25255/amazon-spark-app
67.205.128.218

mongodb://root:leeshtime83@ds125255.mlab.com:25255/amazon-spark-net
142.93.252.37

mongodb://root:leeshtime83@ds147446.mlab.com:47446/amazon-sports-app
165.227.89.221

mongodb://root:leeshtime83@ds147446.mlab.com:47446/amazon-tech-app
208.68.37.181

mongodb://root:leeshtime83@ds125255.mlab.com:25255/amazon-tech-network
64.227.5.148

mongodb://root:leeshtime83@ds263590.mlab.com:63590/tech-gadgets-club
206.189.193.103


location /api {
     proxy_pass http://localhost:8000;
     proxy_http_version 1.1;
     proxy_set_header Upgrade $http_upgrade;
     proxy_set_header Connection 'upgrade';
     proxy_set_header Host $host;
     proxy_cache_bypass $http_upgrade;
}

location / {
     proxy_pass http://localhost:3000;
     proxy_http_version 1.1;
     proxy_set_header Upgrade $http_upgrade;
     proxy_set_header Connection 'upgrade';
     proxy_set_header Host $host;
     proxy_cache_bypass $http_upgrade;
}






---------------------------

Digital Ocean:
Droplet: My-Amazon-History

U: root (Update: this user has been deleted)
P: Bestfruit22xz, (Capital ‘B’)
In new cmd: ssh root@138.197.196.165
When asked to continue, type: yes.
Enter Password.

New Digital Ocean Use for My-Amazon-Site dropletr: 
U: historyadmin
P: Pizzarocks45,
Made him a superadmin with this command:  usermod -aG sudo historyadmin
Whenever you make nginx changes, restart with this command: sudo systemctl restart nginx
ssh historyadmin@138.197.196.165


Boom! API works :)

http://138.197.196.165/api/blogs 

Note: I can also install mongodb on the live server - (and then change the env configuration on the backend to a locally-running mongodb instance - nice :)

More about that in minute 13 in this lecture

On the live machine, we are using pm2 (instead of nodemon) - which is more appropriate for live environment:

pm2 start server.js 

and:

pm2 restart server.js 


To recompile the frontend, within the frontend folder, run:

npm run build

After running the build, run this within the frontend folder:

pm2 start npm -- start


Check what's running on port 3000: 

 lsof -i tcp:3000

Kill the PId:

kill -9 {PID Returned from previous command}

kill -9 18837



To debug, you can also run 'npm start' within the root folder.
My next.config.js file didn't include http:// before using the IP Address

When running npm start - I realized that there was an issue with the 'absolute URL'...
