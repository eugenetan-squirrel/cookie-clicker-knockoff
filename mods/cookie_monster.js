// Cookie Monster Mod - Loader
// This file loads the Cookie Monster mod on page entry

(function(){
    if (typeof Game !== 'undefined' && Game.LoadMod) {
        Game.LoadMod('https://cookiemonsterteam.github.io/CookieMonster/dist/CookieMonster.js');
    } else {
        // Retry if Game object not ready yet
        setTimeout(arguments.callee, 100);
    }
})();
