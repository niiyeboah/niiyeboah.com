exports.render = function(req, res) {
    var date;
    var n = req.params.n || 1;
    if (req.params.mm) {
        date = req.params.mm + "-" + req.params.dd + "-" + req.params.yyyy;
        if (!Date.parse(date)) date = false;   
    } 
    var dateString = (d) => {
        var result = d;
        if (!d) {
            d = new Date();
            var month = d.getMonth() + 1,
                day = d.getDate(),
                year = d.getFullYear();
            result = (month < 10 ? "0" + month : month) + "-";
            result += (day < 10 ? "0" + day : d.getDate()) + "-";
            result += d.getFullYear();
        }
        return result;
    }
    res.render('samai', {
        title: 'niiyeboah.com | Samai',
        date: dateString(date), n
    });
};