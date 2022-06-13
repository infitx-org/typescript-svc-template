/******************************************************************************
 *  Copyright 2019 ModusBox, Inc.                                             *
 *                                                                            *
 *  info@modusbox.com                                                         *
 *                                                                            *
 *  Licensed under the Apache License, Version 2.0 (the "License");           *
 *  you may not use this file except in compliance with the License.          *
 *  You may obtain a copy of the License at                                   *
 *  http://www.apache.org/licenses/LICENSE-2.0                                *
 *                                                                            *
 *  Unless required by applicable law or agreed to in writing, software       *
 *  distributed under the License is distributed on an "AS IS" BASIS,         *
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
 *  See the License for the specific language governing permissions and       *
 *  limitations under the License                                             *
 ******************************************************************************/

/* Example
 * 
 * This is an example Jest test for the MathLib example module.
 * 
 */

import { expect } from "chai";
import axios from 'axios';
import ApiServer from "../../src/server";

const PORT = 8000;
axios.defaults.baseURL = `http://localhost:${PORT}`;

const newSampleUser1 = {
  "email": "test1@test.com",
  "name": "test1",
  "phoneNumbers": [
    "1234567891"
  ]
}
const newSampleUser2 = {
  "email": "test2@test.com",
  "name": "test2",
  "phoneNumbers": [
    "1234567892"
  ]
}
let newUserId: number

describe ('API Server', () => {
  describe("Health Endpoint", () => {
    it("Start the API Server", () => {
      expect(() => ApiServer.startServer(PORT)).not.to.throw();
    });
    it("Get Health Endpoint", async () => {
      const response = await axios.get('/health');
      expect(response.data).to.haveOwnProperty('status')
      expect(response.data.status).to.equal('OK')
    });
    it("Stop the API Server", () => {
      expect(() => ApiServer.stopServer()).not.to.throw();
    });
  });
  describe("Users Endpoint", () => {
    it("Start the API Server", () => {
      expect(() => ApiServer.startServer(PORT)).not.to.throw();
    });
    it("Create a user", async () => {
      const response = await axios.post('/users', newSampleUser1);
      expect(response.status).to.equal(201)
      expect(response.data).to.haveOwnProperty('id')
      newUserId = response.data.id
      expect(response.data).to.haveOwnProperty('email')
      expect(response.data).to.haveOwnProperty('name')
      expect(response.data.email).to.equal(newSampleUser1.email)
      expect(response.data.name).to.equal(newSampleUser1.name)
    });
    it("Get the new user", async () => {
      const response = await axios.get(`/users/${newUserId}`);
      expect(response.status).to.equal(200)
      expect(response.data).to.haveOwnProperty('id')
      expect(response.data).to.haveOwnProperty('email')
      expect(response.data).to.haveOwnProperty('name')
      expect(response.data.email).to.equal(newSampleUser1.email)
      expect(response.data.name).to.equal(newSampleUser1.name)
    });
    it("Create another user", async () => {
      const response = await axios.post('/users', newSampleUser2);
      expect(response.status).to.equal(201)
      expect(response.data).to.haveOwnProperty('id')
      expect(response.data).to.haveOwnProperty('email')
      expect(response.data).to.haveOwnProperty('name')
      expect(response.data.email).to.equal(newSampleUser2.email)
      expect(response.data.name).to.equal(newSampleUser2.name)
    });
    it("Get all the users", async () => {
      const response = await axios.get(`/users`);
      expect(response.status).to.equal(200);
      expect(response.data).to.be.an.instanceof(Array);
      // expect(Array.isArray(response.data)).to.equal(true);
      expect(response.data.length).to.equal(2)
      const users = response.data.map((item: any) => {
        return {
          email: item.email,
          name: item.name,
          phoneNumbers: item.phoneNumbers
        }
      })
      expect(users).to.have.deep.members([newSampleUser1, newSampleUser2])
    });
    it("Stop the API Server", () => {
      expect(() => ApiServer.stopServer()).not.to.throw();
    });
  });

})
