import React from "react";

function Search({transactions,setFilteredTransactions}) {

  
  function handleChange(event){
    event.preventDefault()
    const search=event.target.value.toLowerCase();
    

    if (search===""){
      setFilteredTransactions(transactions);
    }
    else{
     const filtered=transactions.filter((transaction)=>(transaction.description || "").toLowerCase().includes(search))
     console.log(filtered);
     setFilteredTransactions(filtered);
    }

  }
  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        onChange={handleChange}
      />
      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;
