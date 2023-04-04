const { ipcRenderer } = require('electron')

ipcRenderer.on('test-channel', console.log);

setTimeout(() => {
  // GOOD
  document.getElementById('ping-good').onclick = () => {
    // Send a IPC async message to electron
    // See main.js on line 31
    ipcRenderer.send('ping-good', 'ping')
    document.getElementById('ping-good-response').innerText = 'Waiting..'
  }

  // Receive reply from elecron
  // See file main.js on line 37
  ipcRenderer.on('ping-good-reply', (event, response) => {
    document.getElementById('ping-good-response').innerText = response
  })

  // BAD
  document.getElementById('ping-bad').onclick = () => {
    // Send a IPC sync message to electron
    // See main.js on line 42
    document.getElementById('ping-bad-response').innerText = ipcRenderer.sendSync('ping-bad', 'ping')
  }
}, 2000);