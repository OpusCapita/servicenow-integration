function hue2rgb(p, q, t){
  if(t < 0) t += 1;
  if(t > 1) t -= 1;
  if(t < 1/6) return p + (q - p) * 6 * t;
  if(t < 1/2) return q;
  if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
  return p;
}

function hslToRgb(h, s, l){
  var r, g, b;

  if(s == 0) {
    r = g = b = l; // achromatic
  } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
  }

  return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
}

function getHexColor(value) {
  var string = value.toString(16);
  return (string.length === 1) ? '0' + string : string;
}

module.exports.colourFor = function(i) {
  var hue = i * 1.2 / 360;
  var rgb = hslToRgb(hue, 1, 0.4);

  return '#' + getHexColor(rgb[0])  + getHexColor(rgb[1])  + getHexColor(rgb[2]);
}
