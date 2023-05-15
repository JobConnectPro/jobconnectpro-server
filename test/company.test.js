// const app = require('../app.js')
// const request = require('supertest')

// test('Get all todos', async () => {
//   try {
//     const response = await request(app).get('/todos').expect('Content-Type', /json/).expect(200)
//     expect(response.body[0].title).toBe('Mengerjakan Homework Rakamin')
//   } catch (error) {
//     throw new Error(error)
//   }
// })

// test('Get todo by id', async () => {
//   try {
//     const response = await request(app).get('/todos/2').expect('Content-Type', /json/).expect(200)
//     expect(response.body.title).toBe('Mengerjakan Exam Rakamin')
//   } catch (error) {
//     throw new Error(error)
//   }
// })

// test('Create todo', async () => {
//   try {
//     const todo = { title: 'Monitoring Tender' }
//     const response = await request(app)
//       .post('/todos')
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .send(todo)
//     expect(response.body.title).toBe('Monitoring Tender')
//   } catch (error) {
//     throw new Error(error)
//   }
// })

// describe('DELETE /todos/:id', () => {
//   test('Delete todo', async () => {
//     try {
//       const response = await request(app).delete('/todos/13').expect(200)
//       expect(response.body.message).toBe('Successfully deleted todo!')
//     } catch (error) {
//       throw new Error(error)
//     }
//   })

//   test('Delete todo 404 Not Found', async () => {
//     try {
//       const response = await request(app).delete('/todos/12').expect(404)
//       expect(response.body.message).toBe('Todos not found!')
//     } catch (error) {
//       throw new Error(error)
//     }
//   })
// })
