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
 * This is an example Jest integration test for testing express based API server.
 * 
 */

import axios from 'axios';
import ApiServer from "../../src/server";

const PORT = 5000;
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
    it("Start the API Server", async () => {
      await expect(ApiServer.startServer(PORT)).resolves.toBe(undefined)
    });
    it("Get Health Endpoint", async () => {
      const response = await axios.get('/health');
      expect(response.data).toHaveProperty('status')
      expect(response.data.status).toEqual('OK')
    });
    it("Stop the API Server", async () => {
      await expect(ApiServer.stopServer()).resolves.toBe(undefined)
    });
  });
  describe("Users Endpoint", () => {
    it("Start the API Server", async () => {
      await expect(ApiServer.startServer(PORT)).resolves.toBe(undefined)
    });
    it("Create a user", async () => {
      const response = await axios.post('/users', newSampleUser1);
      expect(response.status).toEqual(201)
      expect(response.data).toHaveProperty('id')
      newUserId = response.data.id
      expect(response.data).toHaveProperty('email')
      expect(response.data).toHaveProperty('name')
      expect(response.data.email).toEqual(newSampleUser1.email)
      expect(response.data.name).toEqual(newSampleUser1.name)
    });
    it("Get the new user", async () => {
      const response = await axios.get(`/users/${newUserId}`);
      expect(response.status).toEqual(200)
      expect(response.data).toHaveProperty('id')
      expect(response.data).toHaveProperty('email')
      expect(response.data).toHaveProperty('name')
      expect(response.data.email).toEqual(newSampleUser1.email)
      expect(response.data.name).toEqual(newSampleUser1.name)
    });
    it("Create another user", async () => {
      const response = await axios.post('/users', newSampleUser2);
      expect(response.status).toEqual(201)
      expect(response.data).toHaveProperty('id')
      expect(response.data).toHaveProperty('email')
      expect(response.data).toHaveProperty('name')
      expect(response.data.email).toEqual(newSampleUser2.email)
      expect(response.data.name).toEqual(newSampleUser2.name)
    });
    it("Get all the users", async () => {
      const response = await axios.get(`/users`);
      expect(response.status).toEqual(200);
      expect(Array.isArray(response.data)).toEqual(true);
      expect(response.data.length).toEqual(2)
      const users = response.data.map((item: any) => {
        return {
          email: item.email,
          name: item.name,
          phoneNumbers: item.phoneNumbers
        }
      })
      expect(users).toEqual([newSampleUser1, newSampleUser2])
    });
    it("Stop the API Server", async () => {
      await expect(ApiServer.stopServer()).resolves.toBe(undefined)
    });
  });

})
