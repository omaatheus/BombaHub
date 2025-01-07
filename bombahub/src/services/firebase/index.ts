import { app } from "./keys";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore(app)
const auth = getAuth(app)

export {db, auth}