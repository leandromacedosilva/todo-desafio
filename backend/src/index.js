const express = require('express');
const cors = require('cors');

const { v4: uuidV4 } = require('uuid');

const app = express();

app.use(cors());

app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  // Complete aqui
}

app.post('/accounts/users', (request, response) => {

  const body = request.body;
  
  return response.json({data: body});

  const { name, username } = request.body;

  const userAlreadyExists = users.some(
    (users) => users.username === username
  );

  if(userAlreadyExists) {
    return response.status(400).send('User already exists in system!');
  }

  const users = {
    id: uuidV4(),
    name,
    username,
    todos: []
  }

  users.push({users});
  return response.status(200).json({warning: 'User included in account with success!'});
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;