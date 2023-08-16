import { enqueueSnackbar } from "notistack";
import endpoint from "../endPointConfig"

const createBank = async (id, bankName) => {

    const url = endpoint + "/banks";
    const payload = {
        id,
        name:bankName
    }

    const response = await fetch(url, {
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(payload)
    });

    if(response.ok) {
        enqueueSnackbar('Bank created successfully', {
            variant:'success'
        });
    }
    else if (response.status === 500) {
        enqueueSnackbar('Bank with the given id already exist', {
            variant:'warning'
        })
    }
}

export default createBank;