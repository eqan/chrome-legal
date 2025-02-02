chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      const url = tab.url;
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: (url: string) => {
          const textContent = document.documentElement.textContent;
          chrome.runtime.sendMessage({ type: 'save-text-content', text: textContent, url: url });
          console.log('Page content:', textContent);
          return textContent;
        },
        args: [url]
      }, (results) => {
        if (results && results[0]) {
          console.log('Page content:', results[0].result);
        }
      });
    }
  });