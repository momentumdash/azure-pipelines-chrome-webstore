/*
  Copyright 2019 Momentum Dashboard Corp. All Rights Reserved.
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

import tl = require('azure-pipelines-task-lib/task');
import {WebstoreApiOperations} from '../../common/WebstoreApiOperations';
import {GoogleIdentityOperations} from '../../common/GoogleIdentityOperations';

async function run() {
	try {
		const itemId: string = tl.getInput('itemId', true);
		const refreshToken: string = tl.getInput('refreshToken', true);
		const clientId: string = tl.getInput('clientId', true);
		const clientSecret: string = tl.getInput('clientSecret', true);

		// if (itemId == 'bad') {
		// 	tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
		// 	return;
		// }

		const identityOperations: GoogleIdentityOperations = new GoogleIdentityOperations();

		let accessTokenResponse: any = await identityOperations.RefreshAccessToken(clientId, clientSecret, refreshToken);
		let accessToken: string = accessTokenResponse.access_token;

		if (!accessToken) {
			tl.setResult(tl.TaskResult.Failed, 'Could not retrieve an updated Access Token');
		}

		const webstoreOperations: WebstoreApiOperations = new WebstoreApiOperations();

		let itemDetails: any = await webstoreOperations.getItem(itemId, 'DRAFT', accessToken);
		console.log('itemDetails: ', JSON.stringify(itemDetails));
	} catch (err) {
		tl.setResult(tl.TaskResult.Failed, err.message);
	}
}

export default run();
