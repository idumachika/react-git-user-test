import axios from 'axios'

const baseUrl = 'https://api.github.com/search'

const getUsersRequest = async (searchValue, pageNumber) => {
    const parsedQuery = searchValue.replaceAll(' ', '+');
    const res = await axios.get(`${baseUrl}/users?q=${parsedQuery}&page=${pageNumber}`)
    return res



}

export default getUsersRequest

