// Nos traemos la funciónn que utilizaremos de la dependencia de graphql
const { buildSchema } = require("graphql")

// Utilizamos este método para crear nuestros esquemas de la siguiente forma
module.exports = buildSchema(`

  type Product {
    _id: ID!
    title: String!
    description: String!
    price: String!
    image: String!
    createdAt: String!
  }

  input ProductInput {
    title: String!
    description: String!
    price: String!
    image: String!
  }

  type User {
    _id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    cuenta: String
  }

  input UserInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
    cuenta: String
  }

  type Sale {
    _id: ID!
    numSale: String!
    description: String!
    note: String!
    total: String!
    state: String!
    createdAt: String!
  }

  input SaleInput {
    numSale: String!
    description: String!
    note: String!
    total: String!
    state: String!
  }


  type Query {
    products:[Product!]
    users:[User!]
    sales:[Sale!]
    searchCliente:[User!] 
  }

  type Mutation {
    createProduct(product:ProductInput): Product,
    deleteProduct(_id: String): String,
    updateProduct(_id: String, price: String): String,
    createUser(user: UserInput): User,
    deleteUser(_id: String): String,
    createSale(sale: SaleInput): Sale,
    login(email: String!, password: String!): User
    deleteSale(_id: String): String,
    updateSale(_id: String, state: String): String
    
  }
  schema {
    query: Query
    mutation: Mutation
  }
`)