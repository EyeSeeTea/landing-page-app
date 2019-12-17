import axios from "axios";

import { filterOrgUnits } from "../../pages/hepatitis-form-page/common";
import {
    selectorWait,
    selector,
    hideSelector,
    textSelector,
    sleep,
    goToHashUrl,
} from "../../utils";

const recurrentTasks = (document, isAdmin) => {
    selectorWait(document, ".bordered-div", e => {
        e.parentNode.style.width = "100%";
        e.style.marginTop = "15px";
        e.style.marginLeft = "0";
    });

    selectorWait(document, ".selectionArea", e => {
        e.style.width = "100%";
        e.style.margin = "15px";
    });

    hideSelector(document, ".div-bottom-container");

    textSelector(document, "Event capture", field => {
        field.textContent = "Report of the policy situation for:";
    });

    textSelector(document, "Event details", field => {
        field.textContent = "Details of the report";
    });

    textSelector(document, "Event date", field => {
        field.textContent = "Reporting date";
    });

    textSelector(document, "Update", field => {
        field.textContent = "Submit or update your report";
        field.parentNode.addEventListener("click", event => {
            textSelector(document, "OK", field => {
                field.parentNode.addEventListener("click", event => {
                    window.alert("Thank you for your report on the policy situation");
                    if (!isAdmin) goToHashUrl("/hepatitis");
                });
            }, field => {
                    window.alert("Thank you for your report on the policy situation");
            });
        });
    });

    textSelector(document, "Cancel", field => {
        field.textContent = "Go back to home page";
        field.parentNode.addEventListener("click", event => {
            if (!isAdmin) goToHashUrl("/hepatitis");
        });
    });

    textSelector(document, "Section", field => {
        field.parentNode.parentNode.hidden = true;
    });

    textSelector(document, "Program", field => {
        field.textContent = "Programme";
    });
};

export const eventCaptureStyling = async (iframe, { baseUrl, element, event }) => {
    const { contentWindow, contentDocument } = iframe;
    const { document } = contentWindow || contentDocument;
    const isAdmin = !event;

    // Hide unecessary elements
    hideSelector(document, "#header");
    selectorWait(document, "#headerMessage", e => e.remove());
    if (!isAdmin) hideSelector(document, "#leftBar");

    // Scale body to be centered
    selector(document, "body", e => {
        e.style.marginTop = "-50px";
        if (!isAdmin) e.style.marginLeft = "-260px";
    });

    // Scale body to be centered
    selectorWait(document, "#leftBar", e => {
        e.style.marginTop = "-50px";
    });

    // Disable clicks on selection group
    selectorWait(document, ".selectionGroup", e => {
        if (!isAdmin) e.style.pointerEvents = "none";
    });

    const { organisationUnits: visibleOrganisationUnits } = (
        await axios.get(`${baseUrl}/api/programs/${element}.json`, {
            params: { fields: "organisationUnits" },
            withCredentials: true,
        })
    ).data;

    selectorWait(document, "#orgUnitTree", e => {
        e.addEventListener("click", event => {
            filterOrgUnits(document, visibleOrganisationUnits);
        });
    });

    document.addEventListener("click", event => {
        recurrentTasks(document, isAdmin);
    });

    await sleep(2500);

    filterOrgUnits(document, visibleOrganisationUnits);

    recurrentTasks(document, isAdmin);
};
