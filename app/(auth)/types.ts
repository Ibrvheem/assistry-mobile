import { z } from "zod";

export const verifyStudentRegNo = z.object({
  reg_no: z.string(),
});
export const studentDataSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  phone_no: z.string(),
  reg_no: z.string(),
});
export const requestOTPPayload = z.object({
  email: z.string().email(),
  phone_no: z.string(),
});
export const verifyOTP = z.object({
  email: z.string().email(),
  otp: z.string(),
});

export const createPasswordPayload = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirm_password: z.string().optional(),
    reg_no: z.string().optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"], // Error will be shown for the confirm_password field
    message: "Passwords do not match",
  });

export type StudentData = z.infer<typeof studentDataSchema>;
export type RequestOTPPayload = z.infer<typeof requestOTPPayload>;
export type VerifyStudentRegNo = z.infer<typeof verifyStudentRegNo>;
export type VerifyOTP = z.infer<typeof verifyOTP>;
export type CreatePasswordPayload = z.infer<typeof createPasswordPayload>;