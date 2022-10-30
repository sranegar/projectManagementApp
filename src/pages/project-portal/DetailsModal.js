import React, { useState } from "react";
import {
  Grid,
  Modal,
  Segment,
  Input,
  TextArea,
  Button,
  Checkbox,
  Accordion,
  Icon,
  List,
} from "semantic-ui-react";
import Moment from "react-moment";

const ProjectDetailsModal = ({
  showModal,
  setShowModal,
  epics,
  cardID,
  doc,
  deleteDoc,
  db,
  epic,
  updateDoc,
  epicByID,
  curCard,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [editMode, setEditMode] = useState(false);

  const [client, setClientName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStartDate] = useState("");
  const [end, setEndDate] = useState("");
  const [status, setStatus] = useState(false);

  //Delete epic
  const deleteEpic = async (id) => {
    const epicDoc = doc(db, "epics", id);
    await deleteDoc(epicDoc);
    setShowModal(false);
  };

  //Update epic
  const openEditForm = () => {
    setEditMode(true);
    
  };

  const updateEpic = async (id) => {
    const epicDoc = doc(db, "epics", id);

    // const newFields = {
    //   ...curCard.values,

    // };

    await updateDoc(epicDoc);
    setEditMode(false);
    showModal(false);
  };

  //   function viewEpicByID() {
  //     const epicByID = epics.find((e) => {
  //       return epicsByID === e.id;
  //     })
  //     setCurCard(epicByID)
  // }

 function handleOnClick(e, titleProps) {
   const { index } = titleProps;
   const newIndex = activeIndex === index ? -1 : index
   setActiveIndex(newIndex)
 }
 

  return (
    <Grid>
      <Grid.Column>
        {/* View epic details modal */}
        <Modal
          onClose={() => {
            setShowModal(false);
            setEditMode(false);
          }}
          onOpen={() => setShowModal(true)}
          open={showModal}
          closeIcon
        >
          <Modal.Header style={{ backgroundColor: "#f7ef1e" }}>
            {editMode ? "EDIT Project Details" : "Project Details"}
          </Modal.Header>
          <Modal.Content className="modal-content">
            <Segment padded>
              <React.Fragment>
                <Grid doubling stackable centered className="form-wrapper">
                  <Grid.Column>
                    {!editMode ? (
                      // edit epic details form
                      <React.Fragment>
                        <p>Client Name:</p>
                        <Input
                          id="clientName"
                          type="text"
                          fluid
                          disabled
                          value={curCard.clientName}
                        />
                        <p>Project Title:</p>
                        <Input
                          id="projectTitle"
                          type="text"
                          fluid
                          value={curCard.projectTitle}
                          disabled
                        />
                        <Grid doubling stackable columns="4">
                          <Grid.Column>
                            <p>Start Date:</p>{" "}
                            <Input
                              id="startDate"
                              type="date"
                              disabled
                              value={curCard.startDate}
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
                              End Date (optional):
                            </p>{" "}
                            <Input
                              id="endDate"
                              type="date"
                              disabled
                              value={curCard.endDate}
                            />
                          </Grid.Column>
                        </Grid>
                        <p>Description:</p>
                        <TextArea
                          disabled
                          id="description"
                          style={{
                            minHeight: 100,
                            width: "100%",
                            padding: "10px",
                          }}
                          value={curCard.description}
                        />
                        <Accordion fluid styled>
                          <Accordion.Title
                            active={activeIndex === 0}
                            index={0}
                            onClick={handleOnClick}
                          >
                            <Grid columns="2">
                              <Grid.Column>
                                {" "}
                                <p>
                                  <Icon name="dropdown" />
                                  Tasks (#)
                                </p>
                              </Grid.Column>{" "}
                              <Grid.Column >
                                {" "}
                                <Button color='blue' circular floated="right" icon="add"></Button>
                              </Grid.Column>
                            </Grid>
                          </Accordion.Title>
                          <Accordion.Content active={activeIndex === 0}>
                            <Segment>
                              <List bulleted>
                                <List.Item>Task One</List.Item>
                                <List.Item>Task Two</List.Item>
                                <List.Item>Task Three</List.Item>
                              </List>
                            </Segment>
                          </Accordion.Content>
                        </Accordion>

                        <Grid padded>
                          <Grid.Column>
                            {" "}
                            <Button
                              color="red"
                              floated="right"
                              onClick={() => {
                                deleteEpic(curCard.id);
                              }}
                            >
                              Delete
                            </Button>
                            <Button
                              color="blue"
                              floated="right"
                              onClick={() => {
                                openEditForm();
                              }}
                            >
                              Edit
                            </Button>
                          </Grid.Column>
                        </Grid>
                      </React.Fragment>
                    ) : (
                      //Non edit epic details (view only
                      <React.Fragment>
                        <p>Client Name:</p>
                        <Input
                          id="clientName"
                          type="text"
                          fluid
                          onChange={(event) => {
                            setClientName(event.target.value);
                          }}
                        />
                        <p>Project Title:</p>
                        <Input
                          id="projectTitle"
                          type="text"
                          fluid
                          onChange={(event) => {
                            setTitle(event.target.value);
                          }}
                        />
                        <Grid doubling stackable columns="4">
                          <Grid.Column>
                            <p>Start Date:</p>{" "}
                            <Input
                              id="startDate"
                              type="date"
                              onChange={(event) => {
                                setStartDate(event.target.value);
                              }}
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
                              End Date (optional):
                            </p>{" "}
                            <Input
                              id="endDate"
                              type="date"
                              onChange={(event) => {
                                setEndDate(event.target.value);
                              }}
                            />
                          </Grid.Column>
                        </Grid>
                        <p>Description:</p>
                        <TextArea
                          id="description"
                          style={{
                            minHeight: 100,
                            width: "100%",
                            padding: "10px",
                          }}
                          onChange={(event) => {
                            setDescription(event.target.value);
                          }}
                        />

                        <Grid>
                          <Grid.Column>
                            {" "}
                            <Button
                              color="green"
                              floated="right"
                              onClick={() => {
                                updateEpic(curCard.id);
                              }}
                            >
                              Update
                            </Button>
                            <Button
                              color="red"
                              floated="right"
                              onClick={() => {
                                setEditMode(false);
                              }}
                            >
                              Cancel
                            </Button>
                          </Grid.Column>
                        </Grid>
                      </React.Fragment>
                    )}
                  </Grid.Column>
                </Grid>
              </React.Fragment>
            </Segment>
          </Modal.Content>
        </Modal>
      </Grid.Column>
    </Grid>
  );
};

export default ProjectDetailsModal;
