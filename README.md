# Overview

This project:
<br>

- Allows a user to login with email and password or with Google OAuth.
- Uses a persistent Postgres Database hosted on Vercel ([Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)).
- Production Frontend is also hosted on Vercel here: [hevo.vercel.app](https://hevo.vercel.app).
- The CI/CD pipeline is managed by Vercel, every pull request or merge into main will create a new deployment.
- End-to-end tests using Playwright.

# Test User

If you want an already created user account for [hevo.vercel.app](https://hevo.vercel.app), you can use the following:

- email: test@email.com
- password: asdfghjkl

# Local Development

Locally building and deploying the application is not quite as simple mainly due to Vercel Postgres integration, therefore it is crucial to follow each step below precisely for the application to build properly.

**If you just want to see the UI of the application build locally, you can run `npm install` and `npm run dev`, but you will not be able to use Google OAuth or sign in with credentials due to Vercel Postgres integration. To properly enable all features, please follow the steps below.**

1. Must have [node](https://nodejs.org/en/download) version of at least `20.10.0`.
2. Must have a Vercel account, if you do not sign up [here](https://vercel.com/signup).
3. Install Vercel CLI using the command `npm i -g vercel`.
4. Enter the command `vercel login` to log into your Vercel account.
5. Pull down this repository and upload it to your own Github account.
6. Log into [Vercel](https://vercel.com/login) on a web browser and, if you haven't already, link your Github account with Vercel.
7. In the `Overview` tab click the button that says `Add New...` and then in the dropdown `Project`.
8. Click the `Import` button next to the repository that contains this project. **This first deploy will FAIL** and is completely normal. If it does not fail, that is a matter of concern.
9. At this point, you should have the project in your list of projects. Click into the project and then click the `Storage` tab.
10. In the `Storage` tab, click the `Create Database` button and select `Postgres`. Accept the default options.
11. The database should have automatically connected. If not, click the `Connect Database` button and select the Postgres database you just created.
12. Vercel does not offer a good way create the initial tables for the database which means it will have to be done manually. Still in the `Storage` tab click the Postgres database. In the database dashboard, make sure you are in the `Data` tab and then click `Query`. You will now have to enter this SQL query to create the Users table:
    <br><br>
    ```
    CREATE TABLE users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        email VARCHAR UNIQUE,
        name VARCHAR,
        password VARCHAR,
        created_at TIMESTAMP DEFAULT current_timestamp,
        updated_at TIMESTAMP DEFAULT current_timestamp
    );
    ```
    Click `Run Query`. You should also see a message indicating that the table was successfully created. Go back to `Browse` and click where it says `Choose a table` and you should see a `users` table in the dropdown.
13. On your local machine, open a terminal and navigate to the root of the project.
14. In the terminal, enter the command `vercel link` and follow the instructions to link the project on Vercel to your local project.
15. After successfully linking, still in the root of the project, type the command `vercel env pull .env` which should create a `.env` file at the root of the directory.
16. In the `.env` file you will have to add four more **required** environment variables:
    <br><br>
    ```
    NEXTAUTH_SECRET="PASTE HERE YOUR RANDOM SECRET"
    NEXTAUTH_URL="localhost:3000"
    GOOGLE_CLIENT_ID="PASTE HERE YOUR GOOGLE CLIENT ID"
    GOOGLE_CLIENT_SECRET="PASTE HERE YOUR GOOGLE CLIENT SECRET"
    ```
    - `NEXTAUTH_SECRET` can be any string, but it is recommended to be a complex string like a UUID or a randomly generated hex.
    - `NEXTAUTH_URL` has to be `localhost:3000` in development.
    - `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` is required for Google OAuth and will need to be generated by you. [Here](https://liveblocks.io/blog/how-to-add-google-authentication-to-your-nextjs-liveblocks-app-with-nextauthjs) is a good guide. Follow until you reach the heading: `Using Credentials in Liveblocks app`.
      <br><br>
17. You should now be able to run the application by typing the command `npm install` followed by `npm run dev`. Go to `localhost:3000` to test and see the application live.
18. To fix the Vercel deployments, go back to the Vercel web client, navigate again to the project, go to the `Settings` tab, click the `Environment Variables` tab and under `Create new`, you should see a section that allows you to add keys and a button called `Add another`. Add all four keys with the following changes:
    <br><br>
    - `NEXTAUTH_SECRET` can still be any string, but it is best practice to ensure it is different from your local secret.
    - `NEXTAUTH_URL` will be whatever your domain is. In my case it is `https://hevo.vercel.app`. You can check your current domain in the `Domains` tab right above the `Environment Variables` tab.
    - `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` will remain the same. You can copy over what you have in your `.env` file.
      <br><br>
19. In `Google Cloud Console` where you created the OAuth configuration, you will also have to add your live domain to `Authorized JavaScript origins` and `Authorized redirect URIs`.
20. Finally, redeploy the application by either pushing a new commit to the main branch or by navigating to the `Deployments` tab, click the three dots next to the failed deployment and select `Redeploy`.

# Docker

1. **MUST AT LEAST COMPLETE THE LOCAL DEVELOPMENT SETUP FROM ABOVE UP TO STEP 17.**
2. You must first install Docker and Docker compose [here](https://docs.docker.com/compose/install/).
3. Open a terminal to the root of the project, run the command `docker compose up`. This command might take a bit to finish.
4. If everything works out, you should be able to go to `localhost:3000` in your browser to test the application.

# End-to-end tests

This application uses Playwright to run end-to-end tests. The tests are located in the `e2e` folder.
To run tests:

1. **MUST AT LEAST COMPLETE THE LOCAL DEVELOPMENT SETUP FROM ABOVE UP TO STEP 17.**
2. Make sure you've installed project dependencies using `npm install`.
3. Run the command `npx playwright install` to install all the required browsers.
4. Run the command `npm run test` to run the tests.
