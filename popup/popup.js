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
	const githubLink = document.getElementById('githubLink');
	const addonLink = document.getElementById('addonLink');

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
				const urlStr = tabs[0].url;
				try {
					const parsedUrl = new URL(urlStr);
					const hostname = parsedUrl.hostname;
					return hostname === 'youtube.com' || hostname.endsWith('.youtube.com');
				} catch (parseError) {
					// Non-HTTP(S) or invalid URL, treat as not YouTube
					console.warn('Unable to parse tab URL:', urlStr, parseError);
					return false;
				}
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
	 * GitHub link handler
	 */
	githubLink.addEventListener('click', (event) => {
		event.preventDefault();
		browser.tabs.create({
			url: 'https://github.com/LabinatorSolutions/youtube-uninterrupted'
		});
	});

	/**
	 * Add-on Page link handler
	 */
	addonLink.addEventListener('click', (event) => {
		event.preventDefault();
		browser.tabs.create({
			url: 'https://addons.mozilla.org/en-US/firefox/addon/youtube-uninterrupted'
		});
	});

	// Initialize
	loadState();
});
