import { Grid, Header, Icon, Image } from "semantic-ui-react";
import "./components.css";

const TopNav = () => {
  return (
    <Grid className="head" padded stackable verticalAlign="middle" divided>
      <Grid.Column>
        {" "}
        <Image src="logo.png" size="medium" />
      </Grid.Column>

      {/* <Icon textAlign='right' className="avatar" name="user circle" size="big" /> */}
    </Grid>
  );
};

export default TopNav;
