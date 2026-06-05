export type ComplaintStatus = "Open" | "In Progress" | "Resolved" | "Closed";

export type LostFoundType = "lost" | "found";

export type ItemStatus = "Active" | "Returned" | "Claimed";

export type MarketplaceCategory =
  | "Books"
  | "Calculators"
  | "Electronics"
  | "Cycles"
  | "Hostel Items"
  | "Others";

export interface User {
  id: string;
  sic_number: string;
  full_name: string;
  created_at: string;
}

export interface AuthorizedRepresentative {
  id: string;
  sic_number: string;
  class_name?: string;
  department?: string;
  active: boolean;
  
}

export interface Complaint {
  id: number;
  student_sic: string;
  title: string;
  description: string;
  category: string;
  location: string;
  status: ComplaintStatus;
  created_at: string;
  reported_by_sic?: string;
}

export interface LostFoundPost {
  id: number;
  type: LostFoundType;
  product_name: string;
  description: string;
  location: string;
  contact_email: string;
  image_url: string;
  status: ItemStatus;
  posted_by_sic: string;
  created_at: string;
}

export interface MarketplaceListing {
  id: number;
  product_name: string;
  description: string;
  category: MarketplaceCategory;
  price: number;
  contact_email: string;
  image_url: string;
  posted_by_sic: string;
  moderated: boolean;
  is_spam: boolean;
  created_at: string;
}

export interface Admin {
  id: string;
  admin_id: string;
  name: string;
}
