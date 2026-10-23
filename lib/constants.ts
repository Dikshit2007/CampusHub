import type { ComplaintStatus, MarketplaceCategory } from "@/types/database";

export const APP_NAME = "CampusHub";

export const ROUTES = {
  home: "/",
  studentLogin: "/login",
  studentSignup: "/signup",
  studentDashboard: "/dashboard",
  complaints: "/complaints",
  lostFound: "/lost-found",
  marketplace: "/marketplace",
  adminLogin: "/admin/login",
  adminDashboard: "/admin/dashboard",
  adminComplaints: "/admin/dashboard/complaints",
  adminLostFound: "/admin/dashboard/lost-found",
  adminMarketplace: "/admin/dashboard/marketplace",
  dashboard: "/dashboard",
  signup: "/signup",
} as const;

export const COMPLAINT_STATUSES: ComplaintStatus[] = [
  "Open",
  "In Progress",
  "Resolved",
  "Closed",
];

export const COMPLAINT_CATEGORIES = [
  "Infrastructure",
  "Academic",
  "Hostel",
  "Canteen",
  "Transport",
  "Safety",
  "Other",
] as const;

export const MARKETPLACE_CATEGORIES: MarketplaceCategory[] = [
  "Electronics & Accessories",
  "Books & Study Materials",
  "Clothing & Fashion",
  "Stationery",
  "Hostel & Daily Essentials",
];

export const STUDENT_SESSION_KEY = "campushub_student_session";
export const ADMIN_SESSION_KEY = "campushub_admin_session";
export const MOCK_DATA_KEY = "campushub_mock_data";
