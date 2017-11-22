exports.render = function(req, res) {
    var d;
    if (req.params.mm) {
        d = req.params.mm + "-" + req.params.dd + "-" + req.params.yyyy;
        if (!Date.parse(d)) d = false;   
    }
    var dateString = (ds) => {
        var result = ds;
        if (!ds) {
            ds = new Date();
            var month = ds.getMonth() + 1,
                day = ds.getDate(),
                year = ds.getFullYear();
            result = (month < 10 ? "0" + month : month) + "-";
            result += (day < 10 ? "0" + day : ds.getDate()) + "-";
            result += ds.getFullYear();
        }
        return result;
    }
    res.render('index', {
        title: 'niiyeboah.com',
        date: dateString(d)
    });
};