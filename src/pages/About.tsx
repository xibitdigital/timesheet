import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useCollection } from 'react-firebase-hooks/firestore';
import { FIRESTORE } from '../shared/firebase.config';

export const About: React.FC = () => {
  const history = useHistory()
  const [test, setTest] = useState('')

  const [value, loading, error] = useCollection(
    FIRESTORE.collection('test'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <Fragment>
      <h1>About {test}</h1>
      <div>{loading ? 'loading' : 'ok!'}</div>
      {value && value.docs.map(doc => <div>{doc}</div>)}
      <button
        type="button"
        className="btn"
        cy-data="go-back-button"
        onClick={() => history.push('/')}
      >
        Go back
      </button>
    </Fragment>
  )
}
