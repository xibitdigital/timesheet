import * as R from 'ramda'
import { createSelector } from 'reselect'

import { ClientsState } from './types'

const clientsSelector = (state: ClientsState) => state.data

const sortByName = R.compose(R.sortWith([R.ascend(R.prop('name'))]))

export const getClients = createSelector(clientsSelector, (items) =>
  sortByName(items)
)
