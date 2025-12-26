# Komak Nexus cPanel Deployment Guide

This guide explains how to deploy the Komak Nexus application to your cPanel hosting, specifically for your **komaknexus** addon domain.

## Prerequisites
-   **cPanel Access**: You are already logged in.
-   **Node.js Support**: Your hosting plan must support "Setup Node.js App".

## Step 1: Prepare the Package
1.  On your local computer, open the `deployment_package` folder I created for you.
    -   Path: `c:\Users\HP\Downloads\Antigravity Final Websites and Softwares\komak-nexus -with-chatbot\deployment_package`
2.  Select **ALL** files inside this folder (`server.cjs`, `package.json`, `public`, `admin`, etc.).
3.  Right-click and **Compress to ZIP** (e.g., name it `deploy.zip`).

## Step 2: Upload to cPanel
1.  In your cPanel File Manager (from your screenshot), double-click the **komaknexus** folder to open it.
2.  **Backup (Optional but Recommended)**: If there are existing files you want to keep, create a folder named `backup_old` and move them there.
3.  Click the **Upload** button in the top toolbar.
4.  Select your `deploy.zip` file.
5.  Once uploaded, go back to the File Manager.
6.  Right-click `deploy.zip` and select **Extract**.
    -   Extract to: `/komaknexus`
7.  You should now see `server.cjs`, `package.json`, `public`, and `admin` folders inside your `komaknexus` directory.

## Step 3: Setup Node.js App
> [!IMPORTANT]
> **Do not use your existing "api" application.** That was likely just for the backend.
> Since we are now deploying the **full website** (Frontend + Chatbot + Admin), you should create a **NEW** application for your main domain.

1.  Go to the cPanel main menu and search for **Setup Node.js App**.
2.  Click **Create Application**.
3.  **Configure**:
    -   **Node.js Version**: Select **18.x** or **20.x**.
    -   **Application Mode**: **Production**.
    -   **Application Root**: `komaknexus` (This MUST match the folder where you uploaded the files).
    -   **Application URL**: Select `komaknexus.com` (Your main domain).
    -   **Application Startup File**: `server.cjs`.
4.  Click **Create**.

## Step 4: Install Dependencies
1.  After creating the app, the page will reload.
2.  Scroll down to **Detected Configuration Files**.
3.  You should see `package.json`. Click the **Run NPM Install** button.
    -   **Wait!** This can take a few minutes.
    -   **If it fails or you see "Cannot find module" errors:**
        1.  Go to cPanel main menu -> Search for **Terminal**.
        2.  Type `cd komaknexus` and press Enter.
        3.  Type `npm install` and press Enter.
        4.  Watch for errors. If it finishes successfully, try starting the app again.

## Step 5: Start the Application
1.  Click **Restart Application**.
2.  Visit `https://komaknexus.com`.
    -   Your new site with the chatbot should be live!
    -   Admin panel: `https://komaknexus.com/admin`

## Troubleshooting
-   **"Index of /" Page?**
    -   This means the Node.js app is **NOT running**.
    -   Go to **Setup Node.js App** in cPanel.
    -   Click **Stop App**, wait a few seconds, then click **Start App**.
    -   This forces cPanel to create the necessary `.htaccess` file to route traffic to your app.
-   **Error: Cannot find module 'json-server'?**
    -   This means `npm install` didn't finish. Use the **Terminal** method in Step 4.
-   **500 Error?** Check the "Node.js App" page for error logs. Ensure `.env` file was uploaded.
-   **Changes not showing?** You might need to click **Restart Application** again.
