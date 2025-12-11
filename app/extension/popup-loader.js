// Extension popup loader script
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const frame = document.getElementById('extensionFrame');
const retryButton = document.getElementById('retryButton');

// Hide loading after frame loads
frame.addEventListener('load', function () {
    setTimeout(function () {
        loading.classList.add('hidden');
    }, 500);
});

// Show error if frame fails to load
frame.addEventListener('error', function () {
    loading.classList.add('hidden');
    error.classList.add('show');
});

// Retry button handler
if (retryButton) {
    retryButton.addEventListener('click', function () {
        location.reload();
    });
}

// Timeout fallback - hide loading after 5 seconds
setTimeout(function () {
    if (!loading.classList.contains('hidden')) {
        loading.classList.add('hidden');
        // Optionally show error if frame didn't load
        // Uncomment next line if you want to show error after timeout
        // error.classList.add('show');
    }
}, 5000);
