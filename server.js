
const { ApolloServer, gql } = require('apollo-server');
const { v4: uuidv4 } = require('uuid');

// Sample data
const cars = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    price: 25000,
  },
  {
    id: '2',
    make: 'honda',
    model: 'City',
    year: 2012,
    price: 150000,
  },
  // Add more car data here...
];

const users = [];

const typeDefs = gql`
  type Car {
    id: ID!
    make: String!
    model: String!
    year: Int!
    price: Float!
  }

  type User {
    id: ID!
    name: String!
    purchasedCars: [Car]!
  }

  type Query {
    cars: [Car]
  }

  type Mutation {
    purchaseCar(userId: ID!, carId: ID!): User
  }
`;

const resolvers = {
  Query: {
    cars: () => cars,
  },
  Mutation: {
    purchaseCar: (_, { userId, carId }) => {
      const user = users.find((u) => u.id === userId);
      const car = cars.find((c) => c.id === carId);

      if (!user || !car) {
        throw new Error('User or car not found');
      }

      user.purchasedCars.push(car);
      return user;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
