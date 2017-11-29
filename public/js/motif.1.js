window.onload = () => {
    var pw = 200 	// Pattern Width
    var lh = 50; 	// Pattern Line Height
    var lc = 4; 	// Pattern Line Count
    var w = pw * 2;
    var h = lc * lh * 2;
    draw = SVG('drawing').size(w, h);
    var hex = [
        fabric(draw, '#111', 4), 
        fabric(draw, "#FC0", 4), 
        fabric(draw, '#396', 4)
    ];
    var hex_p = [
        [0, 1, 2, 1],
        [1, 2, 1, 2],
        [2, 1, 0, 1],
        [1, 0, 1, 0]
    ];
    var poly_xy = [
        [[0, lh, pw * 0.2, 0, pw * 0.2, lh], [0, 0, 0, lh, pw * 0.2, 0]],
        [[0, 0, pw * 0.2, lh, pw * 0.2, 0], [0, 0, 0, lh, pw * 0.2, lh]]
    ];
    var pattern = draw.pattern(pw, lc * lh, (add) => {
        for (let i = 0; i < lc; i++) {
            add.rect(pw, lh).fill(hex[hex_p[i][0]]).move(0, i * lh);
            add.polygon(poly_xy[i % 2][0]).fill(hex[hex_p[i][1]]).move(pw * 0.3, i * lh);
            add.rect(pw * 0.5, lh).fill(hex[hex_p[i][2]]).move(pw * 0.5, i * lh);
            add.polygon(poly_xy[i % 2][1]).fill(hex[hex_p[i][3]]).move(pw * 0.5, i * lh);
        }
    });
    draw.rect(w, h).fill(pattern);
    document.getElementById("drawing").style["width"] = w + "px"
    document.getElementById("drawing").style["height"] = h + "px"
}

function fabric(draw, hex, w) {
    var pw = w / 2;
    var p = draw.pattern(w, w, (add) => {
        add.rect(pw, pw).fill(hex);
        add.rect(pw, pw).fill(lum(hex, 0.05)).move(pw, 0);
        add.rect(pw, pw).fill(lum(hex, 0.1)).move(0, pw);
        add.rect(pw, pw).fill(lum(hex, 0.15)).move(pw, pw);
    });
    p = draw.pattern(w * 2, w * 2, (add) => {
        add.rect(w, w).fill(p);
        add.rect(w, w).fill(p).move(w, 0).rotate(90);
        add.rect(w, w).fill(p).move(0, w).rotate(180);
        add.rect(w, w).fill(p).move(w, w).rotate(270);
    });
    return p;
}

function lum(hex, lum) {
    lum = lum || 0;
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }   
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00"+c).substr(c.length);
    }
    return rgb;
}
