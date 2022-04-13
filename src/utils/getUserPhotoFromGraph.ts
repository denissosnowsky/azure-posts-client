import { config } from '../config';

export async function getUserPhotoFromGraph(accessToken: string, userId: string) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(config.getUserPhotoEndpoint(userId), options)
        .then(response => response.blob());
}