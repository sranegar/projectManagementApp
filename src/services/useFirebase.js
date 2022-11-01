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
  const [tasks, setTasks] = useState([])
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
    

  return { epics, getDocs};
};

export default useFirebase;