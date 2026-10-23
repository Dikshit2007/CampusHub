/**
 * CampusHub Demo Data Seed Script
 *
 * Usage:
 *   node scripts/seed-demo-data.mjs
 *
 * Requires in .env.local (or set as env vars):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 *
 * This script is IDEMPOTENT — it checks for existing demo records
 * (by title/name) before inserting. It will NOT delete or overwrite
 * existing real data. Run it safely multiple times.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local manually
function loadEnv() {
  const envPath = resolve(__dirname, "../.env.local");
  const env = {};
  try {
    const content = readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
      env[key] = val;
    }
  } catch {
    console.warn("Could not read .env.local, using process.env");
  }
  return env;
}

const envVars = loadEnv();
const SUPABASE_URL =
  envVars.NEXT_PUBLIC_SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  envVars.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_KEY. Check your .env.local file.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const img = (label) =>
  `https://placehold.co/400x300/e2e8f0/2563eb?text=${encodeURIComponent(label)}`;

// Demo SIC numbers — these students must exist in users table for FK constraints
// If your DB doesn't enforce FK on complaints.reported_by_sic, any value works.
const DEMO_SIC = "DEMO0000001";

// ─────────────────────────────────────────────
// 10 Demo Complaints
// ─────────────────────────────────────────────
const DEMO_COMPLAINTS = [
  {
    reported_by_sic: DEMO_SIC,
    title: "[DEMO] Water leakage in Block B washroom",
    description: "Persistent leakage near the second-floor washroom causing slippery floors and safety hazards.",
    category: "Infrastructure",
    location: "Hostel Block B, Floor 2",
    status: "In Progress",
    created_at: "2025-09-10T08:30:00Z",
  },
  {
    reported_by_sic: DEMO_SIC,
    title: "[DEMO] Library AC units not working",
    description: "Central library reading hall AC units 3 and 4 are non-functional. Temperature is unbearable.",
    category: "Infrastructure",
    location: "Central Library – Reading Hall",
    status: "Open",
    created_at: "2025-09-18T14:00:00Z",
  },
  {
    reported_by_sic: DEMO_SIC,
    title: "[DEMO] Canteen hygiene concern",
    description: "Food storage area observed with uncovered utensils and insects near the counter during peak hours.",
    category: "Canteen",
    location: "Main Campus Canteen",
    status: "Resolved",
    created_at: "2025-08-22T11:15:00Z",
  },
  {
    reported_by_sic: DEMO_SIC,
    title: "[DEMO] Evening bus timing inconsistency",
    description: "Evening shuttle departing 15–20 minutes late consistently on weekdays causing students to miss connections.",
    category: "Transport",
    location: "Campus Gate 1 – Bus Stop",
    status: "Closed",
    created_at: "2025-07-05T07:45:00Z",
  },
  {
    reported_by_sic: DEMO_SIC,
    title: "[DEMO] Broken projector in LT-201",
    description: "Projector in Lecture Theatre 201 has been non-functional for two weeks, affecting classes daily.",
    category: "Academic",
    location: "Lecture Theatre 201",
    status: "In Progress",
    created_at: "2025-09-25T09:00:00Z",
  },
  {
    reported_by_sic: DEMO_SIC,
    title: "[DEMO] Unlit pathway near boys hostel",
    description: "The pathway between Block C and the sports complex has no street lighting, posing safety risks at night.",
    category: "Safety",
    location: "Block C to Sports Complex Pathway",
    status: "Open",
    created_at: "2025-09-28T20:00:00Z",
  },
  {
    reported_by_sic: DEMO_SIC,
    title: "[DEMO] Computer lab PCs running slow",
    description: "Systems in Lab 3 are extremely slow with outdated RAM. Faculty have complained too.",
    category: "Academic",
    location: "Computer Lab 3, Block A",
    status: "Open",
    created_at: "2025-09-15T10:30:00Z",
  },
  {
    reported_by_sic: DEMO_SIC,
    title: "[DEMO] Broken tap in girls hostel bathroom",
    description: "Two taps in the shared bathroom on Floor 3 are broken and causing water wastage.",
    category: "Hostel",
    location: "Girls Hostel, Floor 3",
    status: "Resolved",
    created_at: "2025-08-30T07:00:00Z",
  },
  {
    reported_by_sic: DEMO_SIC,
    title: "[DEMO] Garbage not collected near parking",
    description: "Garbage bin near the parking area has not been emptied in 5 days. Causing foul smell.",
    category: "Infrastructure",
    location: "Student Parking Area, Gate 2",
    status: "Closed",
    created_at: "2025-08-10T08:00:00Z",
  },
  {
    reported_by_sic: DEMO_SIC,
    title: "[DEMO] Wi-Fi dead zone in reading room",
    description: "The reading room in the library has no Wi-Fi coverage. Students can't access online resources.",
    category: "Other",
    location: "Library – Silent Reading Room",
    status: "In Progress",
    created_at: "2025-09-20T13:00:00Z",
  },
];

// ─────────────────────────────────────────────
// 10 Demo Lost & Found Posts
// ─────────────────────────────────────────────
const DEMO_LOST_FOUND = [
  {
    type: "lost",
    product_name: "[DEMO] Casio Scientific Calculator",
    description: "Casio fx-991EX, black cover with yellow trim. Name sticker on back.",
    location: "Exam Hall 3",
    contact_email: "demo.student1@college.edu",
    image_url: img("Calculator"),
    status: "Active",
    posted_by_sic: DEMO_SIC,
    created_at: "2025-09-20T09:00:00Z",
  },
  {
    type: "lost",
    product_name: "[DEMO] College ID Card",
    description: "Blue lanyard, CSE department ID. Lost near the main cafeteria entrance.",
    location: "Main Cafeteria",
    contact_email: "demo.student2@college.edu",
    image_url: img("ID+Card"),
    status: "Active",
    posted_by_sic: DEMO_SIC,
    created_at: "2025-09-19T16:30:00Z",
  },
  {
    type: "lost",
    product_name: "[DEMO] Blue Water Bottle (Cello brand)",
    description: "1-litre blue Cello steel bottle with orange cap. Name written in marker.",
    location: "Basketball Court",
    contact_email: "demo.student3@college.edu",
    image_url: img("Water+Bottle"),
    status: "Active",
    posted_by_sic: DEMO_SIC,
    created_at: "2025-09-22T15:00:00Z",
  },
  {
    type: "lost",
    product_name: "[DEMO] Black Laptop Backpack",
    description: "Dell backpack with red zipper. Contains textbooks and a charger. Very important.",
    location: "Library – Ground Floor",
    contact_email: "demo.student4@college.edu",
    image_url: img("Backpack"),
    status: "Active",
    posted_by_sic: DEMO_SIC,
    created_at: "2025-09-24T11:00:00Z",
  },
  {
    type: "lost",
    product_name: "[DEMO] Prescription Glasses",
    description: "Black rectangular frame, -2.5 power. Lost in the seminar hall.",
    location: "Seminar Hall, Block B",
    contact_email: "demo.student5@college.edu",
    image_url: img("Glasses"),
    status: "Active",
    posted_by_sic: DEMO_SIC,
    created_at: "2025-09-26T14:00:00Z",
  },
  {
    type: "found",
    product_name: "[DEMO] Wireless Earbuds Case",
    description: "White earbuds case (no earbuds inside). Found on a library table near the window.",
    location: "Central Library – First Floor",
    contact_email: "demo.finder1@college.edu",
    image_url: img("Earbuds"),
    status: "Active",
    posted_by_sic: DEMO_SIC,
    created_at: "2025-09-21T10:00:00Z",
  },
  {
    type: "found",
    product_name: "[DEMO] Navy Blue Umbrella",
    description: "Compact foldable umbrella left behind in LT-204 after a lecture.",
    location: "Lecture Theatre 204",
    contact_email: "demo.finder2@college.edu",
    image_url: img("Umbrella"),
    status: "Returned",
    posted_by_sic: DEMO_SIC,
    created_at: "2025-09-18T12:00:00Z",
  },
  {
    type: "found",
    product_name: "[DEMO] Keys with Green Keychain",
    description: "A set of 3 keys on a green leaf-shaped keychain. Found near the canteen.",
    location: "Main Canteen – Seating Area",
    contact_email: "demo.finder3@college.edu",
    image_url: img("Keys"),
    status: "Active",
    posted_by_sic: DEMO_SIC,
    created_at: "2025-09-27T13:30:00Z",
  },
  {
    type: "found",
    product_name: "[DEMO] Engineering Drawing Set",
    description: "Staedtler drawing instruments in a metal box. Found in Design Lab.",
    location: "Design Lab, Block C",
    contact_email: "demo.finder4@college.edu",
    image_url: img("Drawing+Set"),
    status: "Active",
    posted_by_sic: DEMO_SIC,
    created_at: "2025-09-25T09:00:00Z",
  },
  {
    type: "found",
    product_name: "[DEMO] Notebook (Red Cover)",
    description: "A red-covered spiral notebook with chemistry notes. Name not visible on first page.",
    location: "Chemistry Lab, Block A",
    contact_email: "demo.finder5@college.edu",
    image_url: img("Notebook"),
    status: "Active",
    posted_by_sic: DEMO_SIC,
    created_at: "2025-09-23T10:00:00Z",
  },
];

// ─────────────────────────────────────────────
// 30 Demo Marketplace Listings (6 per category)
// ─────────────────────────────────────────────
const DEMO_MARKETPLACE = [
  // Electronics & Accessories (6)
  {
    product_name: "[DEMO] JBL Clip 3 Bluetooth Speaker",
    description: "Compact JBL Clip 3 speaker, excellent sound quality. Battery lasts 10 hours. Minor scuff on clip.",
    category: "Electronics & Accessories",
    price: 1500,
    contact_email: "demo.seller1@college.edu",
    image_url: img("Speaker"),
    posted_by_sic: DEMO_SIC,
    moderated: true,
    is_spam: false,
  },
  {
    product_name: "[DEMO] USB-C 65W Laptop Charger",
    description: "Compatible with Dell, HP, Lenovo. Good condition, cable intact. Selling since I got a new laptop.",
    category: "Electronics & Accessories",
    price: 600,
    contact_email: "demo.seller2@college.edu",
    image_url: img("Charger"),
    posted_by_sic: DEMO_SIC,
    moderated: true,
    is_spam: false,
  },
  {
    product_name: "[DEMO] Boat Bassheads 242 Earphones",
    description: "Wired earphones with mic. Used for 3 months, no tangles, excellent bass.",
    category: "Electronics & Accessories",
    price: 350,
    contact_email: "demo.seller3@college.edu",
    image_url: img("Earphones"),
    posted_by_sic: DEMO_SIC,
    moderated: true,
    is_spam: false,
  },
  {
    product_name: "[DEMO] Aluminium Laptop Stand",
    description: "Height-adjustable aluminium stand. Folds flat for portability. Barely used.",
    category: "Electronics & Accessories",
    price: 750,
    contact_email: "demo.seller4@college.edu",
    image_url: img("Laptop+Stand"),
    posted_by_sic: DEMO_SIC,
    moderated: false,
    is_spam: false,
  },
  {
    product_name: "[DEMO] Mechanical Keyboard (TKL)",
    description: "Blue switch TKL keyboard. Great for typing and coding. Small scratch on corner, otherwise perfect.",
    category: "Electronics & Accessories",
    price: 2000,
    contact_email: "demo.seller5@college.edu",
    image_url: img("Keyboard"),
    posted_by_sic: DEMO_SIC,
    moderated: true,
    is_spam: false,
  },
  {
    product_name: "[DEMO] Logitech M235 Wireless Mouse",
    description: "Reliable wireless mouse, batteries included. Works perfectly. Selling as I moved to trackpad.",
    category: "Electronics & Accessories",
    price: 400,
    contact_email: "demo.seller6@college.edu",
    image_url: img("Mouse"),
    posted_by_sic: DEMO_SIC,
    moderated: true,
    is_spam: false,
  },

  // Books & Study Materials (6)
  {
    product_name: "[DEMO] Engineering Mathematics Vol. 2 (Kreyszig)",
    description: "10th edition, minimal highlighting, all pages intact. Perfect for 2nd year students.",
    category: "Books & Study Materials",
    price: 450,
    contact_email: "demo.seller7@college.edu",
    image_url: img("Math+Book"),
    posted_by_sic: DEMO_SIC,
    moderated: true,
    is_spam: false,
  },
  {
    product_name: "[DEMO] Data Structures (Cormen – CLRS)",
    description: "Introduction to Algorithms 3rd Ed. Some pencil markings. Binding strong.",
    category: "Books & Study Materials",
    price: 700,
    contact_email: "demo.seller8@college.edu",
    image_url: img("CLRS+Book"),
    posted_by_sic: DEMO_SIC,
    moderated: true,
    is_spam: false,
  },
  {
    product_name: "[DEMO] Physics Resnick & Halliday (Vol. 1 & 2)",
    description: "Both volumes in good condition. Useful for first-year physics. Slightly worn cover.",
    category: "Books & Study Materials",
    price: 550,
    contact_email: "demo.seller9@college.edu",
    image_url: img("Physics+Book"),
    posted_by_sic: DEMO_SIC,
    moderated: true,
    is_spam: false,
  },
  {
    product_name: "[DEMO] Organic Chemistry (Morrison & Boyd)",
    description: "Essential for chemistry students. Good condition with own handwritten notes included.",
    category: "Books & Study Materials",
    price: 400,
    contact_email: "demo.seller10@college.edu",
    image_url: img("Chem+Book"),
    posted_by_sic: DEMO_SIC,
    moderated: false,
    is_spam: false,
  },
  {
    product_name: "[DEMO] Gate 2025 Preparation Set (CS)",
    description: "Set of 5 GATE prep books for Computer Science. Previous year papers included.",
    category: "Books & Study Materials",
    price: 950,
    contact_email: "demo.seller11@college.edu",
    image_url: img("GATE+Books"),
    posted_by_sic: DEMO_SIC,
    moderated: true,
    is_spam: false,
  },
  {
    product_name: "[DEMO] Big-O Cheat Sheet Poster (Laminated)",
    description: "A3 laminated algorithm complexity cheat sheet. Great for desk or hostel room wall.",
    category: "Books & Study Materials",
    price: 80,
    contact_email: "demo.seller12@college.edu",
    image_url: img("Cheat+Sheet"),
    posted_by_sic: DEMO_SIC,
    moderated: true,
    is_spam: false,
  },

  // Clothing & Fashion (6)
  {
    product_name: "[DEMO] College Hoodie (L – Grey)",
    description: "Official CampusHub college hoodie. Size L, worn 4-5 times. Perfect condition.",
    category: "Clothing & Fashion",
    price: 500,
    contact_email: "demo.seller13@college.edu",
    image_url: img("Hoodie"),
    posted_by_sic: DEMO_SIC,
    moderated: true,
    is_spam: false,
  },
  {
    product_name: "[DEMO] Formal White Shirt (Men's, M)",
    description: "Barely worn formal shirt. Perfect for placement drives or seminars.",
    category: "Clothing & Fashion",
    price: 300,
    contact_email: "demo.seller14@college.edu",
    image_url: img("Shirt"),
    posted_by_sic: DEMO_SIC,
    moderated: true,
    is_spam: false,
  },
  {
    product_name: "[DEMO] Sports Shoes (Nike, Size 9)",
    description: "Nike Revolution running shoes. Used for 6 months. Good sole left. No box.",
    category: "Clothing & Fashion",
    price: 1200,
    contact_email: "demo.seller15@college.edu",
    image_url: img("Shoes"),
    posted_by_sic: DEMO_SIC,
    moderated: false,
    is_spam: false,
  },
  {
    product_name: "[DEMO] Denim Jacket (Unisex, M)",
    description: "Light blue denim jacket, unisex cut. Very good condition. Outgrown it.",
    category: "Clothing & Fashion",
    price: 700,
    contact_email: "demo.seller16@college.edu",
    image_url: img("Jacket"),
    posted_by_sic: DEMO_SIC,
    moderated: true,
    is_spam: false,
  },
  {
    product_name: "[DEMO] Lab Coat (White, M)",
    description: "Standard white lab coat, used for 1 semester. Clean, no stains.",
    category: "Clothing & Fashion",
    price: 200,
    contact_email: "demo.seller17@college.edu",
    image_url: img("Lab+Coat"),
    posted_by_sic: DEMO_SIC,
    moderated: true,
    is_spam: false,
  },
  {
    product_name: "[DEMO] Sunglasses (Polarized UV400)",
    description: "Black frame polarized sunglasses. Excellent condition with case.",
    category: "Clothing & Fashion",
    price: 350,
    contact_email: "demo.seller18@college.edu",
    image_url: img("Sunglasses"),
    posted_by_sic: DEMO_SIC,
    moderated: true,
    is_spam: false,
  },

  // Stationery (6)
  {
    product_name: "[DEMO] Staedtler Drawing Instruments Set",
    description: "Complete engineering drawing set in metal box. All parts present. Good for first years.",
    category: "Stationery",
    price: 180,
    contact_email: "demo.seller19@college.edu",
    image_url: img("Drawing+Set"),
    posted_by_sic: DEMO_SIC,
    moderated: true,
    is_spam: false,
  },
  {
    product_name: "[DEMO] Bundle of 10 Pilot G2 Pens",
    description: "Unopened pack of 10 Pilot G2 blue gel pens. Smooth writing.",
    category: "Stationery",
    price: 150,
    contact_email: "demo.seller20@college.edu",
    image_url: img("Pens"),
    posted_by_sic: DEMO_SIC,
    moderated: true,
    is_spam: false,
  },
  {
    product_name: "[DEMO] A4 Grid Notebooks (Pack of 4)",
    description: "4 unused A4 spiral grid notebooks. Perfect for lab records or engineering drawings.",
    category: "Stationery",
    price: 120,
    contact_email: "demo.seller21@college.edu",
    image_url: img("Notebooks"),
    posted_by_sic: DEMO_SIC,
    moderated: true,
    is_spam: false,
  },
  {
    product_name: "[DEMO] Graphic Tablet (Wacom Bamboo)",
    description: "Entry-level Wacom drawing tablet, great for CS/design projects. Stylus included.",
    category: "Stationery",
    price: 1800,
    contact_email: "demo.seller22@college.edu",
    image_url: img("Tablet"),
    posted_by_sic: DEMO_SIC,
    moderated: false,
    is_spam: false,
  },
  {
    product_name: "[DEMO] Post-it Notes (Multicolor, 6 packs)",
    description: "6 packs of multicolor Post-it notes. Great for revision and wall planning.",
    category: "Stationery",
    price: 90,
    contact_email: "demo.seller23@college.edu",
    image_url: img("Post-it"),
    posted_by_sic: DEMO_SIC,
    moderated: true,
    is_spam: false,
  },
  {
    product_name: "[DEMO] Scientific Calculator (Casio fx-991ES Plus)",
    description: "Casio scientific calculator, perfect working condition. Cover included.",
    category: "Stationery",
    price: 350,
    contact_email: "demo.seller24@college.edu",
    image_url: img("Calculator"),
    posted_by_sic: DEMO_SIC,
    moderated: true,
    is_spam: false,
  },

  // Hostel & Daily Essentials (6)
  {
    product_name: "[DEMO] LED Study Lamp with USB Port",
    description: "Adjustable LED desk lamp with USB charging port. 3 brightness levels. Moving out sale.",
    category: "Hostel & Daily Essentials",
    price: 280,
    contact_email: "demo.seller25@college.edu",
    image_url: img("Lamp"),
    posted_by_sic: DEMO_SIC,
    moderated: true,
    is_spam: false,
  },
  {
    product_name: "[DEMO] Compact Travel Iron",
    description: "Philips foldable travel iron. Perfect for hostel life. Dual voltage.",
    category: "Hostel & Daily Essentials",
    price: 400,
    contact_email: "demo.seller26@college.edu",
    image_url: img("Iron"),
    posted_by_sic: DEMO_SIC,
    moderated: true,
    is_spam: false,
  },
  {
    product_name: "[DEMO] Extension Board (4 Socket, 2m)",
    description: "Surge-protected 4-socket extension board. 2-metre cord. Used, fully functional.",
    category: "Hostel & Daily Essentials",
    price: 200,
    contact_email: "demo.seller27@college.edu",
    image_url: img("Extension+Board"),
    posted_by_sic: DEMO_SIC,
    moderated: true,
    is_spam: false,
  },
  {
    product_name: "[DEMO] Steel Water Bottle (Milton, 1L)",
    description: "Insulated Milton steel bottle, keeps water cold for 24 hrs. No dents.",
    category: "Hostel & Daily Essentials",
    price: 250,
    contact_email: "demo.seller28@college.edu",
    image_url: img("Water+Bottle"),
    posted_by_sic: DEMO_SIC,
    moderated: false,
    is_spam: false,
  },
  {
    product_name: "[DEMO] Bed Sheet Set (Single, Cotton)",
    description: "Single bed cotton sheets, 2 bedsheets + 1 pillow cover. Clean, washed.",
    category: "Hostel & Daily Essentials",
    price: 300,
    contact_email: "demo.seller29@college.edu",
    image_url: img("Bed+Sheet"),
    posted_by_sic: DEMO_SIC,
    moderated: true,
    is_spam: false,
  },
  {
    product_name: "[DEMO] Mini Electric Kettle (1L)",
    description: "Compact 1L electric kettle, perfect for hostel. Makes tea, coffee, noodles.",
    category: "Hostel & Daily Essentials",
    price: 450,
    contact_email: "demo.seller30@college.edu",
    image_url: img("Kettle"),
    posted_by_sic: DEMO_SIC,
    moderated: true,
    is_spam: false,
  },
];

// ─────────────────────────────────────────────
// Insertion helpers
// ─────────────────────────────────────────────

async function seedComplaints() {
  console.log("\n📋 Seeding complaints...");

  // Fetch existing demo complaint titles
  const { data: existing } = await supabase
    .from("complaints")
    .select("title")
    .like("title", "[DEMO]%");

  const existingTitles = new Set((existing ?? []).map((r) => r.title));

  const toInsert = DEMO_COMPLAINTS.filter((c) => !existingTitles.has(c.title));

  if (toInsert.length === 0) {
    console.log("  ✅ All demo complaints already exist. Skipping.");
    return;
  }

  const { error } = await supabase.from("complaints").insert(toInsert);

  if (error) {
    console.error("  ❌ Error inserting complaints:", error.message);
  } else {
    console.log(`  ✅ Inserted ${toInsert.length} demo complaints.`);
  }
}

async function seedLostFound() {
  console.log("\n📦 Seeding lost & found...");

  const { data: existing } = await supabase
    .from("lost_found")
    .select("product_name")
    .like("product_name", "[DEMO]%");

  const existingNames = new Set((existing ?? []).map((r) => r.product_name));

  const toInsert = DEMO_LOST_FOUND.filter((p) => !existingNames.has(p.product_name));

  if (toInsert.length === 0) {
    console.log("  ✅ All demo lost & found posts already exist. Skipping.");
    return;
  }

  const { error } = await supabase.from("lost_found").insert(toInsert);

  if (error) {
    console.error("  ❌ Error inserting lost & found:", error.message);
  } else {
    console.log(`  ✅ Inserted ${toInsert.length} demo lost & found posts.`);
  }
}

async function seedMarketplace() {
  console.log("\n🛒 Seeding marketplace...");

  const { data: existing } = await supabase
    .from("marketplace")
    .select("product_name")
    .like("product_name", "[DEMO]%");

  const existingNames = new Set((existing ?? []).map((r) => r.product_name));

  const toInsert = DEMO_MARKETPLACE.filter((l) => !existingNames.has(l.product_name));

  if (toInsert.length === 0) {
    console.log("  ✅ All demo marketplace listings already exist. Skipping.");
    return;
  }

  const { error } = await supabase.from("marketplace").insert(toInsert);

  if (error) {
    console.error("  ❌ Error inserting marketplace listings:", error.message);
  } else {
    console.log(`  ✅ Inserted ${toInsert.length} demo marketplace listings.`);
  }
}

// ─────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────
async function main() {
  console.log("🌱 CampusHub Demo Data Seed");
  console.log("   Supabase URL:", SUPABASE_URL);
  console.log("   Key type:", SUPABASE_KEY?.startsWith("eyJ") ? "JWT token" : "unknown");

  await seedComplaints();
  await seedLostFound();
  await seedMarketplace();

  console.log("\n✨ Seeding complete!\n");
  console.log("NOTE: If you see RLS errors, you need either:");
  console.log("  1. A SUPABASE_SERVICE_ROLE_KEY in .env.local, OR");
  console.log("  2. Temporarily allow INSERT for the anon role in Supabase dashboard.");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
