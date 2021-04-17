import Head from 'next/head'
import React from 'react';
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
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Somthing will go here</h1>
        <h1>Data: {data}</h1>
      </main>

    </div>
  )
}
