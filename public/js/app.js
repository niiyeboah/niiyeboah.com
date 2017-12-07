var date_el = document.getElementById("date"),
    dl_el = document.getElementById("download"),
    img_el = document.getElementById("drawing_image"),
    dc_el = document.getElementById("drawing_container"),
    body_el = document.querySelector("body"),
    sama_el = document.getElementById("sama_number"),
    sama = Number.parseInt(sama_el.getAttribute("data-n")),
    fabric_enabled = window.innerWidth > 768,
    samai = new Samai({ 
        date: date_el.value, 
        fabric_enabled,
        n: sama
    }),
    setImg = (uri) => {
        img_el.setAttribute("src", uri);
        body_el.style["background-image"] = "url('" + uri + "')";
        body_el.style["background-size"] = samai.width + "px";
        if (sama > 1) sama_el.style.display = "block";
    },
    logo = new N.Logo("logo", 32);
logo.animate(() => {
    setImg(samai.data_uri);
    date_el.style.opacity = 1,
    dc_el.style.opacity = 1
});
img_el.addEventListener("click", () => {
    sama++;
    sama_el.innerText = sama;
    setImg(samai.next());
    history.pushState(null, date, samai._getDateString() + "." + sama);
}, false);
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
        samai = new Samai({ date, fabric_enabled, n: 1 });
        setImg(samai.data_uri);
        sama = 1;
        sama_el.innerText = sama;
        sama_el.style.display = "none";
    }
}, false);
dl_el.addEventListener("click", (e) => {
    samai.download();
    e.stopPropagation();
}, false);
