import type { NextPage } from 'next'
import Head from 'next/head'
import Banner from '../components/bannex'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const onClickBanner = () => {
    console.log("Clicked on Banner Button");
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoissour</title>
        <meta name="description" content="Find coffee stores nearby" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner text='View stores nearby' onClickHandler={onClickBanner}/>
      </main>
    </div>
  )
}

export default Home
