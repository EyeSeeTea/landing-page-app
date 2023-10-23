import { withStyles } from "@material-ui/core";
import { styles } from "../../../domain/models/ecdd/styles";
import LandingPage from "./generic";

const ECDDLandingPage = props => {
    return <LandingPage {...props} />;
};

export default withStyles(styles)(ECDDLandingPage);
