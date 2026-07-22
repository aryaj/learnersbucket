function getResultContainer() {
  return document.getElementById('result');
}

function safeLog(message) {
  const resultContainer = getResultContainer();
  if (resultContainer) {
    const p = document.createElement('p');
    p.textContent = message;
    resultContainer.appendChild(p);
  } else if (typeof addLog === 'function') {
    addLog('log', message);
  } else {
    console.log(message);
  }
}
