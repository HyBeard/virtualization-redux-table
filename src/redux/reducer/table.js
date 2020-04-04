import { TABLE_CHANGE_OFFSET } from '../../config/constants'

const defaultState = {
  offsetLeft: 0
}

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case TABLE_CHANGE_OFFSET:
      return { ...state, offsetLeft: payload }
    default:
      return state
  }
}