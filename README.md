# 🚤 Goa Yacht World

A modern, responsive website for yacht rentals in Goa, India.

## 🌟 Features

- **Beautiful Yacht Fleet** - Showcase your yachts with images, descriptions, and pricing
- **WhatsApp Integration** - Instant booking via WhatsApp Chat Now & Book Now buttons
- **Admin Panel** - Manage yachts, prices, and settings (access via `?admin=true`)
- **Image Upload** - Up to 10 photos per yacht
- **Fully Responsive** - Works on all devices
- **No Database Needed** - Uses localStorage for data persistence

## 🔧 Admin Panel

Access the admin panel by:
1. Adding `?admin=true` to the URL (e.g., `https://codeitinfotech.github.io/goayachtworld/?admin=true`)
2. Or pressing `Ctrl+Shift+A` on the page

### Admin Features:
- **Yacht Management**: Add, edit, delete yachts
- **Settings**: Configure WhatsApp number and booking URL
- **Image Upload**: Drag & drop up to 10 images per yacht
- **Reset to Defaults**: Restore original sample yachts

## 🚀 Quick Start

Simply open `index.html` in a web browser. No build process required!

## 📁 Project Structure

```
/
├── index.html          # Main website
├── assets/
│   ├── css/
│   │   └── style.css  # Styles
│   └── js/
│       └── app.js     # Application logic
├── 404.html            # Custom 404 page
├── CNAME               # Custom domain
└── README.md          # This file
```

## 🌐 GitHub Pages Deployment

### One-Time Setup Required:

1. Go to repository **Settings** → **Pages**
2. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main** / (root)
3. Click **Save**
4. Wait 2-3 minutes for deployment

### Your site will be available at:
**https://codeitinfotech.github.io/goayachtworld/**

## ⚙️ Configuration

### WhatsApp Number
The default WhatsApp number is `918446275985`. To change it:

1. Open admin panel (`?admin=true`)
2. Go to Settings tab
3. Update WhatsApp number (with country code, no + sign)

### Adding Your Own Images
1. Open admin panel
2. Edit any yacht
3. Upload images (max 10, 5MB each)
4. Save - images are stored in browser localStorage

## 🎨 Customization

### Colors (in style.css)
```css
:root {
    --primary: #1a365d;
    --secondary: #38b2ac;
    --accent: #ed8936;
    --whatsapp: #25D366;
}
```

### Default Yacht Data
Edit the `DEFAULT_YACHTS` array in `app.js` to change default content.

## 📱 Tech Stack

- HTML5
- CSS3 (CSS Variables)
- Vanilla JavaScript
- localStorage API

## 📄 License

© 2024 Goa Yacht World. All rights reserved.