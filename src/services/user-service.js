import axios from 'axios'

const baseUrl = 'https://api.github.com/search'

const getUsersRequest = async (searchValue, pageNumber) => {
    if (searchValue && searchValue.length > 0) {
        const parsedQuery = searchValue.replaceAll(' ', '+');
        const res = await axios.get(`${baseUrl}/users?q=${parsedQuery}&page=${pageNumber}`)
        return res
    } else {
        return []
    }


}

export default getUsersRequest

