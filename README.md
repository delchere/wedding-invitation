# Wedding Website Template

Welcome to the **Wedding Website Template** project! This template is designed for couples who want a simple, elegant, and free-to-launch wedding website without the hassle of complicated setups or expensive fees.

![Website Demo](/public/images/readme/hero.png)

## Why Use This Template?

Planning a wedding can be stressful, but setting up your wedding website doesn’t have to be. This template offers:

- **Ease of Use**: No need for advanced coding skills. This template is built using React, making it easy to customize with basic web knowledge.
- **Free to Launch**: Deploy your website for free using Vercel, a popular and reliable hosting service. Say goodbye to expensive web hosting fees.
- **Modern Design**: Impress your guests with a clean, modern, and responsive design that looks great on all devices.
- **Customizable Features**: Easily add and manage your guest list, share your wedding schedule, and more with built-in integrations for Airtable and Fillout forms.

![Countdown](/public/images/readme/countdown.png)

## Features

- **RSVP Management**: Allow guests to RSVP directly through your site with a seamless Airtable integration.
- **Gift Registry**: Display your gift registry in a stylish format and allow guests to claim gifts easily.
- **Interactive Maps**: Help your guests find their way with integrated Google Maps.
- **Password Protection**: Keep your website semi-private with an optional password protection feature.
- **Mobile-Friendly**: Ensure your website looks great on smartphones, tablets, and desktops.

![Gift Register](/public/images/readme/gifts.png)

## Getting Started

Follow the [Getting Started Guide](#getting-started) to set up your wedding website in minutes. The guide includes steps to clone the project, set up environment variables, and deploy the site to Vercel.

## Customization

While the template is ready to use out of the box, it is also fully customizable. With basic knowledge of HTML, CSS, and React, you can tailor the design to fit your unique style and preferences. The template is organized and well-documented, making it easy to modify.

## Deployment

Deploying your wedding website is simple and free with Vercel. After setting up the project locally, follow our [Deployment Guide](#deployment) to get your site live in just a few clicks.

## Support

If you encounter any issues or have questions about setting up your website, feel free to reach out. We're here to help you make your wedding website as special as your big day!

## License

This project is open-source and available under the [MIT License](LICENSE). Feel free to use, modify, and share this template with others who may find it useful.

---

# Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)
   - [Clone the Repository](#clone-the-repository)
   - [Install Dependencies](#install-dependencies)
   - [Set Up Environment Variables](#set-up-environment-variables)
   - [Run the App](#run-the-app)
3. [Deployment](#deployment)
   - [Deploying to Vercel](#deploying-to-vercel)
4. [Setting Up an Airtable Base](#setting-up-an-airtable-base)
   - [Create a New Airtable Base](#create-a-new-airtable-base)
   - [Set Up Your Tables Structure](#set-up-your-tables-structure)
   - [Import the CSV Files](#import-the-csv-files)
5. [Fillout Form Setup](#fillout-form-setup)
   - [Importing the JSON Configuration](#importing-the-json-configuration)
   - [Connecting the Form to Airtable](#connecting-the-form-to-airtable)
   - [Deploying the Form](#deploying-the-form)
6. [Additional Resources](#additional-resources)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 12 or higher)
- **npm** or **yarn** (for package management)

## Getting Started

### Clone the Repository

1. **Clone the repository**

   ```bash
   git clone https://github.com/MattiasHenders/wedding-template.git
   cd wedding-template
   ```

### Install Dependencies

1. **Install dependencies**

   If you are using npm:

   ```bash
   npm install
   ```

   Or if you are using yarn:

   ```bash
   yarn install
   ```

### Set Up Environment Variables

1. **Set up environment variables**

   The app relies on several environment variables for proper configuration. Create a `.env` file in the root of your project and add the following variables:

   ```env
   NEXT_PUBLIC_AIRTABLE_TOKEN=<your_airtable_token>
   NEXT_PUBLIC_AIRTABLE_BASE=<your_airtable_base_id>

   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<your_google_maps_api_key>

   NEXT_PUBLIC_FILLOUT_RSVP_ID=<your_fillout_rsvp_id>
   NEXT_PUBLIC_FILLOUT_GIFT_ID=<your_fillout_gift_id>

   NEXT_PUBLIC_PASSWORD=<your_password>
   NEXT_PUBLIC_WEBSITE_SKIP_PASSWORD=<true_or_false>
   ```

   Replace the placeholders (`<your_variable>`) with your actual API keys and configuration values.

2. **Edit the config files**

   You can find the files [here](./src/config/).

   You will need to edit the following files:
   - **[Admin Config](./src/config/admin.config.ts)**
   - **[Colour/Theme Config](./src/config/colour.config.ts)**
   - **[Wedding Config](./src/config/wedding.config.ts)**

   ```
   const weddingConfig: WeddingConfigType = {
       people: {
           bride: { firstName: 'Jane', lastName: 'Doe' },
           groom: { firstName: 'John', lastName: 'Smith' }
       },
       date: {
           date: '2026-01-31',
           time: '16:30' // Optional
       },
       location: {
           title: 'Teahouse in Stanley Park',
           address: '7501 Stanley Park Dr, Vancouver, BC V6G 1Z4',
           link: 'https://www.vancouverdine.com/teahouse/',
           latLng: '49.3016707,-123.1597673'
       }
   }
   ```

### Run the App

1. **Run the app**

   After setting up the environment variables, start the development server:

   ```bash
   npm run dev
   ```

   Or with yarn:

   ```bash
   yarn dev
   ```

   The app should now be running on `http://localhost:3000`.

## Deployment

### Deploying to Vercel

Vercel is a great platform for deploying React and Next.js apps. Follow these steps to deploy your app to Vercel:

1. **Sign in to Vercel**

   If you don't have a Vercel account, you can sign up at [vercel.com](https://vercel.com/).

2. **Import your project**

   - Go to the Vercel dashboard.
   - Click on **"New Project"**.
   - Import your Git repository by connecting your GitHub, GitLab, or Bitbucket account.

3. **Set up environment variables on Vercel**

   - After importing the project, Vercel will ask you to configure your environment variables.
   - Add the same variables from your `.env` file to the Vercel project settings under **"Environment Variables"**.

   Example:

   ```env
   NEXT_PUBLIC_AIRTABLE_TOKEN=your_airtable_token
   NEXT_PUBLIC_AIRTABLE_BASE=your_airtable_base_id

   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

   NEXT_PUBLIC_FILLOUT_RSVP_ID=your_fillout_rsvp_id
   NEXT_PUBLIC_FILLOUT_GIFT_ID=your_fillout_gift_id

   NEXT_PUBLIC_PASSWORD=your_password
   NEXT_PUBLIC_WEBSITE_SKIP_PASSWORD=true_or_false
   ```

4. **Deploy the app**

   - Click **"Deploy"**.
   - Vercel will automatically build and deploy your app. Once the deployment is complete, you will receive a live URL where your app is hosted.

5. **Custom Domain (Optional)**

   - If you have a custom domain, you can add it in the Vercel dashboard under the **"Domains"** section.
   - Follow the instructions to point your domain to Vercel.

6. **Automatic Deployments**

   - Vercel automatically triggers deployments on every push to the main branch of your repository.
   - You can customize this behavior in the project settings if needed.

## Setting Up an Airtable Base

This guide will walk you through creating an Airtable base and importing data from a CSV file. Follow the steps below to set up your Airtable base with the provided CSV data.

### Create a New Airtable Base

1. **Sign in to Airtable**

   If you don’t already have an account, you can sign up at [Airtable](https://airtable.com/).

2. **Create a New Base**

   - From your Airtable dashboard, click on **"Add a base"**.
   - Choose **"Start from scratch"**.
   - Name your base (e.g., "Wedding") and select a color and icon.

### Set Up Your Tables Structure

1. **Create the Tables**

   - You need 3 tables:
     - Gifts
     - Guests
     - People

2. **Add Fields**

   Update the fields in your table to match the structure of your CSV file:

   - **Gifts Table** 
     - **ID** (Single line text)
     - **Gift Name** (Single line text)
     - **Description** (Long text)
     - **Cost** (Currency)
     - **Picture** (Attachment)
     - **Link** (URL)
     - **Status** (Single select)
       - Options: "Not Claimed", "Claimed"
     - **Claimed By** (Single line text)

   - **Guests Table**
     - **Submission ID** (Auto Number or Single line text)
     - **Name (from Guest)** (Single line text)
     - **Plus One** (Single line text)
     - **Guest** (Single line text)
     - **Coming?** (Single select)
       - Options: "Yes", "No", "Maybe"
     - **Plus 1 Coming?** (Single select)
       - Options: "Yes", "No", "Maybe"
     - **Created** (Date)
     - **Dietary Restrictions?** (Long text)
     - **Updated Email** (Email)
     - **Song Request** (Long text)

   - **People**
     - **Name** (Single line text)
     - **Email** (Email)
     - **Most Up to Date Email** (Email)
     - **Plus 1** (Single line text)
     - **Guests** (Number or Single line text)
     - **Plus 1 Name** (Single line text)
     - **Gifts** (Single line text or Linked Record if connected to a separate Gifts table)

### Import the CSV Files

1. **Get the CSV Files**

   You can find the files [here](./airtable/).

2. **Import the CSV File**

   - In Airtable, go to the table where you want to import the data.
   - Click on the **"View all"** dropdown (next to the grid view name) and select **"Import data"** > **"CSV file"**.
   - Upload your CSV file.
   - Airtable will map the columns from your CSV file to the fields in your table. Ensure all columns are correctly mapped.

3. **Update the .env**

   Update the env with the fillout ids of each form you make:

   ```env
   NEXT_PUBLIC_AIRTABLE_TOKEN=
   NEXT_PUBLIC_AIRTABLE_BASE=
   ```

### Additional Airtable Resources

- [Airtable Documentation](https://support.airtable.com/hc/en-us)
- [Getting Started with Airtable](https://airtable.com/guides/getting-started)

## Fillout Form Setup

This guide will help you set up a Fillout form by importing a JSON configuration and connecting it to an Airtable base. Follow the steps below to create your form and link it to your Airtable data.

### Importing the JSON Configuration

1. **Sign in to Fillout**

   Log in to your Fillout account. If you don’t have an account, create one at [Fillout](https://www.fillout.com/).

2. **Create 2 New Forms**

   - On your Fillout dashboard, click on **"Create New Form"**.
   - Choose **"Import JSON"** as the method to create your form.

3. **Import the JSON Files**

   You can find the files [here](./fillout/).

   - **RSVP**
     - Connects to Guests Airtable
   - **Gifts**
     - Connects to Gift Airtable

### Connecting the Form to Airtable

1. **Add Airtable Integration**

   - In the Fillout form editor, find the **"Integrations"** tab, usually located in the settings menu.
   - Click on **"Add Integration"** and choose **Airtable** from the list of available integrations.
   - You will be prompted to connect your Airtable account. Provide the necessary API key or log in using OAuth.

2. **Map Form Fields to Airtable**

   - Select the Airtable base and the specific table where you want the form submissions to be sent.
   - Map the form fields to the corresponding fields in your Airtable table. Ensure that each field is correctly matched to capture data accurately.
   - Configure actions such as creating new records, updating existing records, or triggering automations in Airtable.

3. **Test the Integration**

   - Fill out the form with test data and submit it.
   - Check your Airtable base to ensure that the data has been correctly added or updated.
   - Troubleshoot if necessary.

### Deploying the Form

1. **Publish the Form**

   - Once everything is set up, click **"Publish"** to make your form live.
   - You’ll receive a shareable link that you can distribute to your audience.

2. **Embed or Share**

   - Copy the embed code provided by Fillout and paste it into the .env file.
   - Alternatively, you can share the direct link to the form via email, social media, or any other channel.

3. **Update the .env**

   Update the env with the fillout ids of each form you make:

   ```env
   NEXT_PUBLIC_FILLOUT_RSVP_ID=
   NEXT_PUBLIC_FILLOUT_GIFT_ID=
   ```

## Additional Resources

- [Fillout Documentation](https://docs.fillout.com/)
- [Airtable Documentation](https://support.airtable.com/hc/en-us)
- [JSON Import Guide](https://docs.fillout.com/json-import)

---