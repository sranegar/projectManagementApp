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

const Calendar = () => {
  const [open, setOpen] = useState(false);

  //Open add epic form modal
  const openModal = () => {
    setOpen(!open);
  };

  const myObj = [
    {
      id: 1,
      epic: "Name one",
    },
    { id: 2, epic: "Name two" },
  ];

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
                  Timeline
                </Header>
              </Grid.Column>
              {/* <Grid.Column textAlign="right">
                <Button color="orange" onClick={openModal}>
                  <Icon name="add" />
                  Add Project
                </Button>
              </Grid.Column> */}
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
                <Grid.Column style={{ padding: "60px 20px" }}></Grid.Column>
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
              {/* <Header
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
              </Header> */}
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

export default Calendar;
