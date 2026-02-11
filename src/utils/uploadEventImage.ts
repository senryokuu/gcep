import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

const storage = getStorage();
const auth = getAuth();

export async function uploadImage(fileName: string, base64: string) {
  if (!auth.currentUser) throw new Error("Not signed in");

  const storageRef = ref(storage, `event-images/${Date.now()}-${fileName}`);
  await uploadString(storageRef, base64, "base64", { contentType: "image/jpeg" });
  const url = await getDownloadURL(storageRef);
  return url;
}
