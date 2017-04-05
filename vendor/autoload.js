/**
 * Simple script loader - load just this file instead of duplicating multiple <script> tags on every page
 *
 * @example <script src="autoload.js" data-autoload="js/test01.js"></script>
 * @example <script src="autoload.js" data-autoload="test02.js, https://code.jquery.com/jquery-2.2.3.min.js"></script>
 * @link    https://github.com/zionsg/javascript/tree/master/autoload for canonical source repository
 */

// Predefined list of scripts to load in sequence every time the script loader is run - change as needed
var scripts = [
    'vendor/jquery/jquery-3.2.0.min.js',
    'scripts/utils.js'
];

// Script loader
var autoload = (function (scripts) {
    var scriptTags = document.getElementsByTagName('script'),
        autoloadScripts;

    // Look for a "data-autoload" script attribute, containing a comma-delimited list of script urls,
    // which allows individual pages to append page-specific scripts to the predefined list
    for (var i = 0; i < scriptTags.length; i++) {
        autoloadScripts = scriptTags[i].getAttribute('data-autoload');
        if (autoloadScripts) {
            autoloadScripts.split(',').forEach(function (script) {
                scripts.push(script.trim());
            });
            break;
        }
    }

    // Create <script> element for each script
    scripts.forEach(function (url) {
        var script = document.createElement('script');

        script.src = url;
        script.async = false; // see http://www.html5rocks.com/en/tutorials/speed/script-loading/#toc-dom-rescue
        document.body.appendChild(script);
    });
})(scripts);
