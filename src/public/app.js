const form = document.getElementById('shorten-form');
const urlInput = document.getElementById('url-input');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');
const btnSpinner = document.getElementById('btn-spinner');
const errorMsg = document.getElementById('error-msg');
const result = document.getElementById('result');
const shortUrlInput = document.getElementById('short-url');
const copyBtn = document.getElementById('copy-btn');
const copyLabel = document.getElementById('copy-label');
const originalUrlDisplay = document.getElementById('original-url-display');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorMsg.classList.add('hidden');
  result.classList.add('hidden');

  const url = urlInput.value.trim();
  if (!url) return;

  setLoading(true);

  try {
    const res = await fetch('/api/v1/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();

    if (!data.success) {
      showError(data.message || 'Something went wrong');
      return;
    }

    shortUrlInput.value = data.data.shortUrl;
    originalUrlDisplay.textContent = data.data.originalUrl;
    result.classList.remove('hidden');
    copyLabel.textContent = 'Copy';
    copyBtn.classList.remove('copied');
    urlInput.value = '';
  } catch (err) {
    showError('Network error. Please try again.');
  } finally {
    setLoading(false);
  }
});

copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(shortUrlInput.value);
    copyLabel.textContent = 'Copied!';
    copyBtn.classList.add('copied');
    setTimeout(() => {
      copyLabel.textContent = 'Copy';
      copyBtn.classList.remove('copied');
    }, 2000);
  } catch {
    shortUrlInput.select();
    document.execCommand('copy');
    copyLabel.textContent = 'Copied!';
    copyBtn.classList.add('copied');
  }
});

function setLoading(loading) {
  submitBtn.disabled = loading;
  btnText.classList.toggle('hidden', loading);
  btnSpinner.classList.toggle('hidden', !loading);
}

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.remove('hidden');
}
