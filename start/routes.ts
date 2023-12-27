/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
const favoritos = [{ id: 1, nome: 'Google', url: "http://www.google.com", importante: true }]

Route.get('/', async () => {
  return { app: 'favio-back' }
})


Route.get('/favoritos', async () => {
  return favoritos
})

Route.get('/favoritos/:id', async ({ params, response }) => {
  console.log(params.id)
  let favoritoEncontrado = favoritos.find((favorito) => favorito.id == params.id)
  console.log(favoritoEncontrado)
  if (favoritoEncontrado == undefined)
  return response.status(404)
  return favoritoEncontrado
})

Route.get('/favoritos/:nome', async ({ params }) => {
  return [{ id: 1, nome: params.nome, url: "http://www.google.com", importante: true }]
})

Route.post('/favoritos', async ({request,response})=>{
  const {nome,url,importante}=request.body()
  if(nome==undefined || url==undefined|| importante==undefined){
    return response.status(400)
  }
  //criar favorito
  const newFavorito={id:favoritos.length+1,nome,url,importante}
  favoritos.push(newFavorito)
  return response.status(201).send(newFavorito)
})

//put
Route.put('/favoritos/:id', async ({request, params, response}) => {
  const {nome, url, importante}= request.body()
    let favoritoEncontrado = favoritos.find((favorito) => favorito.id == params.id)
    if (!favoritoEncontrado)
      return response.status(404)
    favoritoEncontrado.nome=nome
    favoritoEncontrado.url=url
    favoritoEncontrado.importante=importante

    favoritos[params.id]=favoritoEncontrado
    return response.status(200).send(favoritoEncontrado)
})

//delete 
Route.delete('/favoritos/:id', async ({ params, response }) => {
  const favoritoIndex = favoritos.findIndex((favorito) => favorito.id == params.id);
  if (favoritoIndex !== -1) {
    favoritos.splice(favoritoIndex, 1);
    return response.status(200).send({ message: 'Favorito deletado com sucesso' });
  } else {
    return response.status(400).send({ message: 'Favorito inexistente' });
  }
});

Route.resource('favoritao','FavoritosController').apiOnly()

//------------------------Routes Usuario--------------------------//

const usuarios = [{ id: 1, nome: 'Jose', cpf: "999.999.999-99", senha: "Senha999"}]

  //Listar Usuarios
Route.get('/usuarios', async () => {
  return usuarios
})

  //Criar Usuario com campo faltante
Route.post('/usuarios', async ({request,response})=>{
  const {nome,cpf,senha}=request.body()
  if(nome==undefined || cpf==undefined|| senha==undefined){
    return response.status(400)
  }

  //Criar Usuario
  const newUsuario={id:favoritos.length+1,nome,cpf,senha}
  usuarios.push(newUsuario)
  return response.status(201).send(newUsuario)
})

//Atualizar Usuario
Route.put('/usuarios/:id', async ({request, params, response}) => {
  const {nome, cpf, senha}= request.body()
    let usuarioEncontrado = usuarios.find((usuario) => usuario.id == params.id)
    if (!usuarioEncontrado)
      return response.status(404)
    usuarioEncontrado.nome=nome
    usuarioEncontrado.cpf=cpf
    usuarioEncontrado.senha=senha

    usuarios[params.id]=usuarioEncontrado
    return response.status(200).send(usuarioEncontrado)
})

//Deletar Usuario 
Route.delete('/usuarios/:id', async ({ params, response }) => {
  const usuarioIndex = usuarios.findIndex((usuario) => usuario.id == params.id);
  if (usuarioIndex !== -1) {
    usuarios.splice(usuarioIndex, 1);
    return response.status(200).send({ message: 'Usuário deletado com sucesso' });
  } else {
    return response.status(400).send({ message: 'Usuário inexistente' });
  }
});

Route.resource('usuario','UsuariosController').apiOnly()