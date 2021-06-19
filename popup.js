// var app = chrome.runtime.getBackgroundPage();

function hello() {
    chrome.tabs.executeScript({
      file: 'form.js'
    }); 
  }
  
  document.getElementById('changeform').addEventListener('click', hello);