// Represents the Place response from foursquare api
export interface FsqStore {
    fsq_id: number,
    categories: FsqStoreCategory[],
    chains: FsqChain[],
    date_closed: string,
    decription: string,
    distance: number,
    email: string,
    fax: string,
    hours_popular: FsqHoursPopular[],
    link: string,
    location: FsqLocation,
    menu: string,
    name: string,
    photos: FsqPhoto[],
    popularity: number,
    price: number,
    rating: number,
    verified: boolean,
    website: string,
    timezone: string
}

export interface FsqLocation {
    address: string,
    country: string,
    cross_street: string,
    formatted_address: string,
    postcode: string,
    region: string,
    locality: string,
    neighborhood: string[]
}
export interface FsqPhoto {
    id: string,
    created_at: string,
    prefix: string,
    suffix: string,
    width: number,
    height: number,
    classifications: string[],
    tip: FsqTip
}

export interface FsqHoursPopular {
    close: string,
    day: number,
    open: string
}

export interface FsqStoreCategory {
    id: number,
    name: string,
    icon: FsqIcon
}

export interface FsqIcon {
    id: string,
    created_at: string,
    prefix: string,
    suffix: string,
    width: number,
    height: number,
    classifications: string[],
    tip: FsqTip
}

export interface FsqTip {
    id: string,
    created_at: string,
    text: string,
    url: string,
    photo: string,
    lang: string,
    agree_account: number,
    disagree_account: number
}

export interface FsqChain {
    id: string,
    name: string
}