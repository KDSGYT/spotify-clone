import Head from 'next/head'
import React from 'react';
import LoginButton from '../components/LoginButton/LoginButton';
import styles from '../styles/Home.module.css'

export default function Home() {
  const [data, setData] = React.useState<String>()
  

  // testing data fetching for local api
  React.useEffect(() =>{
    fetch('/api/hello')
      .then((res) => res.json())
      .then(data => data.name)
      .then(name => setData(name))
      
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2>{data}</h2>
        <LoginButton />
      </main>

    </div>
  )
}
