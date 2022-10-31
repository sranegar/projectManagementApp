import { Grid, Icon} from "semantic-ui-react";
import "./components.css";

export default function Menu({ pages, curPage, setCurPage }) {

  function handleOnClick(projectIdx) {
    setCurPage(projectIdx);
   
  }

  return (
    <Grid inverted divided columns="3" padded className="bottom-nav">
      <Grid.Column textAlign="center" verticalAlign="middle">
        <Icon
          className="nav-icon"
          name="list alternate outline"
          size="big"
          onClick={() => {
            handleOnClick(1);
          }}
        />
      </Grid.Column>
      <Grid.Column textAlign="center" verticalAlign="middle">
        <Icon
          className="nav-icon"
          name="home"
          size="big"
          onClick={() => {
            handleOnClick(0);
          }}
        />
      </Grid.Column>
      <Grid.Column textAlign="center" verticalAlign="middle">
        <Icon
          className="nav-icon"
          name="calendar alternate outline"
          size="big"
          onClick={() => {
            handleOnClick(2);
          }}
        />
      </Grid.Column>
    </Grid>
  );
};

 
 