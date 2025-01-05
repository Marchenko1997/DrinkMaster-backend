### Backend ⚙️

The "DrinkMaster" backend is a web server implemented using Node.js with a NoSQL MongoDB database. The API route documentation is available [here](https://drinkmaster-backend-xthk.onrender.com/api-docs/). The backend project is deployed on **Render.com**, providing remote database access for developers, enabling request handling, and facilitating application testing.

`Key Features:`
- 🔐 **User Authentication:** Access to the application is restricted to authenticated users only.
- 🛠️ **User Data Management:** Users can edit their profile data, save their favorite drinks, and create their own personalized drink collections.
- 🔍 **Advanced Drink Filtering:** Search and filter drinks based on various criteria (e.g., ingredients, categories, glass type).
- 🚫 **Age-Based Restrictions:** Display non-alcoholic drinks exclusively for users identified as minors.
- 🌟 **Popular Drinks:** Showcases the most popular cocktails for users.
- 🌐 **External Database Integration:** Retrieves and processes data from third-party drink databases, returning structured information to the frontend, including drink collections, categories, glass types, and ingredients.
- 🖼️ **Unique User Avatars:** Each registered user can have a unique avatar image.
- ☁️ **Cloud-Based Image Storage:** Drink images are stored securely on **Cloudinary**.
- 📬 **Newsletter Subscription:** Users can subscribe to receive updates via email through **SendGrid**.
- 📝 **Server Logging and Error Tracking:** Server activity is logged, and errors are tracked using **Winston** and **Papertrail**.

---

`Libraries Used:` 📦
Below is a list of libraries and dependencies utilized in this project:

- **[@sendgrid/mail](https://www.npmjs.com/package/@sendgrid/mail)** - Service for sending transactional emails 📧
- **[axios](https://www.npmjs.com/package/axios)** - HTTP client for making API requests 🌐
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** - Library for hashing passwords 🔑
- **[cloudinary](https://www.npmjs.com/package/cloudinary)** - Cloud-based image storage and management ☁️
- **[cors](https://www.npmjs.com/package/cors)** - Middleware for enabling cross-origin requests 🌍
- **[cross-env](https://www.npmjs.com/package/cross-env)** - Cross-platform environment variable setup ⚙️
- **[dotenv](https://www.npmjs.com/package/dotenv)** - Module for loading environment variables 🌐
- **[express](https://www.npmjs.com/package/express)** - Web server framework 🚀
- **[gravatar](https://www.npmjs.com/package/gravatar)** - Service for generating user avatars 🖼️
- **[jimp](https://www.npmjs.com/package/jimp)** - Image processing library 🖌️
- **[joi](https://www.npmjs.com/package/joi)** - Data validation library for schemas 📋
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)** - Library for generating and verifying JWT tokens 🛡️
- **[mongoose](https://www.npmjs.com/package/mongoose)** - ODM for MongoDB 📂
- **[morgan](https://www.npmjs.com/package/morgan)** - HTTP request logger 📄
- **[multer](https://www.npmjs.com/package/multer)** - Middleware for handling file uploads 📁
- **[multer-storage-cloudinary](https://www.npmjs.com/package/multer-storage-cloudinary)** - Cloudinary storage engine for Multer ☁️
- **[nanoid](https://www.npmjs.com/package/nanoid)** - Unique ID generator 🔢
- **[nodemailer](https://www.npmjs.com/package/nodemailer)** - Library for sending emails ✉️
- **[swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)** - Documentation generator for OpenAPI specs 📄
- **[swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)** - Middleware for serving Swagger API docs 📝
- **[winston](https://www.npmjs.com/package/winston)** - Logging library 🛠️
- **[winston-papertrail](https://www.npmjs.com/package/winston-papertrail)** - Papertrail transport for **Winston** logging service 📊
- **[yamljs](https://www.npmjs.com/package/yamljs)** - Parser for YAML files 📄

---

## **Contact Information** 📬

- **👩‍💻 Halyna Marchenko**
- **✉️ Email:** [marchenkohalyna888@gmail.com](mailto:marchenkohalyna888@gmail.com)
- **🔗 LinkedIn:** [Halyna Marchenko](https://www.linkedin.com/in/halyna-marchenko/)

