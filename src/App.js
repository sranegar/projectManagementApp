import "./App.css";
// import { useState, useEffect } from "react";
// import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import "semantic-ui-css/semantic.min.css";
import AppRoutes from './config/routes';
 

function App() {
  // const [newName, setNewName] = useState("");
  // const [newTitle, setNewTitle] = useState("");
  // const [epics, setEpics] = useState([]);
  // const epicsCollectionRef = collection(db, "epics");

  // const createEpic = async () => {
  //   await addDoc(epicsCollectionRef, {
  //     clientName: newName,
  //     projectTitle: newTitle,
  //   });
  // };

  // const updateEpic = async (id, title) => {
  //   const epicDoc = doc(db, "epics", id)
  //   const newFields = { projectTitle: title + 1 }
  //   await updateDoc(epicDoc, newFields)
  // }

  // const deleteUser = async (id) => {
  //   const epicDoc = doc(db, "epics", id);
  //   await deleteDoc(epicDoc);
  // }

  //Called immediately on load
  // useEffect(() => {
  //   const getEpics = async () => {
  //     const data = await getDocs(epicsCollectionRef);
  //     setEpics(
  //       data.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }))
  //     );
  //   };
  //   getEpics();
  // }, []);

  return (
    <div className="App">
      <AppRoutes></AppRoutes>
      {/* {epics.map((epic) => {
        return (
          <div key={epic.id}>
            <input
              placeholder="Client Name"
              onChange={(event) => {
                setNewName(event.target.value);
              }}
            />
            <input
              placeholder="Project Title"
              onChange={(event) => {
                setNewTitle(event.target.value);
              }}
            />
            <Button onClick={createEpic}>Create Epic</Button>
            <h1>{epic.clientName}</h1>
            <h1>{epic.projectTitle}</h1>
            <Button onClick={() => { updateEpic(epic.id, epic.projectTitle) }}>Edit</Button>
            <Button onClick={() => { deleteUser(epic.id) }}>Delete</Button>
     
          </div>
        );
      })} */}
    </div>
  );
}

export default App;
