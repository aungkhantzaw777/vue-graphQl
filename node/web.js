var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var db = require('./db.json')
const cors = require('cors')
// Construct a schema, using GraphQL schema language


var employeesData = db.employees
var schema = buildSchema(`
  type Query {
    hello: String
    employees: [Employee]
  }
  type Employee {
    id: ID
    Location: String
    Email: String
    Employees: String
    Phone: String
    Department: String
    EmployeeCode: String
    CustomTags: String
    Positions: String
    NRC: String
    Manager: String
    ManagerPosition: String
    JoinnedDate: String
    TerminateDate: String
  }
  type Mutation {
    updateEmployeeDepartment(id: ID!, department: String!): Employee
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  employees: () => {
    return employeesData
  },
  updateEmployeeDepartment: ({id, department}) => {
    employeesData = employeesData.map(v => {
      let intId = parseInt(id)
      let currentId = parseInt(v.id)
      if (intId === currentId) {
        return {...v, Department: department};
      }
      return v
    });
    let result = employeesData.filter(v => v.id === parseInt(id))
    return result[0];
  }
};

var app = express();
app.use(cors()) 
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');

