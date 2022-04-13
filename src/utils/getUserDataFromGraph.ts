import { config } from '../config';

export async function getUserDataFromGraph(accessToken: string) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(config.graphMeEndpoint, options)
        .then(response => response.json());
}