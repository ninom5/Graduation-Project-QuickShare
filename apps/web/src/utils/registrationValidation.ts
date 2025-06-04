import { RegisterDataType } from "../types/registerData.type";
import { emailValidation } from "./emailValidation";

export const registrationValidation = (registerData: RegisterDataType) => {
  const requiredFields: (keyof RegisterDataType)[] = [
    "firstName",
    "lastName",
    "username",
    "email",
    "password",
    "confirmPassword",
  ];

  for (const field of requiredFields) {
    if (registerData[field]?.trim() === "")
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
  }

  if (!emailValidation(registerData.email)) return "Email is not valid";

  if (registerData.password.length < 8)
    return "Password must be at least 8 characters long";

  if (registerData.password !== registerData.confirmPassword)
    return "Passwords do not match";

  if (registerData.phoneNumber && isNaN(Number(registerData.phoneNumber)))
    return "Phone number must be a number";
};
