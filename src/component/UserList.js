import React from 'react';

const UserList = ({ loading, error, users, }) => {

    if (loading) {
        return <div>Loading...</div>
    } else if (error) {
        return <div>Error Occurred fetching data. Please try again later!</div>
    } else {
        return (
            <section className='cards'>
                {
                    users.map((user, index) => (
                        <article className='card' key={index}>
                            <img
                                src={user.avatar_url}
                                alt="photo"
                            />

                            <div className="info">
                                <h3>{user.login}</h3>
                                <div className="card-footer">
                                    <p>Score: {user.score}</p>
                                    <a href={user.html_url}>{user.html_url}</a>
                                </div>
                            </div>
                        </article>

                    ))}
            </section>
        );
    }



};

export default UserList;