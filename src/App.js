import { useState, useEffect } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import UserList from './component/UserList';
import SearchBox from './component/SearchBox';
import getUsersRequest from './services/user-service'
import debounce from 'lodash.debounce';


const App = () => {
  const [users, setUsers] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const getUser = async (searchValue, cb) => {
    const res = await getUsersRequest(searchValue);
    cb(res)
    console.warn('tag', '')

  };

  const debouncedGetUser = debounce((searchValue, cb) => {
    getUser(searchValue, cb);
  }, 500);

  useEffect(() => {
    debouncedGetUser(searchValue, res => {
      const { items } = res.data
      setUsers(items);
    })
  }, [searchValue]);


  return (
    <div className="py-4 container">
      <div className='row justify-content-center'>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
        <UserList users={users} />

      </div>

    </div>
  );
}

export default App;
