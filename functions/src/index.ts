import * as functions from 'firebase-functions'
import * as firebase from 'firebase-admin'

firebase.initializeApp()

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  firebase
    .firestore()
    .collection('items')
    .onSnapshot((data) => {
      response.send(data.docs[0].id)
    })
})

export type Client = {
  id?: string
  name: boolean
  createdAt: string
}

export const postOneClient = functions.https.onRequest((request, response) => {
  const [name] = request.body

  const newClient: Client = {
    name,
    createdAt: new Date().toISOString(),
  }

  firebase
    .firestore()
    .collection('clients')
    .add(newClient)
    .then((data) => response.json({ ...newClient, id: data.id }))
    .catch((err: Error) => response.json(err))
})
