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
                <FilterSection address="200 University Avenue West, Waterloo"/>
                <div className={classes.Content}>
                    {props.listings.forEach(listing => {
                        return (<p key={listing._id}>{listing.title}</p>);
                    })}
                </div>
            </div>
        </>
    )
}

const mapDispatchToProps = state => { 
    return{
        listings: state.listings.listings
    };
}

export default connect(mapDispatchToProps, null)(Results);
