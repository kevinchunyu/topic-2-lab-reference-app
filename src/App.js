// App.js
import React, { useState, useContext, createContext } from 'react';
import './App.css';

const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="container">
        {user ? (
          <>
            <button onClick={handleLogout}>Log Out</button>
            <h1>Hello, {user.username}</h1>
          </>
        ) : (
          <Authentication />
        )}
      </div>
    </UserContext.Provider>
  );
}

function Authentication() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const [userDatabase, setUserDatabase] = useState([]);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = () => {
    if (isLogin) {
      // Login user
      const user = userDatabase.find(u => u.username === username && u.password === password);
      if (user) {
        setUser(user);
      } else {
        alert('Invalid credentials');
      }
    } else {
      // Sign up user
      if (userDatabase.some(u => u.username === username)) {
        alert('Username is already taken');
        return;
      }
      const newUser = { username, password };
      setUserDatabase([...userDatabase, newUser]);
      setUser(newUser);
    }
  };

  return (
    <div>
      <h1>{isLogin ? 'Log In' : 'Sign Up'}</h1>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>{isLogin ? 'Log In' : 'Sign Up'}</button>
      <button onClick={handleToggle}>{isLogin ? 'Need to create an account?' : 'Already have an account?'}</button>
    </div>
  );
}

export default App;
