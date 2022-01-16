function CreateAccount(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const props = React.useState('');
  const ctx = React.useContext(UserContext);  

  function validate(field, label){
      if (!field) {
        if (String(label) === 'password') {
        }
        else {
          setStatus('Error: ' + label);
          alert('Error: must enter info ' + label);
          setTimeout(() => setStatus(''),1000);
          return false;
        }
      }
      
      if (String(label) === 'password') {
        console.log("pw field: " + String(field));
        if (field.toString().length < 8) {
          setStatus('Error: password must be 8 characters minimum');
          alert('Error: password must be 8 characters minimum' + label);
          setTimeout(() => setStatus(''),1000);
          setPassword('');
          return false;
        }
      }
    return true;
  }

  function enableSubmitbutton(field){
    if (!field) {
      setStatus('Error: ');
      setTimeout(() => setStatus(''),1000);
      document.getElementById("submit").disabled = true;
      return false;
    }
    document.getElementById("submit").disabled = false;
    return true;
  }

  function handleCreate() {
    console.log(name, email, password);
    const url =
      `/account/create/${name}/${email}/${password}`;
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log(data);
    })();
    props.setShow(false);
  }

  // function handleCreate(){
  //   console.log(name,email,password);
  //   if (!validate(name,     'name'))     return;
  //   if (!validate(email,    'email'))    return;
  //   if (!validate(password, 'password')) return;
  //   ctx.users.push({name,email,password,balance:100});
  //   setShow(false);
  // } 

  function showSuccessMsg(){
    alert('Created!');    
  }

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    alert("Created!");
    setShow(true);
  }

  return (
    <Card
      bgcolor="secondary"
      header="CREATE ACCOUNT"
      status={status}
      body={show ? (  
              <>

              <input type="input" className="form-control" id="name" placeholder="NAME" value={name} data-toggle="tooltip" data-placement="top" title="First and Last Name" onChange={e => {setName(e.currentTarget.value); enableSubmitbutton(e.currentTarget.value)}} /><br/>

              <input type="input" className="form-control" id="email" placeholder="EMAIL" value={email} data-toggle="tooltip" data-placement="top" title="VERIFIED EMAIL" onChange={e => setEmail(e.currentTarget.value)}/><br/>

              <input type="password" className="form-control" id="password" placeholder="PASSWORD" value={password} data-toggle="tooltip" data-placement="top" title="minimum 8 characters" onChange={e => setPassword(e.currentTarget.value)}/><br/>
              <div className="col-md-12 text-center">
                <button id="submit" type="submit" disabled={!name && !email && !password} className="btn btn-light" data-toggle="tooltip" data-placement="top" title="confirm info before submission" onClick={handleCreate}>
                <span>CREATE</span><br/>
                <span>ACCOUNT</span></button>
              </div>
              </>
            ):(
              <>
                <h5>New Bank Account has been Successfully Created!</h5>
                <button type="submit" className="btn btn-light" onClick={clearForm}>
                <span>Add Another</span><br/>
                <span>Account</span></button>
              </>
            )}
    />
  )
}