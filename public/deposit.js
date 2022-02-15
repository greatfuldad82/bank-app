function Deposit(){
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [deposit, setDeposit] = React.useState(0);
  const [balance, setBalance] = React.useState(0);

  const ctx = React.useContext(UserContext);

  React.useEffect(() => {
    if (ctx.loggedInUser) {
      setBalance(ctx.loggedInUser.balance);
    }
  }, [ctx])
  
  function clearForm(){
    console.log('Balance: ' + ctx.users[0].balance);
    setDeposit('');
    setShow(true);
  }

  function validate(field){
    if(Number(field)<=0){
      setStatus('Error: deposit amount');
      alert('You entered a negative number.');
      setTimeout(() => setStatus(''),1000);
      setDeposit(0);
      return false;
    }
    
    if (isNaN(field)) {
      setStatus('Error: deposit number');
      alert('Please enter an integer value.');
      setTimeout(() => setStatus(''),2000);
      setDeposit(0);
      return false;
    }

    return true;
  }

  function handleDeposit(){
    let curBalance;
    const loggedInUser = ctx.loggedInUser;

    ctx.users.slice(0);
    curBalance = ctx.loggedInUser.balance;
    console.log('amount deposited: ' + deposit);
    if (!validate(deposit)) {
      return;
    }

    const newBalance = Number(curBalance) + Number(deposit)
    
    // api call to update balance
    fetch('http://localhost:3001/account/update/' + loggedInUser._id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        balance: newBalance
      })
    })
    .then(res => res.json())
    .then((result) => {
      console.log({ result })
      if (result.success) {
        ctx.setLoggedInUser({
          ...ctx.loggedInUser,
          balance: newBalance,
        })
      }
        ctx.setUsers(ctx.users.slice(0));
        setDeposit(0);
        setShow(false);
    })
  }

  if (!ctx.loggedInUser) {
    return <h1>Please Login </h1>
  }

  return (
    <Card
      bgcolor="info"
      header="DEPOSIT"
      status={status}
      body={show ? (
        <>
          <h3>BALANCE: {balance.toFixed(2)} </h3>

          AMOUNT<br/>
          <input type="input" className="form-control" id="amount" placeholder="" data-toggle="tooltip" data-placement="top" title="enter deposit amount" onChange={e => {setDeposit(e.currentTarget.value)}} 
          /><br/>
          <div className="col-md-12 text-center">
            <button id="deposit" type="submit" disabled={!deposit} className="btn btn-light" data-toggle="tooltip" data-placement="top" title="check deposit amount" onClick={handleDeposit}>DEPOSIT</button>   
          </div>     
        </>
      ):(
        <>
          <h3>BALANCE:{balance.toFixed(2)} </h3>
          <h5>your deposit has been accepted</h5>
          <button type="submit" className="btn btn-light" onClick={clearForm}>Add another deposit</button>
        </>
      )}
    />
  )
}