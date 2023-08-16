import { enqueueSnackbar } from "notistack";
import endpoint from "../endPointConfig"


const fetchBanks = async () => {

    const url = endpoint + '/banks';
    console.log(url);

    try{
        const response  = await fetch(url , {
            method: 'GET',
            headers: {
                'Content-Type':'aplication/json'
            }
        })

        const data = response.json();
        return data;
    }catch(err) {
        enqueueSnackbar("Can't able to fetch Bank details" , {
            variant:'error'
        })
        throw new Error('Error fetching account data');
    }

}

export default fetchBanks;