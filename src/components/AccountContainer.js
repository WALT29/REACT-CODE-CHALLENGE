import React,{useState,useEffect} from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions,setTransactions]=useState([]);
  const [filteredTransactions,setFilteredTransactions]=useState([]);
  

  useEffect(()=>{
    fetch("http://localhost:8001/transactions")
    .then(response=>response.json())
    .then(data=>{
      setTransactions(data);
      setFilteredTransactions(data)
    })
  },[])
  
  console.log("filtered trans:",filteredTransactions);

  return (
    <div>
      <Search transactions={transactions} setFilteredTransactions={setFilteredTransactions}/>
      <AddTransactionForm transactions={transactions} setTransactions={setTransactions} setFilteredTransactions={setFilteredTransactions} filteredTransactions={filteredTransactions}/>
      <TransactionsList  transactions={filteredTransactions} />
    </div>
  );
}

export default AccountContainer;
