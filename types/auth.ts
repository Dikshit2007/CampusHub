import type { Admin, User } from "./database";

export type StudentLoginError =
  | "INVALID_SIC"
  | "INCORRECT_PASSWORD"
  | "NOT_FOUND";

export type StudentSignupError =
  | "SIC_REQUIRED"
  | "PASSWORD_REQUIRED"
  | "PASSWORDS_MISMATCH"
  | "SIC_EXISTS";

export interface StudentSession {
  user: User;
  rememberMe?: boolean;
}

export interface AdminSession {
  admin: Admin;
}

export interface CreateComplaintInput {
  student_sic: string;
  title: string;
  description: string;
  category: string;
  location: string;
}

export interface CreateLostFoundInput {
  type: import("./database").LostFoundType;
  product_name: string;
  description: string;
  location: string;
  contact_email: string;
  image_url: string;
  posted_by_sic: string;
}

export interface CreateListingInput {
  product_name: string;
  description: string;
  category: import("./database").MarketplaceCategory;
  price: number;
  contact_email: string;
  image_url: string;
  posted_by_sic: string;
}
