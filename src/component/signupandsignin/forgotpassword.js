import React, { useState } from "react";

import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";

import Backdrop from "@mui/material/Backdrop";

import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";

import { useHistory, useNavigate } from "react-router-dom";



const StyledForm = styled("form")({
  display: "flex",

  flexDirection: "column",

  alignItems: "center",

  gap: "1rem",
});

function ForgotPassword() {
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState("");

  const [displayEmail, setDisplayEmail] = useState(true);

  const [displayOtp, setDisplayOtp] = useState(false);

  const [displayReset, setDisplayReset] = useState(false);

  const [emailError, setEmailError] = useState("");

  const [otp, setOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [newPasswordError, setNewPasswordError] = useState("");

  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [bool, setBool] = useState("");

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleSubmitEmail = (e) => {
    e.preventDefault();

    console.log(email);

    setOpen(!open);

    axios
      .post(`http://localhost:8084/users/sendEmail?to=${email}`)
      .then((response) => {
        setOpen(false);

        if (response.data === "mail sent successfully") alert(response.data);

        setDisplayEmail(!displayEmail);

        setDisplayOtp(!displayOtp);
      })

      .catch((err) => {
        alert(err.Message);

        setOpen(false);
      });

    console.log(email);
  };

  const handleSubmitOtp = (e) => {
    e.preventDefault();

    axios

     // .delete(`http://localhost:9191/Login/verify?email=${email}&id=${otp}`)

      .then((response) => {
        alert(response.data);

        if (response.data === "otp matched") {
          setDisplayOtp(false);

          setDisplayReset(true);
        }
      })

      .catch((err) => {
        alert(err.Message);
      });

    console.log("otp submitted");

    console.log(otp);
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();

    axios

      .put(
        `http://localhost:8084/users/resetpassword?userName=${userName}&password=${password}&newPassword=${newPassword}`
      )

      .then((response) => {
        alert(response.data);

        if (response.data === "Password reset successfully") {
          navigate("/Login");
        }
      })

      .catch((err) => {
        alert(err.Message);
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();

    axios

     // .delete(`http://localhost:9191/Login/cancel?email=${email}`)

      .then((response) => {
        alert(response.data);

        navigate("/Login");
      })

      .catch((err) => {
        alert(err.Message);
      });
  };

  const handleLeave = (e) => {
    alert("Request Cancelled");

    navigate("/Login");
  };

  const validateEmail = (email) => {
    // email validation regex

    const re = /\S+@\S+\.\S+/;

    if (!re.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    validateEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    console.log(e.target.value);

    setOtp(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);

    validateNewPassword(e.target.value);
  };

  const validateNewPassword = (newPassword) => {
    const re =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;

    if (!newPassword) {
      setNewPasswordError("newPassword is required");
    } else if (!re.test(newPassword)) {
      setNewPasswordError(
        "Password must be 6-20 characters long, contain at least one number, one letter, and one special character."
      );
    } else {
      setNewPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);

    validateConfirmPassword(e.target.value);
  };

  const validateConfirmPassword = (confirmPassword) => {
    console.log(newPassword);

    console.log(confirmPassword);

    if (!(confirmPassword === newPassword)) {
      setConfirmPasswordError("passwords did not match");
    } else if (!confirmPassword) {
      setConfirmPasswordError("confirm password is reqired");
    } else {
      setConfirmPasswordError("");
    }
  };

  return (
    <div>
      {" "}
      {displayEmail && (
        <div className="box">
          {" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          />{" "}
          <StyledForm onSubmit={handleSubmitEmail}>
            <h3>Forgot Password</h3>{" "}
            <TextField
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
              autoComplete="off"
            />{" "}
            <Button type="submit" variant="contained" disabled={emailError}>
              send verification code{" "}
            </Button>{" "}
            <h6>
              <a href="/Login"> go back to login</a>
            </h6>{" "}
          </StyledForm>{" "}
        </div>
      )}{" "}
      {
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={() => setOpen(false)}
        >
          <CircularProgress color="inherit" />{" "}
        </Backdrop>
      }
      {displayOtp && (
        <div className="box">
          {" "}
          <StyledForm>
            <h3>Enter Otp</h3>{" "}
            <TextField
              id="new password"
              label="otp"
              type="text"
              value={otp}
              onChange={handleOtpChange}
              autoComplete="off"
            />{" "}
            <Button onClick={handleSubmitOtp} variant="contained">
              Submit
            </Button>{" "}
            <Button
              varient="contained"
              //onClick={handleCancel}
              style={{ backgroundColor: "red", color: "white" }}
              href="/login"
            >
              cancel
            </Button>{" "}
          </StyledForm>{" "}
        </div>
      )}{" "}
      {displayReset && (
        <div className="box">
          {" "}
          <StyledForm>
            <h3>Reset Password</h3>{" "}
            <TextField
              id="newPassword"
              label="newPassword"
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              error={!!newPasswordError}
              helperText={newPasswordError}
              autoComplete="off"
            />
            <TextField
              id="confirmPassword"
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={Boolean(confirmPasswordError)}
              helperText={confirmPasswordError}
            />{" "}
            <Button variant="contained" onClick={handlePasswordReset}>
              submit
            </Button>{" "}
            <Button
              varient="contained"
              onClick={handleLeave}
              style={{ backgroundColor: "red", color: "white" }}
            >
              cancel
            </Button>{" "}
          </StyledForm>{" "}
        </div>
      )}{" "}
    </div>
  );
}

export default ForgotPassword;

// import React, { useState } from "react";

// function ForgotPassword() {
//   const [email, setEmail] = useState("");

//   const [emailError, setEmailError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // handle login logic here
// if(!email){
//   setEmailError("please enter email")
// }else{
//   setEmailError("")
// }
//     console.log(email);
//   };

//   const validateEmail = (email) => {
//     // email validation regex
//     const re = /\S+@\S+\.\S+/;
//     if (!re.test(email)) {
//       setEmailError("Invalid email format");
//     } else {
//       setEmailError("");
//     }
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     validateEmail(e.target.value);
//   };
//   return (
//     <div className="card mx-auto mt-5" id="register">
//       <div className="card-header text-center">
//         <h3 className="card-title">Forgot Password</h3>
//       </div>
//       <div className="card-body text-center">
//         <div className="registers">
//           <div className="row mb-4"></div>
//           <div className="box">
//             <form onSubmit={handleSubmit}>
//               <label>
//                 Email:&nbsp;&nbsp;
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={handleEmailChange}
//                 />
//                 {emailError && (
//                   <span style={{ color: "red" }}>{emailError}</span>
//                 )}
//               </label>
//               &nbsp;&nbsp;&nbsp;&nbsp;
//               <button type="submit" disabled={emailError}>
//                 Verify
//               </button>
//               <h6>
//                 <a href="Login">return to login!</a>
//               </h6>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ForgotPassword;
