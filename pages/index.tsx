import Head from 'next/head'
import React from 'react';
import LoginButton from '../components/LoginButton/LoginButton';
import styles from '../styles/Home.module.css'


export default function Home() {
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <LoginButton />
      </main>

    </div>
  )
}
