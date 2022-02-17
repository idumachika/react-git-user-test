import React from 'react';

const SearchBox = (props) => {

    return (
        <div className='col-12 mb-5'>
            <div className='mb-3 col-4 mx-auto text-center'>
                <label className='form-lable h4'></label>
                <input
                    className='form-control'
                    value={props.value}
                    onChange={(event) => props.setSearchValue(event.target.value)}
                    placeholder='Type to search...'
                ></input>

            </div>

        </div>
    );
};

export default SearchBox;