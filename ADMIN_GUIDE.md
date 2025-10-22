# Admin Panel User Guide

## Quick Start

### Step 1: Access Admin Panel
1. Open `index.html` in your web browser
2. Look for the "🔐 Admin" button in the top navigation menu
3. Click on it to open the login modal

### Step 2: Login
Enter the following credentials:
- **Username**: `admin`
- **Password**: `1234`

Click "Login" to access admin mode.

### Step 3: Admin Mode Activated
Once logged in, you'll see:
- ✅ A purple "Admin Mode" badge in the top-right corner with a "Logout" button
- ✅ The Admin button in navigation changes to "✓ Admin" with a green indicator
- ✅ Edit and Delete buttons appear on all events and gallery items
- ✅ "+ Add Event" and "+ Add Image" buttons appear in their respective sections

## Managing Past Events

### Edit an Existing Event
1. Scroll to the "Past Events" section
2. Find the event you want to edit
3. Click the blue "Edit" button on that event
4. A modal will appear with the current event details
5. Modify the:
   - Event Title
   - Event Date
   - Event Description
6. Click "Save Event" to apply changes
7. The event will update instantly on the page

### Add a New Event
1. Scroll to the "Past Events" section
2. Click the green "+ Add Event" button next to the section title
3. Fill in the event details:
   - Event Title
   - Event Date
   - Event Description
4. Click "Save Event"
5. The new event will appear in the events grid

### Delete an Event
1. Click the red "Delete" button on any event
2. Confirm the deletion in the popup dialog
3. The event will be removed immediately

## Managing Gallery

### Edit a Gallery Item
1. Scroll to the "Gallery" section
2. Find the gallery item you want to edit
3. Click the blue "Edit" button (appears on hover or at bottom of item)
4. A modal will appear with:
   - Caption field (the text shown on the placeholder)
   - Image URL field (optional - for actual images)
5. Modify the caption or add an image URL
6. Click "Save Image" to apply changes

### Add a New Gallery Item
1. Scroll to the "Gallery" section
2. Click the green "+ Add Image" button next to the section title
3. Fill in:
   - Caption (text to display)
   - Image URL (optional - you can paste a direct image link)
4. Click "Save Image"
5. The new gallery item will appear in the grid

### Delete a Gallery Item
1. Click the red "Delete" button on any gallery item
2. Confirm the deletion in the popup dialog
3. The gallery item will be removed immediately

## Features & Tips

### Persistent Login
- Your admin session is saved in the browser
- You'll stay logged in even if you refresh the page
- The session ends when you click "Logout" or close the browser

### Visual Feedback
- Green notifications appear for successful actions
- Error messages appear in red (e.g., invalid login)
- All changes happen instantly without page refresh

### Image URLs
When adding images to the gallery:
- Use direct image URLs (ending in .jpg, .png, etc.)
- Example: `https://example.com/image.jpg`
- If you leave the URL blank, it will show a colored placeholder with your caption

### Editing vs Adding
- **Edit**: Modifies existing content
- **Add**: Creates new content with a unique ID

## Logout
When you're done:
1. Click the "Logout" button in the Admin Mode badge (top-right)
2. All edit controls will disappear
3. The Admin button returns to "🔐 Admin"
4. You can log back in anytime

## Troubleshooting

### Can't see edit buttons
- Make sure you're logged in (check for "Admin Mode" badge)
- Try refreshing the page if session isn't detected

### Login not working
- Double-check credentials:
  - Username: `admin` (lowercase)
  - Password: `1234`
- Make sure there are no extra spaces

### Changes not saving
- Make sure all required fields are filled
- Check browser console for any errors (F12)

### Page looks different after adding content
- This is normal - new content appears with the same styling
- Refresh the page to see content in fresh state

## Important Notes

⚠️ **Data Persistence**: 
All changes are stored in the browser's memory only. If you refresh the page, any new content added or edits made will be lost. The page will return to its original state.

For permanent changes, you need to:
1. Edit the `index.html` file directly, or
2. Implement a backend database system

⚠️ **Security**: 
This admin system is for demonstration/development purposes. For production use, implement proper server-side authentication.

## Browser Compatibility

The admin panel works on:
- ✅ Google Chrome (recommended)
- ✅ Mozilla Firefox
- ✅ Microsoft Edge
- ✅ Safari
- ✅ Mobile browsers (responsive design)

---

Need help? Check the main README.md file for technical details and customization options.

