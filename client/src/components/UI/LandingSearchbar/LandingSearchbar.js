import React, {useState} from "react";
import SearchIcon from "@material-ui/icons/Search";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import classes from './LandingSearchbar.module.css';

const LandingSearchbar = () => {

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  });

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    console.log({name: value, ...latLng})
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className={classes.container}>
            <div className={classes.search}>
                <input {...getInputProps({ placeholder: "Where do you want to live?", className: classes.inputRoot} )} />
                <div className={classes.searchIcon}>
                <SearchIcon />
                </div>
            </div>
            <div>
              {suggestions.map(suggestion => {
                const style = {
                  width: "37rem",
                  padding: "1rem",
                  color: "black",   
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                };
                return (
                  <div {...getSuggestionItemProps(suggestion, { style, key: suggestion.placeId})}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}

export default LandingSearchbar;