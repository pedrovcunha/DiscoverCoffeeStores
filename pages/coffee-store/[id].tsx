import { GetStaticPropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import coffeeStoresData from '../../data/coffee-stores.json';
import { Store } from '../../models/store';

interface Params {
    id: string
}

interface Props {
    coffeeStore : Store
}

export function getStaticProps (staticPropsContext: GetStaticPropsContext) {
    const params = staticPropsContext.params as object as Params;
    return {
        props: {
            coffeeStore: coffeeStoresData.find(coffeeStore => coffeeStore.id.toString() === params.id)
        }
    }
}

export function getStaticPaths() {
    const paths = coffeeStoresData.map(coffeeStore => {
        return {
            params: {
                id: coffeeStore.id.toString()
            }
        }
    });

    return {
        paths: paths,
        fallback: true // false or 'blocking'
    }
}

export default function CoffeeStore({coffeeStore}: Props){
    const router = useRouter();

    // if getStaticPaths fallback true, nextJs needs a moment to load from getStaticProps as the route has not been cached by getStaticPath
    if (router.isFallback) return <div>Loading...</div>;

    const {address, name, neighbourhood} = coffeeStore;
    return (
        <div>
            <Head>
                <title>{name}</title>
            </Head>
            Coffee Store Page {router.query.id} 
            <Link href="/">
                <a>Back to HOME</a>
            </Link>
            <p>{address}</p>
            <p>{name}</p>
            <p>{neighbourhood}</p>
        </div>
    );
}