// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

/**
 * Utility class to load questions and prompts into a Firebase database
 */

// https://firebase.google.com/docs/database/
var admin = require('firebase-admin');
// Import local JSON file as Cloud Function dependency
var serviceAccount = require('./data/serviceAccountKey.json');

// Initialize firebase database access
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://hackathon-fd931.firebaseio.com/'
});

const DATABASE_DATA_KEY = 'data';

// Wait for data to be updated before exiting app
admin.database().ref(DATABASE_DATA_KEY)
  .on('value', (data) => {
    if (data && data.val()) {
      console.log('Database updated');
    }
  });

// Load the questions and answers
const questions = require('./data/questions.json');
admin.database().ref(DATABASE_DATA_KEY).update(questions).catch(function (error) {
  console.error(error);
});
