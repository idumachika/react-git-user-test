import { useState, useEffect } from 'react';
import UserList from './component/UserList';
import SearchBox from './component/SearchBox';
import getUsersRequest from './services/user-service'
import debounce from 'debounce-promise';

import Pagination from './component/Pagination';

const App = () => {
  const [users, setUsers] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [pageCount, setpageCount] = useState(0);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  let limit = 10;


  const getUser = async (searchValue, cb) => {
    if (!searchValue) {
      return
    }
    setLoading(true)
    await getUsersRequest(searchValue)
      .then((res) => {
        cb(res)
        setLoading(false)
        setError(false)
      }).catch((error) => {
        setLoading(false)
        setError(true)
      });
    console.warn("fetching")

  };




  const nextPage = async (pageNumber) => {
    let currentPage = pageNumber.selected + 1;
    await getUsersRequest(searchValue, currentPage)
      .then((res) => {
        const { items, } = res.data
        setUsers(items);
        setError(false)
      }).catch((error) => {
        setLoading(false)
        setError(true)
      })


  }

  const debouncedGetUser = debounce((searchValue, cb) => {
    getUser(searchValue, cb);
  }, 500);

  useEffect(() => {
    debouncedGetUser(searchValue, res => {
      const { items, total_count } = res.data
      setUsers(items);
      setpageCount(Math.ceil(total_count / limit))

    })
  }, [searchValue]);

  return (
    <div className="container">
      <main>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />

        <UserList loading={loading} error={error} users={users} />

        <Pagination nextPage={nextPage} pageCount={pageCount} />

      </main>
    </div>
  );
}

export default App;
