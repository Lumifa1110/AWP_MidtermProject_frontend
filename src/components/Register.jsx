import { useForm, Controller, useWatch } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import { Link } from "react-router-dom";
import "../css/registercss.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import axios, { all } from "axios";
import { Axios } from "axios";

const Register = () => {
  const [countries, setCountries] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  // const [formData, setFormData] = useState({});
  const coutryUrl = "https://restcountries.com/v3.1/all";
  // Axios.defaults.withCredentials = true;

  const fetchCoutries = async () => {
    try {
      const response = await axios.get(coutryUrl);
      const newCountry = response.data;
      const countriesName = newCountry.map((country) => country.name.common);
      setCountries(countriesName);
    } catch (e) {
      console.log("Error fetching images from Unsplash:", e);
    }
  };

  useEffect(() => {
    fetchCoutries();
  }, []);

  const defaultValues = {
    fullname: "",
    email: "",
    username: "",
    password: "",
    confirm: "",
    country: null,
    accept: false,
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm({ defaultValues });
  const confirmPassword = useWatch({ control, name: "password" });

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const tryOnSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/register", data);
      if (response.status === 200) {
        await setShowMessage(true);
        console.log(showMessage);
        reset();
      }
    } catch (error) {
      if (error.response.status === 409) {
        setError("username", {
          type: "manual",
          message: "Username is already taken.",
        });
        return;
      } else if (error.request) {
        // The request was made, but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error during request setup:", error.message);
      }
    }
  };

  // const onSubmit = async (data) => {
  //   try {
  //     const allUsers = await axios.get("http://localhost:3000/posts");

  //     const usernames = allUsers.data.map((user) => user.username);
  //     if (usernames.includes(data.username)) {
  //       setError("username", {
  //         type: "manual",
  //         message: "Username is already taken.",
  //       });
  //       return;
  //     } else {
  //       const response = await axios.post(
  //         "http://localhost:3000/register",
  //         data
  //       );

  //       // Optionally, you can redirect the user or show a success message
  //       if (response.status === 200) {
  //         // Optionally, you can redirect the user or show a success message
  //         await setShowMessage(true);
  //         console.log(showMessage);
  //         reset(); // Reset the form after successful submission
  //       } else {
  //         // Handle other cases (e.g., display an error message)
  //         console.error("Registration failed:", response.data);
  //       }
  //     }
  //   } catch (error) {
  //     // Handle errors, e.g., display an error message to the user
  //     console.error("Error during registration:", error);
  //   }
  // };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Link to="/login">
        <Button
          label="OK"
          className="p-button-text"
          autoFocus
          onClick={() => setShowMessage(false)}
        />
      </Link>
    </div>
  );

  const passwordFooter = (
    <>
      <Divider />
      <p className="text-sm" style={{ lineHeight: "0.25" }}>
        Suggestions
      </p>
      <ul className="pl-1 text-xs" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>At least one special character</li>
        <li>Minimum 8 characters</li>
      </ul>
    </>
  );

  return (
    <div className="register-wrapper">
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="center"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ "960px": "80vw" }}
        style={{ width: "30vw" }}
      >
        <div className="flex justify-content-center flex-column pt-6 px-3">
          <i
            className="pi pi-check-circle"
            style={{ fontSize: "5rem", color: "var(--green-500)" }}
          ></i>
          <h5>Registration Successful!</h5>
        </div>
      </Dialog>
      <div className="register-box">
        <Link to="/" className="back-button">
          <AiOutlineArrowLeft />
        </Link>
        <h2 className="text-center mt-1 mb-1">Create an Account</h2>
        <form
          onSubmit={handleSubmit(tryOnSubmit)}
          className="p-fluid text-left"
        >
          {/* FullName */}
          <div className="field fullname-field">
            <span className="p-float-label">
              <Controller
                name="fullname"
                control={control}
                rules={{ required: "Fullname is required." }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    className={classNames("p-inputtext-sm", {
                      "p-invalid": fieldState.invalid,
                    })}
                    onChange={(e) => {
                      const uppercaseValue = e.target.value.toUpperCase();
                      field.onChange(uppercaseValue);
                    }}
                    autoFocus
                  />
                )}
              />
              <label
                htmlFor="fullname"
                className={classNames({ "p-error": errors.fullname })}
              >
                What is your fullname ?*
              </label>
            </span>
            {getFormErrorMessage("fullname")}
          </div>

          {/* Email */}
          <div className="field email-field">
            <span className="p-float-label">
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address. E.g. example@gmail.com",
                  },
                }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    className={classNames("p-inputtext-sm", {
                      "p-invalid": fieldState.invalid,
                    })}
                  />
                )}
              />
              <label
                htmlFor="fullname"
                className={classNames({ "p-error": !!errors.email })}
              >
                Email*
              </label>
            </span>
            {getFormErrorMessage("email")}
          </div>

          {/* Username */}
          <div className="field username-field">
            <span className="p-float-label">
              <Controller
                name="username"
                control={control}
                rules={{
                  required: "Username is required.",
                  pattern: {
                    value: /^[a-zA-Z][a-zA-Z0-9_]{5,}$/,
                    message:
                      "Invalid username format. Must start with a letter and be at least 6 characters long and start with a letter.",
                  },
                }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    className={classNames("p-inputtext-sm", {
                      "p-invalid": fieldState.invalid,
                    })}
                  />
                )}
              />
              <label
                htmlFor="username"
                className={classNames({ "p-error": !!errors.username })}
              >
                Username*
              </label>
            </span>
            {getFormErrorMessage("username")}
          </div>

          {/* PassWord */}
          <div className="field password-field">
            <span className="p-float-label">
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required." }}
                render={({ field, fieldState }) => (
                  <Password
                    id={field.name}
                    {...field}
                    footer={passwordFooter}
                    pt={{
                      info: { className: "text-sm" },
                    }}
                    className={classNames("p-inputtext-sm", {
                      "p-invalid": fieldState.invalid,
                    })}
                    toggleMask
                  />
                )}
              />
              <label
                htmlFor="password"
                className={classNames({ "p-error": !!errors.password })}
              >
                Password*
              </label>
            </span>
            {getFormErrorMessage("password")}
          </div>

          <div className="field confirm-password-field">
            <span className="p-float-label">
              <Controller
                name="confirm"
                control={control}
                rules={{
                  required: "Confirm Password is required.",
                  validate: (value) =>
                    value === confirmPassword || "The passwords do not match.",
                }}
                render={({ field, fieldState }) => (
                  <Password
                    id={field.name}
                    {...field}
                    pt={{
                      info: { className: "text-sm" },
                    }}
                    className={classNames("p-inputtext-sm", {
                      "p-invalid": fieldState.invalid,
                    })}
                    feedback={false}
                    toggleMask
                  />
                )}
              />
              <label
                htmlFor="confirm"
                className={classNames({ "p-error": !!errors.confirm })}
              >
                Confirm Password*
              </label>
            </span>
            {getFormErrorMessage("confirm")}
          </div>

          <div className="field">
            <span className="p-float-label">
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    id={field.name}
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    options={countries}
                    pt={{
                      item: { className: "text-sm m-0" },
                      input: { className: "text-sm" },
                    }}
                    filter
                  />
                )}
              />
              <label htmlFor="country">Country</label>
            </span>
          </div>

          <div className="field-checkbox">
            <Controller
              name="accept"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <Checkbox
                  inputId={field.name}
                  onChange={(e) => field.onChange(e.checked)}
                  checked={field.value}
                  className={classNames({ "p-invalid": fieldState.invalid })}
                />
              )}
            />
            <label
              htmlFor="accept"
              className={classNames({ "p-error": errors.accept })}
            >
              I agree to the terms and conditions*
            </label>
          </div>

          <Button type="submit" label="Submit" className="mt-2" />
          <div className="flex mb-2 mt-1 justify-content-between">
            <span className="create-account">
              Already have account -{" "}
              <Link to="/login" className="font-bold">
                Sign in
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
