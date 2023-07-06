import React, { useContext, useState } from "react";
import { Form, Button, Dimmer, Loader, Message } from "semantic-ui-react";
import { HttpStatusCode } from "axios";
import { useNavigate } from "react-router-dom";
import ApiService from "./service/ApiService";
import { AuthContext } from "./AuthProvider";
import Cookies from "js-cookie";

const Login = ({ serverResponse }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { login, logout } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      setFormError("Please fill in all required fields.");
      return;
    }

    setFormError("");
    setIsError(false);
    setIsLoading(true);

    const loginRequestData = { email, password };

    try {
      const response = await ApiService.login(loginRequestData);
      if (response.status === 200) {
        console.log(`response from server ${response.data}`);
        const {
          JSESSIONID,
          userName,
          userRole,
          patientFirstname,
          patientLastname,
        } = response.data;
        console.log(
          JSESSIONID,
          userName,
          userRole,
          patientFirstname,
          patientLastname
        );
        navigate("/dashboard");

        login(response.data);
        // localStorage.setItem("sessionToken", sessionToken);
        //specify the function of clearing session

        Cookies.set("JSESSIONID", response.data.JSESSIONID);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
      console.log("Authentication failed " + error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSessionTimout = () => {
    let timoutId;
  };
  const resetTimout = () => {
    logout();
  };

  return (
    <div
      style={{
        width: "30%",
        margin: "auto",
        marginTop: 100,
        border: "1px solid #ccc",
        borderRadius: 4,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        padding: 20,
      }}
    >
      <h1 style={{ textAlign: "center" }}>Login</h1>
      {isError && (
        <Message negative onClose={() => setIsError(false)}>
          <Message.Header>Email or Password is incorrect</Message.Header>
        </Message>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Field>
        {formError && (
          <span style={{ color: "red", marginBottom: 10 }}>{formError}</span>
        )}
        <Button type="submit">Login</Button>
        {isLoading && (
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        )}
      </Form>
      <p style={{ marginTop: 10, textAlign: "center" }}>
        Don't have an account? <a href="/registration">Sign up</a>
      </p>
    </div>
  );
};

export default Login;
