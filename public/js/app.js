document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 768) {
        var draw_el = document.getElementById("drawing");
        draw_el.style["height"] = draw_el.style["width"];
    }
}, false);

window.onload = () => {
    var draw_el = document.getElementById("drawing"),
        date_el = document.getElementById("date"),
        w = draw_el.clientWidth,
        d = date_el.value,
        prng = new PRNG(d),
        prng_sa = new PRNG(d),
        draw = SVG('drawing').size(w, w),
        /*
        dark = [
            "../img/f/black.png",
            "../img/f/dark_blue.png",
            "../img/f/dark_green.png",
            "../img/f/dark_grey.png",      
            "../img/f/purple.png",
            "../img/f/red.png",
        ],      
        light = [
            "../img/f/light_blue.png",
            "../img/f/light_green.png",      
            "../img/f/light_grey.png",
            "../img/f/yellow.png",
            "../img/f/pink.png",
            "../img/f/orange.png"
        ],
        */
        dark = ["#222", "#227", "#272", "#777", "#427", "#722"],      
        light = ["#39C", "#3C6", "#CCC", "#FC3", "#C6C", "#F63"],
        sdark = shuffle(dark, prng_sa),
        slight = shuffle(light, prng_sa);
    draw_el.addEventListener("click", () => { 
        samai(w, draw, prng, sdark, slight);
    }, false);
    date_el.addEventListener("change", (e) => {
        var date = date_el.value.replace(/\/|\./g, "-");
        console.log(date_el.getAttribute("data-curr") !== date);
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
            d = date_el.value;
            prng = new PRNG(d);
            prng_sa = new PRNG(d);
            sdark = shuffle(dark, prng_sa);
            slight = shuffle(slight, prng_sa);
            samai(w, draw, prng, sdark, slight);
        }
    }, false);
    window.onresize = () => {
        w = draw_el.clientWidth;
        draw_el.style["height"] = draw_el.style["width"];
        draw_el.innerHTML = "";
        draw = SVG('drawing').size(w, w),
        prng = new PRNG(d),
        samai(w, draw, prng, sdark, slight);
        history.pushState(null, d, d);
    }
    samai(w, draw, prng, sdark, slight);
}

function shuffle(arr, prng) {
    var random = (x, min) => {
        min = min || 0;
        return Math.round(prng.nextFloat() % (x - min)) + min;
    };
    var a = arr.slice();
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = random(i + 1);
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return  a;
};

function samai(w, draw, prng, dark, light) {
    var pw = w / 2, 	// Pattern Width
        lc = 2, 	    // Pattern Line Count
        lh = pw / lc; 	// Pattern Line Height
        /*
        hex = [
            "#060",
            "#000",
            "#396",      
            "#777",
            "#CCC",          
        ];
        */
    var random = (x, min) => {
        min = min || 0;
        return Math.round(prng.nextFloat() % (x - min)) + min;
    };
    var fabric = (draw, hex, texture) => {
        var w = 4;
        var colorlum = (hex, lum) => {
            lum = lum || 0;
            hex = String(hex).replace(/[^0-9a-f]/gi, '');
            if (hex.length < 6) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            var rgb = "#", c, i;
            for (i = 0; i < 3; i++) {
                c = parseInt(hex.substr(i * 2, 2), 16);
                c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
                rgb += ("00" + c).substr(c.length);
            }
            return rgb;
        }
        var pw = w / 2;
        var p = draw.pattern(w, w, (add) => {
            add.rect(pw, pw).fill(hex);
            add.rect(pw, pw).fill(colorlum(hex, 0.03)).move(pw, 0);
            add.rect(pw, pw).fill(colorlum(hex, 0.06)).move(0, pw);
            add.rect(pw, pw).fill(colorlum(hex, 0.09)).move(pw, pw);
        });
        if (texture > 0) {
            p = draw.pattern(w * 2, w * 2, (add) => {
                add.rect(w, w).fill(p);
                add.rect(w, w).fill(p).move(w, 0).rotate(90);
                add.rect(w, w).fill(p).move(0, w).rotate(180);
                add.rect(w, w).fill(p).move(w, w).rotate(270);
            });
        }
        if (texture > 1) {
            w *= 2;
            p = draw.pattern(w * 2, w * 2, (add) => {
                add.rect(w, w).fill(p);
                add.rect(w, w).fill(p).move(w, 0).rotate(90);
                add.rect(w, w).fill(p).move(0, w).rotate(180);
                add.rect(w, w).fill(p).move(w, w).rotate(270);
            });
        }
        return p;
    };
    var randomShape = (c, lh, lc, d) => {
        var sides = [3, 3],
            sideNumber = sides[random(1)],
            shape_xy = [],
            r1 = random(1),
            r2 = random(lc, 1),
            lch = lc / 2,
            t = random(lc),
            b = t > lch ? random(lc, lch) : random(lch),
            j = 0;
        for (let i = 0; i < sideNumber; i++) {
            var l = i + 1 > Math.ceil(sideNumber / 2) ? r2 : 0;            
            if (j % 2 === r1) shape_xy.push([(t + l) * lh, 0]);                
            else shape_xy.push([(b + l) * lh, lh]);
            if (i < sideNumber - 1) {
                if (j % 2 !== r1) shape_xy.push([(t + l) * lh, 0]);
                else shape_xy.push([(b + l) * lh, lh]);
                i++;
            }
            j++;
        }
        d.polygon(shape_xy).fill(c);
    };
    var generatePattern = () => {
        var transformations = random(4, 2);
        var pattern = draw.pattern(pw, lh, (add) => {
            add.rect(lh * (lc / 2), lh).fill(fabric(draw, light[0], 2));
            add.rect(lh * (lc / 2), lh).fill(fabric(draw, dark[0], 1)).move(lh * (lc / 2), 0);
            randomShape(fabric(draw, light[1], 0), lh, lc, add);
            randomShape(fabric(draw, dark[1], 1), lh, lc, add);
            randomShape(fabric(draw, light[2], 0), lh, lc, add);
            /*
            add.rect(lh * (lc / 2), lh).fill(fabric(draw, "#042", 2));
            add.rect(lh * (lc / 2), lh).fill(fabric(draw, "#222", 1)).move(lh * (lc / 2), 0);
            randomShape(fabric(draw, "#396", 0), lh, lc, add);
            randomShape(fabric(draw, "#666", 1), lh, lc, add);
            randomShape(fabric(draw, "#AAA", 0), lh, lc, add);
            */
        });
        if (transformations > 1) {
            pattern = draw.pattern(pw, lh * 2, (add) => {
                add.rect(pw, lh).fill(pattern);
                if (random(1)) add.rect(pw, lh).fill(pattern).move(0, lh).flip("y");
                else add.rect(pw, lh).fill(pattern).move(0, lh).rotate(180);
            });
        }
        if (transformations > 2) {
            pattern = draw.pattern(pw * 2, lh * 2, (add) => {
                add.rect(pw, lh * 2).fill(pattern);
                if (random(1)) add.rect(pw, lh * 2).fill(pattern).move(pw, 0).flip("x");
                else add.rect(pw, lh * 2).fill(pattern).move(pw, 0).rotate(180);
            });
        }
        /*       
        if (transformations > 3) {
            pattern = draw.pattern(w, h, (add) => {
                add.rect(w, h).fill(pattern).rotate(90);
            });
        }
        */
        return pattern;
    };
    draw.clear();
    draw.rect(w, w).fill(generatePattern());
}

class PRNG {
    constructor(date) {
        var dateSeed = () => {
            var d = date ? new Date(date) : new Date();
            d = "" + (d.getMonth() + 1) + (d.getDate()) + (d.getFullYear());
            return Number.parseInt(d);
        }
        this._seed = dateSeed() % 2147483647;
        if (this._seed <= 0) this._seed += 2147483646;
    }
    next() {
        return this._seed = this._seed * 16807 % 2147483647;
    }
    nextFloat() {
        var result = (this.next() - 1) / 2147483646;
        while (result < 1) result *= 10;
        return result;
    }
}
