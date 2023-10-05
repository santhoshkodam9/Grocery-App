// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import { styled } from "@mui/material/styles";
// import Snackbar from "@mui/material/Snackbar";
// import Nav from "../Nav";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FormControl, Stack } from "@mui/material";
// const StyledForm = styled("form")({
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   gap: "1rem",
// });

// function Login() {
//   const [user, setUser] = useState({ userName: "", password: "" });
//   const [loginErrorMessage, setLoginErrorMessage] = useState();
//   const [open, setOpen] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [disErr, setDisErr] = useState(false);
//   const con = {
//     margin: "10px",
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     validateEmail(userName);
//     validatePassword(password);
//     if (emailError === "" && passwordError === "") {
//       axios
//         .post(
//           "http://localhost:8084/users/login",
//           {},
//           {
//             params: user,
//           }
//         )

//         .then((response) => {
//           if (response.data.message === "Login Successfull") {
//             localStorage.setItem("status", "true");
//             console.log(response.data.message);
//             localStorage.setItem("role", response.data.role);
//             localStorage.setItem("username", response.data.userName);
//             console.log(response.data);
//             navigate("/");
//             alert("Login successful");
//             setOpen(true);
//           } else {
//             setLoginErrorMessage(response.data.message);
//           }
//         })
//         .catch((error) => {
//           alert(error.message);
//         });
//     } else {
//       console.log("hello");
//     }
//   };

//   const validateEmail = (userName) => {
//     // email validation regex
//     const re = /\S+@\S+\.\S+/;
//     if (!userName) {
//       setEmailError("email is required");
//     } else if (!re.test(userName)) {
//       setEmailError("Invalid email format");
//     } else {
//       setEmailError("");
//     }
//   };

//   const handleEmailChange = (e) => {
//     setUserName(e.target.value);
//     validateEmail(e.target.value);
//   };

//   const validatePassword = (password) => {
//     if (!password) {
//       setPasswordError("password is required");
//     } else {
//       setPasswordError("");
//     }
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//     validatePassword(e.target.value);
//   };

//   return (
//     <div>
//       <Nav />

//       <div className="con">
//         <h5 style={{ color: "rgb(15, 30, 74)" }}>LOGIN</h5>
//         <FormControl
//           className="form-control"
//           variant="outlined"
//           size="sl"
//           margin="normal"
//         >
//           <TextField
//             id="userName"
//             label="Email"
//             type="text"
//             value={userName}
//             onChange={handleEmailChange}
//             error={!!emailError}
//             helperText={emailError}
//             autoComplete="off"
//           />
//         </FormControl>
//         <FormControl
//           className="form-control"
//           variant="outlined"
//           size="sl"
//           margin="normal"
//         >
//           <TextField
//             id="password"
//             label="Password"
//             type="password"
//             value={password}
//             onChange={handlePasswordChange}
//             error={!!passwordError}
//             helperText={passwordError}
//           />
//         </FormControl>
//         <div className="text-center">
//           <Stack direction="row" spacing={7}>
//             <Button variant="contained" size="small" color="error" style={con}>
//               Cancel
//             </Button>

//             <Button
//               variant="contained"
//               color="primary"
//               size="small"
//               style={con}
//               onClick={handleSubmit}
//             >
//               Login
//             </Button>
//           </Stack>
//         </div>
//         <br></br>

//         <div className="text-center">
//           <h6>
//             New User? <a href="Register" style={{textDecoration:'none'}}> SignUp </a> here!
//           </h6>
//           <div className="text-center">
//           <Stack direction="row" spacing={7}>
//             <Button variant="contained" size="small" color="primary" style={con}>
//             <a href="ForgotPassword" style={{textDecoration:'none',color:"white"}}>Forgot Password </a>
//             </Button>

//             <Button
//               variant="contained"
//               color="primary"
//               size="small"
//               style={con}

//             >
//               <a href="ResetPassword" style={{textDecoration:'none',color:"white"}}>reset password</a>
//             </Button>
//           </Stack>
//         </div>
//           {/* <h6>
//             <a href="ForgotPassword" style={{textDecoration:'none'}}>Forgot Password </a>
//           </h6>
//           <h6>
//             <a href="ResetPassword" style={{textDecoration:'none'}}>reset password</a>
//           </h6> */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import Nav from "../Nav";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
function Login() {
  const [user, setUser] = useState({ userName: "", password: "" });
  const [loginErrorMessage, setLoginErrorMessage] = useState();
  const theme = createTheme();
  const[snackBar,setSnackBar]=useState(false)
  
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!user.userName) {
      setUserNameError("email is required");
    }

    if (!user.password) {
      setPasswordError( "Mobile number is required");
    }

    console.log(user);
    console.log(localStorage.getItem("userId"), "userid");

    axios
      .post(
        "http://localhost:8084/users/login",
        {},
        {
          params: user,
        }
      )

      .then((response) => {
        if (response.data.message === "Login Successfull") {
          localStorage.setItem("status", "true");
          console.log(response.data.message);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("username", response.data.userName);
          localStorage.setItem("userId", response.data.userid);

          if (response.data.role === "CUSTOMER") {
            navigate("/products");
            
          } else if (response.data.role === "ADMIN") {
            navigate("/viewproducts");
          }
        } else {
          setLoginErrorMessage(response.data.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const handleEmailChange = (e) => {
    setUser((prevValues) => ({
      ...prevValues,
      userName: e.target.value,
    }));
    validateEmail(e.target.value);
  };
  const validateEmail = (email) => {
    // email validation regex
    const re = /\S+@\S+\.\S+/;
    if (!email) {
      //errors.userName=('email is required');
      setUserNameError("email is required");
    } else if (!re.test(email)) {
      //errors.userName=('Invalid email format');
      setUserNameError("Invalid email format");
    } else {
      //errors.userName=('');
      setUserNameError("");
    }
  };
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;
    if (!password) {
    setPasswordError("Password is required");
    } else if (!passwordRegex.test(password)) {
      
      setPasswordError(  "Password must be 6-20 characters long, contain at least one number, one letter, and one special character.");
    } else {
      setPasswordError("");
    }
  };
  const handlePasswordChange = (e) => {
    setUser((prevValues) => ({
      ...prevValues,
      password: e.target.value,
    }));
    const newPassword = e.target.value;
    validatePassword(e.target.value);
  };
  return (
    <div>
      <Nav />
      <div>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleFormSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="userName"
                  value={user.userName}
                  onChange={handleEmailChange}
                  error={Boolean(userNameError)}
                  helperText={userNameError}
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  value={user.password}
                  onChange={handlePasswordChange}
                  error={Boolean(passwordError)}
                  helperText={passwordError}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}
                 <Link href="/forgotpassword" variant="body2">
                      Forgot password?
                    </Link>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/resetpassword" variant="body2">
                      Reset password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default Login;

// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// import Snackbar from '@mui/material/Snackbar';
// import Nav from "../Nav";

// import axios from "axios";

// const StyledForm = styled('form')({
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   gap: '1rem',
// });

// function Login() {
//   const [ user,setUser]=useState({userName:"",password:""})
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [disErr,setDisErr]=useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     validateEmail(email);
//     validatePassword(password);
//     if (emailError === '' && passwordError === '') {
//       axios

//       .post(

//         "http://localhost:8084/users/login",

//         {},

//         {

//           params: user,

//         }

//       )
//       .then((response) => {
//         console.log(response.data);
//         localStorage.setItem('status', 'true');
//         localStorage.setItem('role', response.data.role);
//         localStorage.setItem('userName', response.data.userName);
//         localStorage.setItem('name', response.data.name);
//         localStorage.getItem('mobileNumber', response.data.mobileNumber);
//         if (response.data.Message !==  "" ) {
//           alert(response.data.Message);
//         } else {
//           alert('login successful');
//         }
//       })
//       .catch((err) => {
//        alert(err.Message)
//       });
//     }
//     else{
//       console.log("hello")
//     }

//   };

//   const validateEmail = (email) => {
//     // email validation regex
//     const re = /\S+@\S+\.\S+/;
//     if (!email) {
//       setEmailError('email is required');
//     } else if (!re.test(email)) {
//       setEmailError('Invalid email format');
//     } else {
//       setEmailError('');
//     }
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     validateEmail(e.target.value);
//   };

//   const validatePassword = (password) => {
//     if (!password) {
//       setPasswordError('password is required');
//     } else {
//       setPasswordError('');
//     }
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//     validatePassword(e.target.value);
//   };

//   return (
//     <div>
//     <Nav />

//     <div className="card mx-auto mt-5" id="register">
//       <div className="card-header text-center">
//         <h3 className="card-title">SignUp</h3>
//       </div>
//       <div className="card-body">

//           <div className="registers">
//             <div className="row mb-4">
//     <div className='box'>
//     <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}/>
//       <StyledForm onSubmit={handleSubmit}>

//         <TextField
//           id="email"
//           label="Email"
//           type="email"
//           value={email}
//           onChange={handleEmailChange}
//           error={!!emailError}
//           helperText={emailError}
//           autoComplete="off"
//         />
//         <TextField
//           id="password"
//           label="Password"
//           type="password"
//           value={password}
//           onChange={handlePasswordChange}
//           error={!!passwordError}
//           helperText={passwordError}

//         />
//         <Button type="submit" variant="contained" disabled={emailError || passwordError}>
//           Login
//         </Button>
//       </StyledForm>
//       <div className='text-center'>
//       <h6>
//         New User? <a href="Register"> SignUp </a> here!
//       </h6>
//       <h6>
//       <a href="ForgotPassword">Forgot Password </a>
//       </h6>
//       <h6>
//       <a href="ResetPassword">reset password</a>

//       </h6>
//       </div>
//       {/* <Snackbar
//         open={disErr}
//         autoHideDuration={3000}
//         onClose={()=>setDisErr(!disErr)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//         >
//        <MuiAlert elevation={6} variant="filled" onClose={()=>setDisErr(!disErr)} severity="error">{dispError}</MuiAlert>
//      </Snackbar> */}

//       </div>
//       </div>
//       </div>
//       </div>
//       </div>
//       </div>
//   );
// }

// export default Login;
