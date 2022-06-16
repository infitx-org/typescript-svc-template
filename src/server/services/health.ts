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

import axios from 'axios';
import { Health } from '../models';
import Config from '../../shared/config';

export class HealthService {
    public async getHealth(): Promise<Health> {
        let mockServerResponse;
        let status: 'OK' | 'ERROR' = 'OK';
        const errors: string[] = [];
        // Test if the mock service is reachable. We can also check the health of mock service by health endpoint if available.
        if(Config.get('GET_DATA_FROM_MOCK_SERVICE')) {
            axios.defaults.baseURL = `http://${Config.get('MOCK_SERVICE.HOST')}:${Config.get('MOCK_SERVICE.PORT')}`;
            console.log('Requesting mock server to get sample response');
            try {
                const response = await axios.get('/pet/findByTags');
                mockServerResponse = response?.data;
            } catch (err: any) {
                status = 'ERROR';
                errors.push(err.message);
                console.log(`Error contacting mock server ${err.message}`);
            }
        }
        return {
            status,
            mockServerResponse,
            errors,
        };
    }
}
