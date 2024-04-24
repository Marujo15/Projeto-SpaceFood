let currentTab = "home";

function setCurrentTab(tabName) {
    currentTab = tabName;
}

function getCurrentTab() {
    return currentTab;
}

export { setCurrentTab, getCurrentTab };
