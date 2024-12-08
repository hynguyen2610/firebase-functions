const admin = require('firebase-admin');
admin.initializeApp();

console.log('Initializing Firebase Admin SDK...');

const randomNumberFunction = require('./randomNumber');
const toTheDojoFunction = require('./toTheDojo');
const newUserSignUpFunction = require('./newUserSignup');
const userDeletedFunction = require('./userDeleted');
const addRequestFunction = require('./addRequest');
const upvoteFunction = require('./upvote');
const helloFunction = require('./hello');
const logActivitiesFunction = require('./logActivities');

console.log('Loading functions...');

try {
  exports.randomNumber = randomNumberFunction.randomNumber;
  exports.toTheDojo = toTheDojoFunction.toTheDojo;
  exports.newUserSignUp = newUserSignUpFunction.newUserSignUp;
  exports.userDeleted = userDeletedFunction.userDeleted;
  exports.addRequest = addRequestFunction.addRequest;
  exports.upvote = upvoteFunction.upvote;
  exports.hello = helloFunction.hello;
  exports.logActivities = logActivitiesFunction.logActivities;

  console.log('Functions loaded successfully!');
} catch (error) {
  console.error('Error loading functions:', error);
}