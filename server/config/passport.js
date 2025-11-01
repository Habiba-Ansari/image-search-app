const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    await handleOAuthLogin(profile, 'google', done);
  }
));

// Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'emails', 'photos']
  },
  async (accessToken, refreshToken, profile, done) => {
    await handleOAuthLogin(profile, 'facebook', done);
  }
));

// GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback",
    scope: ['user:email']
  },
  async (accessToken, refreshToken, profile, done) => {
    await handleOAuthLogin(profile, 'github', done);
  }
));

// Common OAuth login handler
async function handleOAuthLogin(profile, provider, done) {
  try {
    const providerId = `${provider}Id`;
    
    // Check if user already exists with this provider
    let user = await User.findOne({ [providerId]: profile.id });
    
    if (user) {
      return done(null, user);
    }

    // Check if user exists with same email (account merging)
    if (profile.emails && profile.emails[0]) {
      user = await User.findOne({ email: profile.emails[0].value });
      
      if (user) {
        // Merge accounts - add this provider to existing user
        user[providerId] = profile.id;
        await user.save();
        return done(null, user);
      }
    }

    // Create new user
    user = await User.create({
      [providerId]: profile.id,
      name: profile.displayName || profile.username,
      email: profile.emails ? profile.emails[0].value : `${profile.username}@github.com`,
      avatar: getAvatar(profile, provider)
    });

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}

// Helper function to get avatar based on provider
function getAvatar(profile, provider) {
  switch (provider) {
    case 'google':
      return profile.photos[0].value;
    case 'facebook':
      return profile.photos[0].value;
    case 'github':
      return profile._json.avatar_url;
    default:
      return null;
  }
}

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});