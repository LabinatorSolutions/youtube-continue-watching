# Icon Creation Guide

This extension requires three icon sizes for Firefox:

## Required Icons

1. **icon-16.png** - 16x16 pixels
   - Used in: Extension toolbar (small displays)
   
2. **icon-48.png** - 48x48 pixels
   - Used in: Extension toolbar (normal displays), popup header
   
3. **icon-128.png** - 128x128 pixels
   - Used in: Firefox Add-ons manager, installation screen

## Design Recommendations

### Visual Concept
The icon should represent:
- YouTube (incorporate red color #FF0000)
- "Continue" or "play" concept
- Simple, recognizable at small sizes

### Suggested Design Ideas

**Option 1: Play Button with Continue Arrow**
```
Red circle background (#FF0000)
White play triangle (▶)
Small green checkmark or arrow overlay
```

**Option 2: YouTube Logo Variation**
```
Stylized play button
Red and white color scheme
Minimalist design
```

**Option 3: Abstract Continuous Symbol**
```
Circular arrows (♻) or infinity symbol (∞)
YouTube red color
Clean, modern look
```

## Creating Icons

### Using Design Tools

**Figma/Adobe XD/Sketch:**
1. Create 128x128 artboard
2. Design your icon
3. Export as PNG at 128x128, 48x48, and 16x16
4. Ensure transparent background (or solid color)

**GIMP (Free):**
1. File → New → 128x128 pixels
2. Design icon on transparent layer
3. Export as PNG
4. Image → Scale Image for other sizes
5. Save as icon-16.png, icon-48.png, icon-128.png

**Online Tools:**
- https://www.canva.com (Free, templates available)
- https://www.figma.com (Free tier available)
- https://favicon.io (Simple icon generator)

### Quick Placeholder Icons

For testing, you can use these simple designs:

**Red Square with White Play Symbol:**
```
1. Create 128x128 image
2. Fill with #FF0000
3. Add white play triangle ▶ in center
4. Export at all three sizes
```

## Installation

Place your generated icons in:
```
youtube-uninterrupted/
└── icons/
    ├── icon-16.png
    ├── icon-48.png
    └── icon-128.png
```

## Testing Icons

1. Load extension in Firefox
2. Check toolbar - should show smallest appropriate icon (16 or 48)
3. Open popup - should show 48x48 icon in header
4. Go to about:addons - should show 128x128 icon

## Design Guidelines (Firefox)

- **Format:** PNG (supports transparency)
- **Background:** Transparent or solid color
- **Shape:** Square canvas, but design can be circular/rounded
- **Clarity:** Must be recognizable at 16x16 size
- **Colors:** High contrast for visibility
- **Branding:** Should hint at YouTube without copyright infringement

## Copyright Considerations

⚠️ **Important:** Do NOT use:
- Official YouTube logo
- Google trademarks
- Copyrighted imagery

✅ **Safe to use:**
- Generic play button symbols
- Abstract representations
- Original designs inspired by (not copying) YouTube's colors

## Example CSS for Icon Generation

If you want to generate icons programmatically:

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    canvas {
      border: 1px solid #ccc;
    }
  </style>
</head>
<body>
  <canvas id="icon" width="128" height="128"></canvas>
  <script>
    const canvas = document.getElementById('icon');
    const ctx = canvas.getContext('2d');
    
    // Red circle background
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.arc(64, 64, 60, 0, Math.PI * 2);
    ctx.fill();
    
    // White play triangle
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.moveTo(50, 40);
    ctx.lineTo(50, 88);
    ctx.lineTo(88, 64);
    ctx.closePath();
    ctx.fill();
    
    // Download
    // Right-click canvas → Save image as → icon-128.png
  </script>
</body>
</html>
```

Save this as `icon-generator.html`, open in browser, and download the generated icon.

## Need Help?

If you need assistance creating icons:
1. Check Fiverr for affordable icon designers
2. Use free icon generators online
3. Ask in the project's GitHub Discussions
4. Use emoji/Unicode symbols as temporary placeholders

---

Remember: Icons are important for user experience, but for testing purposes, simple placeholders work fine!
