# Setup Guide

## MongoDB Installation

1. **Download MongoDB Community Server:**
   - Go to [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Download MongoDB Community Server for Windows
   - Run the installer and follow the setup wizard

2. **Start MongoDB Service:**
   - MongoDB should start automatically as a Windows service
   - Or manually start: `net start MongoDB`

3. **Verify Installation:**
   - Open Command Prompt
   - Run: `mongosh` or `mongo` (depending on version)
   - You should see the MongoDB shell

## Environment Variables

Create a `.env.local` file in the root directory with:

```
# MongoDB Connection (local)
MONGODB_URI=mongodb://localhost:27017/fullstack-app

# JWT Secret (change this in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## Database Connection

The application will automatically:
- Connect to MongoDB on startup
- Create the database if it doesn't exist
- Create collections as needed

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login user

### Protected Routes
- `GET /api/user/profile` - Get user profile (requires auth)
- `PUT /api/user/profile` - Update user profile (requires auth)

## Testing the Setup

1. Start the development server:
   ```bash
   npm run dev
   ```

2. The application will connect to MongoDB automatically
3. You can test the API endpoints using tools like Postman or curl

## Troubleshooting

### MongoDB Connection Issues
- Make sure MongoDB service is running
- Check if port 27017 is available
- Verify MongoDB installation

### JWT Issues
- Make sure JWT_SECRET is set in environment variables
- Use a strong, unique secret in production 