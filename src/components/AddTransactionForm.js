import React ,{useState} from "react";


function AddTransactionForm({transactions,setTransactions,setFilteredTransactions,filteredTransactions}) {
  const [formData,setFormData]=useState({
    date:"",
    description:"",
    category:"",
    amount:"",
  });


  function handleChange(event){
    const key =event.target.name
    const value=event.target.value

    
    setFormData({
      ...formData,
      [key]:value
    })
  }

  function handleSubmit(event){
    event.preventDefault();
    if (!formData.date || !formData.description || !formData.category || !formData.amount) {
      alert("Please fill out all fields before submitting the form.");
      return;
    }
    const newId=(Object.keys(transactions).length + 1).toString();

    const newTransaction={
      id:newId,
      date:formData.date,
      description:formData.description,
      category:formData.category,
      amount:parseFloat(formData.amount),
    }

    
    fetch("http://localhost:8001/transactions",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify(newTransaction)}
    ).then((response)=>{
      if(response.ok){
        setTransactions([
          ...transactions,newTransaction
        ]  
        )
      
        setFilteredTransactions([
          ...filteredTransactions,filteredTransactions
        ])
        window.location.reload();
      }
    }).catch((error)=>{
      console.log(error);
    })

    console.log(transactions);
      
  }
  

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="inline fields">
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
          <input type="text" name="description" placeholder="Description" value={formData.description}  onChange={handleChange} />
          <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
          <input type="number" name="amount" placeholder="Amount" step="0.01" value={formData.amount} onChange={handleChange} />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
