postly/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/route.js
│   │   │   ├── login/route.js
│   │   │   └── [...nextauth]/route.js
│   │   ├── posts/
│   │   │   ├── route.js           # GET all, POST new
│   │   │   └── [id]/route.js      # PUT edit, DELETE post
│   ├── dashboard/
│   │   └── page.js
│   ├── login/
│   │   └── page.js
│   ├── register/
│   │   └── page.js
│   ├── post/
│   │   └── new/page.js
│   ├── [handler]/
│   │   └── page.js                # public user profile + posts
│   └── layout.js
│
├── models/
│   ├── User.js
│   └── Post.js
│
├── lib/
│   ├── zodSchemas.js             # Zod validation schemas
│   ├── s auth.j                  # Token validation
│   └── jwt.js                    # Sign/verify JWT
│
├── utils/
│   └── db.js                     # MongoDB connection utility
│
├── middleware.js                 # Protect routes
├── .env                          # MongoDB URI, JWT secret, etc.
├── tailwind.config.js
├── postcss.config.js
└── README.md
