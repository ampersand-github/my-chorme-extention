const copyToScrapbox = (tab, info) => {
    function injectedFunction(tab, info) {
        try {
            const scrapbox = "https://scrapbox.io/ampersand/temporarilyMemo?body="
            window.open(scrapbox + info.selectionText, '_blank')
        } catch (e) {
            console.log('failed', e);
        }
    }
    chrome.scripting.executeScript({
        target: {
            tabId: tab.id
        },
        func: injectedFunction,
        args: [tab, info]
    });
};

const copyUrlToScrapbox = (tab, text, info) => {
    function injectedFunction(text, tab) {
        try {
            const scrapbox = "https://scrapbox.io/ampersand/temporarilyMemo?body="
            const text = "[" + tab.url + " " + tab.title + "]"
            window.open(scrapbox + text, '_blank')
        } catch (e) {
            console.log('failed', e);
        }
    }
    chrome.scripting.executeScript({
        target: {
            tabId: tab.id
        },
        func: injectedFunction,
        args: [text, tab]
    });
};

const countString = (tab, text) => {
    function injectedFunction(tab, text) {
        try {
            const scrapbox = "https://scrapbox.io/ampersand/temporarilyMemo?body="
            window.open(scrapbox + text.length + "字", '_blank')
        } catch (e) {
            console.log('failed', e);
        }
    }
    chrome.scripting.executeScript({
        target: {
            tabId: tab.id
        },
        func: injectedFunction,
        args: [tab, text]
    });
};


const updateContextMenus = async () => {
    await chrome.contextMenus.removeAll();

    chrome.contextMenus.create({
        id: "copy-to-scrapbox",
        title: "scrapboxへコピーする",
        contexts: ["all"],
    });

    chrome.contextMenus.create({
        id: "copy-url-to-scrapbox",
        title: "URLをscrapboxへコピーする",
        contexts: ["all"],
    });

    chrome.contextMenus.create({
        id: "count-string",
        title: "文字数をカウントする",
        contexts: ["all"],
    });

};

chrome.runtime.onInstalled.addListener(updateContextMenus);
chrome.runtime.onStartup.addListener(updateContextMenus);
chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case 'copy-to-scrapbox':
            copyToScrapbox(tab, info);
            break;
    }
    switch (info.menuItemId) {
        case 'copy-url-to-scrapbox':
            copyUrlToScrapbox(tab, tab.title);
            break;
    }
    switch (info.menuItemId) {
        case 'count-string':
            countString(tab, info.selectionText);
            break;
    }
});
