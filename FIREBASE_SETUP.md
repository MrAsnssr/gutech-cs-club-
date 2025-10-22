# Firebase Setup Guide

This guide will help you set up Firebase for the GUtech website to enable real user authentication, database storage for orders, and more.

## Why Firebase?

Firebase is Google's free backend service that provides:
- ✅ **Authentication** - Real user registration and login
- ✅ **Database** - Store orders, user data, etc.
- ✅ **Hosting** - Alternative hosting option
- ✅ **Free Tier** - More than enough for most websites

## Step-by-Step Setup

### Step 1: Create a Firebase Account

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Sign in with your Google account
3. Click "Create a project" or "Add project"

### Step 2: Create Your Project

1. **Project name**: Enter "GUtech CS Club" (or any name you prefer)
2. Click "Continue"
3. **Google Analytics**: You can disable this for now (optional)
4. Click "Create project"
5. Wait for the project to be created
6. Click "Continue"

### Step 3: Add a Web App

1. On your project dashboard, click the **Web icon** (`</>`)
2. **App nickname**: Enter "GUtech Website"
3. **Firebase Hosting**: Leave unchecked (we're using Netlify)
4. Click "Register app"
5. **You'll see your Firebase configuration** - KEEP THIS PAGE OPEN!

### Step 4: Copy Your Configuration

You'll see something like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "gutech-xxxxx.firebaseapp.com",
  projectId: "gutech-xxxxx",
  storageBucket: "gutech-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxxxxxxx"
};
```

### Step 5: Update Your Website

1. Open the file `firebase-config.js` in your project folder
2. **Replace** the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "YOUR_ACTUAL_AUTH_DOMAIN",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_ACTUAL_PROJECT_ID",
    storageBucket: "YOUR_ACTUAL_STORAGE_BUCKET",
    messagingSenderId: "YOUR_ACTUAL_SENDER_ID",
    appId: "YOUR_ACTUAL_APP_ID"
};
```

3. Save the file

### Step 6: Enable Authentication

1. In Firebase Console, click "Authentication" in the left sidebar
2. Click "Get started"
3. Click on "Email/Password" under Sign-in providers
4. **Enable** the toggle switch
5. Click "Save"

### Step 7: Enable Realtime Database

1. In Firebase Console, click "Realtime Database" in the left sidebar
2. Click "Create Database"
3. **Location**: Choose closest to Oman (e.g., "europe-west1")
4. Click "Next"
5. **Security rules**: Start in "Test mode" for now
6. Click "Enable"

**Important**: Copy the database URL shown (e.g., `https://gutech-xxxxx-default-rtdb.firebaseio.com/`)

### Step 8: Update Database URL

1. Go back to `firebase-config.js`
2. Update the `databaseURL` with your actual database URL:

```javascript
databaseURL: "https://YOUR-PROJECT-ID-default-rtdb.firebaseio.com",
```

### Step 9: Set Up Admin User

1. Open your website
2. Click "👤 Login"
3. Click "Register here"
4. Create an account with:
   - **Email**: `admin@gutech.edu.om`
   - **Name**: Your name
   - **Password**: Choose a secure password
5. This account will automatically have admin privileges!

### Step 10: Upload to Netlify

1. Go to your Netlify dashboard
2. Drag and drop ALL your files (including the updated `firebase-config.js`)
3. Your site will now have:
   - ✅ Real user authentication
   - ✅ Shopping cart with checkout
   - ✅ Order storage in database
   - ✅ Admin controls for managing content

## Security Rules (Optional but Recommended)

### Realtime Database Rules

After testing, update your database rules for better security:

1. In Firebase Console, go to "Realtime Database"
2. Click "Rules" tab
3. Replace with:

```json
{
  "rules": {
    "orders": {
      ".read": "auth != null && auth.token.email == 'admin@gutech.edu.om'",
      ".write": "auth != null"
    },
    "users": {
      "$uid": {
        ".read": "auth != null && auth.uid == $uid",
        ".write": "auth != null && auth.uid == $uid"
      }
    }
  }
}
```

4. Click "Publish"

## Troubleshooting

### "Firebase not configured" message
- Make sure you replaced ALL placeholders in `firebase-config.js`
- Check browser console for specific errors (F12)

### Authentication not working
- Verify Email/Password is enabled in Firebase Console
- Clear browser cache and try again

### Orders not saving
- Check if Realtime Database is enabled
- Verify the database URL is correct
- Check browser console for errors

### Admin controls not showing
- Make sure you're logged in with `admin@gutech.edu.om`
- Refresh the page after logging in

## Testing Your Setup

1. **Test Registration**:
   - Click "👤 Login"
   - Register a new account
   - You should receive a success notification

2. **Test Shopping Cart**:
   - Add items to cart
   - Go to checkout
   - Place an order
   - Check Firebase Database to see the order

3. **Test Admin**:
   - Login with `admin@gutech.edu.om`
   - You should see "Admin Mode" and edit buttons
   - Try editing an event or product

## Cost

Firebase free tier includes:
- ✅ Unlimited authentication
- ✅ 1 GB database storage
- ✅ 10 GB monthly data transfer
- ✅ 100 simultaneous connections

This is more than enough for a university club website!

## Need Help?

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Console](https://console.firebase.google.com)
- Check browser console (F12) for error messages

---

**Next Steps**: After setting up Firebase, you can:
1. Set up email notifications (using Firebase Cloud Functions)
2. Add payment integration (Stripe, PayPal)
3. Create admin dashboard to view all orders
4. Add more user features (profile page, order history)

Good luck! 🚀

