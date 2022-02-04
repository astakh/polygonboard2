export function hide(el) { document.getElementById(el).style.visibility = "hidden"; };
export function show(el) { document.getElementById(el).style.visibility = "visible"; };
export function xp(pos) { return (pos-1) % global.xs; }
export function yp(pos) { return parseInt((pos-1-((pos-1) % global.xs)) / global.xs); } 
export function message(m) { document.getElementById("message").innerHTML = m; } 
export function topaintmode() {
    global.editmode     = true; 
    global.lookmode     = false;
    document.getElementById("loggdata").innerHTML = '';
    hide("edit"); 
    hide("cursor");
    show("board");
    hide("loggdata");
    hide("loggs");
}
export function tolookmode() {
    global.editmode    = false; 
    global.screenmode  = false;
    global.lookmode    = true;
    document.getElementById("loggdata").innerHTML = '';
    show("edit");
    show("refresh"); 
    hide("savemenu");
    hide("cursor");
    hide("loggdata");
    show("board"); 
}
export function tologgmode() {
    global.editmode    = false; 
    global.screenmode  = false;
    global.lookmode    = false;
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
export function getBoardCoords() {
    let piccoords = document.getElementById("board").getBoundingClientRect();
    global.picx = piccoords.left;
    global.picy = piccoords.top; 
    global.picw = piccoords.width;
    global.pich = piccoords.height; 
}