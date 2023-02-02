import { GetStaticPropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import cls from 'classnames';
import { fetchCoffeeStores } from "../../lib/coffee-stores";
import { useContext, useEffect, useState } from "react";
import { IShop, Shop } from "../../models/shop";
import { AppContext } from "../../stores/context";
import { UpsertCoffeeStoreRequest, UpsertCoffeeStoreResponse } from "../../models/apis/coffeeStoreAirtable";
import useSWR from 'swr';

// Styles
import styles from '../../styles/coffee-store.module.css'; 

interface Params {
    id: string
}

interface Props {
    coffeeStore : Shop | null
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

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CoffeeStore(initialProps: Props){
    const router = useRouter();
    const dynamicId = router.query.id;
    const [coffeeStore, setCoffeeStore] = useState<IShop | null>(initialProps.coffeeStore)

    // if getStaticPaths fallback true, nextJs needs a moment to load from getStaticProps as the route has not been accessed/cached by getStaticPath yet
    if (router.isFallback) return <div>Loading...</div>;

    const { state: {coffeeStores} } = useContext(AppContext);

    const handleCreateCoffeeStore = async (data: Shop | null) => {
        try {                
            const response = await fetch('/api/createCoffeeStore', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...data as UpsertCoffeeStoreRequest})
            });
        } catch (error) {
            console.error("Error creating coffee store", error);
        }
    }
    // Allow us to retrieve any stores that have been loaded on client side (CSR) such as stores near me
    // when the selected store is not part of the SSG and came with getStaticProps
    useEffect(() => {
        if (!initialProps.coffeeStore && coffeeStores.length > 0) {
            const findCoffeeStoreById = coffeeStores.find(coffeeStore => coffeeStore.id.toString() === dynamicId) ?? null;
            if (findCoffeeStoreById) {
                setCoffeeStore(findCoffeeStoreById);
                handleCreateCoffeeStore(findCoffeeStoreById);
            }
        } else {
            handleCreateCoffeeStore(initialProps.coffeeStore);
        }
    }, [dynamicId, initialProps, initialProps.coffeeStore]);

    const {data, error} = useSWR(
        `/api/getCoffeeStoreById?id=${dynamicId}`,
        fetcher
    );

    useEffect(() => {
        if (data) {
            const store = data as UpsertCoffeeStoreResponse;
            setCoffeeStore(store.coffeStore as IShop)
        }
    }, [data]);

    const handleUpvodeButton = async (id: string, currentVotes: number) => {        
        try{
            const response = await fetch(`/api/coffeestore/${coffeeStore?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({voting: currentVotes + 1})
            });

            const updatedStore: IShop = new Shop({...coffeeStore, voting: voting+1});
            setCoffeeStore(updatedStore);
        } catch(error: any) {
            console.log("Error! ", JSON.stringify(error));
        }
    };

    if (error) {
        return (
            <div>
                Something went wrong retrieving coffee store page
            </div>
        );
    };

    const {address, neighbourhood, imgUrl ,name, voting, id} = coffeeStore !== null ? coffeeStore as IShop : new Shop();
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
                        <p className={styles.text}>{voting}</p>  
                    </div>
                    <button className={styles.upvoteButton} onClick={() => handleUpvodeButton(id, voting)}>Upvote</button>
                </div>
            </div>
        </div>
    );
}