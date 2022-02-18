import React from 'react';

const SearchBox = (props) => {

    return (
        <div className='search-section'>
            <label className='form-lable h4'></label>
            <input
                className='form-control'
                value={props.value}
                onChange={(event) => props.setSearchValue(event.target.value)}
                placeholder='Type to search...'
            ></input>
        </div>
    );
};

export default SearchBox;