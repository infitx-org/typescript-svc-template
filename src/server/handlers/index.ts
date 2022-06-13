import getUserHandlers from './users';
import getHealthHandlers from './health';
export default {
    ...getUserHandlers,
    ...getHealthHandlers,
};