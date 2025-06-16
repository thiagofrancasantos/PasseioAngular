import { AuthConfig } from "angular-oauth2-oidc";

export const auth: AuthConfig = {
    issuer: 'https://accounts.google.com',
    redirectUri: window.location.origin ,
    clientId: '145709860274-bcn6hh7qmtdipnqmh86j58kg9qgjmum5.apps.googleusercontent.com',
    scope: 'openid profile email',
    strictDiscoveryDocumentValidation: false
}