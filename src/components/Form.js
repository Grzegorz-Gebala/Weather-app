import React from "react";

const Form = props => {
    return (
        <form onSubmit={props.submit}>
            <input 
                type="text" 
                value={props.value}
                onChange={props.change} //tutaj została przekazana metoda z App.js
                placeholder="city?"
            />
            <button>Search city</button>
        </form> 
    )
}

export default Form