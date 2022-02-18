import React from 'react';

const UserList = (props) => {
    console.log("component error", props.error)
    if (props.loading) <h2>Loding....</h2>

    return (
        <section className='cards'>
            {props.users.map((user, index) => (
                <article className='card'>
                    <img
                        src={user.avatar_url}
                        alt="photo"
                    />

                    <div className="info">
                        <h3>{user.login}</h3>
                        <div className="card-footer">
                            <p>Score: {user.score}</p>
                            <a href={user.url}>{user.url}</a>
                        </div>
                    </div>
                </article>

            ))}
        </section>
    );


};

export default UserList;