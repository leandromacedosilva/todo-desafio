// import do módulo EXPRESS   
const express = require('express');

// import do módulo CORS
const cors = require('cors');

// import do módulo UUID library
const { v4: uuidV4 } = require('uuid');

/* atribuição das CONST app ao
 *  método EXPRESS()
 */
const app = express();

app.use(cors());

app.use(express.json());

/* definido o array onde as informações 
 * serão persisitdas em tempo de execução 
 * código  
 */
const users = [];

// checagem de conta por usuário
function checksExistsUserAccount(request, response, next) {
  // Complete aqui
  const { username } = request.headers;

  const user = users.find(
    (user) => user.username === username
    );

  if(!user){
    return response.status(400).json({ Warnning: 'User not found.'});
  }

  request.user = user;
  return next();  

};

app.post('/users', (request, response) => { 

  //const body = request.body;
  //console.log(body);

  const {
    name,
    username
  } = request.body;

  const userAlreadyExists = users.some(
    (user) => user.username === username
    );

    if(userAlreadyExists){
      return response.status(400).json({Warnning: 'User already exists in system.'});
    };

  const user = {
    id: uuidV4(),
    name,
    username,
    todos: []
  }

  users.push(user);

  return response.status(200).json({Warnning: 'User successfully  added to system'});
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