import i18n from "../../../locales";
import { withStyles } from "@material-ui/core";
import { styles } from "./styles";
import PropTypes from "prop-types";

const ECDDLandingTitle = ({ classes }) => {
    return (
        <div className={classes.title}>
            <p>{i18n.t("WHO Questionnaire")}</p>
            <p>{i18n.t("46th Expert Committee on Drug Dependence")}</p>
        </div>
    );
};
const StyledECDDLandingTitle = withStyles(styles)(ECDDLandingTitle);

const ECDDLandingContent = ({ classes }) => {
    return (
        <>
            <p>
                {i18n.t(
                    "This questionnaire will take about 15-25 minutes to complete. You may return to the questionnaire to amend your responses at any time until the closure of the questionnaire."
                )}
            </p>
            <p>
                {i18n.t(
                    "The information requested in this questionnaire will require medical value and/or information on the potential for abuse, dependence and harm to public health in your country."
                )}
            </p>
            <p>
                {i18n.t(
                    "To commence the questionnaire, you will first be asked to indicate that you agree to the WHO data sharing policy."
                )}
            </p>
            <p>
                {i18n.t(
                    "The responses to this questionnaire will be compiled into a report that will be made publicly available on the WHO ECDD website. The name of your country may be attributed to the information provided unless you indicate that you wish for your country name to be anonymized in the final report."
                )}
            </p>
            <p>
                {i18n.t(
                    "If you wish to submit any additional information to the attention of the ECDD Secretariat to be considered for inclusion in the final questionnaire report, you will have an opportunity to upload documents at the end of the questionnaire."
                )}
            </p>
            <p>
                {i18n.t(
                    "Appendix 1 contains information on key contacts that might have data to support completion of the questionnaire."
                )}
            </p>
            <p>
                {i18n.t("Any sensitive, confidential or unpublished documents should be emailed to ")}
                <a className={classes.link} href={`mailTo:${"ecddsecretariat@who.int"}`}>
                    {i18n.t("ecddsecretariat@who.int.")}
                </a>
            </p>
            <p>{i18n.t("We thank you in advance for taking the time to complete this questionnaire.")}</p>
        </>
    );
};
const StyledECDDLandingContent = withStyles(styles)(ECDDLandingContent);

ECDDLandingContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export const ECDDData = [
    {
        key: "content",
        title: <StyledECDDLandingTitle />,
        description: <StyledECDDLandingContent />,
        rowLength: 1,
    },
];
