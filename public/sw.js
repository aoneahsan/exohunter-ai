// Simple Service Worker for PWA installation
// Version 1.0.0

self.addEventListener('install', (event) => {
  // Skip waiting and activate immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Claim all clients immediately
  event.waitUntil(clients.claim());
});

// Basic fetch event - just pass through all requests
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});