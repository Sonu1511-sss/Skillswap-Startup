# Full-Stack Authentication App

A modern, secure authentication application built with React and Node.js, featuring JWT-based authentication, MongoDB integration, and a beautiful responsive UI.

## 🚀 Features

### Frontend
- **React 18** with modern hooks and functional components
- **React Router** for client-side routing
- **Tailwind CSS** for beautiful, responsive design
- **Lucide React** for modern icons
- **Axios** for API calls
- Protected and public route handling
- Form validation and error handling
- Responsive design with mobile-first approach

### Backend
- **Node.js & Express** RESTful API
- **MongoDB** with Mongoose ODM
- **JWT** authentication with secure token handling
- **bcryptjs** for password hashing
- **Express Validator** for input validation
- Account lockout protection against brute force attacks
- Comprehensive error handling and logging
- CORS configuration for cross-origin requests

### Security Features
- Password hashing with bcrypt (12 rounds)
- JWT tokens with expiration
- Account lockout after failed attempts
- Input validation and sanitization
- Secure password requirements
- Protection against common attacks

## 📁 Project Structure

```
my-project/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx     # Protected dashboard
│   │   │   ├── Login.jsx    # Login form
│   │   │   └── Signup.jsx   # Registration form
│   │   ├── App.jsx          # Main app with routing
│   │   ├── main.jsx         # React entry point
│   │   └── index.css        # Tailwind styles
│   └── package.json
│
├── backend/                  # Node.js backend
│   ├── src/
│   │   ├── routes/
│   │   │   └── auth.js      # Authentication routes
│   │   ├── models/
│   │   │   └── User.js      # User schema
│   │   ├── server.js        # Express server
│   │   └── config.js        # Database configuration
│   ├── package.json
│   └── .env                 # Environment variables
│
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Frontend Setup
1. Navigate to the project root (the frontend is already set up in the current directory)
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Copy `.env` file and update values as needed
   - Set your MongoDB connection string
   - Change the JWT secret in production

4. Start the backend server:
   ```bash
   npm run dev
   ```

## 🚀 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/signup` | Register new user | Public |
| POST | `/login` | User login | Public |
| POST | `/verify` | Verify JWT token | Private |
| GET | `/stats` | Get user statistics | Public* |

*Should be protected in production

### Request/Response Examples

#### Signup Request
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Login Request
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Success Response
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "lastLogin": "2024-01-15T10:30:00.000Z"
  }
}
```

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface with gradient backgrounds
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Elements**: Hover effects, transitions, and micro-interactions
- **Form Validation**: Real-time validation with helpful error messages
- **Loading States**: Visual feedback during API calls
- **Password Visibility**: Toggle password visibility in forms
- **Toast Notifications**: User-friendly success and error messages

## 🔒 Security Considerations

### Production Deployment Checklist
- [ ] Change JWT secret to a strong, random value
- [ ] Use environment variables for all sensitive data
- [ ] Enable HTTPS in production
- [ ] Set up proper CORS origins
- [ ] Configure rate limiting
- [ ] Set up database backups
- [ ] Monitor for security vulnerabilities
- [ ] Implement logging and monitoring

### Password Requirements
- Minimum 6 characters
- At least one lowercase letter
- At least one uppercase letter
- At least one number

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration with valid/invalid data
- [ ] User login with correct/incorrect credentials
- [ ] Token persistence across page refreshes
- [ ] Protected route access without token
- [ ] Logout functionality
- [ ] Form validation messages
- [ ] Responsive design on mobile devices

## 📝 Environment Variables

### Backend (.env)
```env
DB_URL=mongodb://localhost:27017/auth_app
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables for API URL

### Backend (Railway/Heroku)
1. Set up MongoDB Atlas or cloud database
2. Configure environment variables
3. Deploy using Git or CLI tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB team for the database solution
- Express.js for the web framework
- All contributors and open source maintainers

---

**Note**: This is a demo application. For production use, please review and enhance security measures, add comprehensive testing, and follow your organization's deployment guidelines.