import Head from 'next/head'
import React from 'react';
import styles from '../styles/Home.module.css'
import axios from 'axios'

const spotifyTokenURL = 'https://accounts.spotify.com/api/token';

export default function Home() {
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
    if(authCode.length>0){
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
    // axios.post(
    //   spotifyTokenURL,
    //   params:data,
    //   tokenHeader
    // )
    //   .then((res) => console.log(res))
    //   .catch(e => console.log(e))
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
      .then(res => console.log(res))
      .catch((e) => console.log(clientCredentials))
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <button>
          <a href={authLink}>Login</a>
          {/* <a onClick={() => window.location.href=authLink}>Login</a> */}
        </button>
      </main>

    </div>
  )
}
