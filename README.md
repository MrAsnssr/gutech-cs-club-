# GUtech Computer Science Club Website

A modern, full-featured website for the German University of Technology in Oman (GUtech) Computer Science Club with user authentication, merch shop, shopping cart, and admin panel for content management.

## Features

### User Features
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Dark theme with purple gradient
- **User Authentication**: Firebase-powered registration and login system
- **Merch Shop**: Browse and purchase club merchandise
- **Shopping Cart**: Add items, manage quantities, and checkout
- **Multiple Sections**:
  - Hero section with call-to-action buttons
  - About section with feature cards
  - Past Events showcase
  - Image gallery
  - Merch shop with products
  - Registration form
  - Contact section with form
- **Smooth Animations**: Hover effects and smooth scrolling
- **Fixed Navigation**: Easy navigation between sections

### Admin Features
- **Real Authentication**: Firebase-based admin login system
- **Content Management**: Full control over events, gallery, and products
- **Order Management**: View and track merchandise orders
- **Admin Panel**: Dedicated admin controls visible only to authorized users

## Quick Start

### For Regular Users
1. Open `index.html` in your browser
2. Browse the merch shop
3. Add items to cart
4. Register/Login to place orders

### For Admins
1. **First Time Setup**: Follow `FIREBASE_SETUP.md` to configure Firebase
2. Register with email: `admin@gutech.edu.om` (this email automatically gets admin rights)
3. Login to access admin controls
4. Edit events, gallery, and products

## How It Works

### User Authentication (Firebase)
- Users can register and login with email/password
- Passwords are securely stored by Firebase
- Sessions persist across page refreshes
- Admin users (admin@gutech.edu.om) get special privileges

### Shopping Cart
- Items are stored in browser's local storage
- Cart persists even after closing the browser
- Add items with optional size selection
- Real-time cart count in navigation

### Checkout System
- Collects customer information
- Stores orders in Firebase Realtime Database
- Pre-fills email for logged-in users
- Order confirmation notifications

### Admin Controls
Once logged in as admin, you can:
- **Edit Past Events**: Modify event titles, dates, and descriptions
- **Add New Events**: Create new past event entries
- **Delete Events**: Remove events from the showcase
- **Edit Gallery**: Update gallery image captions and URLs
- **Add Gallery Items**: Add new images to the gallery
- **Delete Gallery Items**: Remove images from the gallery
- **Manage Products**: Add, edit, and delete merch products
- **View Orders**: Access order data in Firebase Console

## How to Use

Simply open `index.html` in your web browser to view the website.

## File Structure

- `index.html` - Main HTML file with all sections and modals
- `style.css` - All styling, responsive design, and component styles
- `firebase-config.js` - Firebase configuration (needs your credentials)
- `auth.js` - User authentication system
- `shop.js` - Shopping cart and checkout functionality
- `admin.js` - Admin content management (events, gallery, products)
- `README.md` - This file
- `FIREBASE_SETUP.md` - Step-by-step Firebase setup guide
- `ADMIN_GUIDE.md` - Admin panel user guide (legacy, some info outdated)

## Customization

You can easily customize:
- Colors in the CSS file (look for color values like #8b5cf6)
- Content in the HTML file
- Add real images to replace gallery/product placeholders
- Change admin email in `auth.js` (line 7)
- Add more products, events, or gallery items
- Integrate payment gateway (Stripe, PayPal, etc.)

## Firebase Setup Required

⚠️ **Important**: This website uses Firebase for authentication and database. You need to:

1. **Create a Firebase project** (FREE) - Follow `FIREBASE_SETUP.md`
2. **Add your credentials** to `firebase-config.js`
3. **Enable Authentication** and **Realtime Database** in Firebase Console

Without Firebase setup:
- ❌ User login/registration won't work
- ❌ Orders won't be saved
- ✅ Shopping cart will still work (uses local storage)
- ✅ Admin controls work with the old system

## Security & Production Notes

### Current Setup
- ✅ Firebase handles password encryption
- ✅ Secure authentication via Google's infrastructure
- ✅ Database rules can be configured for security
- ✅ HTTPS required for production (automatic on Netlify)

### For Production Use
1. Set proper Firebase security rules (see `FIREBASE_SETUP.md`)
2. Enable HTTPS (automatic on Netlify/Firebase Hosting)
3. Add email verification for new users
4. Set up Firebase Cloud Functions for order notifications
5. Integrate real payment gateway (Stripe recommended)
6. Add rate limiting for API calls

## Browser Support

Works in all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Technical Details

### Frontend
- Pure HTML, CSS, and JavaScript (no frameworks)
- Responsive design with CSS Grid and Flexbox
- Modal-based UI for forms and popups
- Real-time cart updates
- Notification system for user feedback

### Backend (Firebase)
- Firebase Authentication for user management
- Firebase Realtime Database for orders
- Client-side cart using localStorage
- Admin privileges based on email address

### Features Summary
✅ User registration and login  
✅ Shopping cart with persistent storage  
✅ Checkout with order tracking  
✅ Admin content management  
✅ Real-time notifications  
✅ Responsive mobile design  
✅ Smooth animations and transitions  

## Deployment

### Option 1: Netlify (Recommended)
1. Follow `FIREBASE_SETUP.md` to configure Firebase
2. Drag and drop all files to [Netlify Drop](https://app.netlify.com/drop)
3. Done! Your site is live

### Option 2: GitHub Pages
1. Push code to GitHub repository
2. Enable GitHub Pages in Settings
3. Site will be live at `username.github.io/repo-name`

### Option 3: Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Run `firebase init hosting`
3. Run `firebase deploy`

## Future Enhancements

Possible additions:
- 📧 Email notifications for orders (Firebase Cloud Functions)
- 💳 Payment gateway integration (Stripe/PayPal)
- 📊 Admin dashboard with analytics
- 👤 User profile pages with order history
- 🔔 Push notifications for new events
- 📱 Progressive Web App (PWA) support
- 🌐 Multi-language support

---

Created for the GUtech Computer Science Club with full e-commerce and content management capabilities.

**Need Help?** Check `FIREBASE_SETUP.md` for Firebase configuration or open an issue on GitHub.
