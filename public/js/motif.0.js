window.onload = () => {
    var pw = 200 	// Pattern Width
    var lh = 50; 	// Pattern Line Height
    var lc = 4; 	// Pattern Line Count
    var w = pw * 2;
    var h = lc * lh * 2;
    draw = SVG('drawing').size(w, h);
    var hex = ['#000', "#FC0", '#396'];
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
    draw.rect(w, h).fill(pattern)
    //.transform({ rotation: 90 });
    document.getElementById("drawing").style["width"] = w + "px"
    document.getElementById("drawing").style["height"] = h + "px"
}