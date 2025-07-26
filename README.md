🧩 Project Development Plan (Step-by-Step)
🔰 PHASE 1: Setup & Core Infrastructure
✅ Initialize Next.js App (JavaScript)

Setup Tailwind CSS✅

Setup folder structure: /app, /lib, /models, /api, etc.

✅ Connect MongoDB with Mongoose

Create utils/db.js

Test the connection with a dummy API route

✅ Create User Model

Fields: email, password, handler, createdAt

Mongoose schema with validation

🔐 PHASE 2: Authentication System
✅ Build Signup API

Use Zod for input validation

Hash password using bcrypt

Save to DB

Check for duplicate email/handler

✅ Build Login API (Credentials)

Compare password using bcrypt.compare

Generate JWT

Store in secure httpOnly cookie

✅ Integrate NextAuth.js

Add GitHub provider

Add Credentials provider (custom)

Use JWT session strategy

In signIn() callback: create new user on first GitHub login

✅ Protect Routes (Middleware)

Create auth.js to verify JWT from cookie

Redirect if unauthenticated

📝 PHASE 3: Post System
✅ Create Post Model

Fields: title, content, author (ref to User), createdAt

✅ Create API to Add New Post

Only allow authenticated users

Validate with Zod

Save post with author = session.user.id

✅ Create API to Get Posts by Handler

Public route (no auth)

GET /api/posts?handler=suman_raj

Find user by handler → Get all posts by their _id

✅ Create API to Edit/Delete Post

Only allow if post.author == session.user.id

Protect using middleware

💻 PHASE 4: Frontend UI (Tailwind)
✅ Create Register Page

Form (email, password, handler)

Call custom API route

✅ Create Login Page

Login with email/password or GitHub (NextAuth)

✅ Create Dashboard Page

Show only logged-in user’s posts

Add buttons for create/edit/delete

✅ Create Public Home Page

Input to search handler

Show only that user’s posts

✅ Create Post Create/Edit Page

Show form only for logged-in user

Use fetch and handle submission

🎁 PHASE 5: Extras & Polish
✅ Add Post Timestamps (createdAt)

✅ Add “No posts found” handling

✅ Add loading states and errors

✅ Optional: Add comments or likes

✅ Optional: Add role-based access (Admin, Mod)