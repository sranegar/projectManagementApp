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
    tasks: [
        {
        title: "",
        details: "",
        status: null,
        },
    ],
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
  const [viewTasks, setViewTasks] = useState([]);

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
  };

  const validate = (values) => {
    const errors = {};
    if (!values.clientName) {
      errors.clientName = "Client name is required!";
    }
    if (!values.projectTitle) {
      errors.projectTitle = "Project title is required!";
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
    setViewTasks(epic.tasks);
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
          <Modal.Header>Add New Project</Modal.Header>
          <Modal.Content   className="modal-content">
            <Segment padded secondary>
              <Segment>
                <Grid columns="1" doubling stackable className="form-wrapper">
                  {/* <pre>{JSON.stringify(formValues, undefined, 10)}</pre>  */}

                  <Grid.Column>
                    <form onSubmit={handleSubmit}>
                      <p style={{ padding: "10px 0px 2px" }}>Client Name:</p>
                      <Input
                        size="mini"
                        name="clientName"
                        type="text"
                        fluid
                        placeholder="Client Name"
                        value={formValues.clientName}
                        onChange={handleOnChange}
                      />

                      {formErrors.clientName ? (
                        <Label basic color="red" pointing size="tiny">
                          {formErrors.clientName}
                        </Label>
                      ) : null}
                      <p style={{ padding: "10px 0px 2px" }}>Project Title:</p>
                      <Input
                        size="mini"
                        name="projectTitle"
                        type="text"
                        fluid
                        placeholder="Project Title"
                        value={formValues.projectTitle}
                        onChange={handleOnChange}
                      />
                      {formErrors.projectTitle ? (
                        <Label basic color="red" pointing size="tiny">
                          {formErrors.projectTitle}
                        </Label>
                      ) : null}
                      <Grid stackable columns="2">
                        <Grid.Column>
                          <p style={{ padding: "10px 0px 2px" }}>
                            Start Date{" "}
                            <span
                              style={{
                                color: "purple",
                                fontStyle: "italic",
                                fontWeight: "lighter",
                              }}
                            >
                              (optional)
                            </span>
                            :
                          </p>{" "}
                          <Input
                            size="mini"
                            name="startDate"
                            type="date"
                            value={formValues.startDate}
                            onChange={handleOnChange}
                          />
                        </Grid.Column>
                        <Grid.Column>
                          <p style={{ padding: "10px 0px 2px" }}>
                            End Date{" "}
                            <span
                              style={{
                                color: "purple",
                                fontStyle: "italic",
                                fontWeight: "lighter",
                              }}
                            >
                              (optional)
                            </span>
                            :
                          </p>{" "}
                          <Input
                            size="mini"
                            name="endDate"
                            type="date"
                            value={formValues.endDate}
                            onChange={handleOnChange}
                          />
                        </Grid.Column>
                      </Grid>

                      <p style={{ padding: "10px 0px 2px" }}>Description:</p>
                      <TextArea
                        name="description"
                        style={{
                          minHeight: 100,
                          width: "100%",
                          padding: "10px",
                        }}
                        placeholder="Brief description of project..."
                        value={formValues.description}
                        onChange={handleOnChange}
                      />
                      {formErrors.description ? (
                        <Label basic color="red" pointing size="tiny">
                          {formErrors.description}
                        </Label>
                      ) : null}

                      <Grid padded>
                        <Grid.Column>
                          {" "}
                          <Button color="green" floated="right" size="mini">
                            Save Project
                          </Button>
                        </Grid.Column>
                      </Grid>
                    </form>
                  </Grid.Column>
                </Grid>
              </Segment>
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
          viewTasks={viewTasks}
        />
        {/* project portal body */}
        <Grid.Column>
          <Segment
            style={{ paddingBottom: "60px", backgroundColor: "#474747" }}
          >
            <Grid padded columns="2">
              <Grid.Column>
                <Header
                  inverted
                  as="h2"
                  style={{
                    textTransform: "uppercase",
                    fontFamily: "franklin gothic narrow",
                    letterSpacing: "2px",
                    color: "#eee",
                  }}
                >
                  Project Portal
                </Header>
              </Grid.Column>
              <Grid.Column textAlign="right">
                <Button color="orange" onClick={openModal}>
                  <Icon name="add" />
                  Add Project
                </Button>
              </Grid.Column>
            </Grid>

            <Segment
              basic
              textAlign="left"
              style={{
                padding: "0px 5px",
                marginTop: "20px",
              }}
            >
              <Header
                as="h4"
                style={{
                  padding: "20px",
                  margin: "0px",
                  backgroundColor: "#0f0710 ",
                  borderLeft: "3px solid #57c672",
                  color: "#eee",
                  fontWeight: "lighter",
                  fontVariantCaps: "all-petite-caps",
                }}
              >
                In Progress
              </Header>
              <Grid doubling stackable columns="4" padded>
                {epics.map((epic) => {
                  if (epic.status === false || epic.status === null) {
                    return (
                      <Grid.Column
                        style={{ padding: "60px 20px" }}
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
                          <Card.Content extra>
                            <Grid columns="2">
                              <Grid.Column>{`(${epic.tasks.length}) Tasks`}</Grid.Column>
                              <Grid.Column textAlign="right">
                                <span style={{ fontSize: "14px" }}>
                                  {epic.startDate}
                                </span>
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

            <Segment
              basic
              textAlign="left"
              style={{
                padding: "0px 5px",
                marginTop: "20px",
              }}
            >
              <Header
                as="h4"
                style={{
                  padding: "20px",
                  margin: "0px",
                  backgroundColor: "#0f0710 ",
                  borderLeft: "3px solid #2185d0",
                  color: "#eee",
                  fontWeight: "lighter",
                  fontVariantCaps: "all-petite-caps",
                }}
              >
                Complete
              </Header>
              <Grid doubling stackable columns="4" padded>
                {epics.map((epic) => {
                  if (epic.status === true) {
                    return (
                      <Grid.Column
                        style={{ padding: "60px 20px" }}
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
                              <Grid.Column>{`(${epic.tasks.length}) Tasks`}</Grid.Column>
                              <Grid.Column textAlign="right">
                                <span style={{ fontSize: "14px" }}>
                                  {epic.startDate}
                                </span>
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
