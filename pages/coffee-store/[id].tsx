import { GetStaticPropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import cls from 'classnames';
import { fetchCoffeeStores } from "../../lib/coffee-stores";
import { useContext, useEffect, useState } from "react";
import { IShop, Shop } from "../../models/shop";

import styles from '../../styles/coffee-store.module.css'; 
import { AppContext } from "../../stores/context";

interface Params {
    id: string
}

interface Props {
    coffeeStore : IShop | null
}

export async function getStaticProps (staticPropsContext: GetStaticPropsContext) {
    const coffeeStores = await fetchCoffeeStores();
    const params = staticPropsContext.params as object as Params;
    const findCoffeeStoreById = coffeeStores.find(coffeeStore => coffeeStore.id.toString() === params.id);
    return {
        props: {
            coffeeStore: findCoffeeStoreById ?? null
        }
    }
}

export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStores();
    const paths = coffeeStores.map(coffeeStore => {
        return {
            params: {
                id: coffeeStore.id
            }
        }
    });

    return {
        paths: paths,
        fallback: true // false or 'blocking'
    }
}

export default function CoffeeStore(initialProps: Props){
    const [vote, setVote] = useState(0);
    const router = useRouter();
    const dynamicId = router.query.id;
    const [coffeeStore, setCoffeeStore] = useState<IShop | null>(initialProps.coffeeStore)

    // if getStaticPaths fallback true, nextJs needs a moment to load from getStaticProps as the route has not been accessed/cached by getStaticPath yet
    if (router.isFallback) return <div>Loading...</div>;

    const { state: {coffeeStores} } = useContext(AppContext);

    // Allow us to retrieve any stores that have been loaded on client side (CSR) such as stores near me
    // when the selected store is not part of the SSG and came with getStaticProps
    useEffect(() => {
        if (!initialProps.coffeeStore && coffeeStores.length > 0) {
            const findCoffeeStoreById = coffeeStores.find(coffeeStore => coffeeStore.id.toString() === dynamicId) ?? null;
            setCoffeeStore(findCoffeeStoreById);
        }
    }), [dynamicId];

    const handleUpvodeButton = () => {
        setVote(vote + 1);
    }

    const {address, neighbourhood, imgUrl ,name} = coffeeStore !== null ? coffeeStore as IShop : new Shop();
    return (
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link href="/">
                            <a>← Back to HOME</a>
                        </Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>
                            {name}
                        </h1>
                    </div>
                    <Image 
                        src={imgUrl ? imgUrl : "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"} 
                        width={600} 
                        height={360} 
                        className={styles.storeImg} 
                        alt={name}
                    />
                </div>
                <div className={cls("glass", styles.col2)}>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/places.svg" width={34} height={34} className={styles.storeImg} alt={name}/>
                        <p className={styles.text}>{address}</p>  
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/nearMe.svg" width={34} height={34} className={styles.storeImg} alt={name}/>
                        <p className={styles.text}>{neighbourhood}</p>  
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/star.svg" width={34} height={34} className={styles.storeImg} alt={name}/>
                        <p className={styles.text}>{vote}</p>  
                    </div>
                    <button className={styles.upvoteButton} onClick={handleUpvodeButton}>Upvote</button>
                </div>
            </div>
        </div>
    );
}