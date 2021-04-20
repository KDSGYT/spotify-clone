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

    let scopes = ["user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state"].join(" ");

    let client_id = '050e648af66348d1b7bbaa86f5b64c94';

    let redirect_uri = "http://localhost";

    const authLink = 'https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + client_id +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirect_uri) + '&show_dialog=true'

    // testing data fetching for local api
    React.useEffect(() => {
        getAuthCode()
    },[])

    async function getAuthCode() {
        const url = window.location.href;

        if (url.includes('code')) {
            const code = url.substr(url.indexOf('code=') + 5)
            // const code = window.location.hash.substring(1).split('&').reduce((initial:any, item):any => {
            //     let parts:any = item.split('=');
            //     console.log(parts)
            //     initial[parts[0]] = decodeURIComponent(parts[1]);
            //     return initial;
            // })
            console.log(code)

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

        const tokenHeader: any = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        const clientCredentials = window.btoa(client_id + ':' + process.env.NEXT_SPOTIFY_CLIENT_SECRET);

        axios({
            method: 'post',
            url: spotifyTokenURL,
            headers: {
                'Authorization': 'Basic' + clientCredentials,
                'Content-Type': 'application/x-www-form-urlencoded'
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