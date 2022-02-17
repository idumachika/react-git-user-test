import React from 'react';

const UserList = (props) => {

    return (
        <>
            {props.users.map((user, index) => (
                <div className='col-11 col-md-6 col-lg-3 mx-0 mb-4'>
                    <div className='card p-0 overflow-hidden h-100 shadow' key={index}>
                        <img src={user.avatar_url} className='card-img-top' />
                        <div className='card-body'>
                            <h5 className='card-title'>{user.login}</h5>
                            <h5 className='card-title'>Score:{user.score}</h5>
                            <p className='card-text'>card desc</p>

                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default UserList;