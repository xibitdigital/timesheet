import React, { Fragment } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useHistory } from 'react-router-dom';
import { COLLECTIONS, FIRESTORE } from '../shared/firebase.config';

export const About: React.FC = () => {
  const history = useHistory()

  const [value, loading, error] = useCollection(
    FIRESTORE.collection(COLLECTIONS.ITEMS),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <Fragment>
      <h1>About</h1>
      <div>{loading ? 'loading' : 'ok!'}</div>
      <ul>
      {!loading && value && value.docs.map(doc => <li key={doc.id}>{doc.id}</li>)}
      </ul>
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
