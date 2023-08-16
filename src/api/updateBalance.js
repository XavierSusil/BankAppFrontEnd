
import endpoint from "../endPointConfig";
import fetchAccount from "./fetchAccount";


  
export const updateBalance = async (accountNumber, amount, transactionType) => {
  const url = endpoint + "/transaction";

  let type = transactionType === "credit" ? "C" : "D";

  const payload = {
    amount: amount,
    fromAccountNumber: accountNumber,
    type: type,
    date: new Date().toISOString(),
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  console.log(data);
  
  let updatedAccountdetails = null;
  if(response.ok) {
    updatedAccountdetails = await fetchAccount(accountNumber);
  }
  return updatedAccountdetails;
};

export default updateBalance;
