exports.render = function(req, res) {
    res.render('zipsplit', {
        title: 'ZipSplit.io',
        svgjs: 'https://cdnjs.cloudflare.com/ajax/libs/svg.js/2.6.3/svg.min.js'
    });
};
