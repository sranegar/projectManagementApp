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
  Header,
} from "semantic-ui-react";
import Moment from "react-moment";

const ProjectDetailsModal = ({
  showModal,
  setShowModal,
  doc,
  deleteDoc,
  db,
  updateDoc,
  curCard,
  initValues,
  viewTasks,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const [values, setValues] = useState(initValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [showAddTask, setShowAddTask] = useState(false);

 
  const [newTasks, setNewTasks] = useState({});
  const [tasksArray, setTasksArray] = useState(viewTasks);

  //Delete epic
  const deleteEpic = async (id) => {
    const epicDoc = doc(db, "epics", id);
    await deleteDoc(epicDoc);
    setShowModal(false);
  };

  //Update epic
  const openEditForm = () => {
    setEditMode(true);
    setValues(initValues);
  };

  const updateEpic = async (id) => {
    const epicDoc = doc(db, "epics", id);

    await updateDoc(epicDoc, values);
    setEditMode(false);
    setShowModal(false);
  };

  // const updateAddTask = async (id) => {
  //   const epicDoc = doc(db, "epics", id);

  //    await updateDoc(epicDoc, values);
  // }

  // let chb = document.getElementById("checkboxInput");
  // console.log(Object.values({chb}).map((c) => {return c.checked}));

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleAddTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTasks({ ...newTasks, [name]: value });
    setValues({
      ...values,
      tasks: [
      ...tasksArray,
      newTasks,
      ]
    });
  };

  const onClick = (e) => {
    const { name, checked } = e.target;
    setValues({ ...values, [name]: checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(values));
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

  const openAddTaskForm = () => {
    setShowAddTask(!showAddTask);
    setActiveIndex(-1);
    setValues(initValues);
    setTasksArray(viewTasks);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      updateEpic(curCard.id);
    }
  }, [formErrors]);

  console.log(values);
  return (
    <Grid>
      <Grid.Column>
        {/* View epic details modal */}
        <Modal
          onClose={() => {
            setShowModal(false);
            setEditMode(false);
            setShowAddTask(false);
            setActiveIndex(0);
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
          <pre>{JSON.stringify(values, undefined, 10)}</pre>
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
                          value={curCard.clientName}
                        />
                        <p>Project Title:</p>
                        <Input
                          name="projectTitle"
                          type="text"
                          fluid
                          value={curCard.projectTitle}
                          disabled
                        />
                        <Grid doubling stackable columns="2">
                          <Grid.Column>
                            <p>
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
                              name="startDate"
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
                              name="endDate"
                              type="date"
                              disabled
                              value={curCard.endDate}
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
                          value={curCard.description}
                        />

                        <Grid padded columns="2" stackable>
                          <Grid.Column width="14">
                            <Accordion>
                              <Accordion.Title
                                active={activeIndex === -1}
                                index={0}
                                onClick={handleOnClick}
                              >
                                {" "}
                                <p>
                                  <Icon name="dropdown" />
                                  Tasks ({viewTasks ? `${viewTasks.length}` : 0}
                                  )
                                </p>
                              </Accordion.Title>
                              {viewTasks ? (
                                <Accordion.Content active={activeIndex === -1}>
                                  <Segment>
                                    {showAddTask ? (
                                      <Segment>
                                        <form onSubmit={handleSubmit}>
                                          <Header as="h4">Add New Task</Header>
                                          <p style={{ fontSize: "12px" }}>
                                            Task Title:
                                          </p>
                                          <Input
                                            name="title"
                                            size="mini"
                                            fluid
                                            onChange={handleAddTaskChange}
                                          />
                                          <p style={{ fontSize: "12px" }}>
                                            Task Details:
                                          </p>
                                          <TextArea
                                            style={{
                                              minHeight: 20,
                                              width: "100%",
                                              padding: "10px",
                                            }}
                                            name="details"
                                            placeholder="Details of task..."
                                            onChange={handleAddTaskChange}
                                          />
                                          <Grid>
                                            {" "}
                                            <Grid.Column>
                                              <Button
                                                type="submit"
                                                icon="add"
                                                primary
                                                floated="right"
                                                size="mini"
                                                content="Add Task"
                                              />
                                            </Grid.Column>
                                          </Grid>
                                        </form>
                                      </Segment>
                                    ) : undefined}
                                    <List divided>
                                      {viewTasks.map((t) => (
                                        <List.Item>
                                          <Grid
                                            columns="2"
                                            style={{ padding: "0px 10px" }}
                                          >
                                            <Grid.Column width="1">
                                              <Checkbox checked={t.status} />
                                            </Grid.Column>
                                            <Grid.Column width="14">
                                              <List.Header
                                                style={{
                                                  textTransform: "uppercase",
                                                  color: "#2185d0",
                                                  fontVariantCaps:
                                                    "all-petite-caps",
                                                  fontSize: "18px",
                                                }}
                                              >
                                                {t.title}
                                              </List.Header>
                                              <List.Content
                                                style={{ fontSize: "12px" }}
                                              >
                                                {t.details}
                                              </List.Content>
                                            </Grid.Column>
                                          </Grid>
                                        </List.Item>
                                      ))}
                                    </List>{" "}
                                  </Segment>
                                </Accordion.Content>
                              ) : undefined}
                            </Accordion>
                          </Grid.Column>

                          <Grid.Column width="2" style={{ padding: "20px" }}>
                            {" "}
                            <Button
                              color={!showAddTask ? "blue" : "red"}
                              inverted
                              circular
                              floated="right"
                              icon={!showAddTask ? "add" : "close"}
                              size="mini"
                              onClick={openAddTaskForm}
                            ></Button>
                          </Grid.Column>
                        </Grid>
                        <Grid padded>
                          <Grid.Column>
                            <Checkbox
                              toggle
                              disabled
                              checked={curCard.status}
                              label="Complete"
                            />
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
                        <p>Client Name:</p>
                        <Input
                          name="clientName"
                          type="text"
                          fluid
                          value={values.clientName}
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
                          value={values.projectTitle}
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
                              name="startDate"
                              type="date"
                              value={values.startDate}
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
                              name="endDate"
                              type="date"
                              value={values.endDate}
                              onChange={handleOnChange}
                            />
                          </Grid.Column>
                        </Grid>
                        <p>Description:</p>
                        <TextArea
                          name="description"
                          style={{
                            minHeight: 100,
                            width: "100%",
                            padding: "10px",
                          }}
                          value={values.description}
                          onChange={handleOnChange}
                          id="description"
                        />
                        {formErrors.description ? (
                          <Label basic color="red" pointing>
                            {formErrors.description}
                          </Label>
                        ) : null}
                        <Grid columns="16" padded verticalAlign="middle">
                          <Grid.Column>
                            <Checkbox
                              toggle
                              id="checkboxInput"
                              name="status"
                              type="checkbox"
                              onClick={onClick}
                              checked={values.status}
                              label="Complete"
                            />
                          </Grid.Column>
                        </Grid>

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
