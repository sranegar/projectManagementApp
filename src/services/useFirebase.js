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
  const [tasks, setTasks] = useState([]);
  const epicsCollectionRef = collection(db, "epics");
  const tasksCollectionRef = collection(db, "tasks");
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
    const getTasks = async () => {
      const data = await getDocs(tasksCollectionRef);
      setTasks(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }))
      )
    }
    getEpics();
    getTasks();
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