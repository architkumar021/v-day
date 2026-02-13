# Valentine's Day Interactive Page 💕

A fun, interactive Valentine's Day page where the "Yes" button grows bigger every time they click "No" — with falling hearts, cute GIFs, music, and playful toast messages. Built with pure HTML, CSS, and JavaScript.

## Features

- **Interactive buttons** - The "Yes" button grows bigger each time "No" is clicked
- **Guilt-trip GIFs** - Cute character gets progressively sadder
- **Runaway "No" button** - After 5 clicks, the No button starts running away!
- **Confetti celebration** - Beautiful confetti explosion when they say Yes
- **Background music** - Romantic music to set the mood
- **Floating hearts** - Animated heart background

## Project Structure

```
v-day/
├── index.html          # Main page — "Will you be my Valentine?"
├── yes.html            # Celebration page after they say Yes
├── script.js           # Main page logic (button growth, GIF swaps, toasts)
├── yes-script.js       # Celebration page animations
├── style.css           # All the styling and animations
├── music/              # Background music folder
│   └── background.mp3  # Add your romantic song here
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions for auto-deployment
```

## Setup

1. **Add your music**: Place your favorite romantic song as `music/background.mp3`

2. **Push to GitHub**: 
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/v-day.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repo Settings → Pages
   - Under "Build and deployment", select **GitHub Actions**
   - The workflow will automatically deploy on push

4. **Share the link**: `https://YOUR_USERNAME.github.io/v-day`

## Customization

- Edit the messages in `script.js` (`noMessages` and `yesTeasePokes` arrays)
- Change the GIFs in `script.js` (`gifStages` array)
- Modify colors in `style.css`
- Update the celebration message in `yes.html`

## License

Do whatever you want with it. Make someone smile. 💕
