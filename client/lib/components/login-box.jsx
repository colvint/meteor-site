ReactMeteor.createClass({
  templateName: 'LoginBox',
  
  render() {
    return (
      <div id="login-box">
        <h2>Login</h2>
        <form>
          <ReactBootstrap.Input type="text" placeholder="Email"/>
          <ReactBootstrap.Input type="password" placeholder="Password"/>
          <ReactBootstrap.Button bsStyle="primary">
            Sign In
          </ReactBootstrap.Button>
        </form>
      </div>
    );
  }
});
