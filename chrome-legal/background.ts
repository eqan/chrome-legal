chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: () => {
          return document.documentElement.textContent;
        }
      }, (results) => {
        if (results && results[0]) {
          console.log('Page content:', results[0].result);
        }
      });
    }
  });