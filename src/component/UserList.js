import React from 'react';

const UserList = (props) => {
    console.log("component error", props.error)
    if (props.loading)
        return <h2>Loding....</h2>
    // else if (props.error)
    //     return <h2>{props.error}</h2>

    return (
        <>
            {props.users.map((user, index) => (
                <div className='col-11 col-md-6 col-lg-3 mx-0 mb-4'>
                    <div key={index} className='card p-0 overflow-hidden h-100 shadow'>
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