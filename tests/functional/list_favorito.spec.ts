import { test } from '@japa/runner'

test.group('List favoritos', () => {
  test('exibir favoritos', async ({client})=>{
    const resposta = await client.get('/favoritos')
    resposta.assertStatus(200)
    resposta.assertBodyContains([])
  })
  //TDD
  test('exibir favorito com id', async ({client})=>{
    const resposta = await client.get('/favoritos')
    resposta.assertStatus(200)
    resposta.assertBodyContains({nome: "google"})
  })
})
