// Master Mod Loader
// This file loads all mods on page entry based on Game preferences
// Loads after Game object is initialized
// NOTE: If mods don't load, you may need to disable your ad blocker or privacy filters
// which can block external script loading

(function() {
    'use strict';
    
    function loadAllMods() {
        // Check if Game object exists and is ready
        if (typeof Game === 'undefined' || !Game.LoadMod) {
            // Game not ready yet, retry after short delay
            setTimeout(loadAllMods, 100);
            return;
        }
        
        // Load Frozen Cookies if enabled (local file, should work even with ad blockers)
        if (Game.prefs && Game.prefs.modsFrozenCookies) {
            try {
                console.log('[Mod Loader] Loading Frozen Cookies...');
                // Load from local mods folder
                Game.LoadMod('mods/frozen_cookies.js');
            } catch (e) {
                console.error('[Mod Loader] Failed to load Frozen Cookies:', e);
            }
        }
        
        // Load Cookie Monster if enabled (local build supplied in the project)
        if (Game.prefs && Game.prefs.modsCookieMonster) {
            try {
                console.log('[Mod Loader] Loading Cookie Monster from local file...');
                Game.LoadMod('mods/CookieMonster.js');
            } catch (e) {
                console.error('[Mod Loader] Failed to load local Cookie Monster:', e);
            }
        }
        
        if (Game.prefs && (Game.prefs.modsFrozenCookies || Game.prefs.modsCookieMonster)) {
            console.log('[Mod Loader] Mods loaded successfully');
        }
    }
    
    // Expose the loader function globally so it can be called dynamically
    window.LoadModsNow = loadAllMods;
    
    // Start loading mods when document is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(loadAllMods, 500);
        });
    } else {
        // Document already loaded
        setTimeout(loadAllMods, 500);
    }
})();
