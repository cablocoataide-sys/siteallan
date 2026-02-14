<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/temp/1

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Strapi CMS

To manage content, you need to run the Strapi backend.

1.  Navigate to the `strapi-cms` directory:
    `cd strapi-cms`
2.  Install dependencies (if not already done):
    `npm install`
3.  Start the development server:
    `npm run develop`

The Strapi admin panel will be available at `http://localhost:1337/admin`.
