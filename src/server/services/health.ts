import axios from 'axios';
import { Health } from '../models';
import Config from '../../shared/config';

export class HealthService {
    public async getHealth(): Promise<Health> {
        let mockServerResponse;
        let status: 'OK' | 'ERROR' = 'OK';
        const errors: string[] = [];
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
