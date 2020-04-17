import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth0 } from '../shared/auth-spa'
import { useEffect, useState } from 'react'
import { JwtGet } from '../shared/axios.utils'

export const About: React.FC = () => {
  const history = useHistory()
  const { isAuthenticated, getIdTokenClaims } = useAuth0()
  const [test, setTest] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      const getTestAPI = async () => {
        const token = await getIdTokenClaims()
        const test = await JwtGet<{status: string}>('/api/test/protected', token)
        setTest(test.data.status)
      }
      getTestAPI();
    }
  }, [isAuthenticated])

  return (
    <Fragment>
      <h1>About {test}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        possimus doloribus error cumque autem asperiores, ullam deserunt quidem
        omnis doloremque itaque eius eaque sint facilis unde tenetur reiciendis
        aliquam soluta?
      </p>
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
