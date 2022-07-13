// import do módulo EXPRESS   
const express = require('express');
 
 // import do módulo CORS middleware
const cors = require('cors');

// import do módulo UUID library
const { v4: uuidV4 } = require('uuid');

/* atribuição da CONST app ao
 *  método EXPRESS()
 */
const app = express();


app.use(cors());

app.use(express.json());

/* definido o array onde as informações 
 * serão persistidas em tempo de execução 
 * do código  
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
  const { user } = request;
  return response.status(200).json({Warnning: user.todos});
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const { user } = request;
  const { title, deadline } = request.body;

  const todo = {
    id: uuidV4,
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  } 

  user.todos.push(todo);
  return response.status(201).json(todo);
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const { user } = request;
  const { id } = request.params;
  const { title, deadline } = request.body;

  const todos = user.todos.find(todo => todo.id === id);

  if(!todo){
    return response.status(400).json({ Warnning: 'Todo does not exists.'});
  }

  todo.title = title;
  todo.deadline = new Date(deadline);

  return response.json(todo);
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const { user } = request;
  const { id  } = request.params;

  const todo = user.todos.find(todo => todo.id === id);

  if(!todo) {
    return response.status(400).json({ Warnning: 'Todo does not exists.'});
  }
  
  todo.done = true;
  return response.json(todo);

});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const { user } = request;
  const { id } = request.params;

  const todoIndex = user.todos.findIndex(todo => todo.id === id);

  if(todoIndex === -1){
    return response.status(400).json({ Warnning: 'Todo does not exists.'});
  }

  user.todos.splice(todoIndex, 1);
  return response.status(204).send();
  
});

module.exports = app;