import React from "react"
import {connect} from 'react-redux';
import classes from './Results.module.css';
import NavBar from '../../UI/NavBar/NavBar';
import FilterSection from '../../UI/ResultsFilters/ResultsFilters';

const Results = (props) => {
    const info = props.location.state ? props.location.state.info : "";

    return (
        <>
            <NavBar/>
            <div className={classes.ResultsPage}>
                <FilterSection address={info}/>
                <div className={classes.Content}>
                    
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => { 
    return{
        listings: state.listings.listings
    };
}

export default connect(mapStateToProps, null)(Results);
