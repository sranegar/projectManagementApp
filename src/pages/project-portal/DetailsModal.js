import React, { useEffect, useState } from "react";
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
  Label,
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
  initValues,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const [formValues, setFormValues] = useState(initValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  //Delete epic
  const deleteEpic = async (id) => {
    const epicDoc = doc(db, "epics", id);
    await deleteDoc(epicDoc);
    setShowModal(false);
  };

  //Update epic
  const openEditForm = () => {
    setEditMode(true);
    setFormValues(initValues);
  };

  const updateEpic = async (id) => {
    const epicDoc = doc(db, "epics", id);

    await updateDoc(epicDoc, formValues);
    setEditMode(false);
    setShowModal(false);
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

  function handleOnClick(e, titleProps) {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  }

  useEffect(() => {
     
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      updateEpic(curCard.id);
    }
  }, [formErrors]);

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
          size="small"
          centered
        >
          <Modal.Header style={{ backgroundColor: "#f7ef1e" }}>
            {editMode ? "EDIT Project Details" : "Project Details"}
          </Modal.Header>
          {/* <pre>{JSON.stringify(formValues, undefined, 10)}</pre> */}
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
                          name="clientName"
                          type="text"
                          fluid
                          disabled
                          value={initValues.clientName}
                        />
                        <p>Project Title:</p>
                        <Input
                          name="projectTitle"
                          type="text"
                          fluid
                          value={initValues.projectTitle}
                          disabled
                        />
                        <Grid doubling stackable columns="2">
                          <Grid.Column>
                            <p>Start Date (optional):</p>{" "}
                            <Input
                              name="startDate"
                              type="date"
                              disabled
                              value={initValues.startDate}
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
                              name="endDate"
                              type="date"
                              disabled
                              value={initValues.endDate}
                            />
                          </Grid.Column>
                        </Grid>
                        <p>Description:</p>
                        <TextArea
                          disabled
                          name="description"
                          style={{
                            minHeight: 100,
                            width: "100%",
                            padding: "10px",
                          }}
                          value={initValues.description}
                        />
                        <Grid padded columns="2" stackable>
                          <Grid.Column width="14">
                            <Accordion styled>
                              <Accordion.Title
                                active={activeIndex === 0}
                                index={0}
                                onClick={handleOnClick}
                              >
                                {" "}
                                <p>
                                  <Icon name="dropdown" />
                                  Tasks (#)
                                </p>
                              </Accordion.Title>

                              <Accordion.Content active={activeIndex === -1}>
                                <Segment>
                                  <List bulleted>
                                    {/* <List.Item>Task One</List.Item>
                                      <List.Item>Task Two</List.Item>
                                      <List.Item>Task Three</List.Item> */}
                                  </List>
                                </Segment>
                              </Accordion.Content>
                            </Accordion>
                          </Grid.Column>
                          <Grid.Column width="2" style={{ padding: "20px" }}>
                            {" "}
                            <Button
                              color="blue"
                              circular
                              floated="right"
                              icon="add"
                              size="small"
                            ></Button>
                          </Grid.Column>
                        </Grid>
                        <Grid padded>
                          <Grid.Column>
                            {" "}
                            <Button
                              type="button"
                              color="red"
                              floated="right"
                              onClick={() => {
                                deleteEpic(curCard.id);
                              }}
                            >
                              Delete
                            </Button>
                            <Button
                              type="button"
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
                        <p>
                          Client Name:{" "}
                          <span
                            style={{ fontWeight: "lighter", color: "blue" }}
                          >
                            {formValues.clientName}
                          </span>
                        </p>
                        <Input
                          name="clientName"
                          type="text"
                          fluid
                          onChange={handleOnChange}
                        />
                        {formErrors.clientName ? (
                          <Label basic color="red" pointing>
                            {formErrors.clientName}
                          </Label>
                        ) : null}
                        <p>
                          Project Title:{" "}
                          <span
                            style={{ fontWeight: "lighter", color: "blue" }}
                          >
                            {formValues.projectTitle}
                          </span>
                        </p>
                        <Input
                          name="projectTitle"
                          type="text"
                          fluid
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
                              <span
                                style={{ color: "red", fontStyle: "italic" }}
                              >
                                (optional)
                              </span>
                              :{" "}
                              <span
                                style={{ fontWeight: "lighter", color: "blue" }}
                              >
                                {formValues.startDate}
                              </span>
                            </p>{" "}
                            <Input
                              name="startDate"
                              type="date"
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
                              <span
                                style={{ color: "red", fontStyle: "italic" }}
                              >
                                (optional)
                              </span>
                              :{" "}
                              <span
                                style={{ fontWeight: "lighter", color: "blue" }}
                              >
                                {formValues.endDate}
                              </span>
                            </p>{" "}
                            <Input
                              name="endDate"
                              type="date"
                              onChange={handleOnChange}
                            />
                          </Grid.Column>
                        </Grid>
                        <p>
                          Description:{" "}
                          <span
                            style={{ fontWeight: "lighter", color: "blue" }}
                          >
                            {formValues.projectTitle}
                          </span>
                        </p>
                        <TextArea
                          name="description"
                          style={{
                            minHeight: 100,
                            width: "100%",
                            padding: "10px",
                          }}
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
                              onClick={handleSubmit}
                              type="submit"
                            >
                              Update
                            </Button>
                            <Button
                              type="button"
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
