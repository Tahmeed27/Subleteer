import React from "react"

const Results = (props) => {
    const info = props.location.state ? props.location.state.info : ""
    console.log(info)

    return (
        <h1>Results</h1>
    )
}

export default Results
