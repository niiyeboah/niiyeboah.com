var date_el = document.getElementById("date"),
    dl_el = document.getElementById("download"),
    img_el = document.getElementById("drawing_image"),
    body_el = document.querySelector("body"),
    fabric_enabled = window.innerWidth > 768,
    samai = new Samai({ date: date_el.value, fabric_enabled }),
    setImg = (uri) => {
        img_el.setAttribute("src", uri);
        body_el.style["background"] = "url('" + uri + "')";
        body_el.style["background-size"] = samai.width + "px";
    };
setImg(samai.data_uri);
img_el.addEventListener("click", () => setImg(samai.next()), false);
date_el.addEventListener("change", (e) => {
    var date = date_el.value.replace(/\/|\./g, "-");
    if (date_el.getAttribute("data-curr") !== date) {
        var date_arr = date.split("-");
        if (Date.parse(date) && date_arr.length === 3) {
            if (date_arr[0].length < 2) date_arr[0] = "0" + date_arr[0];
            if (date_arr[1].length < 2) date_arr[1] = "0" + date_arr[1];
            date = date_arr[0] + "-" + date_arr[1] + "-" + date_arr[2];
            date_el.value = date;
            date_el.setAttribute("data-curr", date);
            history.pushState(null, date, date);
        }
        samai = new Samai({ date, fabric_enabled });
        setImg(samai.data_uri);
    }
}, false);
dl_el.addEventListener("click", (e) => {
    samai.download();
    e.stopPropagation();
}, false);
