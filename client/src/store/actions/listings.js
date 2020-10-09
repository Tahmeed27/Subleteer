import axios from "axios";

import * as actionTypes from "./actionTypes";

export const getListingsByFiltersSuccess = (listings) => {
  console.log(listings);
  return {
    type: actionTypes.GET_LISTINGS_BY_FILTERS_SUCCESS,
    listings: listings,
  };
};

export const getListingsByFiltersFail = (error) => {
  return {
    type: actionTypes.GET_LISTINGS_BY_FILTERS_FAIL,
    error: error,
  };
};

export const getListingsByFilter = (price, bedrooms, gender, address) => {
  return (dispatch) => {
    let filterData = { price, bedrooms, gender, address };
    console.log(price,bedrooms, gender, address );
    
    const url = "/api/listings/filters";
    axios
      .post(url, filterData)
      .then((response) => {
        dispatch(getListingsByFiltersSuccess(response.data.listings));
      })
      .catch((err) => {
        console.log(err);
        dispatch(getListingsByFiltersFail(err));
      });
  };
};

export const getListingsByAddressStart = () => {
  return {
    type: actionTypes.GET_LISTINGS_BY_ADDRESS_START,
  };
};


export const getListingsByUserIDSuccess = listings => {
  return {
    type: actionTypes.GET_LISTINGS_BY_USERID_SUCCESS,
    listings: listings
  }
}

export const getListingsByUserIDFail = error => {
  return {
    type: actionTypes.GET_LISTINGS_BY_USERID_FAIL,
    error: error
  }
}

export const getListingsByUserID = (userID) => {
  return dispatch => {
    const url = "/api/listings/"+userID
    axios.get(url)
    .then(response => {
      dispatch(getListingsByUserIDSuccess(response.data.listings))
    })
    .catch(error => {
      dispatch(getListingsByUserIDFail(error))
    });
  }
}
export const getListingsByAddressSuccess = (listings) => {
  return {
    type: actionTypes.GET_LISTINGS_BY_FILTERS_SUCCESS,
    listings: listings,
  };
};

export const getListingsByAddressFail = (error) => {
  return {
    type: actionTypes.GET_LISTINGS_BY_FILTERS_FAIL,
    error: error,
  };
};

export const getListingsByAddress = (address) => {
  return (dispatch) => {
    dispatch(getListingsByAddressStart);
    const url = "/api/listings/address";
    axios
      .post(url, { address: address })
      .then((res) => {
        console.log(res);
        dispatch(getListingsByAddressSuccess(res.data.listings));
      })
      .catch((error) => {
        dispatch(getListingsByAddressFail(error));
      });
  };
};
