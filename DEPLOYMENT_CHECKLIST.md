# ✅ Deployment Checklist

Follow this checklist to get your website online with all features working!

## Phase 1: Firebase Setup (Required for Auth & Orders)

### Step 1: Create Firebase Project
- [ ] Go to https://console.firebase.google.com
- [ ] Click "Create a project" or "Add project"
- [ ] Name it "GUtech CS Club" (or any name)
- [ ] Click "Continue"
- [ ] Disable Google Analytics (or enable if you want)
- [ ] Click "Create project"
- [ ] Wait for project creation
- [ ] Click "Continue"

### Step 2: Register Web App
- [ ] Click the Web icon (`</>`)
- [ ] App nickname: "GUtech Website"
- [ ] Click "Register app"
- [ ] **COPY the firebaseConfig object shown**
- [ ] Keep this page open!

### Step 3: Update Configuration File
- [ ] Open `firebase-config.js` in a text editor
- [ ] Replace the placeholder values with YOUR values from Firebase
- [ ] Save the file
- [ ] Double-check all values are correct

### Step 4: Enable Authentication
- [ ] In Firebase Console, click "Authentication" (left sidebar)
- [ ] Click "Get started"
- [ ] Click "Email/Password" under Sign-in providers
- [ ] Toggle ON the switch
- [ ] Click "Save"

### Step 5: Enable Realtime Database
- [ ] Click "Realtime Database" (left sidebar)
- [ ] Click "Create Database"
- [ ] Location: Choose closest to Oman (e.g., "europe-west1")
- [ ] Click "Next"
- [ ] Select "Start in test mode"
- [ ] Click "Enable"
- [ ] **COPY the database URL shown**
- [ ] Update `databaseURL` in `firebase-config.js`

## Phase 2: Deploy to Netlify

### Step 1: Prepare Files
- [ ] Make sure `firebase-config.js` has your credentials
- [ ] All files are in one folder
- [ ] No missing files (check list below)

### Required Files:
- [ ] index.html
- [ ] style.css
- [ ] firebase-config.js (with YOUR credentials!)
- [ ] auth.js
- [ ] shop.js
- [ ] admin.js
- [ ] README.md
- [ ] FIREBASE_SETUP.md
- [ ] QUICK_START.md
- [ ] WHATS_NEW.md
- [ ] ADMIN_GUIDE.md
- [ ] DEPLOYMENT_CHECKLIST.md (this file)

### Step 2: Upload to Netlify
- [ ] Go to https://app.netlify.com/drop
- [ ] Sign up/login if needed
- [ ] Drag ALL files from your folder
- [ ] Wait for upload (10-30 seconds)
- [ ] You'll get a URL like `https://random-name.netlify.app`
- [ ] Click the URL to open your live site!

### Step 3: (Optional) Customize URL
- [ ] In Netlify dashboard, click "Site settings"
- [ ] Click "Change site name"
- [ ] Enter: `gutech-cs-club` (or any available name)
- [ ] Now your URL is: `https://gutech-cs-club.netlify.app`

## Phase 3: Create Admin Account

### Step 1: Register Admin User
- [ ] Open your live website
- [ ] Click "👤 Login" in navigation
- [ ] Click "Register here"
- [ ] Enter:
  - Name: Your name
  - Email: `admin@gutech.edu.om` (exactly this!)
  - Password: Choose a secure password
- [ ] Click "Create Account"
- [ ] You should see "Account created successfully!"

### Step 2: Verify Admin Access
- [ ] After login, you should see "Admin Mode" badge (top-right)
- [ ] Login button should show ✓ and your name
- [ ] Go to Past Events - see Edit/Delete buttons
- [ ] Go to Merch - see Edit/Delete buttons
- [ ] See "+ Add Event", "+ Add Image", "+ Add Product" buttons

## Phase 4: Test Everything

### Test User Features
- [ ] Register a new user (different email)
- [ ] Login with that user
- [ ] Browse to Merch section
- [ ] Add T-Shirt to cart (select size first!)
- [ ] Add Mug to cart
- [ ] Click cart icon - see 2 items
- [ ] Click "Continue Shopping" and add more
- [ ] Click cart icon again
- [ ] Click "Checkout"
- [ ] Fill in delivery information
- [ ] Click "Place Order"
- [ ] See success message
- [ ] Cart should be empty now

### Test Admin Features (Login as admin first)
- [ ] Edit an event
- [ ] Add a new event
- [ ] Delete an event
- [ ] Edit a gallery item
- [ ] Add a new gallery image
- [ ] Edit a product
- [ ] Add a new product
- [ ] Delete a product

### Verify Data in Firebase
- [ ] Go to Firebase Console
- [ ] Click "Realtime Database"
- [ ] Click "Data" tab
- [ ] You should see:
  - [ ] `orders` node with your test order
  - [ ] `users` node with user data
  - [ ] Order has all details (items, total, customer info)

## Phase 5: Customization (Optional)

### Add Real Content
- [ ] Replace placeholder gallery images with real ones
- [ ] Update event information
- [ ] Add real product images (via Edit Product)
- [ ] Update product descriptions and prices
- [ ] Add more products

### Branding
- [ ] Change colors in `style.css` (search for `#8b5cf6`)
- [ ] Update contact email in index.html
- [ ] Update footer text
- [ ] Add club logo image

## Phase 6: Share & Launch

### Before Going Live
- [ ] Test on mobile device
- [ ] Test checkout process completely
- [ ] Verify all links work
- [ ] Check contact form
- [ ] Test all admin functions
- [ ] Make sure Firebase security rules are set (see FIREBASE_SETUP.md)

### Launch!
- [ ] Share URL with club members
- [ ] Post on social media
- [ ] Send email to students
- [ ] Add to club materials

## Troubleshooting Checklist

### If login doesn't work:
- [ ] Check `firebase-config.js` has correct values
- [ ] Verify Email/Password is enabled in Firebase Console
- [ ] Check browser console for errors (F12)
- [ ] Try clearing browser cache

### If orders don't save:
- [ ] Verify Realtime Database is enabled
- [ ] Check database URL in `firebase-config.js`
- [ ] Look at browser console for errors
- [ ] Check Firebase Database rules

### If admin controls don't show:
- [ ] Logged in with `admin@gutech.edu.om`?
- [ ] Try refreshing the page
- [ ] Try logging out and back in
- [ ] Check browser console for errors

### If site looks broken:
- [ ] Make sure ALL files were uploaded to Netlify
- [ ] Check that `style.css` is uploaded
- [ ] Try hard refresh (Ctrl+Shift+R)
- [ ] Check for JavaScript errors (F12)

## Success Criteria

You'll know everything is working when:
- ✅ Website loads with all sections visible
- ✅ Can register new user
- ✅ Can login with registered user
- ✅ Can add items to cart
- ✅ Cart count shows correct number
- ✅ Can view cart modal
- ✅ Can checkout and place order
- ✅ Order appears in Firebase Database
- ✅ Admin login shows admin controls
- ✅ Can edit events, gallery, products as admin
- ✅ All buttons work and show notifications

## Time Estimate

- Firebase Setup: 10-15 minutes
- Netlify Deployment: 2-5 minutes
- Admin Account Setup: 1 minute
- Testing: 5-10 minutes
- Customization: 30-60 minutes (optional)

**Total**: 20-30 minutes for basic setup

## Next Steps After Launch

1. Monitor orders in Firebase Console
2. Respond to customer inquiries
3. Add more products
4. Update events regularly
5. Consider adding:
   - Email notifications (Firebase Cloud Functions)
   - Payment gateway (Stripe)
   - Order management dashboard
   - User profiles
   - Email verification

---

**Good luck with your launch!** 🚀

If you get stuck, refer to:
- `FIREBASE_SETUP.md` for detailed Firebase instructions
- `QUICK_START.md` for quick reference
- `README.md` for full documentation
- `WHATS_NEW.md` for feature overview

