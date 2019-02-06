const rules = document.getElementById('rules');

const isDisableTrendsElement = document.getElementById('isDisableTrends');
const isDisableSubscriptionsElement = document.getElementById('isDisableSubscriptions');
const isDisableRecommendationsElement = document.getElementById('isDisableRecommendations');

const updateCheckboxValues = () => chrome.storage.sync.get(state => {
  isDisableTrendsElement.checked = state.isDisableTrends;
  isDisableSubscriptionsElement.checked = state.isDisableSubscriptions;
  isDisableRecommendationsElement.checked = state.isDisableRecommendations;

  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, ([currentTab]) => {
    chrome.tabs.sendMessage(currentTab.id, {
      message: 'changeState',
      url: currentTab.url
    });
  });
});

updateCheckboxValues();

chrome.storage.onChanged.addListener(updateCheckboxValues);

const handleCheck = e => {
  const id = e.target.id;
  const checkedValue = e.target.checked;

  chrome.storage.sync.set({
    [id]: checkedValue
  });
}

const setHandler = element => element.addEventListener('change', handleCheck);

[isDisableTrendsElement, isDisableSubscriptionsElement, isDisableRecommendationsElement].forEach(setHandler);
