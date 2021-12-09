export class OAuthServiceMock {
    refreshToken() {}
    fetchTokenUsingPasswordFlow(username: string, password: string) {}
    hasValidAccessToken() {}
    getAccessToken() {}
}
