import _ from "lodash";
import i18n from "../../../locales";

const NHWANotification = () => {
    return (
        <>
            The data entry forms (datasets) and batch upload templates now reflect <u>ALL</u> the NHWA v2 modules.{" "}
            <u>
                <i>Please note to download the new templates for Batch upload option</i>
            </u>
            . All the historic data has been mapped for M01, M02; remaining modules to follow.
        </>
    );
};

export const nhwaAdminData = (_version: number) => [
    {
        key: "maturity-assessment-title",
        title: i18n.t("NHWA maturity assessment"),
        rowLength: 1,
    },
    {
        key: "maturity-assessment-link",
        iconDescription: i18n.t(
            "NHWA maturity assessment enables countries to assess their national information system and its capacity to address the NHWA indicators."
        ),
        rowLength: 1,
        icon: "img/dhis-web-dataentry.png",
        size: "small",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-dataentry/index.action",
        },
    },
    {
        key: "validate-baseline-data-title",
        title: i18n.t("Validate existing baseline data"),
        rowLength: 1,
    },
    {
        key: "validate-baseline-data-link",
        iconDescription: i18n.t(
            "The validation exercise enables countries to view existing data and undertake necessary action of data correction/update as required."
        ),
        rowLength: 1,
        icon: "img/dhis-web-data-visualizer.png",
        size: "small",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-data-visualizer/index.html#/mElD0yiuFpU",
        },
    },
    {
        key: "nhwa-data-entry-title",
        title: i18n.t("NHWA data entry"),
        notification: <NHWANotification />,
        description: i18n.t(
            "Data entry into the system can be done (i) directly through the system interface or (ii) as batch upload through excel sheets."
        ),
        size: "small",
        rowLength: 1,
    },
    {
        key: "nhwa-data-entry-link",
        iconDescription: i18n.t("Data entry through the system interface"),
        rowLength: 3,
        icon: "img/dhis-web-dataentry.png",
        size: "small",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-dataentry/index.action",
        },
    },
    {
        key: "excel-importer-link",
        iconDescription: i18n.t("Batch upload through excel sheets"),
        rowLength: 3,
        icon: "img/bulk-load.png",
        size: "small",
        action: {
            type: "dhisRedirect",
            value: "/api/apps/Bulk-Load/index.html",
        },
    },
    {
        key: "visualize-data-title",
        title: i18n.t("Visualise data"),
        description: i18n.t(
            "Access programmed data infographics or create customised data visualisation with the existing data."
        ),
        size: "small",
        rowLength: 1,
    },
    {
        key: "data-visualizer-link",
        iconDescription: i18n.t("Data Visualizer"),
        description: i18n.t(
            "Enables users to easily create dynamic data analysis and visualizations through charts and data tables."
        ),
        rowLength: 3,
        icon: "img/dhis-web-data-visualizer.png",
        size: "small",
        action: {
            type: "method",
            value: async (_baseUrl: string, cb: Function) => {
                cb({
                    type: "dhisRedirect",
                    value: "/dhis-web-data-visualizer/index.html",
                });
            },
        },
    },
    {
        key: "gis-link",
        iconDescription: i18n.t("GIS"),
        description: i18n.t("Enables users to visualize data in Geographical location system."),
        rowLength: 3,
        icon: "img/dhis-web-maps.png",
        size: "small",
        action: {
            type: "method",
            value: async (_baseUrl: string, cb: Function) => {
                cb({
                    type: "dhisRedirect",
                    value: "/dhis-web-maps/index.html",
                });
            },
        },
    },
    {
        key: "dashboard-link",
        iconDescription: i18n.t("Dashboard"),
        description: i18n.t("Access pre populated data infographics based on existing data"),
        rowLength: 3,
        icon: "img/dhis-web-dashboard.png",
        size: "small",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-dashboard/index.html",
        },
    },
    {
        key: "nhwa-reports-link",
        iconDescription: i18n.t("NHWA Reports"),
        description: i18n.t("Access to the NHWA reports"),
        rowLength: 3,
        icon: "img/dhis-web-reports.png",
        size: "small",
        action: {
            type: "method",
            value: async (_baseUrl: string, cb: Function) => {
                cb({
                    type: "dhisRedirect",
                    value: "/dhis-web-reports/index.html#/standard-report",
                });
            },
        },
    },
    {
        key: "other-features-title",
        title: i18n.t("Other Useful Features"),
        size: "small",
        rowLength: 1,
    },
    {
        key: "cache-cleaner-link",
        iconDescription: i18n.t("Browser cache cleaner"),
        description: i18n.t("Enables the users to clear the browser cache"),
        rowLength: 3,
        size: "small",
        icon: "img/dhis-web-cache-cleaner.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-cache-cleaner/index.action",
        },
    },
    {
        key: "data-quality-link",
        iconDescription: i18n.t("Data Quality"),
        description: i18n.t(
            "Enables the users to run data quality checks such as validation and Std dev outlier analysis."
        ),
        rowLength: 3,
        size: "small",
        icon: "img/dhis-web-data-quality.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-data-quality/index.html",
        },
    },
    {
        key: "data-approval-link",
        iconDescription: i18n.t("Approval"),
        description: i18n.t("Enables the users to approves the data submitted in the system"),
        rowLength: 3,
        size: "small",
        icon: "img/dhis-web-approval.png",
        action: {
            type: "method",
            value: async (_baseUrl: string, cb: Function) => {
                cb({
                    type: "dhisRedirect",
                    value: "/dhis-web-approval/index.action",
                });
            },
        },
    },
    {
        key: "profile-link",
        iconDescription: i18n.t("User profile"),
        description: i18n.t("Allows the users to edit account credentials and public profile"),
        rowLength: 3,
        size: "small",
        icon: "img/dhis-web-profile.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-user-profile/#/profile",
        },
    },
    {
        key: "user-extended-link",
        iconDescription: i18n.t("User Extended"),
        description: i18n.t("List, edit or create users in the NHWA platform"),
        rowLength: 3,
        size: "small",
        icon: "img/user-extended.png",
        action: {
            type: "dhisRedirect",
            value: "/api/apps/User-Extended-App/index.html",
        },
    },
    {
        key: "messaging-link",
        iconDescription: i18n.t("Messaging"),
        description: i18n.t("Send internal messages to other users in the NHWA Platform"),
        rowLength: 3,
        size: "small",
        icon: "img/dhis-web-messaging.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-messaging",
        },
    },
    {
        key: "training-link",
        iconDescription: i18n.t("Training App"),
        description: i18n.t("Learn how to use the different applications of DHIS2"),
        rowLength: 3,
        size: "small",
        icon: "img/training-app.png",
        action: {
            type: "dhisRedirect",
            value: "/api/apps/Training-App/index.html",
        },
    },
];

export const nhwaManagerData = (version: number) =>
    _.filter(nhwaAdminData(version), ({ key }) => !["user-extended-link"].includes(key));

export const nhwaClerkData = (version: number) =>
    _.filter(nhwaAdminData(version), ({ key }) => !["data-approval-link"].includes(key));

export const nhwaViewerData = (version: number) =>
    _.filter(
        nhwaAdminData(version),
        ({ key }) =>
            ![
                "data-approval-link",
                "data-quality-link",
                "nhwa-data-entry-title",
                "nhwa-data-entry-link",
                "user-extended-link",
            ].includes(key)
    );
