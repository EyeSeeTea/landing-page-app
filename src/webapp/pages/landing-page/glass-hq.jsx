import { withStyles } from "@material-ui/core";
import { styles } from "../../../domain/models/amr/styles";
import LandingPage from "./generic";

// GLASS landing page, re-uses the styles from mal repo
const GLASSLandingPage = props => {
    return <LandingPage {...props} />;
};

export default withStyles(styles)(GLASSLandingPage);
