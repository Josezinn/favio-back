import { test } from '@japa/runner'

test.group('Deletar favorito', () => {
  test('deletar favorito existente',async ({client}) =>{
    //Deletar favorito com ID 1
    const resposta=await client.delete('/favoritos/1')
    resposta.assertStatus(200)
  })

  test('deletar favorito inexistente',)
})
