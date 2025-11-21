// Minimal client-side handler that posts the form via fetch to the endpoint
// Works with Formspree (send JSON) or FormSubmit (works via normal form POST when JS is disabled).
// Edit the form's data-endpoint or action attribute to point to your chosen service.

(function () {
  const form = document.getElementById('contact-form');
  const statusBox = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  form.addEventListener('submit', async function (e) {
    // If you want the default HTML POST to work as fallback, you can allow the submit when JS disabled.
    e.preventDefault();

    // Basic client-side validation
    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();
    const subject = form.elements['subject'].value.trim();
    const message = form.elements['message'].value.trim();
    const gotcha = form.elements['_gotcha'] ? form.elements['_gotcha'].value : '';

    if (!name || !email || !message) {
      showStatus('Please fill in name, email and message.', 'error');
      return;
    }

    if (gotcha) {
      // Honeypot filled → likely a bot. Silently abort.
      return;
    }

    const endpoint = form.getAttribute('data-endpoint') || form.action;
    if (!endpoint) {
      showStatus('No form endpoint configured. Edit contact.html to set data-endpoint or form action.', 'error');
      return;
    }

    submitBtn.disabled = true;
    showStatus('Sending...', ''); // neutral

    // Construct payload. Formspree accepts JSON when Accept: application/json is set.
    const payload = {
      name, email, subject, message
    };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        // Formspree returns 200/201; treat as success
        showStatus('Thanks — your message was sent!', 'success');
        form.reset();
      } else {
        // Try to parse JSON error message
        let errText = 'Something went wrong. Please try again later.';
        try {
          const data = await res.json();
          if (data && data.error) errText = data.error;
        } catch (err) { /* ignore parse errors */ }
        showStatus(errText, 'error');
      }
    } catch (err) {
      showStatus('Network error. Please try again later.', 'error');
    } finally {
      submitBtn.disabled = false;
    }
  });

  function showStatus(text, kind) {
    statusBox.className = 'message';
    if (kind === 'success') statusBox.classList.add('success');
    else if (kind === 'error') statusBox.classList.add('error');
    else statusBox.classList.add('hidden'); // neutral
    statusBox.textContent = text;
    if (kind === 'success' || kind === 'error') statusBox.classList.remove('hidden');
  }
})();
