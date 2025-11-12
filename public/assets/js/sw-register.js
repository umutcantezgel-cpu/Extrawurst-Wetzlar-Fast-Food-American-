/**
 * Service Worker Registration
 * Progressive enhancement - fails gracefully
 */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      console.log('[SW] Registered:', registration.scope);

      // Update service worker
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'activated') {
            console.log('[SW] Updated');

            // Optionally show update notification
            if (confirm('Neue Version verfügbar. Seite neu laden?')) {
              window.location.reload();
            }
          }
        });
      });

      // Check for updates every hour
      setInterval(() => {
        registration.update();
      }, 60 * 60 * 1000);

    } catch (error) {
      console.error('[SW] Registration failed:', error);
    }
  });
}
