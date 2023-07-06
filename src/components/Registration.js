import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Form, Dropdown, Dimmer, Loader } from "semantic-ui-react";
// import { DateInput } from "semantic-ui-calendar-react";
import ApiService from "./service/ApiService";
import { HttpStatusCode } from "axios";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [serverError, setServerError] = useState("");

  const formData = {
    firstname,
    lastname,
    phoneNumber,
    email,
    password,
    confirmPassword,
    terms,
    dob,
    gender,
  };

  const validateFields = () => {
    if (
      firstname.trim() === "" ||
      lastname.trim() === "" ||
      phoneNumber.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === "" ||
      dob === null ||
      gender === ""
    ) {
      setError("Some fields are missing input.");
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    if (!validateEmail()) {
      return;
    }

    if (!terms) {
      setError("Please accept the Terms and Conditions.");
      return;
    }

    try {
      setTimeout(() => {
        setIsLoading(true);
      }, 10000);
      const response = await ApiService.patientRegPost(formData);
      if (response.status === HttpStatusCode.Ok) {
        navigate("/login");
        const data = response.data;
        console.log(data);
      } else {
        setServerError("Server Error. Please try again later.");
      }
    } catch (error) {
      console.log(`Error occurred while posting data to the server: ${error}`);
      setServerError("Server Error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Gender options
  const genderOptions = [
    { key: "MALE", value: "MALE", text: "MALE" },
    { key: "FEMALE", value: "FEMALE", text: "FEMALE" },
  ];

  return (
    <div>
      <div
        style={{
          width: "50%",
          margin: "auto",
          marginTop: 100,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <Card className="border shadow-2xl" color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to register.
          </Typography>
          <form className="mt-8 w-1/2 mb-2 mx-auto max-w-md">
            <div className="mb-4 flex flex-col gap-6">
              <Input
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                type="text"
                size="lg"
                label="Firstname"
                className="w-full"
              />
              <Input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                type="text"
                size="lg"
                label="Lastname"
                className="w-full"
              />
              <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="tel"
                size="lg"
                label="Phone number"
                className="w-full"
              />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="lg"
                label="Email"
                className="w-full"
              />
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                size="lg"
                label="Password"
                className="w-full"
              />
              <Input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                size="lg"
                label="Confirm Password"
                className="w-full"
              />
              // <Form.Field>
              //   <DateInput
              //     name=""
              //     placeholder="Date of Birth"
              //     fluid
              //     value={dob}
              //     iconPosition="left"
              //     onChange={(e, { value }) => setDob(value)}
              //     required
              //     className="w-full"
              //   />
              // </Form.Field>
              <Form.Field>
                <Dropdown
                  placeholder="Select Gender"
                  fluid
                  selection
                  options={genderOptions}
                  value={gender}
                  onChange={(e, { value }) => setGender(value)}
                  required
                />
              </Form.Field>
            </div>
            <Checkbox
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              label={
                <Typography
                  variant="small"
                  color={error ? "red" : "gray"}
                  className="flex items-center font-normal"
                >
                  I agree to the{" "}
                  <a
                    href="/terms-and-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium transition-colors hover:text-blue-500"
                  >
                    Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            {error && (
              <Typography color="red" className="mt-2 text-center font-normal">
                {error}
              </Typography>
            )}
            {serverError && (
              <Typography color="red" className="mt-2 text-center font-normal">
                {serverError}
              </Typography>
            )}
            <Button
              onClick={handleSubmit}
              className="mt-6"
              fullWidth
              disabled={isLoading}
            >
              Register
            </Button>
            {isLoading && (
              <Dimmer active inverted>
                <Loader />
              </Dimmer>
            )}
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              >
                Sign In
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Registration;
