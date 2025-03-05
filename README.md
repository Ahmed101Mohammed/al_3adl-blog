# Al-3adl Blog

Welcome to the **Al-3adl Blog**! This full-stack project offers a modern and flexible platform for collaborative blogging with several exciting features:

- **Multi-Author Support**: Enable multiple authors to contribute, fostering collaboration and diverse insights within the tech community.
  
- **Open Source**: We embrace the open-source ethos! Developers are welcome to customize and build upon the project, creating their own unique blogging experiences.

- **Contribution Opportunities**: Developers from all backgrounds can contribute to this project, enriching their skill sets while helping us enhance the platform.

- **Security Playground**: Security professionals are encouraged to fork the project, add their own data, and test its security. We invite you to create issues for any vulnerabilities you discover to improve the platform together.

## Project Overview

### What the Al-3adl Blog Does
The **Al-3adl Blog** web application enables:
- **Article Management**: Authors can create, manage, and post articles. The current version supports up to 9 articles, with future releases planned to support more through a 'Load More' feature.
- **Community Building**: The platform supports multi-user functionality. Users can be promoted to authors or managers, empowering them to increase blog productivity.
- **Developer Customization**: Developers can fork the project, add new features, or use it as a foundation to create a more powerful personal or commercial blog.
- **Open-Source Contribution**: Developers can contribute to this open-source project, enhancing their skills and improving the platform.
- **Security Testing**: Security enthusiasts can test their skills by identifying vulnerabilities through their fork of the project.

### Technologies Used
This project is built using:
- **HTML**: To structure the front-end.
- **CSS**: For front-end styling.
- **Bootstrap**: For fast, responsive, and complex page layouts.
- **SCSS**: For more maintainable and scalable CSS, using variables and mixins to ensure responsiveness.
- **JavaScript**: To add interactivity and connect the front-end with the back-end.
- **Node.js**: Provides the back-end server logic.
- **Express.js**: Simplifies the development of Node.js applications.
- **MongoDB (Cloud)**: For managing application data with a free 500MB space and an easy-to-use interface.
- **JWT (JSON Web Token)**: For securing application routes.
- **Other Dependencies**: For features like encryption, cookies, and more (see the project's dependency graph under **Insights -> Dependency graph**).

### Challenges Faced
As my first full-stack project, I encountered a few key challenges:
1. **Image Handling**: Figuring out how to store and manage images efficiently.
2. **Image Processing**: Resizing images appropriately.
3. **Optimizing Logic**: Reducing data consumption by ensuring images linked to deleted or updated articles are also removed from the database.
4. **Complex MongoDB Queries**: Learning how to create complex queries involving joins was both a challenge and a learning experience.

### Future Features & Enhancements
- **More Articles Button**: Add functionality to load more than 9 articles.
- **Weekly Newsletter**: Develop a form and backend logic for weekly newsletters.
- **Category Links**: Enable links for each article category.
- **Likes, Dislikes, and Comments**: Add interaction features for users.
- **Image Optimization**: Use additional packages to optimize image storage while maintaining quality.
- **Support Button**: Integrate payment options, mainly as a practice for implementing payment features.
- **Front-End Framework**: Migrate the front-end to a JavaScript framework.
- **TypeScript Migration**: Migrate the project from JavaScript to TypeScript for improved maintainability.

## Installing & Set up & Running:
### Installing:
1. Open your terminal, and go to the directory you want to install the project on.
2. Copy the following line, and paste it into your terminal:
```
git clone https://github.com/Ahmed101Mohammed/al_3adl-blog.git
```
This should installed the project on your project.
### Set up:
In the last step from **Installing** you already installed the app, now we work to set up the project:
1. Go inside the project folder by past the following line in your terminal:
```
cd al_3adl-blog
```
2. Install all packages that the project is dependent on, by pasting the following line in your terminal:
```
npm install
```
3. For some address issues you can run this line:
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
### Running:
In the previous phases you installed and set up the app, now you will run it:
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
http://localhost:3000/
```
## How to use the app:
You can follow one of the following videos according to your favorite language:
- [English]()
- [Arabic](https://youtu.be/zRVuHgMps7g)

## Credits
- My brother, [Ibrahim Mohammed Al-3adl](https://github.com/Ibrahim-Shabori), enhanced the SCSS code for the **Sign-in** and **Sign-up** pages. You can connect with him on [LinkedIn](https://www.linkedin.com/in/ibrahimshabori/).

## How to Contribute to This Project
To contribute to this project, please follow these steps:

1. Create a fork of the project and clone all branches.
2. Clone the development branch to your local device.
3. Create a new branch for your update, following a naming pattern similar to these examples:
   - `enhancing-index-page-code`
   - `new-feature-likes-and-dislikes`
   - `fix-access-token-logic`
4. Make your updates with meaningful commit messages. (Try to follow the existing code style as closely as possible.)
5. Push your updates to your fork.
6. Create an issue with details about the problem you want to address. It should contain at minimum:
   - A description of the problem you are trying to solve.
   - The benefits that will result from this update.
   - Your proposed solution to the problem.
7. Make a detailed pull request, referencing the issue you are addressing. Include comprehensive information about what you changed in both the front-end and back-end.
8. Please note that my response may not be immediate, as I check for updates in this repository on Fridays. You can expect to follow up on your request weekly for a response.


## MIT License:
MIT License

Copyright (c) 2024 Ahmed Mohamed 3adl

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.