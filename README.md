🚀 EchoPost(A Post Sharing Platfrom )
--------------------------------

**Echo Post**
Echo Post: A Next.js A Post Sharing Platfrom with high level security intregration



📖 Description
--------------

Echo Post is a Next.js authentication system that utilizes Zod for schema validation. It provides a robust and secure way to manage user authentication, allowing you to focus on building your application without worrying about the underlying authentication logic. With Echo Post, you can easily integrate Google, GitHub, and custom OAuth providers, as well as handle user sessions and authentication flows.

✨ **Features**

1. 📝 User Sign-up and Login
2. 🔒 Password Hashing and Verification
3. 🕒 Session Management
4. 🔑 Toastify Notifications
5. 📊 Custom Database Connection
6. 🛠️ Zod Schema Validation
7. 🔒 OAuth Authentication (GitHub and Google)
8. 📊 Profile Management
9. 🔍 Search Functionality
10. 📊 Error Handling and Logging

🧰 Tech Stack Table
--------------------

| Component | Version |
| --- | --- |
| Next.js | 12.2.0 |
| Zod | 3.8.0 |
| React | 17.0.2 |
| Node.js | 16.13.0 |
| bcrypt | 5.1.0 |
| tailwindcss | 3.0.3 |
| toastify-js | 2.2.0 |
| react-hook-form | 7.23.2 |
| @hookform/resolvers | 1.6.5 |

📁 Project Structure
------------------

* `components/`: reusable React components
* `lib/`: utility libraries and helpers
* `models/`: database models
* `pages/`: Next.js pages and routes
* `public/`: static assets
* `styles/`: global CSS styles
* `utils/`: utility functions and services

⚙️ How to Run
-------------

### Setup

1. Clone the repository: `git clone https://github.com/officialkaushikproject/EchoPost.git`
2. Install dependencies: `npm install` or `yarn install`
3. Start the development server: `npm run dev` or `yarn dev`

### Environment

* `NEXTAUTH_URL`: the URL of your Next.js application
* `NEXTAUTH_SECRET`: a secret key for authentication
* `ZOD_SCHEMA`: the Zod schema for user validation

### Build

* `npm run build` or `yarn build` to build the application
* `npm run start` or `yarn start` to start the production server

### Deploy

* Deploy the application to your preferred hosting platform (e.g., Vercel, Netlify, etc.)

🧪 Testing Instructions
-------------------------

### Unit Tests

* Run `npm run test` or `yarn test` to execute unit tests
* Write unit tests for each component and utility function

### Integration Tests

* Run `npm run test-integration` or `yarn test-integration` to execute integration tests
* Write integration tests for the authentication flow and API endpoints



📦 API Reference
----------------

### User Schema

* `userSchema`: the Zod schema for user validation

### Authentication API

* `POST /auth`: authenticate a user
* `GET /auth/session`: retrieve the current user session
* `DELETE /auth/session`: invalidate the current user session

### User API

* `GET /users`: retrieve a list of users
* `GET /users/:id`: retrieve a single user
* `POST /users`: create a new user

👤 Author
---------

* **My Name**: Kaushik Rajbongshi (kaushikraj0241@gmail.com)

