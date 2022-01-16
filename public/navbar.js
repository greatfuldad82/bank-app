function NavBar(){
  return(
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <a className="navbar-brand" href="#" data-placement="top" title="click here to return home">Banco Aléx</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <a className="nav-link" href="#/CreateAccount/" data-bs-toggle="tooltip" data-placement="top" title="When you need a new bank account, click this link please.">Create Account</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/Login/" data-bs-toggle="tooltip" data-placement="top" title="When you need a new bank account, click this link please.">Login</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/deposit/" data-placement="top" title="To save your cash or check to your deposit account, click this link please.">Deposit</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/withdraw/" data-placement="top" title="To get cash from your deposit account, click this link please.">Withdraw</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/alldata/" data-placement="top" title="This is an administator's menu. If you want to list up all the registered clients' information, click this link please.">AllData</a>
          </li>          
        </ul>
      </div>
    </nav>
    </>
  );
}