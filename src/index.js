/* Moralis init code */
const { xorWith, isUndefined } = require('lodash');
Moralis  = require('moralis');
const serverUrl = "https://frgkvs8y2mr0.usemoralis.com:2053/server";
const appId = "JuMu1VMqwfoI3RGZ6GsiyHBN96Fgg2h7HgtvJZCz";
const contract = "0xc3F1e16910d750F7F1aF2152dcaCfC33057b8210";
Moralis.start({ serverUrl, appId });
const web3 = Moralis.enableWeb3();
import { show, hide, xp, yp, message, topaintmode, tolookmode, tologgmode, toBNB, toBNB3, toLoggedOut, getBoardCoords } from './func';

var user;
var canvas = document.getElementById("board")
var cursor = document.getElementById("cursor")
var screen = document.getElementById("screen")
var scrpix = new Array(10);
global.editmode = false;
global.lookmode = true;
global.screenmode = false;  
var pricecommand = 0; 
var urlcommand   = '';
var markedcount  = 0;
var func = "paint40";
var prevurl = "==="; 
global.picx = 0;
global.picy = 0; 
global.picw = 0;
global.pich = 0; 
global.brd = [];
var savemenux = 0;
var savemenuy = 0;
var markedpos = []
var markedcol = []
// params###########################
global.xs = 765;
global.ys = 340;
var initprice = 1000000000000000;
var masterfee = 1;
var maxpixcount = 40;
var ps = 2;
var screencolor = "red"; 
var screenwidth = 10;
var crsx = 0;
var crsy = 0;
var cursortaken = false;
var color  = new Array(xs)
var owner  = new Array(xs)
var url  = new Array(xs)
var price= new Array(xs);
for(var x = 0; x < xs; x++)  {
    color[x]  = new Array(ys);
    url[x]  = new Array(ys);
    owner[x]  = new Array(ys);
    price[x]= new Array(ys);
    for (var y = 0; y < ys; y++) {
        color[x][y] = "black";
        url[x][y] = "";
        owner[x][y] = "";
        price[x][y] = initprice;
    }
}
async function toLoggedIn() {
    console.log("loggedIn mode");
    hide("login");
    user = await Moralis.User.current();
    document.getElementById("loginmessage").innerHTML = user.get("ethAddress");
    show("logout");
    show("loggs");
} 
async function login() {
    //const web3 = await Moralis.enableWeb3();
    user = Moralis.User.current(); 
    if (!user) {
        user = await Moralis.authenticate({ signingMessage: "Log in to theBoard" })
        .then(function (user) {
            console.log("logged in useraddress: " + user.get("ethAddress")); 
            toLoggedIn();
        })
        .catch(function (error) { console.log(error); });
    }
}
async function logOut() {
    await Moralis.User.logOut(); 
    console.log("logged out");
    toLoggedOut();
}
document.getElementById("login").onclick = login;
document.getElementById("logout").onclick = logOut;
document.getElementById("loggs").addEventListener("click", async function() {
    user = Moralis.User.current();
    console.log("loggs for user " + user.get("ethAddress"));
    let loggs = await getLoggs(user.get("ethAddress"));
    let cont  = "Your transactions:<br><br><table>";
    cont += '<tr align=center><td>transaction</td><td>time</td><td>pixel position</td><td >-/+ BNB</td></tr>';
    for (var i=0; i<loggs.length; i++) {
        cont += '<tr><td><a href="https://testnet.bscscan.com/tx/' + loggs[i][1] + '">trx</a></td>';
        let date = loggs[i][0];
        cont += '<td>' + date.toUTCString() + '</td>';
        cont += '<td align=center>' + xp(loggs[i][2]) + "|" + yp(loggs[i][2]) + '</td>';
        if (loggs[i][3] > 0) { cont += "<td align=right>-" + toBNB3(loggs[i][3]) + "</td>"; } 
        if (loggs[i][4] > 0) { cont += "<td align=right>" + toBNB3(loggs[i][4]) + "</td>"; } 
        cont += "</tr>";
    }
    cont += "</table>"
    tologgmode();
    document.getElementById("loggdata").innerHTML = cont;
})
async function getpix(pos) {
    const ABI = [
        {   inputs: [ { internalType: "uint256", name: "_pos", type: "uint256" } ],
            name: "getPix",
            outputs: [ {    components: [
                            { internalType: "uint256", name: "pos", type: "uint256" },
                            { internalType: "string",  name: "colorurl", type: "string" },
                            { internalType: "address", name: "owner", type: "address" },
                            { internalType: "uint256", name: "price", type: "uint256" } ],
                            internalType: "struct theboard.Pix",
                            name: "",
                            type: "tuple" } ],
            stateMutability: "view", type: "function" } ];
    const options = {
        contractAddress: contract,
        functionName: "getPix",
        abi: ABI,
        params: {
          _pos: pos
        },
    };
    const web3 = await Moralis.enableWeb3();
    try {
        const pixdata = await Moralis.executeFunction(options); 
        //document.getElementById("result").innerHTML = pixdata;
        return pixdata;
    }
    catch (e) { 
        document.getElementById("result").innerHTML = "failed to get pixdata";
        console.log(e);
    }
}
async function updatePixels(poses) {
    let l = poses.length;
    for (var i=0; i<l; i++) { 
        let p = await getpix(poses[i]); 
        let s = JSON.stringify(p);
        s = s.substring( 1, s.length-1);
        s = s.replaceAll('"', '');
        let pix = s.split(","); 
        if (parseInt(pix[0])>0) {
            let pixel = await pixelByPos(parseInt(pix[0])); 
            if (pixel) { changePixel(pixel, pix[1], pix[2], parseInt(pix[3])); }
            else { createPixel(parseInt(pix[0]), pix[1], pix[2], parseInt(pix[3])); }
        }
    }
}
async function pixelByPos(pos) {
    const Pixel = Moralis.Object.extend("Pixel");
    const query = new Moralis.Query(Pixel);
    query.equalTo("pos", pos);
    const results = await query.find(); 
    if (results.length > 0) { return results[0]; }
    else { return false; }
}
async function changePixel(pix, colorurl, owner, price) {
    pix.set('colorurl', colorurl);
    pix.set('owner', owner.toLowerCase());
    pix.set('price', price);
    await pix.save();
    console.log("changePixel: pos=" + pix.get('pos'));
}
async function createPixel(pos, colorurl, owner, price) {
    const Pixel = Moralis.Object.extend("Pixel");
    const p = new Pixel();
    console.log(p);
    p.set('pos', pos);
    p.set('colorurl', colorurl);
    p.set('owner', owner.toLowerCase());
    p.set('price', price);
    await p.save();
    console.log("createPixel: pos=" + p.get('pos'));
}
async function createLoggs(pos, trx) {
    if (pos>0) {
        user = Moralis.User.current();
        const Loggs = Moralis.Object.extend("loggs");
        const p = new Loggs(); 
        let x = (pos-1) % xs;
        let y = parseInt((pos-1-x) / xs); 
        console.log("createLoggs for pixel pos:" + pos + " price:" + price[x][y] + " owner:" + owner[x][y]);
        p.set('address', user.get("ethAddress"));
        p.set('trx', trx);
        p.set('bought', price[x][y]);
        p.set('sold', 0);
        p.set('pos', pos);
        await p.save();
        console.log("createLoggs: for:" + user.get("ethAddress") + " pos:" + p.get('pos') + " cost:" + p.get('bought'));
        const p2 = new Loggs();
        if (owner[x][y] != '') {
            p2.set('address', owner[x][y]);
            p2.set('trx', trx);
            p2.set('bought', 0);
            p2.set('sold', price[x][y]);
            p2.set('pos', pos);
            await p2.save();
            console.log("createLoggs: for:" + owner[x][y] + " pos:" + p2.get('pos') + " revenue:" + p2.get('sold'));
        }
    }
}
async function getLoggs(adr) { 
    const Loggs = Moralis.Object.extend("loggs");
    const query = new Moralis.Query(Loggs);
    query.equalTo("address", adr);
    query.limit(1000);
    const loggs = await query.find(); 
    console.log("found " + loggs.length + " loggs");
    let logdata = [];
    for (var i=0; i<loggs.length; i++) {
        let p = loggs[i];
        logdata.push([p.get('createdAt'), p.get('trx'), p.get('pos'), p.get('bought'), p.get('sold')]);
    }
    return logdata;
}
async function getPixels() { 
    const Pixel = Moralis.Object.extend("Pixel");
    const query = new Moralis.Query(Pixel);
    query.greaterThan("pos", 0);
    query.limit(xs*ys);
    const pixels = await query.find(); 
    console.log("found " + pixels.length + " pixels");
    for (var i=0; i<pixels.length; i++) {
        let p = pixels[i];
        let pos = p.get('pos')-1;
        let x = pos % xs;
        let y = parseInt((pos-x) / xs); 
        let colorurl = p.get('colorurl');
        let colorurlarr = colorurl.split("|");
        color[x][y] = colorurlarr[0]; 
        url[x][y] = colorurlarr[1];
        owner[x][y] = p.get('owner');
        price[x][y] = p.get('price');
        //console.log(i + ") pos=" + pos + " x=" + x + " y=" + y + " color=" + color[x][y]);
    }
    return color;
}
// отрисовка картинки
async function drawBoard() {
    console.log("drawBoard");
    color = await getPixels();
    for(var x = 0; x < xs; x++) {
        for(var y = 0; y < ys; y++) {
            ctx.fillStyle = color[x][y];
            if (x==1 && y==0) { console.log(color[x][y]); }
            ctx.fillRect(x * ps, y * ps, ps, ps);
        }
    }
}
document.getElementById("board").addEventListener("click", function (e) {
    if (editmode && !screenmode) {
        getBoardCoords();
        let cx = Math.min(Math.max(e.clientX - 5*ps, picx), picx + picw - 10*ps);
        let cy = Math.min(Math.max(e.clientY - 5*ps, picy), picy + pich - 10*ps);
        console.log("cursor coords: " + cx + "|" + cy);
        drawCursor(cx, cy);
        if (cy > (ys*ps - 200)) {savemenuy = cy - 200; } else {savemenuy = cy + 20; }
        if (cx > (xs*ps - 300)) {savemenux = cx - 300; } else {savemenux = cx + 20; }
        console.log("savemenu coords: " + savemenux + "|" + savemenuy);
        document.getElementById("savemenu").style.left = savemenux + "px";
        document.getElementById("savemenu").style.top  = savemenuy + "px";
        message("<b>paint mode:</b> click on segment to edit it");
    }
    if (lookmode) {
        let px = parseInt((e.clientX - picx) / ps); // pixel coords
        let py = parseInt((e.clientY - picy) / ps);
        if (url[px][py] != "") {win = window.open("https://" + url[px][py]);}
    }
})
document.getElementById("board").addEventListener("mousemove", function (e) {
    if (lookmode) {
        let px = parseInt((e.clientX - picx) / ps); // pixel coords
        let py = parseInt((e.clientY - picy) / ps);
        console.log("pixel url: " + url[px][py]);
        
        for(var x = 0; x < xs; x++)  {
            for (var y = 0; y < ys; y++) {
                if (url[x][y] == prevurl) {
                    ctx.fillStyle = color[x][y];
                    ctx.fillRect(x * ps, y * ps, ps, ps);
                }
                if (url[x][y] == url[px][py] && url[px][py] != "") {
                    //console.log("same url: " + x + "|" + y);
                    ctx.fillStyle = "white";
                    ctx.fillRect(x * ps, y * ps, ps, ps);
                }
            }
        }
        prevurl = url[px][py];
        if (url[px][py]=="") { message("."); }
        else { message("https://" + url[px][py]); }
    }
})
function drawCursor(x, y) {
    crsx = parseInt((x - picx)/ps); // pixel coords
    crsy = parseInt((y - picy)/ps);
    console.log("cursor pixel coords: " + crsx + "|" + crsy);
    if (editmode) {
        document.getElementById("cursor").style.top = y + "px";
        document.getElementById("cursor").style.left = x + "px";
        crs.strokeStyle = "red";
        crs.strokeRect(0, 0, 10*ps, 10*ps);
        show("cursor");
    }
}
document.getElementById("cursor").addEventListener("dblclick", function() {
    console.log("cursor click");
    screenmode = true;
    show("savemenu");
    for (var i=0; i<10; i++) {
        scrpix[i] = new Array(10);
        for (var j=0; j<10; j++) {
            scrpix[i][j] = '';
        }
    }
    drawScreen();
    getBoardCoords();
})
function drawScreen() {
    if (editmode) {
        for (var i = 0; i<10; i++) {
            for (var j = 0; j<10; j++) {
                if (scrpix[i][j] != '') {
                    scr.fillStyle = scrpix[i][j];
                } 
                else { scr.fillStyle = color[i+crsx][j+crsy];}
                scr.fillRect(i*screenwidth, j*screenwidth, screenwidth, screenwidth);
        
            }
        }
    }
}
document.getElementById("edit").addEventListener("click", function (e) {
    if (lookmode){
        topaintmode(); 
        pricecommand = 0;    
        markedcount  = 0;
        getBoardCoords();
    }
    message("edit mode: click on board to choose segment for painting");
    console.log("edit mode=" + editmode + ", markedcount=" + markedcount);
})
document.getElementById("cursor").addEventListener("mousedown", function() { cursortaken = true })
document.getElementById("cursor").addEventListener("mouseup", function() { cursortaken = false })
document.getElementById("cursor").addEventListener("mousemove", function(e) { 
    if (cursortaken) {
        getBoardCoords();
        let cx = Math.min(Math.max(e.clientX - 5*ps, picx), picx + picw - 10*ps);
        let cy = Math.min(Math.max(e.clientY - 5*ps, picy), picy + pich - 10*ps);
        console.log("cursor coords: " + cx + "|" + cy);
        drawCursor(cx, cy);
    }
})
document.getElementById("cursor").addEventListener("dblclick", function() {
    console.log("cursor dblclick");
    screenmode = true;
    show("savemenu");
    for (var i=0; i<10; i++) {
        scrpix[i] = new Array(10);
        for (var j=0; j<10; j++) { scrpix[i][j] = ''; }
    }
    drawScreen();
    getBoardCoords();
})
document.getElementById("screen").addEventListener("click", function(e) { 
    let scrcoords = document.getElementById("screen").getBoundingClientRect();
    let px = parseInt((e.clientX - scrcoords.left)/screenwidth);
    let py = parseInt((e.clientY - scrcoords.top)/screenwidth);
    if ((markedcount<(maxpixcount+1) && scrpix[px][py] != '') || (markedcount<maxpixcount && scrpix[px][py] == '')){
        if (scrpix[px][py] == '') {
            console.log("screencolor=" + screencolor);
            scrpix[px][py] = screencolor; } else { scrpix[px][py] = ''; }
        if (scrpix[px][py] != '') {
            markedcount++;
            pricecommand = pricecommand + price[px+crsx][py+crsy];
            scr.fillStyle = scrpix[px][py];
            scr.fillRect(px*screenwidth, py*screenwidth, screenwidth, screenwidth);
        }
        else {
            markedcount--;
            pricecommand = pricecommand - price[px+crsx][py+crsy];
            scr.fillStyle = color[px+crsx][py+crsy];
            scr.fillRect(px*screenwidth, py*screenwidth, screenwidth, screenwidth);
        }
        console.log("marked: " + markedcount);
        console.log("screen click: " + px + "|" + py);   
        markedpos = []
        markedcol = []
        let l = 0; 
        for (var i=0; i<10; i++) {
            for (var j=0; j<10; j++) {
                if (scrpix[i][j] != '') {
                    markedpos[l] = (i+crsx)+(j+crsy)*xs + 1;
                    markedcol[l] = scrpix[i][j];
                    l++; 
                };
            }
        }
        //paintcommand = marked.join("|");
        console.log("pos: " + markedpos);
        console.log("col: " + markedcol);
        message("marked pixes: " + markedcount + " total price: " + toBNB(parseInt(pricecommand*101/100))); 
    }
    else { message("max " + (maxpixcount) + " pixels per painting"); }
})

document.getElementById("color").addEventListener("change", function() { screencolor = document.getElementById("color").value; })
document.getElementById("closescreen").addEventListener("click", function() { tolookmode(); })
// save##################################################################################################
document.getElementById("save").addEventListener("click", async function () {
    hide("savemenu");
    hide("logout");
    lookmode    = false;
    editmode    = false;
    urlcommand  = document.getElementById("url").value; 
    for (var i=0; i<markedcol.length; i++ ) { markedcol[i] = markedcol[i] + "|" + urlcommand; }
    let postogo = markedpos;
    let coltogo = markedcol;
    if (coltogo.length < 11) {
        for (var i=coltogo.length; i<11; i++ ) {
            coltogo.push("");
            postogo.push(0);
        } 
    } else 
    if (coltogo.length<41) {
        for (var i=coltogo.length; i<41; i++ ) {
            coltogo.push("");
            postogo.push(0);
        } 
    }
    if (coltogo.length == 11) { func = "paint10"; } else { func = "paint40"; }
    hide("cursor"); 
    console.log("action: " + func + " with cost: " + parseInt(pricecommand*(100+masterfee)/100) + " " + postogo + " " + coltogo );
    const ABI = [ 
        {   inputs: [
                { internalType: "uint256[]", name: "_pos", type: "uint256[]" },
                { internalType: "string[]", name: "_colorurl", type: "string[]" } ],
            name: "paint10", outputs: [], stateMutability: "payable", type: "function" },
            { inputs: [
                { internalType: "uint256[]", name: "_pos", type: "uint256[]" },
                { internalType: "string[]", name: "_colorurl", type: "string[]" } ],
            name: "paint40", outputs: [], stateMutability: "payable", type: "function" } ];
    
    const options = {
        contractAddress: contract,
        functionName: func,
        abi: ABI,
        params: {
          _pos: postogo,
          _colorurl: coltogo
        },
        msgValue: parseInt(pricecommand*(100+masterfee)/100),
    };
    try {
        console.log("metamask confirmation...");
        const paintresult = await Moralis.executeFunction(options);
        console.log(JSON.stringify(paintresult));
        console.log("metamask confirmed transactionHash: " + paintresult['transactionHash']);
        message("successful painting"); 
        for (var i=0; i<markedpos.length; i++ ) { await createLoggs(markedpos[i], paintresult['transactionHash']); }
        await updatePixels(markedpos);
        drawBoard();
        loggerIn();
    }
    catch (e) { 
        message("failed painting");
        console.log(e);
    }
    tolookmode();
});
function refresh() {
    console.log("refreshed"); 
    tolookmode();
    drawBoard();
    getBoardCoords();
    message("look mode: refreshed");    
}
document.getElementById("refresh").onclick = refresh;

async function loggerIn () {    
    user = await Moralis.User.current();
    //console.log("user=" + user.get("ethAddress"));
    if (isUndefined(user)) { toLoggedOut(); }
    else { toLoggedIn(); }
}

if(canvas.getContext){
    canvas.width = xs*ps;
    canvas.height= ys*ps;
    cursor.width = 10*ps;
    cursor.height= 10*ps;
    screen.width = 10*10;
    screen.height= 10*10;

    //document.body.style.overflow = 'hidden';

    getBoardCoords();
 
    var ctx = canvas.getContext("2d")
    var crs = cursor.getContext("2d")
    var scr = screen.getContext("2d")

    drawCursor(); 
    drawBoard(); 

    loggerIn();


}

 
