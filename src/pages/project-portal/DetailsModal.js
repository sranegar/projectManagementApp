import React, { useState } from "react";
import {
  Grid,
  Modal,
  Segment,
  Input,
  TextArea,
  Button,
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
  view
}) => {
  const [editMode, setEditMode] = useState(false);

  const deleteEpic = async (id) => {
    const epicDoc = doc(db, "epics", id);
    await deleteDoc(epicDoc);
    setShowModal(false);
  };

  const updateEpic = async (id) => {
    setEditMode(!editMode);
    const epicDoc = doc(db, "epics", id);
    // const newFields = { projectTitle: title + 1 };

    await updateDoc(epicDoc);
  };

  
  
  return (
    <Grid>
      <Grid.Column>
        <Modal
          onClose={() => setShowModal(false)}
          onOpen={() => setShowModal(true)}
          open={showModal}
          closeIcon
        >
          <Modal.Header style={{ backgroundColor: "#f7ef1e" }}>
            Project Details
          </Modal.Header>
          <Modal.Content className="modal-content">
            <Segment padded>
              <React.Fragment>
                <Grid centered className="form-wrapper">
                  <Grid.Column>
                    {!editMode ? (
                      <React.Fragment>
                        <p>Client Name:</p>
                        <Input
                          id="clientName"
                          type="text"
                          fluid
                          disabled
                          value={view.clientName}
                        />
                        <p>Project Title:</p>
                        <Input
                          id="projectTitle"
                          type="text"
                          fluid
                          value={view.projectTitle}
                          disabled
                        />
                        <Grid columns="3">
                          <Grid.Column>
                            <p>Start Date:</p>{" "}
                            <Input id="startDate" type="date" disabled />
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
                            <Input id="endDate" type="date" disabled />
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
                          value={view.description}
                        />
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <p>Client Name:</p>
                        <Input
                          id="clientName"
                          type="text"
                          fluid
                          // value={console.log(epics)}
                        />
                        <p>Project Title:</p>
                        <Input
                          id="projectTitle"
                          type="text"
                          fluid
                          // value={e.projectTitle}
                        />
                        <Grid columns="3">
                          <Grid.Column>
                            <p>Start Date:</p>{" "}
                            <Input id="startDate" type="date" />
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
                            <Input id="endDate" type="date" />
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
                          // value={e.description}
                        />
                      </React.Fragment>
                    )}
                  </Grid.Column>
                </Grid>
              </React.Fragment>

              <Grid>
                <Grid.Column>
                  {" "}
                  <Button
                    color="red"
                    floated="right"
                    onClick={() => {
                      deleteEpic(cardID);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    color="blue"
                    floated="right"
                    onClick={() => {
                      updateEpic(cardID);
                    }}
                  >
                    Edit
                  </Button>
                </Grid.Column>
              </Grid>
            </Segment>
          </Modal.Content>
        </Modal>
      </Grid.Column>
    </Grid>
  );
};

export default ProjectDetailsModal;
