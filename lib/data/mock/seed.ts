import type {
  AuthorizedRepresentative,
  Complaint,
  LostFoundPost,
  MarketplaceListing,
  User,
} from "@/types/database";

export const SEED_USERS: User[] = [
  {
    id: "usr-1",
    sic_number: "SIC2021001",
    full_name: "Rahul Sharma",
    created_at: "2024-08-15T10:00:00Z",
  },
  {
    id: "usr-2",
    sic_number: "SIC2021042",
    full_name: "Priya Nair",
    created_at: "2024-08-16T11:00:00Z",
  },
  {
    id: "usr-3",
    sic_number: "SIC2021088",
    full_name: "Arjun Patel",
    created_at: "2024-09-01T09:00:00Z",
  },
];

export const SEED_PASSWORDS: Record<string, string> = {
  SIC2021001: "crpass123",
  SIC2021042: "student123",
  SIC2021088: "student123",
};

export const SEED_AUTHORIZED_REPS: AuthorizedRepresentative[] = [
  {
    id: "rep-1",
    sic_number: "SIC2021001",
    class_name: "CSE-A",
    department: "Computer Science",
    active: true,
  },
  {
    id: "rep-2",
    sic_number: "SIC2021042",
    class_name: "ECE-B",
    department: "Electronics",
    active: true,
  },
];

export const SEED_COMPLAINTS: Complaint[] = [
  {
    id:1,
    student_sic: "SIC2021001",
    title: "Water leakage in Block B washroom",
    description: "Persistent leakage near the second-floor washroom causing slippery floors.",
    category: "Infrastructure",
    location: "Hostel Block B, Floor 2",
    status: "In Progress",
    created_at: "2025-05-10T08:30:00Z",
  },
  {
    id:2,
    student_sic: "SIC2021001",
    title: "Library AC not working",
    description: "Central library reading hall AC units 3 and 4 are non-functional.",
    category: "Infrastructure",
    location: "Central Library",
    status: "Open",
    created_at: "2025-05-18T14:00:00Z",
  },
  {
    id:3,
    student_sic: "SIC2021042",
    title: "Canteen hygiene concern",
    description: "Food storage area needs better sanitation checks during peak hours.",
    category: "Canteen",
    location: "Main Campus Canteen",
    status: "Resolved",
    created_at: "2025-04-22T11:15:00Z",
  },
  {
    id:4,
    student_sic: "SIC2021042",
    title: "Bus timing inconsistency",
    description: "Evening shuttle departs 15–20 minutes late on weekdays.",
    category: "Transport",
    location: "Campus Gate 1",
    status: "Closed",
    created_at: "2025-03-05T07:45:00Z",
  },
];

const img = (label: string) =>
  `https://placehold.co/400x300/e2e8f0/2563eb?text=${encodeURIComponent(label)}`;

export const SEED_LOST_FOUND: LostFoundPost[] = [
  {
    id: 1,
    type: "lost",
    product_name: "Scientific Calculator",
    description: "Casio fx-991EX, black cover, name sticker on back.",
    location: "Exam Hall 3",
    contact_email: "arjun.patel@college.edu",
    image_url: img("Calculator"),
    status: "Active",
    posted_by_sic: "SIC2021088",
    created_at: "2025-05-20T09:00:00Z",
  },
  {
    id: 2,
    type: "lost",
    product_name: "College ID Card",
    description: "Blue lanyard, CSE department, lost near cafeteria.",
    location: "Main Cafeteria",
    contact_email: "rahul.sharma@college.edu",
    image_url: img("ID Card"),
    status: "Active",
    posted_by_sic: "SIC2021001",
    created_at: "2025-05-19T16:30:00Z",
  },
  {
    id: 3,
    type: "found",
    product_name: "Wireless Earbuds Case",
    description: "White case only, found on library table near window.",
    location: "Central Library",
    contact_email: "priya.nair@college.edu",
    image_url: img("Earbuds"),
    status: "Active",
    posted_by_sic: "SIC2021042",
    created_at: "2025-05-21T10:00:00Z",
  },
  {
    id: 4,
    type: "found",
    product_name: "Umbrella",
    description: "Navy blue foldable umbrella left in lecture hall.",
    location: "LT-204",
    contact_email: "found.items@college.edu",
    image_url: img("Umbrella"),
    status: "Returned",
    posted_by_sic: "SIC2021042",
    created_at: "2025-04-28T12:00:00Z",
  },
];

export const SEED_MARKETPLACE: MarketplaceListing[] = [
  {
    id: 1,
    product_name: "Engineering Mathematics Vol. 2",
    description: "Good condition, minimal highlighting, 2023 edition.",
    category: "Books",
    price: 350,
    contact_email: "rahul.sharma@college.edu",
    image_url: img("Book"),
    posted_by_sic: "SIC2021001",
    moderated: true,
    is_spam: false,
    created_at: "2025-05-15T08:00:00Z",
  },
  {
    id: 2,
    product_name: "HP Laptop Stand",
    description: "Aluminium adjustable stand, used for 6 months.",
    category: "Electronics",
    price: 800,
    contact_email: "priya.nair@college.edu",
    image_url: img("Laptop Stand"),
    posted_by_sic: "SIC2021042",
    moderated: true,
    is_spam: false,
    created_at: "2025-05-12T14:00:00Z",
  },
  {
    id: 3,
    product_name: "Mountain Bike",
    description: "Hero Sprint, 21-speed, minor scratches, fully functional.",
    category: "Cycles",
    price: 4500,
    contact_email: "arjun.patel@college.edu",
    image_url: img("Bike"),
    posted_by_sic: "SIC2021088",
    moderated: false,
    is_spam: false,
    created_at: "2025-05-22T11:00:00Z",
  },
  {
    id: 4,
    product_name: "Hostel Study Lamp",
    description: "LED desk lamp with USB port, hostel moving sale.",
    category: "Hostel Items",
    price: 250,
    contact_email: "seller@college.edu",
    image_url: img("Lamp"),
    posted_by_sic: "SIC2021001",
    moderated: true,
    is_spam: false,
    created_at: "2025-05-01T09:30:00Z",
  },
];


