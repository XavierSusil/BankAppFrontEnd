import { enqueueSnackbar } from "notistack";
import endpoint from "../endPointConfig";

const fetchAccounts = async () => {
  if (localStorage.getItem("firstName") === "admin") return;

  const email = localStorage.getItem("customerEmail");
  const password = localStorage.getItem("customerPassword");
  const username="user";
  const authorizationPassword="124aafcc-e13f-49a3-8ce6-f3a8572757f4"

  const headers = new Headers();
  headers.append('Authorization', `Basic ${btoa(`${username}:${authorizationPassword}`)}`);
  headers.append('Content-Type','application/json');

  const url =
    endpoint + "/customer/login?email=" + email + "&password=" + password;
  console.log(url);
  const response = await fetch(url, {
    method: "GET",
    headers:headers,
  });
  if(response.ok){
  const data = await response.json();
  return data;
  }
  else {
    enqueueSnackbar("Can't able to fetch Accounts data");
    return ({
        message:"Can't able to fetch Accounts data"
    })
  }
};

export default fetchAccounts;
