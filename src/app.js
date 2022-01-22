// src/app.js

import { Auth, getUser } from './auth';
import { getUserFragments } from './api';

async function init() {
  // Get our UI elements
  
  const userSection = document.querySelector('#user');
  const loginBtn = document.querySelector('#login');
  const logoutBtn = document.querySelector('#logout');
  
  
  
  // Wire up event handlers to deal with login and logout.
  loginBtn.onclick = () => {
    location.replace("fragments-jorymacneil.auth.us-east-1.amazoncognito.com");
    // Sign-in via the Amazon Cognito Hosted UI (requires redirects), see:
    // https://docs.amplify.aws/lib/auth/advanced/q/platform/js/#identity-pool-federation
    Auth.federatedSignIn();
  };
  logoutBtn.onclick = () => {
    // Sign-out of the Amazon Cognito Hosted UI (requires redirects), see:
    // https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js/#sign-out
    try {
        Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
    
  };

  // See if we're signed in (i.e., we'll have a `user` object)
  const user = await getUser();

  // Log the user info for debugging purposes
  console.log({ user });

  // Update the UI to welcome the user
  userSection.hidden = false;

  // Show the user's username
  userSection.querySelector('.username').innerText = user.username;

  // Disable the Login button
  loginBtn.disabled = true;

  getUserFragments(user);
}

// Wait for the DOM to be ready, then start the app
addEventListener('DOMContentLoaded', init);