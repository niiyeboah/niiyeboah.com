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
        sdark = sa(dark, d, prng_sa),
        slight = sa(light, d, prng_sa);     
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
            sdark = sa(dark, d, prng_sa);
            slight = sa(light, d, prng_sa);
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

function sa(arr, date, prng) {
    var a = arr.slice();
    var random = (x, min) => {
        min = min || 0;
        return Math.round(prng.nextFloat() % (x - min)) + min;
    }
    var shuffle = (a) => {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = random(i + 1);
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
    }
    shuffle(a);
    return  a;
}

function samai(w, draw, prng, dark, light) {
    var pw = w / 2, 	// Pattern Width
        lc = 4, 	    // Pattern Line Count
        lh = pw / lc, 	// Pattern Line Height
        h = w,
        da = dark.slice(),
        li = light.slice();
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
    }
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
            add.rect(lh * (lc / 2), lh).fill(li.shift());
            add.rect(lh * (lc / 2), lh).fill(da.shift()).move(lh * 2, 0);
            randomShape(li.shift(), lh, lc, add);
            randomShape(da.shift(), lh, lc, add);
            randomShape(li.shift(), lh, lc, add);
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
    draw.rect(w, h).fill(generatePattern());
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