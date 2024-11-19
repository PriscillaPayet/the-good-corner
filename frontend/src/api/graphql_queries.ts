import { gql } from '@apollo/client';

export const GET_ADSCARDS = gql`
    query RecentAds {
        ads {
            id
            title
            description
            price
            picture
        
        }
    }
`;

export const GET_AD = gql`
    query Ad($adId: ID!) {
        ad(id: $adId) {
            title
            picture
            price
            owner
            created_at
            ownerEmail
            description
            tags {
             id 
             name
             }
             category{
             id
             name}
        }
    }
`;

export const GET_CATEGORIES = gql `
    query Categories {
        categories {
            id
            name
        }
    }
`;

export const GET_CATEGORY = gql `
    query Category($categoryId: ID!) {
        category(id: $categoryId) {
            id
            name
        }
    }
`;

export const GET_CATEGORYADS = gql `
    query Ads($categoryId: ID!) {
        category(id: $categoryId) {
            ads {
                    id
                    title
                    description
                    price
                    picture
            }
        }
    }
`;

export const GET_TAGS = gql `
    query Tags {
        tags {
            name
            id
        }
    }
`;

