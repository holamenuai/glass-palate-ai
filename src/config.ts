// ─── Restaurant Configuration ───
// Edit this single file to deploy for a different restaurant.

import restaurantBg from "@/assets/restaurant-bg.jpg";

export const CONFIG = {
  /** Backend chat endpoint */
  BACKEND_URL: "https://kcpxtct3i5.us-east-1.awsapprunner.com/chat",

  /** API authentication key */
  API_KEY: "j.vSH4Q4(5)",

  /** Restaurant display name (used in headers, titles, etc.) */
  RESTAURANT_NAME: "Vladimir Kitchen",

  /** Background image for the app */
  BACKGROUND_IMAGE: restaurantBg,

  /** Branding label shown at the bottom */
  BRANDING_NAME: "HolaMenuAI",

  /** Branding link URL */
  BRANDING_URL: "https://holamenuai.com/",
} as const;
