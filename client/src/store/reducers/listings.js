import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  listings: [],
  error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.GET_LISTINGS_BY_FILTERS_SUCCESS:
        return updateObject(state, {listings: action.listings});
      case actionTypes.GET_LISTINGS_BY_FILTERS_FAIL:
        return updateObject(state, {error: action.error});
      case actionTypes.GET_LISTINGS_BY_USERID_SUCCESS:
        return updateObject(state, {listingsByUserID: action.listings});
      case actionTypes.GET_LISTINGS_BY_USERID_FAIL:
        return updateObject(state, {error: action.error});
        case actionTypes.GET_LISTINGS_BY_FILTERS_SUCCESS:
      return updateObject(state, { listings: action.listings });
    case actionTypes.GET_LISTINGS_BY_ADDRESS_START:
      return updateObject(state, { error: null, listings: null });
    case actionTypes.GET_LISTINGS_BY_ADDRESS_SUCESS:
      return updateObject(state, { listings: action.listings });
    case actionTypes.GET_LISTINGS_BY_ADDRESS_FAIL:
      return updateObject(state, { listings: null, error: action.error });
      default:
        return state;
    }
};

export default reducer;
