export const config = {
  appId: 'bd29d0e0-7ba8-409a-b609-429b66a82603',
  scopes: ['openid', 'profile', 'offline_access'],
  authority: 'https://login.microsoftonline.com/common/',
  redirectUri: 'http://localhost:3000',
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
  getUserPhotoEndpoint(id: string){
    return `https://graph.microsoft.com/v1.0/users/${id}/photo/$value`
  },
  localStorageName: 'azure-token',
  localStorageAccessToken: 'azure-access-token',
  localStorageUserId: 'azure-userId',
}
