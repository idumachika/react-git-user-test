import { useState, useEffect } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import UserList from './component/UserList';
import SearchBox from './component/SearchBox';
import getUsersRequest from './services/user-service'
import debounce from 'lodash.debounce';
import ReactPaginate from "react-paginate";



const App = () => {
  const [users, setUsers] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [pageCount, setpageCount] = useState(0);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  let limit = 10;


  const getUser = async (searchValue, cb) => {
    setLoading(true)
    await getUsersRequest(searchValue)
      .then((res) => {
        cb(res)
        setLoading(false)
      }).catch((error) => {
        setError(error.response.data.message)
        console.log("this is error ", error.response)
        setLoading(false)

      });
    console.warn('tag', '')

  };

  const nextPage = async (pageNumber) => {
    let currentPage = pageNumber.selected + 1;
    await getUsersRequest(searchValue, currentPage).then((res) => {
      const { items, } = res.data
      setUsers(items);
    }).catch((error) => {
      setError(error.response.data.message)
      console.log(error.response.data.message, "error response")
    })


  }

  const debouncedGetUser = debounce((searchValue, cb) => {
    getUser(searchValue, cb);
  }, 300);

  useEffect(() => {
    debouncedGetUser(searchValue, res => {
      const { items, total_count } = res.data
      console.log("totalCount", total_count)
      setUsers(items);
      setpageCount(Math.ceil(total_count / limit))

    })
  }, [searchValue]);

  return (
    <div className="py-4 container">
      <div className='row justify-content-center'>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
        <UserList users={users} loading={loading} error={error} />
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={nextPage}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />

      </div>

    </div>
  );
}

export default App;
