import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CARS } from '../graphql/queries'; // Import your GraphQL queries and mutations

import { PURCHASE_CAR } from '../graphql/mutations';
import '../styles.css';


function Home() {
  const { loading, error, data } = useQuery(GET_CARS);
  const [purchaseCar] = useMutation(PURCHASE_CAR);
  const [cart, setCart] = useState([]);
  const [userDetails, setUserDetails] = useState({ id: '', name: '', email: '' });


  const handleBuy = (carId) => {
    purchaseCar({
      variables: {
        userId: userDetails.id, // Use the user's ID
        carId,
      },
    })
      .then(() => {
        setCart([...cart, carId]);
        alert('Car added to cart!');
      })
      .catch((err) => {
        console.error(err);
        alert('Error: Unable to add the car to the cart.');
      });
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Welcome to our Car Buying Website 🚗</h2>
      <p>Discover a wide range of cars for sale.</p>
      <p>Start browsing and find your dream car today!</p>

      <div className="car-list">
        {data.cars.map(({ id, make, model, year, price, photo }) => (
          <div key={id} className="car-card">
            <img src={photo} alt={`${make} ${model}`} className="car-image" />
            <h3>
              {make} {model}
            </h3>
            <p>Year: {year}</p>
            <p>Price: ${price}</p>
            <button
              onClick={() => handleBuy(id)}
              disabled={cart.includes(id)}
            >
              {cart.includes(id) ? 'Added to Cart' : 'Buy'}
            </button>
          </div>
        ))}
      </div>

      <div className="user-details">
        <h3>Enter Your Details:</h3>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={userDetails.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={userDetails.email}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default Home;
