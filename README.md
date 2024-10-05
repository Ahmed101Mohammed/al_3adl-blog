# al_3adl-blog

Welcome to the **al_3adl-blog**! This is a full-stack project designed with several exciting features:

- **Multi-Author Blogging**: Our platform enables multiple authors to write and publish blogs, fostering collaboration and diverse perspectives in the tech community.
  
- **Open Source Project**: We believe in the power of community! This project is open source, allowing others to customize and create their own unique blogging experience.

- **Contribution Opportunities**: We invite developers from all backgrounds to contribute to the project. Your skills and creativity can help us enhance and expand this platform.

- **Security Testing**: For security enthusiasts, this project serves as a playground! Feel free to fork the project, add your data, and test its security. We encourage you to create issues for any vulnerabilities you discover, helping us make the platform stronger together.

Join us on this exciting journey to build a vibrant blogging community!

## Description:
### What al_3adl blog project do:
This blog web application helps:
- To create articles and post them to the world, now it just help you to post the recent 9 articles you wrote, but don't worry all of your articles are saved until the new release is coming with support for the **More Articles** button.
- Other developer to create their own custome and more powerfull one, with complete feature, for personal or trading reasons.
- Other developer to contribute in open source project, to enhance thier skills, and rish their rusome, and surly improve the project.
- Security people to test their skills for dicovering and hacks apps, by their own data by taking their own forks from this main project.

### Technologies used to build this project:
I build this project with:
- **HTML**: to build the structure of the front-end part.
- **CSS**: to styling the structure of the front-end part.
- **Bootstrap**: to create complex pages styling with more easy and fast way, and get a most ready responsive page.
- **SCSS**: to enhance the CSS code of the project, and create standard of styling code, and process. [Convert CSS to SCSS -> Make the SCSS code responsive -> Use mixins and vars to enhance the SCSS code].
- **JavaScript**: to build the front-end functionality, and treate with the back-end.
- **Node.js**: for practicing resones, and build the core of the back-end.
- **Express**: To enhance node.js code.
- **Cloud MongoDB**: To get 500 mg free space, with easy user experiance to do CRUD operations, and easy treating with denormalized DataBase model.
- **JWT**: To secure the routes of the app.
- There are other packeges the project depend on for encryption, adn cookies parser and so on, you can see all of them by following this path from the project main page in github: ***Insights***->***Dependency graph***

### Challenges I faced during building this project:
This is my firest full-stack project that I build to the release, and most of it is challenged for me, most challengies I mate are:
1. How to save images, in the project.
2. How to process images, to recise it as I need.
3. Improve the project logice to minimize the use of the project: I achieve this by follow the flow of the date during doing multi operations in the project, I find that images for deleted artiles or updated or still in DB, and this is high consuming, so I improve all logics that trates with images, directly and indirectly.
4. At some phase I needed to create some complex request that include joining with mongoDB and this was a good new challenge that increased my experienc about MongoDB.

### Features and upgrades I hope to build in the future:
- When will are more than 9 articles in the project DB, the project will appear with just 9 articles and a **More** button, that should have a functionality to generate more articles, I did not create this functionality in this version and I witch to add in the next one.
- Build the functionality of the **Weekly Newsletter** form.
- Enable links for each category of articles.
- Adding likes and dislikes features, and comments.
- Using more dependencies can treat with images to low it's size in memory with saving the quality in some good appearance fot the user.
- Create a button for support, and apply payment method, directly to MongoDB, to increase the space for the future articles. *In real I want to do that just for practicing in creating a payment feature.*
- Replace the front-end part with some js front-end framework.
- Migrate the project from **JavaScript** to **TypeScript**.

## Installing & Set up & Running:
### Installing & Set up & Running locally on your device:
#### Installing:
1. Open your terminal, and go to the directory you want to install the project on.
2. Copy the following line, and paste it into your terminal:
```
git clone https://github.com/Ahmed101Mohammed/al_3adl-blog.git
```
This should installed the project on your project.
#### Set up:
In the last step from **Installing** you allready installed the app, now we work to set up the project:
1. Go inside the project folder by past the following line in your terminal:
```
cd al_3adl-blog
```
2. Install all packeges that the project dependent on, by paste the following line in your termminal:
```
npm install
```
3. For some address isues you can run this line:
```
npm audit fix
```
4. create a new folder called **uploads** in the root.
5. create your new [MongoDB Cloud](https://www.mongodb.com/lp/cloud/atlas/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core_prosp-brand_gic-null_emea-eg_ps-all_desktop_eng_lead&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624392&adgroup=115749716863&cq_cmp=12212624392&gad_source=1&gclid=CjwKCAjwx4O4BhAnEiwA42SbVOR13_HANO5QaztU956uAbhhrPv9j9FQHgXAx9i5Vki_0RUw4Df88RoCbP8QAvD_BwE) cluster.
6. create your .env file in the root with the following data:
```
PORT=3000
MONGO_DB_URI=(replaced with your uri)
JWT_SECRET_KEY_ACCESS=(you can search for how to generate it randomly, and replace the key here)
JWT_SECRET_KEY_REFRESH=(you can search for how to generate it randomly, and replace the key here)
ADMIN_EMAIL=(replace by yours)
ADMIN_PASSWORD=(replace by yours)
ADMIN_NAME=(replace by yours)
```
#### Running:
In the previouse phases you installed and set up the app, now you will run it:
1. Paste this line in your terminal in the root of the project folder:
```
npm run dev
```
2. wait until these 3 messages appear to you:
> Successfully connection to DB\
> Server running at port 3000\
> Success setub the admin user.

3. Open your favorite browser and paste the following link on it:
```
http://localhost:3000/index.html
```
