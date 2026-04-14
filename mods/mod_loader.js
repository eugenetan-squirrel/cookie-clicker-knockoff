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
            
            // Performance optimizations when both mods are active
            if (Game.prefs.modsFrozenCookies && Game.prefs.modsCookieMonster) {
                console.warn('[Mod Loader] WARNING: Both Frozen Cookies and Cookie Monster are enabled.');
                
                // Check if performance mode is enabled in preferences
                if (Game.prefs.performanceMode) {
                    console.log('[Mod Loader] Performance mode enabled - applying optimizations...');
                    
                    // Set a global flag that mods can check for performance mode
                    window.COOKIE_MODS_PERFORMANCE_MODE = true;
                    
                    // Add CSS to reduce animations and effects that might cause lag
                    var style = document.createElement('style');
                    style.id = 'performanceModeStyles';
                    style.textContent = `
                        /* Performance optimizations when both mods are active */
                        .particles { display: none !important; }
                        .sparkles { display: none !important; }
                        .goldenCookie { transition: none !important; }
                        .shimmer { transition: none !important; }
                        #particles { display: none !important; }
                        #sparkles { display: none !important; }
                        
                        /* Reduce animation complexity */
                        * {
                            animation-duration: 0.1s !important;
                            transition-duration: 0.1s !important;
                        }
                    `;
                    document.head.appendChild(style);
                    
                    // Override requestAnimationFrame to throttle it when both mods are active
                    var originalRAF = window.requestAnimationFrame;
                    var lastRAFTime = 0;
                    var rafThrottle = 32; // ~30fps instead of 60fps
                    
                    window.requestAnimationFrame = function(callback) {
                        var now = Date.now();
                        if (now - lastRAFTime >= rafThrottle) {
                            lastRAFTime = now;
                            return originalRAF(callback);
                        } else {
                            // Fallback to setTimeout for throttling
                            return setTimeout(function() {
                                callback(performance.now());
                            }, rafThrottle - (now - lastRAFTime));
                        }
                    };
                }
                
                // Add a visual warning to the game
                setTimeout(function() {
                    if (Game && Game.Notify) {
                        var message = Game.prefs.performanceMode ? 
                            'Performance Mode active - lag reduced.' : 
                            'Both mods enabled. Enable Performance Mode in options to reduce lag.';
                        Game.Notify('Performance Notice', message, [16, 5], 8);
                    }
                }, 2000);
            }
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
