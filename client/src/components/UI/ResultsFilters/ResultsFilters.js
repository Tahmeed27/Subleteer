import React, {useState} from 'react';
import classes from './ResultsFilters.module.css';
import Slider from '@material-ui/core/Slider';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const ResultsFilters = () => {

    const [gender, setGender] = useState('co-ed');
    const [price, setPrice] = useState(500);
    const[bedrooms, setBedrooms] = useState(1);

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    function handleBedroomChange(value) {
        setBedrooms(value);
    }

    function handlePriceChange(value) {
        setPrice(value);
    }

    const muiTheme = createMuiTheme({
        overrides:{
          MuiSlider: {
            thumb:{
            color: "orange",
            },
            track: {
              color: 'orange'
            },
            rail: {
              color: 'black'
            }
          },
          primary: {
              main: "#ffb42c"
          }
      }
      });

    const RentMarks = [
        {
            value: 100,
            label: '$100',
        },
        {
            value: 3000,
            label: '$3000',
        },
    ];

    const BedroomMarks = [
        {
            value: 1,
            label: '1',
        },
        {
            value: 10,
            label: '10',
        },
    ];

    const handleSearchFilters = () => {
        
    }

    return (
        <div className={classes.FilterSection}>
            <h4>Max Rent</h4>
            <br/>
            <div style={{width:"80%", margin: "10px 20px"}}>
                <ThemeProvider theme={muiTheme}>
                    <Slider
                        defaultValue={500}
                        getAriaValueText={handlePriceChange}
                        aria-labelledby="discrete-slider-always"
                        step={100}
                        marks={RentMarks}
                        max={3000}
                        min={100}
                        valueLabelDisplay="on"
                    />
                </ThemeProvider>
            </div>
            <h4>Bedrooms</h4>
            <br/>
            <div style={{width:"80%", margin: "10px 20px"}}>
                <ThemeProvider theme={muiTheme}>
                    <Slider
                        defaultValue={2}
                        getAriaValueText={handleBedroomChange}
                        aria-labelledby="discrete-slider-always"
                        step={1}
                        marks={BedroomMarks}
                        max={10}
                        min={1}
                        valueLabelDisplay="on"
                    />
                </ThemeProvider>
            </div>
            <h4>Gender</h4>
            <div style={{marginLeft: "20px"}}>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="Bedrooms" name="bedroom" value={gender} onChange={handleGenderChange}>
                        <FormControlLabel value="Male only" control={<Radio />} label="Male only" />
                        <FormControlLabel value="Female only" control={<Radio />} label="Female only" />
                        <FormControlLabel value="co-ed" control={<Radio/>} label="Co-ed" />
                    </RadioGroup>
                </FormControl>
            </div>
            <button 
                className={classes.SearchButton}
                onClick = {handleSearchFilters}
            >
                Search
            </button>
        </div>
    );
};

export default ResultsFilters;