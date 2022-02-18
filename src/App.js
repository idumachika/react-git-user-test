import { useState, useEffect } from 'react';
import UserList from './component/UserList';
import SearchBox from './component/SearchBox';
import getUsersRequest from './services/user-service'
import debounce from 'lodash.debounce';
import Pagination from './component/Pagination';

const App = () => {
  const [users, setUsers] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [pageCount, setpageCount] = useState(0);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  let limit = 10;


  const getUser = async (searchValue, cb) => {
    await getUsersRequest(searchValue)
      .then((res) => {
        cb(res)
        setLoading(false)
      }).catch((error) => {
        console.log("error", error.response)
        setError(error.response.data.message)
        setLoading(false)
      });
    console.warn('tag', '')

  };

  const nextPage = async (pageNumber) => {
    let currentPage = pageNumber.selected + 1;
    await getUsersRequest(searchValue, currentPage)
      .then((res) => {
        const { items, } = res.data
        setUsers(items);
      }).catch((error) => {
        setError(error.response.data.message)
      })


  }

  const debouncedGetUser = debounce((searchValue, cb) => {
    getUser(searchValue, cb);
  }, 300);

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

        <UserList users={users} loading={loading} error={error} />

        <Pagination nextPage={nextPage} pageCount={pageCount} />

      </main>
    </div>
  );
}

export default App;
