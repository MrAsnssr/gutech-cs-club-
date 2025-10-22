# 🚀 Quick Start Guide

Get your GUtech website up and running in minutes!

## What You Have Now

✅ Full website with all sections  
✅ User registration and login system  
✅ Merch shop with 4 products  
✅ Shopping cart  
✅ Checkout system  
✅ Admin panel for managing content  

## 3-Step Setup

### Step 1: Set Up Firebase (10 minutes)

**Why?** Firebase provides free user authentication and database storage.

1. Go to https://console.firebase.google.com
2. Create a new project called "GUtech Website"
3. Add a web app
4. Copy the configuration and paste it into `firebase-config.js`
5. Enable "Email/Password" in Authentication
6. Enable "Realtime Database"

**Detailed instructions**: See `FIREBASE_SETUP.md`

### Step 2: Deploy to Netlify (2 minutes)

1. Go to https://app.netlify.com/drop
2. Drag and drop your entire project folder
3. Done! You'll get a URL like: `https://your-site.netlify.app`

### Step 3: Create Admin Account (1 minute)

1. Open your live website
2. Click "👤 Login"
3. Click "Register here"
4. Use email: `admin@gutech.edu.om` (this gets admin powers!)
5. Choose any password
6. Login and you'll see admin controls!

## What Works Right Now

### Without Firebase Setup:
- ✅ All pages load and look great
- ✅ Shopping cart works (saves to browser)
- ✅ Can add items to cart
- ❌ Can't login/register
- ❌ Can't save orders

### With Firebase Setup:
- ✅ Everything works!
- ✅ Users can register and login
- ✅ Orders are saved to database
- ✅ Admin can manage content
- ✅ Fully functional e-commerce site

## Testing Your Site

1. **Browse Products**: Go to "Merch" section
2. **Add to Cart**: Select size and click "Add to Cart"
3. **View Cart**: Click the 🛒 icon
4. **Login**: Click "👤 Login" and register
5. **Checkout**: Fill in delivery info and place order
6. **Check Database**: Go to Firebase Console to see your order!

## Admin Features

Once logged in with `admin@gutech.edu.om`:

- ✏️ Edit any event (title, date, description)
- ➕ Add new events
- 🗑️ Delete events
- 🖼️ Edit gallery images
- ➕ Add new gallery items
- 🛍️ Edit products (name, price, description)
- ➕ Add new products
- 🗑️ Delete products

## Common Issues

### "Firebase not configured"
→ You need to add your Firebase credentials to `firebase-config.js`  
→ See `FIREBASE_SETUP.md`

### "Can't login"
→ Make sure Email/Password is enabled in Firebase Console  
→ Go to Authentication → Sign-in method → Enable Email/Password

### "Admin buttons not showing"
→ You must login with `admin@gutech.edu.om` email  
→ Refresh the page after logging in

### "Cart is empty after refresh" (without Firebase)
→ This is normal - cart uses browser storage  
→ Don't clear browser data

## Customization Ideas

### Easy Changes:
- Change colors in `style.css` (search for `#8b5cf6`)
- Add more products (click "+ Add Product" when admin)
- Update event information
- Add real images (use image URLs)

### Advanced:
- Integrate Stripe for payments
- Add email notifications
- Create order management dashboard
- Add user profiles

## File Overview

| File | Purpose |
|------|---------|
| `index.html` | Main website structure |
| `style.css` | All styling and design |
| `firebase-config.js` | Firebase credentials (YOU NEED TO EDIT THIS) |
| `auth.js` | Login/register system |
| `shop.js` | Shopping cart and checkout |
| `admin.js` | Admin content management |

## Next Steps

1. ✅ Set up Firebase (essential!)
2. ✅ Deploy to Netlify
3. ✅ Create admin account
4. 📧 Set up email notifications (optional)
5. 💳 Add payment gateway (optional)
6. 🎨 Customize colors and branding
7. 📱 Test on mobile devices
8. 🚀 Share with your club!

## Need Help?

- **Firebase Setup**: Read `FIREBASE_SETUP.md`
- **Full Documentation**: Read `README.md`
- **Errors**: Check browser console (press F12)
- **Firebase Console**: https://console.firebase.google.com

---

**Total Setup Time**: 15 minutes  
**Difficulty**: Beginner-friendly  
**Cost**: FREE (Firebase free tier is plenty)

You got this! 💪

