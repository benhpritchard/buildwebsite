import { addDoc, collection, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Create one class
export async function createClass({ teacherId, name }) {
  const ref = await addDoc(collection(db, "classes"), {
    teacherId,
    name,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

// List classes for a teacher
export async function listClasses(teacherId) {
  const q = query(collection(db, "classes"), where("teacherId", "==", teacherId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
