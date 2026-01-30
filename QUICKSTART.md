# 🚀 Quick Start: YouTube Uninterrupted up and running in under 5 minutes.

## 🚀 Firefox Desktop - Quick Install

1.  **Download or Clone**
    ```bash
    cd ~/Downloads
    git clone https://github.com/LabinatorSolutions/youtube-uninterrupted.git
    ```

2.  **Load Extension**
    - Open Firefox
    - Type in address bar: `about:debugging#/runtime/this-firefox`
    - Click **"Load Temporary Add-on"**
    - Navigate to extension folder
    - Select `manifest.json`
    - ✅ Done!

3.  **Test It**
    - Go to youtube.com
    - Play any video
    - Walk away for 10 minutes
    - No "Continue watching?" dialog!

## 📱 Firefox Android - Quick Install

### Short Version

1.  Create Firefox account
2.  Create add-on collection on addons.mozilla.org
3.  Enable debug menu in Firefox Android (tap logo 5 times)
4.  Configure custom collection
5.  Install extension from your collection

### Detailed Guide

👉 See [ANDROID-INSTALLATION.md](./ANDROID-INSTALLATION.md) for complete step-by-step instructions.

## ⚙️ Configuration

The extension works out-of-the-box with no configuration needed!

**Optional:** Toggle on/off
- Click extension icon in toolbar
- Use toggle switch
- Status updates in real-time

## 🧪 Verify It's Working

1.  **Check Extension Status**
    - Click extension icon
    - Should say: "Active on YouTube pages"
    - Toggle should be ON (red)

2.  **Browser Console** (Optional)
    - Press F12 → Console tab
    - Look for: `[YouTube Uninterrupted] Initializing...`
    - Look for: `[YouTube Uninterrupted] Initialization complete`

3.  **Live Test**
    - Go to YouTube
    - Play a video
    - Leave it running (don't interact)
    - After 5-10 minutes, no dialog should appear

## 🎯 What You Should See

✅ **Working:**
- Videos play continuously without interruption
- No "Continue watching?" dialog
- Extension icon shows green status when active

❌ **Not Working:**
- Dialog appears during playback
- Extension icon shows gray/disabled
- Console shows errors

## 🔧 Troubleshooting

**Dialog still appears?**
- Verify extension is enabled (click icon)
- Reload YouTube page (F5 or Ctrl+R)
- Check console for errors (F12)

**Extension icon not visible?**
- Go to `about:addons`
- Find "YouTube Uninterrupted"
- Verify it's enabled

**Not working on mobile?**
- Make sure you're using **Firefox** (not Chrome)
- Verify extension is in your custom collection
- Check Firefox Android → Add-ons → extension is enabled

## 📚 Documentation

- **Full README:** [README.md](./README.md)
- **Android Guide:** [ANDROID-INSTALLATION.md](./ANDROID-INSTALLATION.md)
- **Testing:** [TESTING-CHECKLIST.md](./TESTING-CHECKLIST.md)
- **Icons:** [icons/ICON-GUIDE.md](./icons/ICON-GUIDE.md)

## 🆘 Getting Help

**Problem installing?** Check issues on GitHub  
**Found a bug?** Report it on GitHub Issues  
**Need clarification?** See full README.md

## 📋 File Structure

```
youtube-uninterrupted/
├── manifest.json              # Extension config
├── content-scripts/           # Content injected into YouTube
│   ├── youtube-uninterrupted.js    # Main logic
│   └── inject-styles.css      # CSS hiding layer
├── background/
│   └── service-worker.js      # State management
├── popup/                     # Extension popup UI
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── icons/                     # Extension icons (3 sizes)
└── README.md                  # Full documentation
```

## 🎉 You're Done!

That's it! The extension is now:
- ✅ Installed
- ✅ Active on YouTube
- ✅ Preventing interruption dialogs

Enjoy uninterrupted YouTube! 🎵

---

**Next Steps:**
- Test with a long playlist
- Try different video types (music, podcasts, lectures)
- Toggle on/off to see the difference

**Optional:**
- Submit to Mozilla Add-ons for permanent installation
- Share with friends who also hate the interruption dialog
- Contribute improvements on GitHub
