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
  chrome.storage.sync.set({
    youtubeLimitExtension: initialState
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([rule]);
    });
  });
});