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

const clientsRef = firebase.firestore().collection('clients')

export const postOneClient = functions.https.onRequest((request, response) => {
  const [name] = request.body

  const newClient: Client = {
    name,
    createdAt: new Date().toISOString(),
  }

  clientsRef
    .add(newClient)
    .then((data) => response.json({ ...newClient, id: data.id }))
    .catch((err: Error) => response.json(err))
})

export const getClients = functions.https.onRequest((request, response) => {
  clientsRef
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents.')
        return
      }
      response.json(snapshot)
    })
    .catch((err: Error) => response.json(err))
})

export const getClient = functions.https.onRequest((request, response) => {
  const [id] = request.body

  clientsRef
    .doc(id)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        console.log('No such document!')
      } else {
        console.log('Document data:', doc.data())
      }
      response.json(doc.data())
    })
    .catch((err: Error) => response.json(err))
})

export const deleteClient = functions.https.onRequest((request, response) => {
  const [id] = request.body

  clientsRef
    .doc(id)
    .delete()
    .then((doc) => {
      response.json(doc)
    })
    .catch((err: Error) => response.json(err))
})
