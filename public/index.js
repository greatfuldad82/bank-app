function Spa() {

    const [users, setUsers] = React.useState([{name:'alex',email:'greatful_dad@icloud.com',password:'conquest-adores',balance: 25, }]);
    const [loggedInUser, setLoggedInUser] = React.useState()
  
    const handleSendUserInfo = (userInfo) => {
      fetch("http://localhost:3001/account/my-login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo)
      })
        .then(res => res.json())
        .then(user => {
          console.log("user info from backend!!", user);
          setLoggedInUser(user)
        })
    }
  // fetch(`/login/account/${loginInfo.email}/${loginInfo.password}`)
    return (
      <HashRouter>
        <NavBar/>
        <UserContext.Provider value={{users, setUsers, loggedInUser, setLoggedInUser}}>
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" render={() => <Login handleSendUserInfo={handleSendUserInfo} />}></Route>
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            <Route path="/alldata/" component={AllData} />
          </div>
        </UserContext.Provider>      
      </HashRouter>
    );
  }
  
  ReactDOM.render(
    <Spa/>,
    document.getElementById('root')
  );