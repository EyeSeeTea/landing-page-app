import { useConfig } from "@dhis2/app-runtime";
import { LoadingProvider, SnackbarProvider } from "@eyeseetea/d2-ui-components";
import { MuiThemeProvider } from "@material-ui/core/styles";
//@ts-ignore
import OldMuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import React, { useEffect, useState } from "react";
import { getCompositionRoot } from "../../../compositionRoot";
import { handleRedirection } from "../../../data/logic/redirection";
import { Instance } from "../../../domain/entities/Instance";
import { D2Api } from "../../../types/d2-api";
import { getMajorVersion } from "../../../utils/d2-api";
import { goToExternalUrl, sleep } from "../../../utils/utils";
import {
    UserNotificationDialog,
    UserNotificationDialogProps,
} from "../../components/user-notification-dialog/UserNotificationDialog";
import WHOLoading from "../../components/who-loading/WHOLoading";
import { AppContext, AppContextState } from "../../contexts/app-context";
import "./App.css";
import { Router, RouterProps } from "./Router";
import muiThemeLegacy from "./themes/dhis2-legacy.theme";
import { muiTheme } from "./themes/dhis2.theme";
import { Namespaces, glassNamespace } from "../../../data/clients/storage/Namespaces";

const App = ({ api }: { api: D2Api }) => {
    const { baseUrl } = useConfig();
    const [loading, setLoading] = useState(true);
    const [appContext, setAppContext] = useState<AppContextState | null>(null);
    const [routerProps, setRouterProps] = useState<RouterProps>();
    const [userDialogProps, setUserDialogProps] = useState<UserNotificationDialogProps>();

    useEffect(() => {
        async function setup() {
            const instance = new Instance({ url: baseUrl });
            const compositionRoot = getCompositionRoot(instance);
            setAppContext({ api, compositionRoot });

            const continueLoading = async () => {
                const user = await compositionRoot.usecases.instance.getCurrentUser();
                const version = await compositionRoot.usecases.instance.getVersion();
                const config = await compositionRoot.usecases.config.get();
                const glassModule =
                    (await api.dataStore(glassNamespace).get<any[]>(Namespaces.MODULES).getData()) ?? [];
                const glassDashboardIds = glassModule.find(module => module.name === "AMR")?.dashboards ?? {
                    reportsMenu: "",
                    validationReport: "",
                };

                const apiVersion = getMajorVersion(version);
                const options = await handleRedirection(baseUrl, apiVersion, user, config, glassDashboardIds);
                if (options) {
                    if (options.redirectToNHWAAdmin) window.location.hash = "/nhwa-admins";
                    if (options.redirectToGLASS) {
                        const glassAppPath = "/api/apps/glass/index.html#/";
                        goToExternalUrl(baseUrl + glassAppPath);
                    }
                    if (options.redirectToAMRAMRHq) window.location.hash = "/amr-amr-hq";
                    if (options.redirectToAMRAMRRegional) window.location.hash = "/amr-amr-regional";
                    if (options.showAvailableLandingPages) window.location.hash = "/";
                    if (options.redirectToHomePage) {
                        const homePageAppPath = "/api/apps/Homepage-App/index.html#/";
                        goToExternalUrl(baseUrl + homePageAppPath);
                    }
                    setRouterProps({ ...options, baseUrl });
                }
            };

            const notifications = await compositionRoot.usecases.notifications.list();
            if (notifications.length > 0) {
                setUserDialogProps({
                    notifications,
                    onClose: async () => {
                        await compositionRoot.usecases.notifications.save(notifications);
                        setUserDialogProps(undefined);
                        await continueLoading();
                    },
                });
            } else {
                await continueLoading();
            }

            await sleep(1000);
            setLoading(false);
        }
        setup();
    }, [baseUrl, api]);

    if (loading) {
        return <WHOLoading />;
    }

    if (userDialogProps) {
        return <UserNotificationDialog {...userDialogProps} />;
    }

    return (
        <MuiThemeProvider theme={muiTheme}>
            <OldMuiThemeProvider muiTheme={muiThemeLegacy}>
                <SnackbarProvider>
                    <LoadingProvider>
                        <div id="app" className="content">
                            <AppContext.Provider value={appContext}>
                                {routerProps ? <Router {...routerProps} /> : null}
                            </AppContext.Provider>
                        </div>
                    </LoadingProvider>
                </SnackbarProvider>
            </OldMuiThemeProvider>
        </MuiThemeProvider>
    );
};

export default React.memo(App);
