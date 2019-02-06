var getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
};

const toggleContent = isDisable => {
  const pageManager = document.getElementById('page-manager');

  pageManager.style.display = isDisable ? 'none' : '';
};

const updateContent = pathname => {
  chrome.storage.sync.get(state => {
    switch(pathname) {
      case '/':
        return toggleContent(state.isDisableRecommendations);
      case '/feed/trending':
        return toggleContent(state.isDisableTrends);
      case '/feed/subscriptions':
        return toggleContent(state.isDisableSubscriptions);
      default:
        return toggleContent(false);
    }
  });
}

updateContent(window.location.pathname);

chrome.runtime.onMessage.addListener(
  req => {
    if(req.message === 'changeUrl' || req.message === 'changeState') {
      const { pathname } = getLocation(req.url);
      updateContent(pathname);
    }
 });
