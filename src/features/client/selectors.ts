import * as R from 'ramda'
import { createSelector } from 'reselect'

import { ClientState } from './types'

const clientsSelector = (state: ClientState) => state.data

const sortByName = R.compose(R.sortWith([R.ascend(R.prop('name'))]))

export const getClients = createSelector(clientsSelector, (items) =>
  sortByName(items)
)
