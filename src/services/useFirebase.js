import { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebase-config";

const useFirebase = () => {
  const [epics, setEpics] = useState([]);
  const epicsCollectionRef = collection(db, "epics");
  
  useEffect(() => {
    const getEpics = async () => {
      const data = await getDocs(epicsCollectionRef);
      setEpics(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getEpics();
   
  }, []);
    
    
  // const createEpic = async () => {
  //   await addDoc(epicsCollectionRef, {
  //     clientName: client,
  //     projectTitle: title,
  //     startDate: start,
  //     endDate: end,
  //     description: description,
  //     status: status,
  //   });
  //   setOpen(false);
  // };

  return { epics };
};

export default useFirebase;