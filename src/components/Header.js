import { Grid, Header, Icon } from "semantic-ui-react";
import "./components.css";

const TopNav = () => {
  return (
    <Grid
      columns="2"
      className="head"
      padded
      stackable
      verticalAlign="middle"
      divided
    >
      <Grid.Column >
        <Header as="h3">Freelance Management</Header>
      </Grid.Column>
      <Grid.Column textAlign="right">
        <Icon className="avatar" name="user circle" size="big" />
      </Grid.Column>
    </Grid>
  );
};

export default TopNav;
