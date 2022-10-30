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
      <Grid.Row>
        <Header as="h3">RockSTAR</Header>
        {/* <Icon textAlign='right' className="avatar" name="user circle" size="big" /> */}
      </Grid.Row>
       
    </Grid>
  );
};

export default TopNav;
