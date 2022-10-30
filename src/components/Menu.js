import { Grid, Icon} from "semantic-ui-react";
import "./components.css";

const Menu = () => {
  
  return (
    <Grid divided columns="3" padded className="bottom-nav">
      <Grid.Column textAlign="center" verticalAlign="middle">
        <Icon className="nav-icon" name="list alternate outline" size="big" />
      </Grid.Column>
      <Grid.Column textAlign="center" verticalAlign="middle">
        <Icon className="nav-icon" name="home" size="big" />
      </Grid.Column>
      <Grid.Column textAlign="center" verticalAlign="middle">
        <Icon
          className="nav-icon"
          name="calendar alternate outline"
          size="big"
        />
      </Grid.Column>
    </Grid>
  );
};

export default Menu;
