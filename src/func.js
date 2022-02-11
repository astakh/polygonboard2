export function hide(el) { document.getElementById(el).style.visibility = "hidden"; };
export function show(el) { document.getElementById(el).style.visibility = "visible"; }; 
export function message(m) { document.getElementById("message").innerHTML = m; } 
export function toPaintMode() {
    editMode    = true; 
    lookMode    = false;
    screenMode  = false;
    document.getElementById("loggdata").innerHTML = '';
    hide("edit"); 
    hide("cursor");
    show("board");
    hide("loggdata");
    hide("loggs");
}
export function toLookMode() {
    editMode    = false; 
    screenMode  = false;
    lookMode    = true;
    document.getElementById("loggdata").innerHTML = '';
    show("edit");
    show("refresh"); 
    hide("savemenu");
    hide("color");
    hide("cursor");
    hide("loggdata");
    show("board"); 
}
export function toLoggMode() {
    editMode    = false; 
    screenMode  = false;
    lookMode    = false;
    hide("edit");
    show("refresh");
    hide("savemenu");
    hide("cursor");
    hide("board");
    show("loggdata");
}
export function toBNB(b) {
    let s = String(b);
    if (s.length > 18) { s = s.substring(0, s.length-18) + "." + s.substring(s.length-18); }
    else {
        s = '0'.repeat(19-s.length) + s;
        s = s.substring(0, s.length-18) + "." + s.substring(s.length-18); }
    let nn = parseFloat(s);
    return nn.toString();
}
export function toBNB3(b) {
    let s = String(b);
    if (s.length > 18) { s = s.substring(0, s.length-18) + "." + s.substring(s.length-18); }
    else {
        s = '0'.repeat(19-s.length) + s;
        s = s.substring(0, s.length-18) + "." + s.substring(s.length-18); }
    let nn = parseFloat(s);
    return nn.toFixed(5) ;
}
export function toLoggedOut() {
    console.log("loggedOut mode");
    show("login");
    document.getElementById("loginmessage").innerHTML = "not logged in";
    hide("logout");
    hide("loggs");
}
export function getBoardCoords(eX, eY) {
    let boardCoords = document.getElementById("board").getBoundingClientRect();
    brdX = boardCoords.left;
    brdY = boardCoords.top; 
    brdW = boardCoords.width;
    brdH = boardCoords.height; 
    crsX    = parseInt(Math.min(Math.max(eX - crsSize/2*brdPixSize, brdX), brdX + brdW - crsSize*brdPixSize));
    crsY    = parseInt(Math.min(Math.max(eY - crsSize/2*brdPixSize, brdY), brdY + brdH - crsSize*brdPixSize));
    console.log("cursor coords: " + crsX + "|" + crsY);
    crsPixX = parseInt((crsX - brdX) / brdPixSize + 1);
    crsPixY = parseInt((crsY - brdY) / brdPixSize + 2);
    console.log("cursor pix position: " + crsPixX + "|" + crsPixY);
    let saveMenuCoords = document.getElementById("savemenu").getBoundingClientRect();
    if (crsY > (brdHeight*brdPixSize - saveMenuCoords.height)) {svmY = crsY - saveMenuCoords.height; } else {svmY = crsY + crsSize*brdPixSize + 2; }
    if (crsX > (brdWidth*brdPixSize - saveMenuCoords.width)) {svmX = crsX - saveMenuCoords.width; } else {svmX = crsX + crsSize*brdPixSize + 2; }
    if (svmY < brdY) { svmY = brdY; }
    console.log("savemenu coords: " + svmX + "|" + svmY);
    document.getElementById("savemenu").style.left = svmX + "px";
    document.getElementById("savemenu").style.top  = svmY + "px";

}
