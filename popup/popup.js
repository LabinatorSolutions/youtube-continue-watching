/**
 * YouTube Uninterrupted - Popup Script
 * 
 * Handles popup UI interactions and state management
 * 
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * Copyright (C) 2026 YouTube Uninterrupted Contributors
 */

document.addEventListener('DOMContentLoaded', async () => {
	const toggle = document.getElementById('enableToggle');
	const statusIcon = document.getElementById('statusIcon');
	const statusText = document.getElementById('statusText');
	const helpLink = document.getElementById('helpLink');
	const aboutLink = document.getElementById('aboutLink');

	/**
	 * Update UI based on extension state
	 */
	function updateUI(enabled) {
		toggle.checked = enabled;

		if (enabled) {
			statusIcon.classList.add('active');
			statusIcon.classList.remove('inactive');
			statusText.textContent = 'Active on YouTube pages';
			statusText.classList.add('active');
			statusText.classList.remove('inactive');
		} else {
			statusIcon.classList.remove('active');
			statusIcon.classList.add('inactive');
			statusText.textContent = 'Disabled';
			statusText.classList.remove('active');
			statusText.classList.add('inactive');
		}
	}

	/**
	 * Check if current tab is YouTube
	 */
	async function isYouTubeTab() {
		try {
			const tabs = await browser.tabs.query({ active: true, currentWindow: true });
			if (tabs.length > 0) {
				const url = tabs[0].url;
				return url.includes('youtube.com');
			}
		} catch (error) {
			console.error('Error checking tab:', error);
		}
		return false;
	}

	/**
	 * Load initial state
	 */
	async function loadState() {
		try {
			const response = await browser.runtime.sendMessage({ action: 'getState' });
			updateUI(response.enabled);

			// Update status based on current tab
			const isYT = await isYouTubeTab();
			if (!isYT) {
				statusText.textContent = 'Not on YouTube';
				statusIcon.classList.remove('active', 'inactive');
			}
		} catch (error) {
			console.error('Error loading state:', error);
			statusText.textContent = 'Error loading state';
		}
	}

	/**
	 * Handle toggle switch changes
	 */
	toggle.addEventListener('change', async (event) => {
		const enabled = event.target.checked;

		try {
			// Update background service worker
			await browser.runtime.sendMessage({
				action: 'setState',
				enabled: enabled
			});

			// Update UI
			updateUI(enabled);

			// Show confirmation for a moment
			const originalText = statusText.textContent;
			statusText.textContent = enabled ? 'Enabled!' : 'Disabled!';
			setTimeout(() => {
				updateUI(enabled);
			}, 1000);

		} catch (error) {
			console.error('Error updating state:', error);
			statusText.textContent = 'Error updating state';
			// Revert toggle
			toggle.checked = !enabled;
		}
	});

	/**
	 * Help link handler
	 */
	helpLink.addEventListener('click', (event) => {
		event.preventDefault();
		browser.tabs.create({
			url: 'https://github.com/yourusername/youtube-continue-watching#troubleshooting'
		});
	});

	/**
	 * About link handler
	 */
	aboutLink.addEventListener('click', (event) => {
		event.preventDefault();
		const aboutMessage = `
YouTube Uninterrupted v1.0.0

Prevents YouTube from pausing videos with the "Continue watching?" dialog.

Features:
• Automatic dialog removal
• Works on desktop and mobile
• Minimal permissions
• No data collection

This extension does NOT block ads or affect YouTube's monetization.

Privacy: This extension does not collect, store, or transmit any data.
All processing happens locally in your browser.

License: MIT
    `.trim();

		alert(aboutMessage);
	});

	// Initialize
	loadState();
});
