import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CARS } from '../graphql/queries';

function CarList() {
  const { loading, error, data } = useQuery(GET_CARS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.cars.map(({ id, make, model, year, price }) => (
        // Display car information here
      ))}
    </div>
  );
}

export default CarList;
