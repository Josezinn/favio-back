import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Usuario from "App/Models/Usuario";
import { DateTime } from 'luxon';

export default class UsuariosController {

    public async index({}: HttpContextContract) {
        return Usuario.all()
      }
        
    public async store({response, request}: HttpContextContract) {
        const {nome,cpf,senha}=request.body()
            if(nome==undefined || cpf==undefined || senha==undefined){
                return response.status(400)
            }
        //Criptografando senha com MD5
        var md5 = require('md5');
        const senhaMD5 = md5(senha);  

        //Criar Usuario
        const newUsuario={nome,cpf,senha:senhaMD5}
        Usuario.create(newUsuario)
        return response.status(201).send(newUsuario)
    }

    public async show({params, response}: HttpContextContract) {
        let UsuarioEncontrado=await Usuario.findByOrFail('id', params.id)
        if (UsuarioEncontrado == undefined)
        return response.status(404)
        return UsuarioEncontrado
    }
    
    //Atualizar Usuario
    public async update({request, params, response}: HttpContextContract) {
        const {nome, cpf, senha}= request.body()
        let UsuarioEncontrado=await Usuario.findByOrFail('id', params.id)
        if (!UsuarioEncontrado)
          return response.status(404)
        UsuarioEncontrado.nome=nome
        UsuarioEncontrado.cpf=cpf
        UsuarioEncontrado.senha=senha
    
        await UsuarioEncontrado.save()
        await UsuarioEncontrado.merge({updatedAt:DateTime.local()}).save()
        return response.status(200).send(UsuarioEncontrado)
      }

    //Deletar Usuario
    public async destroy({response, params}: HttpContextContract) {
        let UsuarioEncontrado=await Usuario.findByOrFail('id', params.id)
        if (!UsuarioEncontrado){
            return response.status(400);
        }else {
            await UsuarioEncontrado.delete()
            return response.status(204)
        }
    }
}