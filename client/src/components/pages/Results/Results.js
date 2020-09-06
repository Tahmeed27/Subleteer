import React from "react"

import classes from './Results.module.css';
import NavBar from '../../UI/NavBar/NavBar';
import FilterSection from '../../UI/ResultsFilters/ResultsFilters';

const Results = (props) => {
    const info = props.location.state ? props.location.state.info : "";

    return (
        <>
            <NavBar/>
            <div className={classes.ResultsPage}>
                <FilterSection/>
                <div className={classes.Content}>
                    <p> Content</p>
                </div>
            </div>
        </>
    )
}

export default Results
