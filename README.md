<h1>Stark-Industries-Armory</h1>
<img src='public/starkindustriesLOGO.jpg'>
<p>Stark-Industries-Armory designs, manufactures, and delivers advanced pseudo-armor. This is an eCommerce website that mirrors a real-world online shopping experience.

<h5>Features:<h5>



Quick Heroku deployment

Set up the Heroku command line tools and install Yarn if you haven't already (npm install -g yarn)
heroku login
Add a git remote for heroku:
If you're creating a new app...

heroku create or heroku create your-app-name if you have a name in mind.
heroku addons:create heroku-postgresql:hobby-dev to add postgres
npm run deploy-heroku. This will create a new branch and compile and commit your frontend JS to it, then push that branch to Heroku.
heroku run npm run seed to seed the database
If you already have a Heroku app...

heroku git:remote your-app-name You'll need to be a collaborator on the app.
Afterwards,

To deploy: npm run deploy-heroku
To re-seed: heroku run npm run seed
