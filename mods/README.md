# Cookie Clicker Mods

This directory contains the mod loader files for Cookie Clicker.

## Mods Included

1. **Cookie Monster** (https://cookiemonsterteam.github.io/CookieMonster/dist/CookieMonster.js)
   - Advanced game info and automation features
   
2. **Frozen Cookies** (https://raw.githubusercontent.com/erbkaiser/FrozenCookies/main/frozen_cookies.js)
   - A comprehensive automation and optimization mod

## How It Works

The mod system is integrated directly into the Settings menu:
- Open the game and click "Options" to access Settings
- Look for "Cookie Monster" and "Frozen Cookies" toggles
- Turn them ON or OFF as desired
- When toggling mods ON/OFF, the page will reload to apply changes

The master loader (`mod_loader.js`) checks your preferences and:
1. Waits for the Game object to initialize
2. Respects your mod preferences
3. Loads enabled mods from their official CDN sources
4. Logs any errors to the browser console for debugging

## Ads Removed

All ads have been removed from your local version:
- Removed cookie consent script
- Removed Facebook Pixel tracking
- Removed Google AdSense scripts
- Removed Playsaurus and AdventureQuest ads

## For Privacy-Blocking Extensions (PLD)

If using a privacy-blocking extension, whitelist:
- Local paths: `/mods/`
- External CDN sources:
  - `raw.githubusercontent.com` (for Frozen Cookies)
  - `cookiemonsterteam.github.io` (for Cookie Monster)

## Browser Console

To see mod loading status and any errors, open the browser console (F12) and check the Network and Console tabs under Developer Tools.

