import { gql } from '@apollo/client';

export const PURCHASE_CAR = gql`
  mutation PurchaseCar($userId: ID!, $carId: ID!) {
    purchaseCar(userId: $userId, carId: $carId) {
      id
      name
      purchasedCars {
        id
        make
        model
      }
    }
  }
`;

// Define other mutations as needed
