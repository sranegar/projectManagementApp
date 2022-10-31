import {
  Button,
  Card,
  Grid,
  Header,
  Icon,
  Segment,
  Modal,
  Input,
  TextArea,
  Label,
} from "semantic-ui-react";
import "./main.css";
import { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase-config";
import ProjectDetailsModal from "./DetailsModal";

const Main = () => {
  //Add epic form variables
  const initialValues = {
    clientName: "",
    projectTitle: "",
    description: "",
    startDate: "",
    endDate: "",
    status: null,
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  //View details modal variables
  const [epicByID, setEpicByID] = useState("");
  const [curCard, setCurCard] = useState("");

  //Add epic form modal variables
  const [open, setOpen] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  //Data variables
  const [epics, setEpics] = useState([]);
  const epicsCollectionRef = collection(db, "epics");
  const [tasks, setTasks] = useState([]);
 
  //Create epic
  const createEpic = async () => {

    await addDoc(epicsCollectionRef, formValues);
    setOpen(false);
  };

  const handleOnChange = (e) => {
    
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  
   
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

  }

  const validate = (values) => {
    const errors = {}
    if (!values.clientName) {
      errors.clientName = "Client name is required!"
    }
    if (!values.projectTitle) {
      errors.projectTitle = "Project title is required!"
    }
    if (!values.description) {
      errors.description = "Project description is required!";
    }
    return errors;
  };
  
 
  //Open add epic form modal
  const openModal = () => {
    setOpen(!open);
    setFormValues(initialValues);
    
  };

  //View epic details modal
  const openDetailsModal = (id) => {
    setShowDetailsModal(!showDetailsModal);

    const epic = epics.find((e) => {
      return id === e.id;
    });

    setCurCard(epic);
    setFormValues(epic);
     setTasks(epic.tasks);
  };

 

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
 
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      createEpic();
    }
    getEpics();
  }, [formErrors]);
 
  return (
    <Grid padded doubling stackable className="main-wrapper">
      <Grid.Column>
        {/* add epic form modal */}
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          closeIcon
          size="small"
        >
          <Modal.Header style={{ backgroundColor: "#f7ef1e" }}>
            Add New Project
          </Modal.Header>
          <Modal.Content className="modal-content">
            <Segment padded>
              <Grid doubling stackable centered className="form-wrapper">
                {/* <pre>{JSON.stringify(formValues, undefined, 10)}</pre>  */}
                <Grid.Column>
                  <form onSubmit={handleSubmit}>
                    <p>Client Name:</p>
                    <Input
                      name="clientName"
                      type="text"
                      fluid
                      placeholder="Client Name"
                      value={formValues.clientName}
                      onChange={handleOnChange}
                    />

                    {formErrors.clientName ? (
                      <Label basic color="red" pointing>
                        {formErrors.clientName}
                      </Label>
                    ) : null}
                    <p>Project Title:</p>
                    <Input
                      name="projectTitle"
                      type="text"
                      fluid
                      placeholder="Project Title"
                      value={formValues.projectTitle}
                      onChange={handleOnChange}
                    />
                    {formErrors.projectTitle ? (
                      <Label basic color="red" pointing>
                        {formErrors.projectTitle}
                      </Label>
                    ) : null}
                    <Grid stackable columns="2">
                      <Grid.Column>
                        <p>
                          Start Date{" "}
                          <span style={{ color: "red", fontStyle: "italic" }}>
                            (optional)
                          </span>
                          :
                        </p>{" "}
                        <Input
                          name="startDate"
                          type="date"
                          value={formValues.startDate}
                          onChange={handleOnChange}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <p
                          style={{
                            margin: "0px",
                            padding: "10px 4px 3px",
                            fontWeight: "bold",
                          }}
                        >
                          End Date{" "}
                          <span style={{ color: "red", fontStyle: "italic" }}>
                            (optional)
                          </span>
                          :
                        </p>{" "}
                        <Input
                          name="endDate"
                          type="date"
                          value={formValues.endDate}
                          onChange={handleOnChange}
                        />
                      </Grid.Column>
                    </Grid>

                    <p>Description:</p>
                    <TextArea
                      name="description"
                      style={{ minHeight: 100, width: "100%", padding: "10px" }}
                      placeholder="Brief description of project..."
                      value={formValues.description}
                      onChange={handleOnChange}
                    />
                    {formErrors.description ? (
                      <Label basic color="red" pointing>
                        {formErrors.description}
                      </Label>
                    ) : null}

                    <Grid>
                      <Grid.Column>
                        {" "}
                        <Button
                          color="green"
                          floated="right"
                          // onClick={createEpic}
                        >
                          Save Project
                        </Button>
                      </Grid.Column>
                    </Grid>
                  </form>
                </Grid.Column>
              </Grid>
            </Segment>
          </Modal.Content>
        </Modal>
        {/* Pass props to view epic details modal child */}
        <ProjectDetailsModal
          showModal={showDetailsModal}
          setShowModal={setShowDetailsModal}
          db={db}
          epics={epics}
          setEpics={setEpics}
          epicsCollectionRef={epicsCollectionRef}
          cardID={epicByID}
          deleteDoc={deleteDoc}
          doc={doc}
          updateDoc={updateDoc}
          epicByID={epicByID}
          curCard={curCard}
          initValues={formValues}
          tasks={tasks}
        />
        {/* project portal body */}
        <Grid.Column>
          <Segment padded="very" secondary style={{ paddingBottom: "60px" }}>
            <Grid columns="2">
              <Grid.Column>
                <Header as="h2" style={{ paddingBottom: "10px" }}>
                  Project Portal
                </Header>
              </Grid.Column>
              <Grid.Column textAlign="right">
                <Button color="blue" onClick={openModal}>
                  <Icon name="add" />
                  Add Project
                </Button>
              </Grid.Column>
            </Grid>

            <Segment textAlign="left" style={{ marginTop: "20px" }}>
              <Header
                as="h4"
                color="green"
                style={{ padding: "5 5 0", margin: "0px" }}
              >
                In Progress
              </Header>
              <Grid doubling stackable columns="3" padded>
                {epics.map((epic) => {
                  if (epic.status === false || epic.status === null) {
                    return (
                      <Grid.Column
                        style={{ padding: "20px 40px" }}
                        key={epic.id}
                      >
                        <Card
                          className="project-card"
                          raised
                          fluid
                          color="green"
                          onClick={() => {
                            openDetailsModal(epic.id);
                          }}
                        >
                          <Card.Content>
                            <Card.Header>{epic.clientName}</Card.Header>
                            <Card.Meta>{epic.projectTitle}</Card.Meta>

                            <Card.Description
                              style={{
                                minHeight: "100px",
                                padding: "8px",
                              }}
                              content={epic.description}
                            />
                          </Card.Content>
                          <Card.Content
                            
                            extra
                            
                          >
                            <Grid columns="2">
                              <Grid.Column># Tasks</Grid.Column>
                              <Grid.Column textAlign="right">
                                <p>{epic.startDate}</p>
                              </Grid.Column>
                            </Grid>
                          </Card.Content>
                        </Card>
                      </Grid.Column>
                    );
                  }
                })}
              </Grid>
            </Segment>

            <Segment textAlign="left" style={{ marginTop: "20px" }}>
              <Header
                as="h4"
                color="blue"
                style={{ padding: "5 5 0", margin: "0px" }}
              >
                Complete
              </Header>
              <Grid doubling stackable columns="3" padded>
                {epics.map((epic) => {
                  if (epic.status === true) {
                    return (
                      <Grid.Column
                        style={{ padding: "20px 40px" }}
                        key={epic.id}
                      >
                        <Card
                          className="project-card"
                          raised
                          fluid
                          color="blue"
                     
                          onClick={() => {
                            openDetailsModal(epic.id);
                          }}
                        >
                          <Card.Content>
                            <Card.Header>{epic.clientName}</Card.Header>
                            <Card.Meta>{epic.projectTitle}</Card.Meta>

                            <Card.Description
                              style={{
                                minHeight: "100px",
                                padding: "8px",
                              }}
                              content={epic.description}
                            />
                          </Card.Content>
                          <Card.Content extra>
                            <Grid columns="2">
                              <Grid.Column># Tasks</Grid.Column>
                              <Grid.Column textAlign="right">
                                <p>{epic.startDate}</p>
                              </Grid.Column>
                            </Grid>
                          </Card.Content>
                        </Card>
                      </Grid.Column>
                    );
                  }
                })}
              </Grid>
            </Segment>
          </Segment>
        </Grid.Column>
      </Grid.Column>
    </Grid>
  );
};

export default Main;
