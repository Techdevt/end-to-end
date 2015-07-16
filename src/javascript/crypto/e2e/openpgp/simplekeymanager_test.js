/**
 * @license
 * Copyright 2013 Google Inc. All rights reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Tests for the preferences handler.
 */

/** @suppress {extraProvide} */
goog.provide('e2e.openpgp.SimpleKeyManagerTest');

goog.require('e2e.openpgp.KeyPurposeType');
goog.require('e2e.openpgp.SimpleKeyManager');
goog.require('goog.testing.AsyncTestCase');
goog.require('goog.testing.jsunit');
goog.setTestOnly();


var asyncTestCase = goog.testing.AsyncTestCase.createAndInstall(document.title);
var managerPromise;

function setUp() {
  managerPromise = e2e.openpgp.SimpleKeyManager.launch();
}

function testConstructor() {
  asyncTestCase.waitForAsync('Waiting for async call.');
  managerPromise.then(function(km) {
    assertTrue(km instanceof e2e.openpgp.SimpleKeyManager);
    return km.removeKeys([]);
  }, fail).then(fail, function(error) {
    assertTrue(error instanceof Error);
    assertEquals('Not implemented.', error.message);
    asyncTestCase.continueTesting();
  });
}


function testGetTrustedKeys() {
  var email = 'test@example.com';
  asyncTestCase.waitForAsync('Waiting for async call.');
  managerPromise.then(function(km) {
    return km.getTrustedKeys(e2e.openpgp.KeyPurposeType.ENCRYPTION,
        email);
  }).then(function(keys) {
    assertEquals(1, keys.length);
    assertContains(email, keys[0].uids[0]);
    asyncTestCase.continueTesting();
  });
}
