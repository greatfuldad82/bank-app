function Withdraw(){
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [withdraw, setWithdraw] = React.useState(0);
  const [balance, setBalance] = React.useState(0);
  
  const ctx = React.useContext(UserContext);

  React.useEffect(() => {
    if (ctx.loggedInUser) {
      setBalance(ctx.loggedInUser.balance);
    }
  }, [ctx])
  
  function clearForm(){
    console.log('Balance: ' + ctx.users[0].balance);
    setWithdraw('');
    setShow(true);
  }

  function validate(field){
    let curBal;
    let afterWithdraw;
    curBal = Number(ctx.users[0].balance);
    afterWithdraw = curBal - Number(field);
    if(afterWithdraw<0){
      setStatus('Error: overdraft');
      alert(`overdraft.\nPlease, enter amount equal or less than ${curBal}.`);
      setTimeout(() => setStatus(''),2000);
      return false;
    }
    
    if (isNaN(field)) {
      setStatus('Error: withdraw number');
      alert('You\'ve entered character(s).\nPlease, enter number greater than 0 .');
      setTimeout(() => setStatus(''),2000);
      return false;
    }
    return true;
  }

  function handleWithdraw(){
    console.log('withdrew: ' + withdraw);
    if (!validate(withdraw))
      return;
    ctx.users.slice(0);

    const newBalance = Number(curBalance) - Number(withdraw);
    ctx.users[0].balance = Number(ctx.users[0].balance) - Number(withdraw);;
    ctx.setUsers(ctx.users.slice(0));
    const requestOptions = {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        balance: newBalance
      })
    }
    
    //api call to update balance
    fetch('http://localhost:3001/account/update/' + ctx.loggedInUser._id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        balance: newBalance
      })
    })
      .then(res => res.json()) 
      .then((result) => {
        console.log({ result })
        if (result.success) => {
          ctx.setLoggedInUser({
            ...ctx.loggedInUser,
            balance: newBalance,
        })
      }
    })
  


  return (
    <Card
      bgcolor="warning"
      header="WITHDRAW"
      status={status}
      body={show ? (
        <>
          <h3>Balance {ctx.users[0].balance.toFixed(2)} </h3>

          Amount<br/>
          <input type="input" className="form-control" id="amount" placeholder="" data-toggle="tooltip" data-placement="top" title="Enter amount" onChange={e => {setWithdraw(e.currentTarget.value)}} 
          /><br/>
          <div className="col-md-12 text-center">
            <button id="withdraw" disabled={!withdraw} type="submit" className="btn btn-light" data-toggle="tooltip" data-placement="top" title="check withdrawal amount" onClick={handleWithdraw}>Withdraw</button>        
          </div>
        </>
      ):(
        <>
          <h3>Balance: {ctx.users[0].balance}</h3>
          <h5>Your withdraw has been successfully processed!</h5>
          <button type="submit" className="btn btn-light" onClick={clearForm}>Add another withdraw</button>
        </>
      )}
    />
  )
}