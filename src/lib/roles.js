import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

function withTimeout(promise, ms = 6000) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`Firestore read timed out after ${ms}ms`)), ms)
    ),
  ]);
}

export async function getTeacherProfile(uid) {
  if (!uid) return null;

  try {
    const ref = doc(db, "teachers", uid);
    const snap = await withTimeout(getDoc(ref), 6000);
    return snap.exists() ? snap.data() : null;
  } catch (e) {
    console.warn("getTeacherProfile failed:", e?.message || e);
    return null;
  }
}
