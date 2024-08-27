function App() {


  return (
      <>
      <h1>Login</h1>
      <form>
        <label>
          email:
          <input type="text" name="email" />
        </label>
          <br/>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
          <br/>
        <input type="submit" value="Submit" />
      </form>
      </>
  );
}

export default App;
