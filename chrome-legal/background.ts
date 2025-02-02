chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: () => {
          const textContent = document.documentElement.textContent;
          chrome.runtime.sendMessage({ type: 'save-text-content', text: textContent });
          console.log('Page content:', textContent);
          return textContent;
        }
      }, (results) => {
        if (results && results[0]) {
          console.log('Page content:', results[0].result);
        }
      });
    }
  });