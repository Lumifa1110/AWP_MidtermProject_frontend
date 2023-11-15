import { useForm, Controller } from "react-hook-form";
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { Link } from "react-router-dom";
import "../css/logincss.css";
import { AiOutlineArrowLeft, AiOutlineWallet } from "react-icons/ai";
import axios from "axios";


const Login = ({ onSetAuth, onSetUserData }) => {
  const [showMessage, setShowMessage] = useState(false);
  const defaultValues = {
    username: "",
    password: "",
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm({ defaultValues });

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        data
      );
      if (response.status === 200) {
        await setShowMessage(true);
        onSetAuth();
        onSetUserData(data)
        console.log("Login Success");
        reset();
      }
    } catch (error) {
      console.log(error)
      if (error.response.status === 400) {
        setError("username", {
          type: "manual",
          message: "Username/Password may not be correct.",
        });
        setError("password", {
          type: "manual",
          message: "Username/Password may not be correct. ",
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

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Link to="/">
        <Button
          label="OK"
          className="p-button-text"
          autoFocus
          onClick={() => setShowMessage(false)}
        />
      </Link>
    </div>
  );

  return (
    <div className="wrapper">
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
          <h5>Login Successful!</h5>
        </div>
      </Dialog>
      <div className="box">
        <Link to="/" className="back-button">
          <AiOutlineArrowLeft />
        </Link>
        <h2 className="text-center mt-1 mb-1">Sign in to Classroom</h2>

        <form className="p-fluid text-left" onSubmit={handleSubmit(onSubmit)}>
          <div className="field username-field">
            <span className="p-float-label">
              <Controller
                name="username"
                control={control}
                rules={{ required: "Username is required." }}
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
                htmlFor="password"
                className={classNames({ "p-error": !!errors.password })}
              >
                Password*
              </label>
            </span>
            {getFormErrorMessage("password")}
          </div>

          <div className="flex mb-2 mt-1 justify-content-between">
            <span className="create-account">
              Don&#39;t have account ?{" "}
              <Link to="/register" className="font-bold">
                Sign up
              </Link>
            </span>
            <Link className="forgot-password font-bold">Forgot password</Link>
          </div>

          <Button type="submit" label="Sign in" className="mt-2" />
        </form>
      </div>
    </div>
  );
};

export default Login;
