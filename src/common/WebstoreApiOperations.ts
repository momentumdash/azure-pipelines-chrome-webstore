import request = require('request-promise');
import fs = require('fs');

export enum ChromeStorePublishTarget {
	TrustedTesters = 1,
	Default = 2,
}

export class WebstoreApiOperations {

	public constructor() {
	}


	/**
	 * This method will upload a file to update the current draft version of the extension
	 * @returns {Promise<any>}
	 */
	public async updateItem(itemId: string, packageFilePath: string, accessToken: string): Promise<any> {
		let fileBinary: any = fs.readFileSync(packageFilePath);
		let uri: string = 'https://www.googleapis.com/upload/chromewebstore/v1.1/items/' + itemId;
		let authHeader: string = 'Bearer ' + accessToken;
		let response: any = {};
		let options = {
			uri: uri,
			headers: {
				Authorization: authHeader,
				'x-goog-api-version': 2
			},
			body: fileBinary,
			timeout: 180 * 1000
		};
		await request.put(options)
			.then((body) => {
				response = JSON.parse(body);
			})
			.catch((err) => {
				response = {"error": err.toString()};
			});
		return response;
	}

	/**
	 * This method will get the details for the state of the specified projection of the extension
	 * @returns {Promise<any>}
	 */
	public async getItem(itemId: string, projection: string, accessToken: string): Promise<any> {
		let uri: string = 'https://www.googleapis.com//chromewebstore/v1.1/items/' + itemId + '?projection=' + projection;
		let authHeader: string = 'Bearer ' + accessToken;
		let response: any = {};
		let options = {
			uri: uri,
			headers: {
				Authorization: authHeader,
				'x-goog-api-version': 2
			}
		};
		await request.get(options)
			.then((body) => {
				response = JSON.parse(body);
			})
			.catch((err) => {
				response = {"error": err.toString()};
			});
		return response;
	}

	/**
	 * This method will publish the extension to the specified target
	 * @returns {Promise<any>}
	 */
	public async publishItem(itemId: string, publishTarget: ChromeStorePublishTarget, accessToken: string): Promise<any> {
		let target: string = 'default';
		switch (publishTarget) {
			case ChromeStorePublishTarget.TrustedTesters:
				target = 'trustedTesters';
				break;
			default:
				target = 'default';
				break;
		}

		let uri: string = 'https://www.googleapis.com/chromewebstore/v1.1/items/' + itemId + '/publish?publishTarget=' + target;
		let authHeader: string = 'Bearer ' + accessToken;
		let response: any = {};
		let options = {
			uri: uri,
			headers: {
				Authorization: authHeader,
				'x-goog-api-version': 2,
				'Content-Length': 0
			}
		};
		await request.post(options)
			.then((body) => {
				response = JSON.parse(body);
			})
			.catch((err) => {
				response = {"error": err.toString()};
			});
		return response;
	}
}
