import axios from 'axios'

const baseUrl = 'https://api.github.com/search'

const getUsersRequest = async (searchValue) => {
    if (searchValue && searchValue.length > 0) {
        const parsedQuery = searchValue.replaceAll(' ', '+');
        const res = await axios.get(`${baseUrl}/users?q=${parsedQuery}&page=1`)
        return res
    } else {
        return []
    }


}

export default getUsersRequest

