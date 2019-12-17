import axios from "axios";
import _ from "lodash";

export const goToExternalUrl = externalUrl => {
    if (externalUrl) window.location = externalUrl;
};

export const goToHashUrl = hash => {
    if (hash) window.location.hash = hash;
};

const cleanDhis2Url = (baseUrl, path) =>
    [baseUrl.replace(/\/$/, ""), path.replace(/^\//, "")].join("/");

export const goToDhis2Url = (baseUrl, path) => {
    if (baseUrl && path) window.location = cleanDhis2Url(baseUrl, path);
};

export const goToDhis2InNewTab = (baseUrl, path) => {
    const win = window.open(cleanDhis2Url(baseUrl, path), "_blank");
    win.focus();
};

export const existsDhis2Url = async (baseUrl, path) => {
    try {
        await axios.get(cleanDhis2Url(baseUrl, path));
        return true;
    } catch (error) {
        if (error.response.status === 404) return false;
        throw error;
    }
};

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const waitForElement = async (document, selector, maxRetries = 15, retry = 0) => {
    const element = document.querySelector(selector);
    if (element && element.childNodes.length > 0) return true;
    else if (retry < 0 || retry > maxRetries) return false;
    await sleep(100);
    return waitForElement(document, selector, maxRetries, retry + 1);
};

export const selector = (document, id, action = _.noop) =>
    document.querySelectorAll(id).forEach(result => action(result));

export const selectorWait = async (document, id, action) => {
    await waitForElement(document, id);
    return selector(document, id, action);
};

export const hideSelector = (document, id, condition = true) =>
    selectorWait(document, id, element => {
        element.hidden = condition;
    });

const findXPath = (document, xpath) =>
    document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
        .singleNodeValue;

const waitForText = async (document, text, retry = 0) => {
    const element = findXPath(document, `//text()[contains(.,'${text}')]`);
    if (element || retry < 0 || retry > 15) return element;
    await sleep(100);
    return waitForText(document, text, retry + 1);
};

export const textSelector = async (document, text, action = _.noop, error = _.noop) => {
    const element = await waitForText(document, text);
    if (element) action(element);
    else error(element);
    return element;
};
