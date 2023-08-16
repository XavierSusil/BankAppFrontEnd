import endpoint from "../endPointConfig"

const fetchAccount = async (accountNumber) => {


    const url = `${endpoint}/account/${accountNumber}`;
    console.log(url);

    const response  = await fetch(url , {
        method:'GET'
    }); 

    let data = null ;
    if(response.ok) {
        data = await response.json();
    }

    return data;
}

export default fetchAccount;