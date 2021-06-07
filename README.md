## Stark Industries Armory

<img src='public/images/starkindustriesLOGO.jpg'>
<p>Stark-Industries-Armory designs, manufactures, and delivers advanced pseudo-armor. This is an eCommerce website that mirrors a real-world online shopping experience.

## Web App Features

<li>Registration and Login system with authorized admin routes and features (add, edit, and delete products; view user info; delete user; authorize admin rights to user;)</li>
<li>Passport OAuth that allows users to register/login with Google, Facebook and Github</li>
<li>Fully functioning cart system for guests and users (add products to cart, remove products from cart, increase/decrease quantity of products)</li>
<li>Persistent cart system that allows guests to merge their guest cart with user cart once registered</li>
<li>Fully operative checkout system powered by Stripe (test card # 4242-4242-4242-4242 / any EXP & CVV)</li>
<li>Order history view that allows users to monitor their purchase activity</li>
<li>Confirmation emailer enabled through Nodemailer</li>
<li>Responsive Web Design</li>

## Checkout my deployed web app (via Heroku) below!

<a href="https://www.starkindustriesarmory.com/"> Stark Industries Armory</a>

Stark Industries Armory Landing Page<br/>
<img src="/public/images/LandingPage.png" width="800"><br/>
Registration & Login Page<br/>
<img src="/public/images/RegistrationPage.png" width="800"><br/>
<img src="/public/images/LoginPage.png" width="800"><br/>
User Profile Page<br/>
<img src="/public/images/UserProfilePage.png" width="800"><br/>
All Products Page<br/>
<img src="/public/images/AllProductsPage.png" width="800"><br/>
Single Product Page<br/>
<img src="/public/images/SingleProductPage.png" width="800"><br/>
User Cart Page<br/>
<img src="/public/images/EmptyCart.png" width="800"><br/>
<img src="/public/images/UserCart.png" width="800"><br/>
Checkout Feature<br/>
<img src="/public/images/CheckoutFeature.png" width="800"><br/>
Order History Page<br/>
<img src='/public/images/OrderHistoryPage.png' width='800'><br/>
Responsive Design<br/>
<img src='/public/images/RWD1.png' height='150'>
<img src='/public/images/RWD2.png' height='150'>
<img src='/public/images/RWD3.png' height='150'>
<img src='/public/images/RWD4.png' height='150'><br/>

## TECHSTACK

<div><h5><strong>Front End:</strong> React, Redux, HTML, CSS</h5></div>
<div><h5><strong>Back End:</strong> NodeJS, Express, PostgreSQL, Firebase</h5></div>
<div><h5><strong>API:</strong> Stripe, Nodemailer, Passport, Faker, </h5></div>
<div><h5><strong>UI/UX:</strong> Swiper, Gsap, React-Icons, React-Reveal, React-Tilt</h5></div>

## SETUP

Customize Stark Industries Armory at your own will! Follow the steps below:

```
git clone https://github.com/SungLee05/Stark-Industries-Armory.git
cd Stark-Industries-Armory
npm install
npm run start-dev
```

Following dotENVs will need to be set in order for OAuth, Stripe and Nodemailer to work. Create your accounts and collect API keys, client ids/secrets and implement them as needed.

```
process.env.GOOGLE_CLIENT_ID
process.env.GOOGLE_CLIENT_SECRET
process.env.GOOGLE_CALLBACK
process.env.FACEBOOK_APP_ID
process.env.FACEBOOK_APP_SECRET
process.env.FACEBOOK_CALLBACK
process.env.GITHUB_CLIENT_ID
process.env.GITHUB_CLIENT_SECRET
process.env.GITHUB_CALLBACK
process.env.STRIPE_PUBLISHABLE_KEY
process.env.STRIPE_SECRET_KEY
process.env.EMAIL_PW
```

## CONTACT

If you have any questions or would like to get in touch, please see my contact info below. Otherwise, thank you for stopping by and GO TEAM IRON MAN!

<table>
      <thead>
        <tr>
          <th>Name</th>
          <th>GitHub</th>
          <th>LinkedIn</th>
          <th>E-Mail</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{textAlign: center}}>Sung Lee</td>
          <td style={{textAlign: center}}><a href="https://github.com/SungLee05">Sung Lee</a></td>
          <td style={{textAlign: center}}><a href="https://linkedin.com/in/sungyonglee">Sung Lee</a></td>
          <td style={{textAlign: center}}>sungyonglee414@gmail.com</td>
        </tr>
      </tbody>
  </table>
