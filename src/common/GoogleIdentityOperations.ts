/*
  Copyright 2019 Momentum Dashboard Corp. All Rights Reserved.
  *
  * Licensed under the MIT License. See the LICENSE accompanying this file
  * for the specific language governing permissions and limitations under
  * the License.
  */

import request = require('request-promise');

export class GoogleIdentityOperations {

	public constructor() {
	}

	/**
	 * This method will take a refresh token request a current access token from the Google Identity Platform
	 * @returns {Promise<any>}
	 */
	public async RefreshAccessToken(clientId: string, clientSecret: string, refreshToken: string): Promise<any> {
		let uri: string = 'https://www.googleapis.com/oauth2/v4/token';
		let requestParameters: any = {
			client_id: clientId,
			client_secret: clientSecret,
			refresh_token: refreshToken,
			grant_type: 'refresh_token'
		};
		let response: any = {};
		let options = {
			uri: uri,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestParameters),
		};
		await request.post(options)
			.then((responseBody) => {
				response = JSON.parse(responseBody);
			})
			.catch((err) => {
				response = {"error": err.toString()};
				throw err;
			});
		return response;
	}
}
