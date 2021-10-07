# Recent Subscribers Shout Out

This is Three D Radio's web UI for viewing recent subscribers through the website.

## Setup

## Create Firebase Project

This is a Firebase project, so you will need to head to the [Firebase Console](https://console.firebase.google.com) and create a project. The project will comfortably fit into the free tier of Firebase, though you may be asked to add a credit card to Google Cloud Platform.

## Create an app for the Firebase Project

1. In the console, navigate to **Project Settings**.
1. Press the **Add App** button, and select `Web`
1. Give the app a name (it doesn't matter what)
1. Press **Register App**
1. In the code snippet that the console gives you,
   copy the firebaseConfig. It should look something like this:

   ```ts
   {
      apiKey: "XXXXX",
      authDomain: "my-project.firebaseapp.com",
      databaseURL: "https://my-project.firebaseio.com",
      projectId: "my-project",
      storageBucket: "my-project.appspot.com",
      messagingSenderId: "123456",
      appId: "1:1234:web:1234"
    };
   ```

## Prepare and build the Angular App

1. `cd subscribers`

1. Open up `src/environments/environment.ts` and paste the Firebase config in.

1. Do the same with `src/environments.environment.prod.ts`

1. `npm install`

1. `npm run build -- --configuration production --output-path ../public`

## Prepare the Firebase CLI

You will need to install the Firebase CLI for your platform. Instructions:

https://firebase.google.com/docs/cli#install_the_firebase_cli

Once you have the CLI installed, follow the steps to log in.

## Publish Firebase app

```
firebase deploy
```

If asked, you need to deploy the following:

- Firestore rules
- Cloud functions
- Public website

## Setup WooCommerce web hook

Now that the firebase app is deployed, you will have a callback function available at something like:

`https://us-central1-my-project.cloudfunctions.net/salesHook`

You can find the URL by navigating to **Functions** in the Firebase console.

Over in the Wordpress Dashboard, open up WooCommerce's webhooks.

WooCommerce -> Advanced -> Webhooks

Create a new webhook with the following properties:

- Name: whatever
- Status: Active
- Topic: Order Created
- Delivery URL: The URL to your Cloud Function
- Secret: Leave as is
- API Version: 3

Save the webhook.

## Done!

Firebase will now be notified of every sale made through WooCommerce. It will extract the purchaser's first name, city, and order items and put in the database. The website will automatically update as new orders come in.

You can see the website using the URL given to you when you deployed firebase.

You can also see it from the **Hosting** section of the Firebase console.

## Caveats

- The webhook doesn't actually check the secret to ensure authenticity. Given all we are doing with the info is presenting a bit of information, this was deemed unnecessary

- There is no authentication on the website - if you know the URL you can watch the orders come in. Keep the URL internal and you should be fine.
