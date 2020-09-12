import React, {useState} from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import classes from './FormSearchbar.module.css';
import { TextField } from '@material-ui/core';




const FormSearchbar = ({handleSelect}) => {
    const finalHandler = value => {
        setAddress(value)
        handleSelect(value)
    }

  const [address, setAddress] = useState("");
  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={finalHandler}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className={classes.container}>
            <div className={classes.search}>
                <TextField fullWidth {...getInputProps({ placeholder: "Address", variant:"outlined", className: classes.inputRoot} )} />
            </div>
            <div>
              {suggestions.map(suggestion => {
                const style = {
                  padding: "1rem 0",
                  color: "black",   
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                };
                return (
                  <div key={suggestion.placeId} {...getSuggestionItemProps(suggestion, { style })}>
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

export default FormSearchbar;