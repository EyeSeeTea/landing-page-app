import { Chip, Typography, withStyles } from "@material-ui/core";
import { ExitToApp, Home } from "@material-ui/icons";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import i18n from "../../../../locales";
import { goToDhis2Url, goToExternalUrl } from "../../../../utils/utils";
import { styles } from "./styles";

const ECDDHeader = ({ classes, history, baseUrl, title, backUrl }) => {
    const actionWHO = () => goToExternalUrl("https://who.int");
    const actionBack = () => history.push(backUrl);
    const actionLogout = () => goToDhis2Url(baseUrl, "/dhis-web-commons-security/logout.action");

    return (
        <header className={classes.container}>
            <img className={classes.logo} onClick={actionWHO} alt={title} src="img/who-logo.png" />
            <div className={classes.titleContainer} onClick={actionBack}>
                <Home className={classes.title} fontSize="large" />
                <Typography className={classes.title} variant="h4">
                    {title}
                </Typography>
            </div>

            <Chip icon={<ExitToApp />} label={i18n.t("LOG OUT")} className={classes.logout} onClick={actionLogout} />
        </header>
    );
};

ECDDHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    baseUrl: PropTypes.string.isRequired,
    title: PropTypes.string,
    backUrl: PropTypes.string,
};

ECDDHeader.defaultProps = {
    title: i18n.t("Expert Committee on Drug Dependence"),
    backUrl: "/",
};

export default withRouter(withStyles(styles)(ECDDHeader));
