import i18n from "@dhis2/d2-i18n";

export const internationalGroupIds = {
    EFH_USER: "IdneucbQYRb",
    EBOLA_USER: "khvNTC9Nxxm",
    CHOLERA_USER: "VDkRapZb8zw",
    DATA_MANAGEMENT_USER: "mh5Tx6MS9jn",
};

export const internationalData = [
    {
        key: "data-monitoring",
        title: i18n.t("Data Management Tool"),
        userGroupIds: [internationalGroupIds.DATA_MANAGEMENT_USER],
        rowLength: 3,
        icon: "img/data-monitoring-tool.png",
        action: {
            type: "dhisRedirect",
            value: "/api/apps/Data-Management-App/index.html",
        },
    },
    {
        key: "efh",
        title: i18n.t("EFH"),
        userGroupIds: [internationalGroupIds.EFH_USER],
        rowLength: 3,
        icon: "img/emergency-field-hospital.png",
        action: {
            type: "dhisRedirect",
            value: "/api/apps/Emergency-Responses-App/index.html",
        },
    },
    {
        key: "ebola",
        title: i18n.t("Ebola"),
        userGroupIds: [internationalGroupIds.EBOLA_USER],
        rowLength: 3,
        icon: "img/ebola.png",
        action: {
            type: "dhisRedirect",
            value: "/api/apps/Emergency-Responses-App/index.html#/ebola",
        },
    },
    {
        key: "cholera",
        title: i18n.t("Cholera"),
        userGroupIds: [internationalGroupIds.CHOLERA_USER],
        rowLength: 3,
        icon: "img/cholera.png",
        action: {
            type: "dhisRedirect",
            value: "/api/apps/Emergency-Responses-App/index.html#/cholera",
        },
    },
    {
        key: "utilities",
        title: i18n.t("DHIS2 Utilities"),
        rowLength: 1,
        enableBottomLine: true,
    },
    {
        key: "cache-cleaner",
        title: i18n.t("Browser cache cleaner"),
        rowLength: 3,
        icon: "img/dhis-web-cache-cleaner.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-cache-cleaner/index.action",
        },
    },
    {
        key: "tracker-capture",
        title: i18n.t("Tracker Capture"),
        rowLength: 3,
        icon: "img/dhis-web-event-capture.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-tracker-capture/index.html",
        },
    },
    {
        key: "profile",
        title: i18n.t("User profile"),
        rowLength: 3,
        icon: "img/dhis-web-profile.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-user-profile/#/profile",
        },
    },
];
