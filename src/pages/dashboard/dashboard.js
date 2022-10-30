import React, { useState } from "react";
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
} from "semantic-ui-react";

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  //Open add epic form modal
  const openModal = () => {
    setOpen(!open);
  };

  const myObj = [{
    id: 1,
    epic: "Name one"
  },
  {id: 2, epic: "Name two"}]

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
          <Segment padded="very" secondary style={{ paddingBottom: "60px" }}>
            <Grid columns="2">
              <Grid.Column>
                <Header as="h2" style={{ paddingBottom: "10px" }}>
                  Dashboard
                </Header>
              </Grid.Column>
              <Grid.Column textAlign="right">
                <Button color="blue" onClick={openModal}>
                  <Icon name="add" />
                  Add Task
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
              <Grid doubling stackable columns="3" padded></Grid>
            </Segment>
          </Segment>
        </Grid.Column>
      </Grid.Column>
    </Grid>
  );
};

export default Dashboard;
