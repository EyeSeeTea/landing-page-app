import _ from "lodash";

import { User } from "../../domain/entities/User";
import { buildHepatitisData, nhwaAdminData } from "../../domain/models";
import { nhwaClerkData, nhwaManagerData, nhwaViewerData } from "../../domain/models/nhwa/NHWA";
import { MalariaData } from "../../domain/models/east_mediterranian_mal/Malaria.jsx";
import { ntdLeishKenyaData } from "../../domain/models/ntd_leish_kenya/NTDLeishKenya";
import { rabiesData, simpleRabiesData } from "../../domain/models/rabies/Rabies";
import { snakebiteData } from "../../domain/models/snakebite/Snakebite";
import { internationalData, internationalGroupIds } from "../../domain/models/international/International";
import i18n from "../../locales";
import { goToDhis2Url } from "../../utils/utils";
import eastMalRepoHeader from "../../webapp/components/headers/east-mal-repo-header";
import nhwaHeader from "../../webapp/components/headers/nhwa-header";
import whoHeader from "../../webapp/components/headers/who-header";
import {
    HepatitisLandingPage,
    NHWALandingPage,
    NTDLeishKenyaLandingPage,
    RabiesLandingPage,
    SnakebiteLandingPage,
    InternationalLandingPage,
    MalariaLandingPage,
    GLASSLandingPage,
    ECDDLandingPage,
} from "../../webapp/pages";
import internationalHeader from "../../webapp/components/headers/international-header";
import glassHeader from "../../webapp/components/headers/glass-hq";
import { Config } from "../../domain/entities/Config";
import { glassAdminData, glassRegionalData } from "../../domain/models/glass/GLASS";
import { DashboardIds } from "../../domain/entities/GLASSDashboard";
import { ECDDData } from "../../domain/models/ecdd/ECDD";
import ecddHeader from "../../webapp/components/headers/ecdd-header";

//TODO: Ask if we need a simple snakebite data or not
const HEP_CASCADE_CURE_DATA_ENTRY = "OSHcVu6XSUL";
const HEP_POLICY_UPTAKE_DATA_ENTRY = "uMCylDhyzRr";

const NHWA_ADMINS = "EX00r2JNlQo";
const NHWA_DATA_CLERKS = "DWWxlpQi9M8";
const NHWA_DATA_MANAGERS = "xcDZeClzdse";
const NHWA_DATA_VIEWERS = "r7QSG6UcnDW";
const NHWA_GLOBAL_TEAM = "MVWS4lpbPo2";

const NTD_Leish_LandingPage_KEN = "aQt4ynXtBOS";

const NTD_SB = "JusJWdDa1LM";

export const NTD_NZD_admin = "foOXWD4beuA";
export const NTD_RAB_OIE = "pbZna7luFaM";
export const NTD_RAB_Estimates = "K7VPSVrAYeV";
export const NTD_RAB_WHO_Official = "Zr1fdsbkiAR";
export const NTD_RAB_WHO_RO = "pjwgXz3y70w";
export const SS_NTD_RAB_AggData_Entry = "Mg0TXhvvXJ4";
export const SS_NTD_RAB_AggData_View = "B6oADCiiW8v";

export const EFH_USER = internationalGroupIds.EFH_USER;
export const EBOLA_USER = internationalGroupIds.EBOLA_USER;
export const CHOLERA_USER = internationalGroupIds.CHOLERA_USER;
export const DATA_MANAGEMENT_USER = internationalGroupIds.DATA_MANAGEMENT_USER;

const WIDP_IT_TEAM = "UfhhwZK73Lg";

export const MAL_AFRO = "wU7MKFPOYjs";
export const MAL_EURO = "eirm2mJI2MP";
export const MAL_PAHO = "c4UAotLtJF7";
export const MAL_SEARO = "gweicDtTEfq";
export const MAL_WPRO = "MXacwnPoBJA";

export const MAL_EMRO = "FpQ7a5OylZH";

const AMR_AMR_ADMIN = "oQFamWE16A1";
const AMR_AMR_USER_MANAGEMENT = "QZPCnL0mtWV";
export const AMR_AMR_DATA_CAPTURE = "CCRMy5e6ONV";
export const AMR_AMR_VISUALIZER = "eyW7ie6NEuW";

export const AMR_EGASP_DATA_CAPTURE = "j1BTDP7JUJp";
export const AMR_EGASP_VISUALIZER = "M2jd9QXVWou";

// ecdd user group id
export const ECDD_USER = "Cwb2T8h5i6o";

export interface Configuration {
    programme: string;
    title: string;
    description: string;
    userGroupIds: string[];
    page: any;
    header?: any;
    data?: any;
    icon: string;
}

export const buildAvailableConfigurations = (
    version: number,
    userGroupIds: string[],
    dashboards: DashboardIds,
    baseUrl: string
): Configuration[] => {
    const isNHWADataManager = shouldRedirect(userGroupIds, [NHWA_DATA_MANAGERS]);
    const isNHWAGlobalTeam = shouldRedirect(userGroupIds, [NHWA_GLOBAL_TEAM]);
    const isAdminUserGroup = shouldRedirect(userGroupIds, [WIDP_IT_TEAM]);
    const { validationReport, reportsMenu } = dashboards;

    return [
        {
            programme: "nhwa-admins",
            title: i18n.t("National Health Workforce Accounts Online Data Platform"),
            description: i18n.t("NHWA Admins"),
            userGroupIds: [NHWA_ADMINS],
            page: NHWALandingPage,
            header: nhwaHeader,
            data: nhwaAdminData(version),
            icon: "img/icon.png",
        },
        {
            programme: "nhwa-managers",
            title: i18n.t("National Health Workforce Accounts Online Data Platform"),
            description: i18n.t("NHWA Data Managers"),
            userGroupIds: [NHWA_DATA_MANAGERS],
            page: NHWALandingPage,
            header: nhwaHeader,
            data:
                !isAdminUserGroup && isNHWADataManager && isNHWAGlobalTeam
                    ? nhwaAdminData(version)
                    : nhwaManagerData(version),
            icon: "img/icon.png",
        },
        {
            programme: "nhwa-data-clerks",
            title: i18n.t("National Health Workforce Accounts Online Data Platform"),
            description: i18n.t("NHWA Data Clerks"),
            userGroupIds: [NHWA_DATA_CLERKS],
            page: NHWALandingPage,
            header: nhwaHeader,
            data: nhwaClerkData(version),
            icon: "img/icon.png",
        },
        {
            programme: "nhwa-managers-viewers",
            title: i18n.t("National Health Workforce Accounts Online Data Platform"),
            description: i18n.t("NHWA Data Viewers"),
            userGroupIds: [NHWA_DATA_VIEWERS],
            page: NHWALandingPage,
            header: nhwaHeader,
            data: nhwaViewerData(version),
            icon: "img/icon.png",
        },
        {
            programme: "hepatitis",
            title: i18n.t("Home page for the Global Reporting System for Hepatitis"),
            description: i18n.t("Hepatitis"),
            userGroupIds: [HEP_CASCADE_CURE_DATA_ENTRY, HEP_POLICY_UPTAKE_DATA_ENTRY],
            page: HepatitisLandingPage,
            header: whoHeader,
            data: buildHepatitisData(),
            icon: "img/hepatitis.png",
        },
        {
            programme: "rabies",
            title: i18n.t("WHO Rabies Webpage"),
            description: i18n.t("Rabies"),
            userGroupIds: [
                NTD_NZD_admin,
                NTD_RAB_Estimates,
                NTD_RAB_WHO_Official,
                NTD_RAB_WHO_RO,
                SS_NTD_RAB_AggData_Entry,
            ],
            page: RabiesLandingPage,
            header: whoHeader,
            data: rabiesData,
            icon: "img/rabies-dog.svg",
        },
        {
            programme: "rabies-no-data-entry",
            title: i18n.t("WHO Rabies Webpage"),
            description: i18n.t("Rabies (no data entry)"),
            userGroupIds: [NTD_RAB_OIE, SS_NTD_RAB_AggData_View],
            page: RabiesLandingPage,
            header: whoHeader,
            data: simpleRabiesData,
            icon: "img/rabies-dog.svg",
        },
        {
            programme: "snakebite",
            title: i18n.t("WHO Snakebite Webpage"),
            description: i18n.t("Snakebite"),
            userGroupIds: [NTD_SB],
            page: SnakebiteLandingPage,
            header: whoHeader,
            data: snakebiteData,
            icon: "img/snakebite-main.svg",
        },
        {
            programme: "ntd-leish-kenya",
            title: i18n.t("National Leishmaniasis Control Programme for Kenya"),
            description: i18n.t("Landing Page for MoH Kenya"),
            userGroupIds: [NTD_Leish_LandingPage_KEN],
            page: NTDLeishKenyaLandingPage,
            header: whoHeader,
            data: ntdLeishKenyaData,
            icon: "img/kenya.png",
        },
        {
            programme: "international-projects",
            title: i18n.t("International Projects"),
            description: i18n.t("Landing Page for International Projects"),
            userGroupIds: [EFH_USER, EBOLA_USER, CHOLERA_USER, DATA_MANAGEMENT_USER],
            page: InternationalLandingPage,
            header: internationalHeader,
            data: internationalData,
            icon: "img/icon.png",
        },
        {
            programme: "east-mediterranian-mal-repo",
            title: i18n.t("Eastern Mediterranean regional malaria repository"),
            description: i18n.t("Eastern Mediterranean regional malaria repository"),
            userGroupIds: [MAL_EMRO],
            page: MalariaLandingPage,
            header: eastMalRepoHeader,
            data: MalariaData,
            icon: "img/east-mal-repo.png",
        },
        {
            programme: "amr-amr-hq",
            title: i18n.t("AMR-AMR HQ Landing Page"),
            description: i18n.t("Anti-Microbial Resistance Aggregate Data admin landing page"),
            userGroupIds: [AMR_AMR_ADMIN],
            page: GLASSLandingPage,
            header: glassHeader,
            data: glassAdminData(reportsMenu, validationReport),
            icon: "img/glass.png",
        },
        {
            programme: "amr-amr-regional",
            title: i18n.t("AMR-AMR Regional Landing Page"),
            description: i18n.t("Anti-Microbial Resistance Aggregate Data regional landing page"),
            userGroupIds: [AMR_AMR_USER_MANAGEMENT],
            page: GLASSLandingPage,
            header: glassHeader,
            data: glassRegionalData(reportsMenu, validationReport),
            icon: "img/glass.png",
        },
        {
            programme: "ecdd",
            title: i18n.t("Expert Committee on Drug Dependence"),
            description: i18n.t("Landing page for Expert Committee on Drug Dependence"),
            userGroupIds: [ECDD_USER],
            page: ECDDLandingPage,
            header: ecddHeader,
            data: ECDDData(baseUrl),
            icon: "img/who-logo.png",
        },
    ];
};

const shouldRedirect = (actualIds: string[], expectedIds: string[]): boolean =>
    _.intersection(actualIds, expectedIds).length > 0;

export const handleRedirection = async (
    baseUrl: string,
    version: number,
    user: User,
    config: Config,
    dashboards: DashboardIds
) => {
    const userGroupIds = user.userGroups.map(userGroup => userGroup.id);
    const orgUnitLevels = user.orgUnits.map(({ level }) => level);

    const isAdminUserGroup = shouldRedirect(userGroupIds, [WIDP_IT_TEAM]);
    const isNHWAAdmin = shouldRedirect(userGroupIds, [NHWA_ADMINS]);
    const isNHWAGlobalTeam = shouldRedirect(userGroupIds, [NHWA_GLOBAL_TEAM]);
    const isNHWADataManager = shouldRedirect(userGroupIds, [NHWA_DATA_MANAGERS]);
    const isMALRegionalUser = shouldRedirect(userGroupIds, [
        MAL_AFRO,
        MAL_EURO,
        MAL_PAHO,
        MAL_SEARO,
        MAL_WPRO,
        MAL_EMRO,
    ]);
    const isECDDUser = shouldRedirect(userGroupIds, [ECDD_USER]);

    const isGLASSCountryUser = shouldRedirect(userGroupIds, [AMR_AMR_DATA_CAPTURE, AMR_AMR_VISUALIZER]);
    const isGLASSAdmin = shouldRedirect(userGroupIds, [AMR_AMR_ADMIN]);

    const redirectToNHWAAdmin = !isAdminUserGroup && (isNHWAAdmin || (isNHWAGlobalTeam && isNHWADataManager));

    const redirectToMalaria = isMALRegionalUser;

    const redirectToECDDQuestionnaire = isECDDUser;

    const redirectToGLASS = !isGLASSAdmin && isGLASSCountryUser;

    const redirectToAMRAMRHq = shouldRedirect(userGroupIds, [AMR_AMR_ADMIN]);

    const redirectToAMRAMRRegional =
        shouldRedirect(userGroupIds, [AMR_AMR_ADMIN]) && orgUnitLevels.some(level => level === 2);

    const showAvailableLandingPages = shouldRedirect(userGroupIds, [
        AMR_AMR_ADMIN,
        AMR_AMR_DATA_CAPTURE,
        AMR_AMR_USER_MANAGEMENT,
        AMR_AMR_VISUALIZER,
    ]);

    const availableConfiguration = buildAvailableConfigurations(version, userGroupIds, dashboards, baseUrl);
    const configurations = availableConfiguration.filter(
        config => isAdminUserGroup || shouldRedirect(userGroupIds, config.userGroupIds)
    );
    const username = user.name;

    if (configurations.length > 0 || isMALRegionalUser || isGLASSCountryUser) {
        return {
            username,
            userGroupIds,
            configurations,
            redirectToNHWAAdmin,
            redirectToGLASS,
            redirectToAMRAMRHq,
            redirectToAMRAMRRegional,
            showAvailableLandingPages,
            redirectToMalaria,
            redirectToECDDQuestionnaire,
        };
    } else {
        const { defaultProgramme, fallbackUrl } = config;

        const fallbackConfig = defaultProgramme
            ? availableConfiguration.find(config => config.programme === defaultProgramme)
            : undefined;

        if (fallbackConfig) {
            return {
                username,
                userGroupIds,
                configurations: [fallbackConfig],
                redirectToNHWAAdmin,
                redirectToGLASS,
                redirectToAMRAMRHq,
                redirectToAMRAMRRegional,
                showAvailableLandingPages,
                redirectToMalaria,
                redirectToECDDQuestionnaire,
            };
        } else {
            goToDhis2Url(baseUrl, fallbackUrl);
            return null;
        }
    }
};
