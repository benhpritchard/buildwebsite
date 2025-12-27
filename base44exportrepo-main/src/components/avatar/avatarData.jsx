// Avatar and Office Data Catalogs for FinnQuest

// -----------------------------
// UTILITY FUNCTIONS
// -----------------------------

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const slug = (s) => s.toLowerCase().replace(/\s+/g, "-");
const title = (s) => s.split("-").map(capitalize).join(" ");

// -----------------------------
// AVATAR CATALOG GENERATION
// -----------------------------

// Character sprite sheets (legacy - keeping for reference)
export const CHARACTER_BODIES_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/0775c92d3_ChatGPTImageNov25202507_57_28PM.png";
export const CHARACTER_HEADS_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/7f29ca8b7_ChatGPTImageNov25202508_01_25PM.png";

// Individual head images
export const HEAD_OPTIONS = [
  { id: "head-1", name: "Head 1", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/2aacb217c_Screenshot2025-11-25201435.png", price: 0 },
  { id: "head-2", name: "Head 2", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/1cfc82655_Screenshot2025-11-25201432.png", price: 0 },
  { id: "head-3", name: "Head 3", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/d597cf6a5_Screenshot2025-11-25201429.png", price: 0 },
  { id: "head-4", name: "Head 4", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/7d93dc0f1_Screenshot2025-11-25201425.png", price: 0 },
  { id: "head-5", name: "Head 5", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/ab8940b47_Screenshot2025-11-25201422.png", price: 0 },
  { id: "head-6", name: "Head 6", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/1b8845c28_Screenshot2025-11-25201419.png", price: 0 },
  { id: "head-7", name: "Head 7", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/1d92b2dac_Screenshot2025-11-25201415.png", price: 0 },
  { id: "head-8", name: "Head 8", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/51bd1618f_Screenshot2025-11-25201412.png", price: 0 },
  { id: "head-9", name: "Head 9", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/dfbdb008b_Screenshot2025-11-25201408.png", price: 0 },
  { id: "head-10", name: "Head 10", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/707263cac_Screenshot2025-11-25201404.png", price: 0 },
  { id: "head-11", name: "Head 11", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/b3e2a064d_Screenshot2025-11-25201401.png", price: 0 },
  { id: "head-12", name: "Head 12", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/5063f2798_Screenshot2025-11-25201358.png", price: 0 },
  { id: "head-13", name: "Head 13", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/4e61f6c89_Screenshot2025-11-25201355.png", price: 0 },
  { id: "head-14", name: "Head 14", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/29895d1ca_Screenshot2025-11-25201352.png", price: 0 },
  { id: "head-15", name: "Head 15", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/cb81d5330_Screenshot2025-11-25201348.png", price: 0 },
  { id: "head-16", name: "Head 16", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/9dc7df3ee_Screenshot2025-11-25201345.png", price: 0 },
  { id: "head-17", name: "Head 17", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/8dca1320c_Screenshot2025-11-25201341.png", price: 0 },
  { id: "head-18", name: "Head 18", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/77b174559_Screenshot2025-11-25201337.png", price: 0 },
  { id: "head-19", name: "Head 19", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/9eab23094_Screenshot2025-11-25201335.png", price: 0 },
  { id: "head-20", name: "Head 20", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/e751575b6_Screenshot2025-11-25201331.png", price: 0 },
  { id: "head-21", name: "Head 21", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/88782c65f_Screenshot2025-11-25201329.png", price: 0 },
  { id: "head-22", name: "Head 22", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/9d1709ed4_Screenshot2025-11-25201326.png", price: 0 },
  { id: "head-23", name: "Head 23", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/88cedd03d_Screenshot2025-11-25201322.png", price: 0 },
  { id: "head-24", name: "Head 24", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/697bc981c_Screenshot2025-11-25201318.png", price: 0 },
  { id: "head-25", name: "Head 25", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/c83f956db_Screenshot2025-11-25201313.png", price: 0 },
];

// Fixed gender-neutral base image for all avatars
export const BASE_OPTIONS = [];
export const DEFAULT_BASE_IMAGE = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/a196ee5f2_AVATAR1.png";
export const AVATAR_BACKGROUND_DEFAULT = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/a6355900a_Gemini_Generated_Image_yb78f6yb78f6yb78.png";

// Individual hair images - ALL FREE
export const HAIR_OPTIONS = [
  { id: "hair-none", name: "No Hair", image: null, price: 0, layer: "hair" },
  { id: "hair-1", name: "Bob Brown", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/e0790beba_ChatGPTImageNov26202508_10_59AM.png", price: 0, layer: "hair" },
  { id: "hair-2", name: "Bob Blonde", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/304048e6d_ChatGPTImageNov26202508_10_16AM.png", price: 0, layer: "hair" },
  { id: "hair-3", name: "Curly Brown", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/ca7f922be_ChatGPTImageNov26202508_07_18AM.png", price: 0, layer: "hair" },
  { id: "hair-4", name: "Bun Blonde", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/6ac1fc45a_ChatGPTImageNov26202508_06_26AM.png", price: 0, layer: "hair" },
  { id: "hair-5", name: "Short Brown", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/fcb99d217_ChatGPTImageNov26202508_05_03AM.png", price: 0, layer: "hair" },
  { id: "hair-6", name: "Side Blonde", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/ff1f7b8b9_ChatGPTImageNov26202508_11_45AM.png", price: 0, layer: "hair" },
  { id: "hair-7", name: "Classic Brown", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/78ea8ef1c_ChatGPTImageNov26202508_10_59AM.png", price: 0, layer: "hair" },
  { id: "hair-8", name: "Wavy Blue", image: "https://github.com/benhpritchard/gamethumbnails/blob/main/Gemini_Generated_Image_6v2p4i6v2p4i6v2p-Photoroom.png?raw=true", price: 0, layer: "hair" },
  { id: "hair-9", name: "Short Auburn", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/fa1db60de_ChatGPTImageNov25202509_22_30PM1.png", price: 0, layer: "hair" },
  { id: "hair-10", name: "Short Dark", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/47293b205_ChatGPTImageNov25202509_23_41PM.png", price: 0, layer: "hair" },
  { id: "hair-11", name: "Wavy Auburn", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/a76fcf190_ChatGPTImageNov25202509_22_30PM.png", price: 0, layer: "hair" },
  { id: "hair-12", name: "Short Ginger", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/04bd8c6d5_ChatGPTImageNov25202509_21_30PM.png", price: 0, layer: "hair" },
  { id: "hair-13", name: "Ponytail Dark", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/4adbbc278_ChatGPTImageNov25202509_13_46PM.png", price: 0, layer: "hair" },
  { id: "hair-14", name: "Braid Blonde", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/9c23e5c87_ChatGPTImageNov25202509_11_13PM.png", price: 0, layer: "hair" },
  { id: "hair-15", name: "Braid Brown", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/dbfbe76c8_ChatGPTImageNov25202509_11_09PM.png", price: 0, layer: "hair" },
  { id: "hair-16", name: "Curly Auburn", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/1a16d387d_ChatGPTImageNov25202509_09_22PM.png", price: 0, layer: "hair" },
  { id: "hair-17", name: "Hairstyle 17", image: "https://github.com/benhpritchard/gamethumbnails/blob/main/Gemini_Generated_Image_692orm692orm692o-Photoroom.png?raw=true", price: 0, layer: "hair" },
  { id: "hair-18", name: "Hairstyle 18", image: "https://github.com/benhpritchard/gamethumbnails/blob/main/Gemini_Generated_Image_745cxa745cxa745c-Photoroom.png?raw=true", price: 0, layer: "hair" },
  { id: "hair-19", name: "Hairstyle 19", image: "https://github.com/benhpritchard/gamethumbnails/blob/main/Gemini_Generated_Image_brcw3dbrcw3dbrcw-Photoroom.png?raw=true", price: 0, layer: "hair" },
  { id: "hair-20", name: "Hairstyle 20", image: "https://github.com/benhpritchard/gamethumbnails/blob/main/Gemini_Generated_Image_pifbr5pifbr5pifb-Photoroom.png?raw=true", price: 0, layer: "hair" },
  { id: "hair-21", name: "Hairstyle 21", image: "https://github.com/benhpritchard/gamethumbnails/blob/main/Gemini_Generated_Image_ql4tj6ql4tj6ql4t-Photoroom.png?raw=true", price: 0, layer: "hair" },
  { id: "hair-22", name: "Hairstyle 22", image: "https://github.com/benhpritchard/gamethumbnails/blob/main/Gemini_Generated_Image_wcdyu8wcdyu8wcdy-Photoroom.png?raw=true", price: 0, layer: "hair" },
];

// Avatar base options (full character images with different skin tones)
// Each avatar has a 'displayImage' (with clothes) shown in selection, and 'baseImage' (nude) used when clothing is applied
export const AVATAR_OPTIONS = [
  { 
    id: "avatar-1", 
    name: "Avatar 1", 
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/a196ee5f2_AVATAR1.png", 
    baseImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/a196ee5f2_AVATAR1.png",
    price: 0, 
    layer: "avatar" 
  },
  { 
    id: "avatar-2", 
    name: "Avatar 2", 
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/fe8e20599_avatar2.png", 
    baseImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/fe8e20599_avatar2.png",
    price: 0, 
    layer: "avatar" 
  },
  { 
    id: "avatar-3", 
    name: "Avatar 3", 
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/22640c24c_avatar3.png", 
    baseImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/22640c24c_avatar3.png",
    price: 0, 
    layer: "avatar" 
  },
];

// Legacy - keeping for backward compatibility
export const SKIN_OPTIONS = [];

// Empty placeholders for future customization options
export const EYES_OPTIONS = [];
export const FACIAL_HAIR_OPTIONS = [];
export const GLASSES_OPTIONS = [];

// Outfits - full body outfit images per avatar
// Each outfit has avatar-specific images
export const OUTFITS_OPTIONS = [
  { id: "outfit-none", name: "Base Outfit", image: null, price: 0, layer: "outfits" },
  { 
    id: "outfit-sports", 
    name: "Sports Clothes", 
    price: 80, 
    layer: "outfits",
    avatarImages: {
      "avatar-1": "https://github.com/benhpritchard/avatar-dressed/blob/main/Gemini_Generated_Image_n3ome8n3ome8n3om-Photoroom.png?raw=true",
      "avatar-2": "https://github.com/benhpritchard/avatar-dressed/blob/main/Gemini_Generated_Image_cu4kdkcu4kdkcu4k-Photoroom.png?raw=true",
      "avatar-3": "https://github.com/benhpritchard/avatar-dressed/blob/main/Gemini_Generated_Image_j3nci3j3nci3j3nc-Photoroom.png?raw=true",
    },
    image: "https://github.com/benhpritchard/avatar-dressed/blob/main/Gemini_Generated_Image_n3ome8n3ome8n3om-Photoroom.png?raw=true",
  },
  { 
    id: "outfit-designer-tshirt", 
    name: "Designer T-Shirt & Trousers", 
    price: 150, 
    layer: "outfits",
    avatarImages: {
      "avatar-1": "https://github.com/benhpritchard/avatar-dressed/blob/main/Gemini_Generated_Image_qtdx48qtdx48qtdx-Photoroom.png?raw=true",
      "avatar-2": "https://github.com/benhpritchard/avatar-dressed/blob/main/Gemini_Generated_Image_ds8amlds8amlds8a-Photoroom.png?raw=true",
      "avatar-3": "https://github.com/benhpritchard/avatar-dressed/blob/main/Gemini_Generated_Image_6h4qh96h4qh96h4q-Photoroom.png?raw=true",
    },
    image: "https://github.com/benhpritchard/avatar-dressed/blob/main/Gemini_Generated_Image_qtdx48qtdx48qtdx-Photoroom.png?raw=true",
  },
  { 
    id: "outfit-polo-male", 
    name: "Chinos & Polo (Male)", 
    price: 300, 
    layer: "outfits",
    avatarImages: {
      "avatar-1": "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar1%20polo.png?raw=true",
      "avatar-2": "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar2%20polo.png?raw=true",
      "avatar-3": "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar3%20polo.png?raw=true",
    },
    image: "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar1%20polo.png?raw=true",
  },
  { 
    id: "outfit-polo-female", 
    name: "Chinos & Polo (Female)", 
    price: 300, 
    layer: "outfits",
    avatarImages: {
      "avatar-1": "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar%201%20polo%20female.png?raw=true",
      "avatar-2": "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar%202%20polo%20female.png?raw=true",
      "avatar-3": "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar3%20polo%20female.png?raw=true",
    },
    image: "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar%201%20polo%20female.png?raw=true",
  },
  { 
    id: "outfit-shirt-tie-male", 
    name: "Shirt & Tie (Male)", 
    price: 500, 
    layer: "outfits",
    avatarImages: {
      "avatar-1": "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar1%20male%20shirt%20tie.png?raw=true",
      "avatar-2": "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar2%20male%20shirt%20tie.png?raw=true",
      "avatar-3": "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar3%20male%20shirt%20tie.png?raw=true",
    },
    image: "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar1%20male%20shirt%20tie.png?raw=true",
  },
  { 
    id: "outfit-shirt-tie-female", 
    name: "Shirt & Tie (Female)", 
    price: 500, 
    layer: "outfits",
    avatarImages: {
      "avatar-1": "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar1%20female%20shirt%20tie.png?raw=true",
      "avatar-2": "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar2%20female%20shirt%20tie.png?raw=true",
      "avatar-3": "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar3%20female%20shirt%20tie.png?raw=true",
    },
    image: "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar1%20female%20shirt%20tie.png?raw=true",
  },
  { 
    id: "outfit-blue-suit-male", 
    name: "Blue Suit (Male)", 
    price: 700, 
    layer: "outfits",
    avatarImages: {
      "avatar-1": "https://github.com/benhpritchard/avatar-dressed/blob/main/Avatar1%20suit.png?raw=true",
      "avatar-2": "https://github.com/benhpritchard/avatar-dressed/blob/main/Avatar%202%20suit.png?raw=true",
      "avatar-3": "https://github.com/benhpritchard/avatar-dressed/blob/main/Avatar%203%20suit.png?raw=true",
    },
    image: "https://github.com/benhpritchard/avatar-dressed/blob/main/Avatar1%20suit.png?raw=true",
  },
  { 
    id: "outfit-blue-suit-female", 
    name: "Blue Suit (Female)", 
    price: 700, 
    layer: "outfits",
    avatarImages: {
      "avatar-1": "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar1%20female%20blue%20suit.png?raw=true",
      "avatar-2": "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar2%20female%20blue%20suit.png?raw=true",
      "avatar-3": "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar3%20female%20blue%20suit.png?raw=true",
    },
    image: "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar1%20female%20blue%20suit.png?raw=true",
  },
  { 
    id: "outfit-tweed-male", 
    name: "Tweed Suit (Male)", 
    price: 850, 
    layer: "outfits",
    avatarImages: {
      "avatar-1": "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar1%20male%20tweed.png?raw=true",
      "avatar-2": "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar2%20male%20tweed.png?raw=true",
      "avatar-3": "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar3%20male%20tweed.png?raw=true",
    },
    image: "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar1%20male%20tweed.png?raw=true",
  },
  { 
    id: "outfit-tweed-female", 
    name: "Tweed Suit (Female)", 
    price: 850, 
    layer: "outfits",
    avatarImages: {
      "avatar-1": "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar1%20female%20tweed.png?raw=true",
      "avatar-2": "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar2%20female%20tweed.png?raw=true",
      "avatar-3": "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar3%20female%20tweed.png?raw=true",
    },
    image: "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar1%20female%20tweed.png?raw=true",
  },
  { 
    id: "outfit-luxury-male", 
    name: "Luxurious Suit (Male)", 
    price: 1000, 
    layer: "outfits",
    avatarImages: {
      "avatar-1": "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar1%20male%20luxury.png?raw=true",
      "avatar-2": "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar2%20male%20luxury.png?raw=true",
      "avatar-3": "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar3%20male%20luxury.png?raw=true",
    },
    image: "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar1%20male%20luxury.png?raw=true",
  },
  { 
    id: "outfit-luxury-female", 
    name: "Luxurious Suit (Female)", 
    price: 1000, 
    layer: "outfits",
    avatarImages: {
      "avatar-1": "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar1%20female%20luxury.png?raw=true",
      "avatar-2": "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar2%20female%20luxury.png?raw=true",
      "avatar-3": "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar3%20female%20luxury.png?raw=true",
    },
    image: "https://github.com/benhpritchard/avatar-dressed/blob/main/avatar1%20female%20luxury.png?raw=true",
  },
];

// Transport options - vehicles displayed next to avatar
export const TRANSPORT_OPTIONS = [
  { id: "transport-none", name: "Walk (Base)", image: null, price: 0, layer: "transport" },
  { id: "transport-bike", name: "Bike", image: "https://github.com/benhpritchard/avatar-dressed/blob/main/push%20bike.png?raw=true", price: 200, layer: "transport" },
  { id: "transport-scooter", name: "Scooter", image: "https://github.com/benhpritchard/avatar-dressed/blob/main/scooter.png?raw=true", price: 400, layer: "transport" },
  { id: "transport-cheap-car", name: "Car (Cheap)", image: "https://github.com/benhpritchard/avatar-dressed/blob/main/cheap%20car.png?raw=true", price: 800, layer: "transport" },
  { id: "transport-family-car", name: "Family Car", image: "https://github.com/benhpritchard/avatar-dressed/blob/main/family%20car.png?raw=true", price: 1200, layer: "transport" },
  { id: "transport-sports-car", name: "Sports Car", image: "https://github.com/benhpritchard/avatar-dressed/blob/main/sports%20car.png?raw=true", price: 2000, layer: "transport" },
  { id: "transport-limo", name: "Limo", image: "https://github.com/benhpritchard/avatar-dressed/blob/main/limo.png?raw=true", price: 2500, layer: "transport" },
  { id: "transport-boat", name: "Speed Boat", image: "https://github.com/benhpritchard/gamethumbnails/blob/main/Gemini_Generated_Image_yctmw5yctmw5yctm-Photoroom.png?raw=true", price: 3000, layer: "transport" },
  { id: "transport-plane", name: "Plane", image: "https://github.com/benhpritchard/avatar-dressed/blob/main/plane.png?raw=true", price: 3500, layer: "transport" },
  { id: "transport-private-jet", name: "Private Jet", image: "https://github.com/benhpritchard/avatar-dressed/blob/main/private%20jet.png?raw=true", price: 4000, layer: "transport" },
  { id: "transport-helicopter", name: "Helicopter", image: "https://github.com/benhpritchard/avatar-dressed/blob/main/helicopter.png?raw=true", price: 5000, layer: "transport" },
];

// Accessories - additional items like glasses, watches, etc.
export const ACCESSORIES_OPTIONS = [
  { id: "accessory-none", name: "No Accessory", image: null, price: 0, layer: "accessories" },
  // Placeholder - will be populated with accessory images
];

// Background/Location options for Avatar
export const BACKGROUND_OPTIONS = [
  { id: "bg-street", name: "Street View", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/e91b3867e_Gemini_Generated_Image_vy4c67vy4c67vy4c.png", price: 0, layer: "background" },
  { id: "bg-suburb", name: "Suburban Home", image: "https://github.com/benhpritchard/avatar-dressed/blob/main/Gemini_Generated_Image_43h36g43h36g43h3.png?raw=true", price: 500, layer: "background" },
  { id: "bg-city", name: "Luxury City", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/e54b7da56_Gemini_Generated_Image_brni9rbrni9rbrni.png", price: 1500, layer: "background" },
  { id: "bg-beach", name: "Beach Resort", image: "https://github.com/benhpritchard/avatar-dressed/blob/main/Gemini_Generated_Image_mydq25mydq25mydq.png?raw=true", price: 2500, layer: "background" },
  { id: "bg-mansion", name: "Mansion", image: "https://github.com/benhpritchard/avatar-dressed/blob/main/Gemini_Generated_Image_tnv8kytnv8kytnv8.png?raw=true", price: 5000, layer: "background" },
];

// Avatar customization categories
export const AVATAR_CATEGORIES = [
  { id: "avatar", name: "Avatar", emoji: "👤", options: "AVATAR_OPTIONS" },
  { id: "hair", name: "Hair", emoji: "💇", options: "HAIR_OPTIONS" },
  { id: "outfits", name: "Outfits", emoji: "👔", options: "OUTFITS_OPTIONS" },
  { id: "transport", name: "Transport", emoji: "🚗", options: "TRANSPORT_OPTIONS" },
  { id: "background", name: "Location", emoji: "🏙️", options: "BACKGROUND_OPTIONS" },
];

// Legacy character options (keeping for backward compatibility)
export const CHARACTER_OPTIONS = [
  { id: "char-1", name: "Character 1", bodyPos: { row: 0, col: 0 }, headPos: { row: 0, col: 0 }, price: 0 },
];

const baseAvatarSeed = [
  { id: "skin-porcelain", name: "Skin • Porcelain", price: 0, layer: "base" },
  { id: "skin-warm", name: "Skin • Warm", price: 0, layer: "base" },
  { id: "skin-olive", name: "Skin • Olive", price: 0, layer: "base" },
  { id: "skin-amber", name: "Skin • Amber", price: 0, layer: "base" },
  { id: "skin-espresso", name: "Skin • Espresso", price: 0, layer: "base" },
  { id: "eyes-classic", name: "Eyes • Classic", price: 0, layer: "eyes" },
  { id: "eyes-friendly", name: "Eyes • Friendly", price: 0, layer: "eyes" },
  { id: "eyes-confident", name: "Eyes • Confident", price: 0, layer: "eyes" },
  { id: "brows-soft", name: "Brows • Soft", price: 0, layer: "brows" },
  { id: "brows-bold", name: "Brows • Bold", price: 0, layer: "brows" },
  { id: "nose-soft", name: "Nose • Soft", price: 0, layer: "nose" },
  { id: "nose-round", name: "Nose • Round", price: 0, layer: "nose" },
  { id: "mouth-smile", name: "Mouth • Smile", price: 0, layer: "mouth" },
  { id: "mouth-grin", name: "Mouth • Grin", price: 0, layer: "mouth" },
];

function generateClothing(category, baseNames, colors, priceRange, tag) {
  const [lo, hi] = priceRange;
  const out = [];
  let i = 0;
  for (const name of baseNames) {
    for (const color of colors) {
      const id = `${category}-${name}-${color}`.toLowerCase().replace(/\s+/g, "-");
      const price = Math.floor(lo + (hi - lo) * ((i % 7) / 6));
      out.push({
        id,
        name: `${capitalize(name)} • ${capitalize(color)}`,
        price,
        layer: category,
        tags: [tag],
      });
      i++;
    }
  }
  return out;
}

function generateSimple(layer, names, price, tag) {
  return names.map((n) => ({
    id: `${layer}-${slug(n)}`,
    name: `${title(layer)} • ${n}`,
    price,
    layer,
    tags: tag ? [tag] : [],
  }));
}

const colorSet = ["navy", "charcoal", "black", "taupe", "khaki", "stone", "teal", "burgundy", "forest", "royal"];
const tops = generateClothing("top", ["shirt", "polo", "henley", "turtleneck", "tee"], colorSet, [4, 10], "smart-casual");
const jackets = generateClothing("jacket", ["blazer", "cardigan", "bomber", "trench", "gilet"], colorSet, [10, 22], "formal");
const bottoms = generateClothing("bottom", ["suit-trouser", "chino", "slim"], colorSet, [6, 14], "smart");
const shoes = generateClothing("shoes", ["oxford", "loafer", "sneaker"], ["black", "brown", "tan", "white"], [5, 12], "footwear");
const hairs = generateSimple("hair", ["Fade", "Bob", "Bun", "Curls", "Waves", "Pixie", "Side-Part", "Afro", "Braids"], 6, "style");
const glasses = generateSimple("glasses", ["Round", "Square", "Rimless", "Aviator"], 7, "premium");
const accessories = generateSimple("accessory", ["Wireless-Buds", "Watch", "Tie", "Briefcase", "Lanyard"], 5, "tech");

export const AvatarCatalog = [
  ...baseAvatarSeed,
  ...tops,
  ...jackets,
  ...bottoms,
  ...shoes,
  ...hairs,
  ...glasses,
  ...accessories,
];

// -----------------------------
// OFFICE CATALOG GENERATION
// -----------------------------

// Office Items Catalog - Organized by Tier
const basicItems = [
  { id: "basic-desk", name: "Basic Desk", price: 100, category: "desk", tier: "basic", emoji: "🪑", image: "https://github.com/benhpritchard/officeitems/blob/main/Gemini_Generated_Image_jle7knjle7knjle7-Photoroom.png?raw=true" },
  { id: "simple-desk", name: "Simple Desk", price: 150, category: "desk", tier: "basic", emoji: "🪑", image: "https://github.com/benhpritchard/officeitems/blob/main/Gemini_Generated_Image_t9lvjpt9lvjpt9lv-Photoroom.png?raw=true" },
  { id: "basic-computer", name: "Basic Computer", price: 200, category: "tech", tier: "basic", emoji: "🖥️", image: "https://github.com/benhpritchard/officeitems/blob/main/Gemini_Generated_Image_f7616cf7616cf761-Photoroom.png?raw=true" },
  { id: "standing-lamp", name: "Standing Lamp", price: 80, category: "lighting", tier: "basic", emoji: "🛋️", image: "https://github.com/benhpritchard/officeitems/blob/main/Gemini_Generated_Image_330lf330lf330lf3-Photoroom.png?raw=true" },
];

const standardItems = [
  { id: "floor-lamp", name: "Floor Lamp", price: 300, category: "lighting", tier: "standard", emoji: "🛋️", image: "https://github.com/benhpritchard/officeitems/blob/main/Gemini_Generated_Image_ddeaopddeaopddea-Photoroom.png?raw=true" },
  { id: "stylish-lamp", name: "Stylish Lamp", price: 350, category: "lighting", tier: "standard", emoji: "✨", image: "https://github.com/benhpritchard/officeitems/blob/main/Gemini_Generated_Image_uisysauisysauisy-Photoroom.png?raw=true" },
  { id: "bean-bag", name: "Bean Bag", price: 250, category: "chair", tier: "standard", emoji: "🫘", image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/a4b7a3f9d_Gemini_Generated_Image_kygbq4kygbq4kygb-Photoroom.png" },
  { id: "record-player", name: "Record Player", price: 450, category: "entertainment", tier: "standard", emoji: "🎵", image: "https://github.com/benhpritchard/officeitems/blob/main/Gemini_Generated_Image_rbpwg8rbpwg8rbpw-Photoroom.png?raw=true" },
  { id: "modern-computer", name: "Modern Computer", price: 800, category: "tech", tier: "standard", emoji: "💻", image: "https://github.com/benhpritchard/officeitems/blob/main/Gemini_Generated_Image_21fzwu21fzwu21fz-Photoroom.png?raw=true" },
];

const premiumItems = [
  { id: "smart-desk", name: "Smart Desk", price: 1500, category: "desk", tier: "premium", emoji: "🧠", image: "https://github.com/benhpritchard/officeitems/blob/main/Gemini_Generated_Image_ao0vcsao0vcsao0v-Photoroom.png?raw=true" },
  { id: "vanity-desk", name: "Vanity Desk", price: 1200, category: "desk", tier: "premium", emoji: "💅", image: "https://github.com/benhpritchard/officeitems/blob/main/Gemini_Generated_Image_exw7xcexw7xcexw7-Photoroom.png?raw=true" },
  { id: "sofa-area", name: "Sofa Area", price: 1800, category: "chair", tier: "premium", emoji: "🛋️", image: "https://github.com/benhpritchard/officeitems/blob/main/Gemini_Generated_Image_ig78hlig78hlig78-Photoroom.png?raw=true" },
  { id: "gaming-computer", name: "High-Spec PC", price: 2000, category: "tech", tier: "premium", emoji: "🎮", image: "https://github.com/benhpritchard/officeitems/blob/main/Gemini_Generated_Image_tak60ztak60ztak6-Photoroom.png?raw=true" },
];

const eliteItems = [
  { id: "aquarium", name: "Aquarium", price: 3500, category: "decor", tier: "elite", emoji: "🐠", image: "https://github.com/benhpritchard/officeitems/blob/main/Gemini_Generated_Image_56osqt56osqt56os-Photoroom.png?raw=true" },
  { id: "mona-lisa", name: "Mona Lisa", price: 10000, category: "art", tier: "elite", emoji: "🖼️", image: "https://github.com/benhpritchard/officeitems/blob/main/Gemini_Generated_Image_6fzhr26fzhr26fzh-Photoroom.png?raw=true" },
  { id: "cinema-screen", name: "Cinema Screen", price: 4500, category: "tech", tier: "elite", emoji: "🎬", image: "https://github.com/benhpritchard/officeitems/blob/main/Gemini_Generated_Image_ob1072ob1072ob10-Photoroom.png?raw=true" },
  { id: "luxury-lounge", name: "Luxury Lounge", price: 3000, category: "chair", tier: "elite", emoji: "🥂", image: "https://github.com/benhpritchard/officeitems/blob/main/Gemini_Generated_Image_vebcp3vebcp3vebc-Photoroom.png?raw=true" },
];

const funItems = [
  { id: "pinball-machine", name: "Pinball Machine", price: 1500, category: "entertainment", tier: "fun", emoji: "🕹️", image: "https://github.com/benhpritchard/officeitems/blob/main/Gemini_Generated_Image_5fgo9j5fgo9j5fgo-Photoroom.png?raw=true" },
  { id: "drum-kit", name: "Drum Kit", price: 1200, category: "entertainment", tier: "fun", emoji: "🥁", image: "https://github.com/benhpritchard/officeitems/blob/main/Gemini_Generated_Image_cv3lxfcv3lxfcv3l-Photoroom.png?raw=true" },
  { id: "vending-machine", name: "Vending Machine", price: 1000, category: "appliance", tier: "fun", emoji: "🍫", image: "https://github.com/benhpritchard/officeitems/blob/main/Gemini_Generated_Image_or54xpor54xpor54-Photoroom.png?raw=true" },
  { id: "pool-table", name: "Pool Table", price: 1800, category: "entertainment", tier: "fun", emoji: "🎱", image: "https://github.com/benhpritchard/officeitems/blob/main/Gemini_Generated_Image_rl6jrnrl6jrnrl6j-Photoroom.png?raw=true" },
];

export const OfficeCatalog = [
  ...basicItems,
  ...standardItems,
  ...premiumItems,
  ...eliteItems,
  ...funItems,
];

// -----------------------------
// LOCATIONS & TIERS
// -----------------------------

export const Locations = [
  { 
    id: "tower-block", 
    name: "Tower Block", 
    price: 0, 
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/5343e66e4_Gemini_Generated_Image_c574kkc574kkc574.png",
    bonusItems: [],
    description: "A basic tower block flat to start your journey"
  },
  { 
    id: "home-office", 
    name: "Home Office", 
    price: 40, 
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/9a7eb910f_ChatGPTImageNov26202508_51_33AM.png",
    bonusItems: [],
    description: "A cozy countryside home office"
  },
  { 
    id: "countryside-cottage", 
    name: "Countryside Cottage", 
    price: 80, 
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/839d9b3f8_ChatGPTImageNov26202508_52_57AM.png",
    bonusItems: [],
    description: "A charming cottage in the countryside"
  },
  { 
    id: "city-skyline", 
    name: "City Skyline", 
    price: 140, 
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/9acb1d138_ChatGPTImageNov26202508_54_03AM.png",
    bonusItems: [],
    description: "A modern office with city views"
  },
  { 
    id: "penthouse-office", 
    name: "Penthouse Office", 
    price: 220, 
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/c69267bb0_ChatGPTImageNov26202508_55_52AM.png",
    bonusItems: [],
    description: "Luxury penthouse workspace"
  },
  { 
    id: "mansion-office", 
    name: "Mansion Office", 
    price: 320, 
    image: "https://github.com/benhpritchard/gamethumbnails/blob/main/Gemini_Generated_Image_gf4mk8gf4mk8gf4m.png?raw=true",
    bonusItems: [],
    description: "The ultimate executive mansion office"
  },
];

export const OfficeTiers = [
  { level: 1, name: "Starter Suite", price: 0, gridCols: 10, gridRows: 6 },
  { level: 2, name: "Growth Floor", price: 120, gridCols: 12, gridRows: 8 },
  { level: 3, name: "Executive Wing", price: 260, gridCols: 14, gridRows: 9 },
  { level: 4, name: "Innovation Lab", price: 420, gridCols: 16, gridRows: 10 },
];

// -----------------------------
// AVATAR BUNDLES
// -----------------------------

export const AvatarBundles = [
  { id: "bundle-formal", label: "Formal Pack", cost: 30, unlock: ["jacket-blazer-navy", "bottom-suit-trouser-navy", "shoes-oxford-black"] },
  { id: "bundle-smart", label: "Smart-Casual Pack", cost: 24, unlock: ["top-polo-forest", "bottom-chino-stone", "shoes-sneaker-white"] },
];

// -----------------------------
// DEFAULT STATE
// -----------------------------

export const START_POINTS = 100;

export const defaultPlayerState = () => ({
  points: START_POINTS,
  playerDetails: {
    name: "",
    dreamJob: "",
    school: "",
    isLocked: false,
  },
  avatar: {
    avatar: "avatar-1",
    hair: null,
    outfits: null,
    transport: null,
    accessories: null,
    background: "bg-street",
  },
  office: {
    ownedItemIds: [],
    placed: [],
    tier: 1,
  },
  locationId: "tower-block",
});

// -----------------------------
// UTILITY EXPORTS
// -----------------------------

export const money = (p) => `${p} coins`;
export const byId = (arr, id) => (id ? arr.find((a) => a.id === id) || null : null);
export const canAfford = (points, price) => points >= price;
export const uid = () => Math.random().toString(36).slice(2, 10);