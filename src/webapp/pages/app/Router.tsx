import { HeaderBar } from "@dhis2/ui";
import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { CacheCleanerPage, EntryCapturePage, GenericLandingPage, NotificationsPage } from "..";
import { Configuration } from "../../../data/logic/redirection";
import { defaultData } from "../../../domain/models";
import { NamedRef } from "../../../domain/entities/Ref";

export const Router: React.FC<RouterProps> = ({ baseUrl, username, userGroupIds, configurations }) => {
    return (
        <HashRouter>
            <Switch>
                {configurations.map(({ programme, page: PageComponent, data, header, title }) => [
                    <Route
                        key={"cache-cleaner"}
                        path={`/${programme}/cache-cleaner`}
                        render={() => <CacheCleanerPage title={title} header={header} baseUrl={baseUrl} />}
                    />,
                    <Route
                        key={"entry-capture"}
                        path={`/${programme}/:type(dataSet|program)/:element`}
                        //@ts-ignore
                        render={() => <EntryCapturePage title={title} header={header} baseUrl={baseUrl} />}
                    />,
                    <Route
                        key={"admin-list-create-notifs"}
                        path={`/notifications`}
                        render={() => <NotificationsPage />}
                    />,
                    <Route
                        key={programme}
                        path={configurations.length > 1 ? `/${programme}` : "/"}
                        render={() => (
                            <PageComponent
                                title={title}
                                header={header}
                                baseUrl={baseUrl}
                                username={username}
                                userGroupIds={userGroupIds}
                                items={data}
                            />
                        )}
                    />,
                ])}

                {configurations.length !== 1 && [
                    <Route
                        key={"cache-cleaner"}
                        path={`/cache-cleaner`}
                        render={() => <CacheCleanerPage header={HeaderBar} baseUrl={baseUrl} />}
                    />,
                    <Route
                        key={"default"}
                        //@ts-ignore
                        render={() => <GenericLandingPage items={defaultData(configurations)} baseUrl={baseUrl} />}
                    />,
                ]}
            </Switch>
        </HashRouter>
    );
};

export interface RouterProps {
    baseUrl: string;
    username: string;
    userGroupIds: string[];
    configurations: Configuration[];
    redirectToNHWAAdmin: boolean;
    redirectToGLASS: boolean;
    redirectToAMRAMRHq: boolean;
    redirectToAMRAMRRegional: boolean;
    showAvailableLandingPages: boolean;
    redirectToMalaria: boolean;
    redirectToECDDQuestionnaire: boolean;
}
