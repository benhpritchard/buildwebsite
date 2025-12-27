// src/lib/studentSession.js

const KEY1 = "finnquest_student";
const KEY2 = "finquest_student";

export function setStudentSession(student) {
  const safe = student || null;
  localStorage.setItem(KEY1, JSON.stringify(safe));
  localStorage.setItem(KEY2, JSON.stringify(safe));
}

export function getStudentSession() {
  const raw = localStorage.getItem(KEY1) || localStorage.getItem(KEY2);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearStudentSession() {
  localStorage.removeItem(KEY1);
  localStorage.removeItem(KEY2);
}
