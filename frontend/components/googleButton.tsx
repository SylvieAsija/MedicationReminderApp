import GoogleButton from 'react-google-button';
import endpoint from '../endpoints.config'

const onGoogleLoginSuccess = () => {
    const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
    const REDIRECT_URI = 'auth/api/login/google/';
  
    const scope = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ].join(' ');

    const params = {
        response_type: 'code',
        client_id: endpoint.GOOGLE_CLIENT_ID,
        redirect_uri: `${endpoint.BASE_API_URL}/${REDIRECT_URI}`,
        prompt: 'select_account',
        access_type: 'offline',
        scope
      };
    };
    
    const googleLoginButton = () => {
      return <GoogleButton onClick={onGoogleLoginSuccess} label="Sign in with Google"/>
    }
    
    export default googleLoginButton