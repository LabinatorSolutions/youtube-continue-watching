/**
 * YouTube Continue Watching - Background Service Worker
 * 
 * Manages extension state and handles communication between popup and content scripts
 * 
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * Copyright (C) 2026 YouTube Continue Watching Contributors
 */

// Extension state
let extensionState = {
	enabled: true
};

// Initialize extension on install
browser.runtime.onInstalled.addListener(() => {
	console.log('[YouTube Continue] Extension installed');

	// Set default state
	browser.storage.local.set({ enabled: true });
});

// Listen for messages from popup
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'getState') {
		// Return current state to popup
		browser.storage.local.get(['enabled']).then(result => {
			sendResponse({ enabled: result.enabled !== false });
		});
		return true; // Keep channel open for async response
	}

	if (message.action === 'setState') {
		// Update state from popup
		const newState = message.enabled;
		extensionState.enabled = newState;

		// Save to storage
		browser.storage.local.set({ enabled: newState });

		// Notify all YouTube tabs
		browser.tabs.query({ url: '*://*.youtube.com/*' }).then(tabs => {
			tabs.forEach(tab => {
				browser.tabs.sendMessage(tab.id, {
					action: 'toggleState',
					enabled: newState
				}).catch(() => {
					// Tab might not have content script loaded yet
				});
			});
		});

		sendResponse({ success: true });
		return true;
	}
});

// Update extension icon based on state (optional enhancement)
function updateIcon(enabled) {
	const iconPath = enabled ? 'icons/icon-48.png' : 'icons/icon-48-disabled.png';
	browser.action.setIcon({ path: iconPath }).catch(() => {
		// Disabled icon doesn't exist yet, ignore
	});
}

// Listen for storage changes
browser.storage.onChanged.addListener((changes, area) => {
	if (area === 'local' && changes.enabled) {
		extensionState.enabled = changes.enabled.newValue;
		updateIcon(changes.enabled.newValue);
	}
});

console.log('[YouTube Continue] Background service worker initialized');
