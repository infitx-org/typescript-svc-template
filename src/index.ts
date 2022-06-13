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

import { MathLib } from './lib/math';
import ApiServer from './server';

/* Instructions
 * 
 * 1. Choose one of the following styles below, either an APPLICATION or a LIBRARY
 * 2. Removed the application block and comments.
 * 
 */

//* APPLICATION: {

console.log(`1+1=${MathLib.add(1, 1)}`);

console.log(`3x3=${MathLib.mul(3, 3)}`);


const port = process.env.PORT || 8000;
ApiServer.startServer(+port);

//* }

//* LIBRARY: {

export default MathLib;
export * from './lib/math';

//* }
