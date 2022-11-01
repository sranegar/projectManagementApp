import React, { useEffect, useState } from "react";
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
  List,
  CardHeader,
} from "semantic-ui-react";
import useFirebase from "../../services/useFirebase";

const Dashboard = () => {
  const initVal = [
    {
      title: "",
      details: "",
    },
  ];

  const [makeTasks, setMakeTasks] = useState();
  const [taskDetails, setTaskDetails] = useState([]);
  const [tasksArray, setTasksArray] = useState([]);
  const [setNew, setNewArray] = useState([]);
  const [open, setOpen] = useState(false);
  const { epics } = useFirebase();
  const [allTasks, setAllTasks] = useState([]);
  //Open add epic form modal
  const openModal = () => {
    setOpen(!open);

    getData();

    setArray();

    nextSet();
  };

  console.log(setNew);

  const getData = () => {
    makeTasks.map((t) => setTaskDetails(...makeTasks));
    // setAllTasks([...setNew[1], ...setNew[2], ...setNew[3], ...setNew[4]]);
  };

  const setArray = () => {
    taskDetails.map((v) => setTasksArray(Object.values(v)));
  };

  const nextSet = () => {
    tasksArray.map((t) => setNewArray([...tasksArray, ...Object.values(t)]));
  };

  useEffect(() => {
    const getTasks = () => {
      setMakeTasks(
        epics.map((e) => ({
          ...e.tasks,
        }))
      );
    };

    getTasks();
  }, [epics]);

  return (
    <Grid padded doubling stackable className="main-wrapper">
      <Grid.Column>
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          closeIcon
          size="small"
        >
          <Modal.Header style={{ backgroundColor: "#f7ef1e" }}>
            Add Task
          </Modal.Header>
          <Modal.Content className="modal-content">
            <Segment padded>
              <Grid doubling stackable centered className="form-wrapper">
                <Grid.Column>
                  <p>Title:</p>
                  <Input
                    id="clientName"
                    type="text"
                    fluid
                    placeholder="Client Name"
                  />
                  {/* <p>Epic:</p> */}

                  <Grid stackable columns="4">
                    {/* <Grid.Column>
                      <p>Start Date:</p>{" "}
                      <Input
                        id="startDate"
                        type="date"
                     
                      />
                    </Grid.Column> */}
                  </Grid>
                  <p>Details:</p>
                  <TextArea
                    id="details"
                    style={{ minHeight: 100, width: "100%", padding: "10px" }}
                    placeholder="Brief details of task..."
                  />
                </Grid.Column>
              </Grid>

              <Grid>
                <Grid.Column>
                  {" "}
                  <Button color="green" floated="right">
                    Save Project
                  </Button>
                </Grid.Column>
              </Grid>
            </Segment>
          </Modal.Content>
        </Modal>
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
                  Dashboard 
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
                To Do
              </Header>
              <Grid doubling stackable columns="4" padded>
                <Grid.Column style={{ padding: "60px 20px" }}>
                  {/* {allTasks.map((t) => {
                    {
                      console.log(t);
                    }
                    <Card>
                      <CardHeader>{t.details}</CardHeader>
                    </Card>;
                  })} */}
                </Grid.Column>
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
                <Grid.Column style={{ padding: "60px 20px" }}></Grid.Column>
              </Grid>
            </Segment>
          </Segment>
        </Grid.Column>
      </Grid.Column>
    </Grid>
  );
};

export default Dashboard;
