import axios from "axios";

import * as actionTypes from "./actionTypes";

export const getListingsByFiltersSuccess = (listings) => {
  console.log(listings);
  return{
    type: actionTypes.GET_LISTINGS_BY_FILTERS_SUCCESS,
    listings: listings
  }
}

export const getListingsByFiltersFail = (error) => {
  return{
    type: actionTypes.GET_LISTINGS_BY_FILTERS_FAIL,
    error: error
  }
}

export const getListingsByFilter = (price, bedrooms, gender, address) => {
    return dispatch => {
      
      let filterData = {price, bedrooms, gender, address};
      const url = "http://localhost:5000/api/listings/filters";
      axios
        .post(url, filterData)
        .then(response=> {
          dispatch(getListingsByFiltersSuccess(response.data.listings));
        })
        .catch(err => {
          console.log(err);
          dispatch(getListingsByFiltersFail(err));
        })
    }
};

