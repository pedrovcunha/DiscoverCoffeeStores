import type { GetStaticPropsContext, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Banner from '../components/banner/banner';
import Card from '../components/card/card';
import { GetStaticProps } from 'next';
import { fetchCoffeeStores } from '../lib/coffee-stores';
import { IShop, Shop } from '../models/shop';
import useTrackLocation from '../hooks/use-track-location';
import { useContext, useEffect, useState } from 'react';

// Styles
import styles from '../styles/Home.module.css';
import { AppContext } from '../stores/context';
import { Types } from '../stores/reducers';

interface Props {
  coffeeStores: IShop[];
}

// pre-render this page at build time using the props returned by getStaticProps
export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores: coffeeStores
    }
  }
}

const Home: NextPage<Props> = (props) => {
  const { handleTrackLocation, locationErrorMsg, isFindinglocation } = useTrackLocation();
  // const [storesNearby, setStoresNearby] = useState<IShop[]>([]);
  const [storesNearbyError, setStoresNearbyError] = useState('');
  const { state:{ latLong, coffeeStores: storesNearby }, dispatch } = useContext(AppContext);

  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
  }

  useEffect(() => {
    const fetchStores = async (latLong: string) => {
      let stores: IShop[] = [];
      try{
        stores = await fetchCoffeeStores(latLong, 12);        
        // setStoresNearby(stores);
        dispatch({
          type: Types.SetCoffeeStores,
          payload: {
            coffeeStores: stores
          }
        })
      } catch (error: any) {
        setStoresNearbyError(error.message);
      }
      return stores;
    }
    if (latLong) fetchStores(latLong);
  }, [latLong])

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoissour</title>
        <meta name="description" content="Find coffee stores nearby" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner 
          text={ isFindinglocation ? 'Locating...' : 'View stores nearby' } 
          onClickHandler={handleOnBannerBtnClick}
        />
        {locationErrorMsg && <p>{`Something went wrong: ${locationErrorMsg}`}</p>}
        {storesNearbyError && <p>{`Something went wrong: ${storesNearbyError}`}</p>}
        <div className={styles.heroImage}>
          <Image src='/static/hero-image.png' width={700} height={400}/>          
        </div>

        {/* Stores Nearby Me */}
        { storesNearby.length > 0 &&
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Stores Nearby Me</h2>
            <div className={styles.cardLayout}>
              {storesNearby.map((store: Shop) => {
                const franchiseStoresWithSameName = storesNearby.filter(s => s.name === store.name);
                const storeName = franchiseStoresWithSameName.length > 1
                  ? `${store.name} - ${store.address}`
                  : store.name;
                return (
                  <Card
                    key={store.id}
                    name={storeName}
                    imgUrl={store.imgUrl}
                    href={`/coffee-store/${store.id}`}
                    className={styles.card} />
                );
              })}
            </div>
          </div> 
        }       

        {/* Default Stores - Server Side Render */}
        { props.coffeeStores.length > 0 &&
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Adelaide CBD Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((store: Shop) => {
                const franchiseStoresWithSameName = props.coffeeStores.filter(s => s.name === store.name);
                const storeName = franchiseStoresWithSameName.length > 1
                  ? `${store.name} - ${store.address}`
                  : store.name;
                return (
                  <Card
                    key={store.id}
                    name={storeName}
                    imgUrl={store.imgUrl}
                    href={`/coffee-store/${store.id}`}
                    className={styles.card} />
                );
              })}
            </div>
          </div> 
        }
      </main>
    </div>
  )
}

export default Home;

