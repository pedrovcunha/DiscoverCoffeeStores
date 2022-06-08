import type { GetStaticPropsContext, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Banner from '../components/banner/banner';
import Card from '../components/card/card';
import coffeeStoresData from '../data/coffee-stores.json';
import { GetStaticProps } from 'next';
import { Store } from '../models/store';

// Styles
import styles from '../styles/Home.module.css';

interface Props {
  coffeeStores: Store[];
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      coffeeStores: coffeeStoresData
    }
  }
}

const Home: NextPage<Props> = (props) => {
  console.log("props", props);

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
        <div className={styles.heroImage}>
          <Image src='/static/hero-image.png' width={700} height={400}/>          
        </div>
        { props.coffeeStores.length > 0 &&
          <>
            <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((store: Store) => {
                return (
                  <Card
                    key={store.id}
                    name={store.name}
                    imgUrl={store.imgUrl}
                    href={`/coffee-store/${store.id}`}
                    className={styles.card} />
                );
              })}
            </div>
          </> 
        }       
      </main>
    </div>
  )
}

export default Home
