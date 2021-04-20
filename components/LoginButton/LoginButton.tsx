import * as React from 'react';
import style from './LoginButton.module.scss';
import axios from 'axios'

const spotifyTokenURL = 'https://accounts.spotify.com/api/token';

const LoginButton = () => {
    const {
        button
    } = style;

    const [data, setData] = React.useState<String>();

    const [authCode, setAuthCode] = React.useState<String>("");

    let scopes = 'user-read-private user-read-email';

    let client_id = '050e648af66348d1b7bbaa86f5b64c94';

    let redirect_uri = "http://localhost";

    const authLink = 'https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + client_id +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirect_uri)

    // testing data fetching for local api
    React.useEffect(() => {

        window.addEventListener('load', onAuthCode);

        return () => {
            window.removeEventListener('load', onAuthCode)
        }

    })

    async function onAuthCode() {
        const url = window.location.href;

        if (url.includes('code')) {
            const code = url.substr(url.indexOf('code=') + 5)
            // setState
            await setAuthCode(code)

        }
    }

    React.useEffect(() => {

        if (authCode.length > 0) {
            getAccessToken(authCode)
        }

    }, [authCode]);

    /**
     * 
     * @param code Authentication code to be sent to receive the access tokens
     */
    function getAccessToken(code: String) {

        const data = {
            grant_type: "authorization_code",
            code,
            redirect_uri: process.env.NEXT_SPOTIFY_REDIRECT_URI,
            client_id: process.env.NEXT_SPOTIFY_CLIENT_ID,
            client_secret: process.env.NEXT_SPOTIFY_CLIENT_SECRET
        }

        const tokenHeader: any = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        const clientCredentials = window.btoa(client_id + ':' + process.env.NEXT_SPOTIFY_CLIENT_SECRET);

        axios({
            method: 'post',
            url: spotifyTokenURL,
            headers: {
                'Authorization': 'Basic' + clientCredentials,
            },
            params: {
                grant_type: "authorization_code",
                code,
                redirect_uri: redirect_uri,
            }
        })
        .then((res: any) => console.log(res))
        .catch((e: any) => console.log(clientCredentials))
    }


    return (
        <button className={button}>
            <a href={authLink}>Login</a>
        </button>
    )
}

export default LoginButton;