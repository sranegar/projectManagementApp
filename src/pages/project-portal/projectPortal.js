import {
  Button,
  Card,
  Grid,
  Header,
  Icon,
  Segment,
  Modal,
  Input,
  Label,
  TextArea,
  Form,
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

const Main = () => {
  const [client, setClientName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStartDate] = useState("");
  const [end, setEndDate] = useState("");
  const [status, setStatus] = useState(1);

  const [open, setOpen] = useState(false);
  const [epics, setEpics] = useState([]);
  const epicsCollectionRef = collection(db, "epics");

  const createEpic = async () => {
    await addDoc(epicsCollectionRef, {
      clientName: client,
      projectTitle: title,
      startDate: start,
      endDate: end,
      description: description,
      status: status,
    });
    setOpen(false);

  };

  const openModal = () => {
    setOpen(!open);
  }

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
  }, [createEpic]);

  return (
    <Grid padded doubling stackable className="main-wrapper">
      <Grid.Column>
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          closeIcon
         
        >
          <Modal.Header style={{ backgroundColor: "#f7ef1e" }}>
            Add New Project
          </Modal.Header>
          <Modal.Content className="modal-content">
            <Segment padded>
              <Grid centered className="form-wrapper">
                <Grid.Column>
                  <p>Client Name:</p>
                  <Input
                    id="clientName"
                    type="text"
                    fluid
                    placeholder="Client Name"
                    onChange={(event) => {
                      setClientName(event.target.value);
                    }}
                  />
                  <p>Project Title:</p>
                  <Input
                    id="projectTitle"
                    type="text"
                    fluid
                    placeholder="Project Title"
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}
                  />
                  <Grid columns="3">
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
                    style={{ minHeight: 100, width: "100%", padding: "10px" }}
                    placeholder="Brief description of project..."
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                  />
                </Grid.Column>
              </Grid>

              <Grid>
                <Grid.Column>
                  {" "}
                  <Button color="green" floated="right" onClick={createEpic}>
                    Save Project
                  </Button>
                </Grid.Column>
              </Grid>
            </Segment>
          </Modal.Content>
        </Modal>
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
              <Grid stackable columns="3" padded>
                {epics.map((epic) => {
                  return (
                    <Grid.Column style={{ padding: "20px 40px" }} key={epic.id}>
                      <Card
                        raised
                        fluid
                        color="green"
                        style={{ padding: "10px" }}
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
