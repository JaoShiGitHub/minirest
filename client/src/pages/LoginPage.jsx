import { useState } from "react";
import { useAuth } from "../contexts/authentication";

function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth(); // Call the hook directly

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      identifier,
      password,
    });
  };

  console.log(identifier);
  console.log(password);

  return (
    <form className="customer-login-form" onSubmit={handleSubmit}>
      <h1>Client Login</h1>

      <label htmlFor="identifier">Username | Email</label>
      <input
        id="identifier"
        name="identifier"
        type="text"
        placeholder="Type username / email"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />
      <br />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password" // Changed to password type
        placeholder="Type your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="form-actions">
        <button type="submit">Login</button>
      </div>
    </form>
  );
}

export default LoginPage;
