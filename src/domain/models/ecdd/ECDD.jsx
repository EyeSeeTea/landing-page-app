import i18n from "../../../locales";
import { useState } from "react";
import { withStyles } from "@material-ui/core";
import { styles } from "./styles";
import PropTypes from "prop-types";
import { SimpleCheckBox } from "@eyeseetea/d2-ui-components";
import { goToDhis2Url } from "../../../utils/utils";

const ECDDLandingTitle = ({ classes }) => {
    return (
        <div className={classes.title}>
            <p>{i18n.t("WHO Questionnaire")}</p>
            <p>{i18n.t("46th Expert Committee on Drug Dependence")}</p>
        </div>
    );
};
const StyledECDDLandingTitle = withStyles(styles)(ECDDLandingTitle);

const ECDDLandingContent = ({ classes, baseUrl }) => {
    const [isDataSharingSectionVisible, setDataSharingSectionVisibility] = useState();
    const [isDataEntrySectionVisible, setDataEntrySectionVisibility] = useState();

    const actionDataEntry = () => goToDhis2Url(baseUrl, "/dhis-web-dataentry/index.action");

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
            <ol>
                <li>
                    <span>
                        {i18n.t(
                            "Please confirm that you agree for the information provided in this questionnaire to be published. [this item requires a response]"
                        )}
                    </span>
                    <p>
                        <SimpleCheckBox
                            checked={isDataSharingSectionVisible}
                            onClick={() => setDataSharingSectionVisibility(true)}
                        />
                        <span className={classes.checkboxText}>
                            {i18n.t(
                                "I agree for the information provided in this questionnaire to be published (I will choose later if my country name is to be anonymised in the final report"
                            )}
                        </span>
                    </p>
                    <p>
                        <SimpleCheckBox
                            checked={!isDataSharingSectionVisible && isDataSharingSectionVisible !== undefined}
                            onClick={() => setDataSharingSectionVisibility(false)}
                        />
                        <span className={classes.checkboxText}>
                            {i18n.t(
                                "I do not agree for the information provided in this questionnaire to be published (end this survey)"
                            )}
                        </span>
                    </p>
                </li>

                {isDataSharingSectionVisible && (
                    <>
                        <div>
                            <p className={classes.subHeading}>{i18n.t("Statement of policy on data sharing")}</p>
                            <p>
                                {i18n.t(
                                    "Data are the basis for all sound public health actions and the benefits of data sharing are widely recognized, including scientific and public health benefits. Whenever possible, WHO wishes to promote the sharing of health data, including but not restricted to surveillance and epidemiological data."
                                )}
                            </p>
                            <p>
                                {i18n.t(
                                    "In this connection, and without prejudice to information sharing and publication pursuant to legally binding instruments, by providing data to WHO, our focal point confirm that:"
                                )}
                            </p>
                            <p>
                                {i18n.t(
                                    "Confirms that all data to be supplied to WHO (including but not limited to the types listed in Annex 3"
                                )}
                                <sup>1</sup>)
                                {i18n.t(
                                    "hereunder have been collected in accordance with applicable national laws, including data protection laws aimed at protecting the confidentiality of identifiable persons;"
                                )}
                            </p>
                            <p>
                                {i18n.t(
                                    "Agrees that WHO shall be entitled, subject always to measures to ensure the ethical and secure use of the data, and subject always to an appropriate acknowledgement of this focal point."
                                )}
                            </p>
                            <ul className={classes.bulletList}>
                                <li>
                                    {i18n.t(
                                        'to publish the data, stripped of any personal identifiers (such data without personal identifiers being hereinafter referred to as "the Data" and make the Data available to any interested party on request (to the extent they have not, or not yet, been published by WHO) on terms that allow noncommercial, not-for-profit use of the Data for public health purposes (provided always that publication of the Data shall remain under the control of WHO);'
                                    )}
                                </li>
                                <li>
                                    {i18n.t(
                                        "to use, compile, aggregate, evaluate and analyse the Data and publish and disseminate the results thereof in conjunction with WHO's work and in accordance with the Organization's policies and practices."
                                    )}
                                </li>
                            </ul>

                            <p>
                                {i18n.t(
                                    "Except where data sharing and publication is required under legally binding instruments (IHR, WHO Nomenclature Regulations 1967, etc.), the focal point of [Country] may in respect of certain data opt out of (any part of) the above, by notifying WHO thereof in writing at the following email address, provided that any such notification shall clearly identify the data in question and clearly indicate the scope of the opt-out (in reference to the above), and provided that specific reasons shall be given for the opt out."
                                )}
                                <a className={classes.link} href={`mailTo:${"ecddsecretariat@who.int"}`}>
                                    {i18n.t("ecddsecretariat@who.int.")}
                                </a>
                            </p>
                        </div>

                        <li>
                            <span>
                                {i18n.t(
                                    "Do you agree to the ‘statement of policy on data sharing’ as outlined above? [this item requires a response]"
                                )}
                            </span>
                            <p>
                                <SimpleCheckBox
                                    checked={isDataEntrySectionVisible}
                                    onClick={() => setDataEntrySectionVisibility(true)}
                                />
                                <span className={classes.checkboxText}>{i18n.t("Yes")}</span>
                            </p>
                            <p>
                                <SimpleCheckBox
                                    checked={!isDataEntrySectionVisible && isDataEntrySectionVisible !== undefined}
                                    onClick={() => setDataEntrySectionVisibility(false)}
                                />
                                <span className={classes.checkboxText}>{i18n.t("No (end this survey)")}</span>
                            </p>
                        </li>
                    </>
                )}
            </ol>

            {isDataEntrySectionVisible && (
                <button className={classes.dataEntryButton} onClick={actionDataEntry}>
                    {i18n.t("Go to Data Entry App")}
                </button>
            )}

            {isDataSharingSectionVisible && (
                <footer className={classes.footer}>
                    <sup>1</sup>{" "}
                    {i18n.t(
                        "Policy on use and sharing of data collected in Member States by the World Health Organization (WHO) outside the context of public health emergencies (Provisional). Geneva: World Health Organization; 2017 (https://www.who.int/publishing/datapolicy/Policy_data_sharing_non_emergency_final.pdf) , accessed 14 August 2019"
                    )}
                </footer>
            )}
        </>
    );
};
const StyledECDDLandingContent = withStyles(styles)(ECDDLandingContent);

ECDDLandingContent.propTypes = {
    classes: PropTypes.object.isRequired,
    baseUrl: PropTypes.string.isRequired,
};

export const ECDDData = baseUrl => [
    {
        key: "content",
        title: <StyledECDDLandingTitle />,
        description: <StyledECDDLandingContent baseUrl={baseUrl} />,
        rowLength: 1,
    },
];
