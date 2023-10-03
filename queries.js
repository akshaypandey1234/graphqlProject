import { gql } from '@apollo/client';

export const GET_CARS = gql`
  query GetCars {
    cars {
      id
      make
      model
      year
      price
    }
  }
`;

// Define other queries as needed
