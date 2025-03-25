import { useState } from "react";
// import registerImage from "@assets/quick.jpg";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { registrationValidation } from "utils/registrationValidation";
import { toast } from "react-toastify";
import axios from "axios";
import { axiosAPI } from "utils/axiosAPI";

export const RegisterForm = () => {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const handleChange = (e: any) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validation = registrationValidation(registerData);
    if (validation) {
      toast.error(validation);
      return;
    }

    try {
      const response = await axiosAPI.post("/auth/register", registerData);
      console.log(response);
      if (response.status !== 200) {
        toast.error(response.data.message);
        return;
      }

      toast.success("Registration successful");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }

    setRegisterData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        "& > :not(style)": { m: 1 },
      }}
      className="mui-register-box"
    >
      <h1>Register </h1>
      <div className="field-inputs">
        <div className="form-row">
          <TextField
            helperText="Please enter your name"
            name="firstName"
            label="First Name"
            required={true}
            sx={{ width: "37%" }}
            value={registerData.firstName}
            onChange={handleChange}
          />
          <TextField
            helperText="Please enter your surname"
            name="lastName"
            label="Last Name"
            required
            sx={{ width: "37%" }}
            value={registerData.lastName}
            onChange={handleChange}
          />
        </div>

        <TextField
          label="Username"
          name="username"
          required
          className="mui-text-field"
          value={registerData.username}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          required
          className="mui-text-field"
          value={registerData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          required
          className="mui-text-field"
          value={registerData.password}
          onChange={handleChange}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          required
          className="mui-text-field"
          value={registerData.confirmPassword}
          onChange={handleChange}
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          className="mui-text-field"
          value={registerData.phoneNumber}
          onChange={handleChange}
        />
      </div>
      <Button
        variant="contained"
        className="mui-submit-btn"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
    // <section className="register-form">
    //   <div className="register-form__form">
    //     <h3>Register</h3>
    //     <form action="">
    //       <div className="register-form__form--name">
    //         <label htmlFor="firstName">First Name</label>
    //         {/* <input type="text" id="firstName" required /> */}
    //         <TextField
    //           id="firstName"
    //           label="First Name"
    //           variant="outlined"
    //           required
    //         />

    //         <label htmlFor="lastName">Last Name</label>
    //         <input type="text" id="lastName" required />
    //       </div>

    //       <div className="register-form__form--details">
    //         <div className="label-input">
    //           <label htmlFor="username">Username</label>
    //           <input type="text" id="username" required />
    //         </div>
    //         <div className="label-input">
    //           <label htmlFor="email">Email</label>
    //           <input type="email" id="email" required />
    //         </div>

    //         <div className="label-input">
    //           <label htmlFor="password">Password</label>
    //           <input type="password" id="password" minLength={8} required />
    //         </div>
    //         <div>
    //           <label htmlFor="confirmPassword">Confirm Password</label>
    //           <input
    //             type="password"
    //             id="confirmPassword"
    //             minLength={8}
    //             required
    //           />
    //         </div>

    //         <div className="label-input">
    //           <label htmlFor="phoneNumber">Phone Number</label>
    //           <input type="" id="phoneNumber" />
    //         </div>
    //       </div>

    //       <button type="submit" id="submitBtn">
    //         Submit
    //       </button>
    //     </form>
    //   </div>
    //   <div>{/* <img src={registerImage} alt="Register form image" /> */}</div>
    // </section>

    // <section className="bg-gray-50 dark:bg-gray-900">
    //   <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    //     <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 min-h-[80vh] w-100">
    //       <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
    //         <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
    //           Create an account
    //         </h1>
    //         <form className="space-y-4 md:space-y-6" action="#">
    //           <div>
    //             <label
    //               htmlFor="email"
    //               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //             >
    //               Your email
    //             </label>
    //             <input
    //               type="email"
    //               name="email"
    //               id="email"
    //               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //               placeholder="name@company.com"
    //               required
    //             />
    //           </div>
    //           <div>
    //             <label
    //               htmlFor="password"
    //               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //             >
    //               Password
    //             </label>
    //             <input
    //               type="password"
    //               name="password"
    //               id="password"
    //               placeholder="••••••••"
    //               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //               required
    //             />
    //           </div>
    //           <div>
    //             <label
    //               htmlFor="confirm-password"
    //               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //             >
    //               Confirm password
    //             </label>
    //             <input
    //               type="confirm-password"
    //               name="confirm-password"
    //               id="confirm-password"
    //               placeholder="••••••••"
    //               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //               required
    //             />
    //           </div>
    //           <div className="flex items-start">
    //             <div className="flex items-center h-5">
    //               <input
    //                 id="terms"
    //                 aria-describedby="terms"
    //                 type="checkbox"
    //                 className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
    //                 required
    //               />
    //             </div>
    //             <div className="ml-3 text-sm">
    //               <label
    //                 htmlFor="terms"
    //                 className="font-light text-gray-500 dark:text-gray-300"
    //               >
    //                 I accept the{" "}
    //                 <a
    //                   className="font-medium text-primary-600 hover:underline dark:text-primary-500"
    //                   href="#"
    //                 >
    //                   Terms and Conditions
    //                 </a>
    //               </label>
    //             </div>
    //           </div>
    //           <button
    //             type="submit"
    //             className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    //           >
    //             Create an account
    //           </button>
    //           <p className="text-sm font-light text-gray-500 dark:text-gray-400">
    //             Already have an account?{" "}
    //             <a
    //               href="#"
    //               className="font-medium text-primary-600 hover:underline dark:text-primary-500"
    //             >
    //               Login here
    //             </a>
    //           </p>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
};
