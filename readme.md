Repo Structure : 

notemaking-app/
├── client/                    # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── NoteCard.jsx
│   │   │   └── NoteForm.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Home.jsx
│   │   ├── services/         # API calls
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   └── noteService.js
│   │   ├── context/          # Context API for state
│   │   │   └── AuthContext.jsx
│   │   ├── utils/            # Helper functions
│   │   │   └── constants.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── .env
│
├── server/                    # Node.js + Express backend
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── models/               # Mongoose schemas
│   │   ├── User.js
│   │   └── Note.js
│   ├── routes/               # API routes
│   │   ├── authRoutes.js
│   │   └── noteRoutes.js
│   ├── controllers/          # Route handlers
│   │   ├── authController.js
│   │   └── noteController.js
│   ├── middleware/           # Custom middleware
│   │   └── authMiddleware.js
│   ├── utils/               
│   │   └── generateToken.js  # JWT helper
│   ├── server.js             # Entry point
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md

Notes/Learnings : 
app.use(express.urlencoded({ extended: true })); 
- Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option