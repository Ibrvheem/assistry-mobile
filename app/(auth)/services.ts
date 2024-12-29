import api from "@/lib/api";
import {
  CreatePasswordPayload,
  RequestOTPPayload,
  VerifyOTP,
  VerifyStudentRegNo,
} from "./types";

export function getStudentData(payload: VerifyStudentRegNo) {
  const response = api.post("udus", payload);
  return response;
}

export function requestOTP(payload: RequestOTPPayload) {
  const response = api.post("auth/send-otp", payload);
  return response;
}
export function verifyOTP(payload: VerifyOTP) {
  const response = api.post("auth/verify-otp", payload);
  return response;
}

export function createPassword(payload: CreatePasswordPayload) {
  const response = api.post("auth/signup", payload);
  return response;
}