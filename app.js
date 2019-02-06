const initialState = {
  isDisableTrends: true,
  isDisableSubscriptions: true,
  isDisableRecommendations: true,
};

const rule = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'www.youtube.com', schemes: ['https'] },
    })
  ],
  actions: [ new chrome.declarativeContent.ShowPageAction() ]
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(initialState);

  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([rule]);
  });
});

chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    // read changeInfo data and do something with it
    // like send the new url to contentscripts.js
    if (changeInfo.url) {
      chrome.tabs.sendMessage( tabId, {
        message: 'changeUrl',
        url: changeInfo.url
      })
    }
  }
);
