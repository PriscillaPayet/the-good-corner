import { gql } from '@apollo/client';

export const CREATE_AD = gql`
    mutation CreateAd($data: AdCreateInput!) {
        createAd(data: $data) {
            id
            title
        }
    }
`;

export const UPDATE_AD = gql`
    mutation UpdateAd($data: AdUpdateInput!, $updateAdId: ID!) {
        updateAd(data: $data, id: $updateAdId) {
            id
            title
            description
            price
            location
            picture
            owner
            category {
                id
                name
            }
            tags {
                id
                name
            }
        }
    }
`;

export const DELETE_AD = gql`
  mutation deleteAd($id: ID!) {
    deleteAd(id: $id) {
      id
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation createCategory($data: CategoryCreateInput!) {
    createCategory(data: $data) {
      id
    }
  }
`;


export const CREATE_TAG = gql`
  mutation createTag($data: TagCreateInput!) {
    createTag(data: $data) {
      id
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($data: UserCreateInput!) {
    createUser(data: $data) {
      id
      
   
     
    }
  }
`

export const SIGNIN = gql`
  mutation Signin($password: String!, $email: String!) {
    signin(password: $password, email: $email) {
      id
      email
      roles
    }
  }
`

export const SIGNOUT = gql`
mutation signout {
  signout
}
`;
