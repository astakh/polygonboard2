/* Moralis init code */
const { xorWith, isUndefined } = require('lodash');
Moralis  = require('moralis');
const serverUrl = "https://1d9yomvwrtjg.usemoralis.com:2053/server";
const appId = "qVJRXmo06rYmld4eNj9gBwgzy353cVqqiyUaFCP3";
const contract = "0x467376619221d8bdc155305a218e9A4D976a557d";
const token = "0x7f79c7AdE959107362Dbb60a4D4c4cFd3A437d3b";
const tokenName = "BRD";
const coinName = "MATIC";

Moralis.start({ serverUrl, appId });
const web3 = Moralis.enableWeb3();
import Moralis from 'moralis';
import { show, hide, message, toPaintMode, toLookMode, toLoggMode, toBNB, toBNB3, toLoggedOut, getBoardCoords } from './func';
 
var user;
global.brdWidth = 765;          // number of pixels
global.brdHeight= 340;
var xLimit      = brdWidth+1;   // limiter for cycles
var yLimit      = brdHeight+1; 
global.brdPixSize   = 2;        // size of pixel to show
// board canvas
global.board    = document.getElementById("board");
board.width     = brdWidth*brdPixSize;
board.height    = brdHeight*brdPixSize;
global.brdX     = 0;
global.brdY     = 0; 
global.brdW     = 0; 
global.brdH     = 0; 
global.brdInitColor = "black";

var cursor = document.getElementById("cursor");
global.crsSize  = 25;           // number of pixels in cursor
cursor.width    = crsSize*brdPixSize;
cursor.height   = crsSize*brdPixSize;
global.crsX     = 0;
global.crsY     = 0; 
global.crsPixX  = 0;
global.crsPixY  = 0;
var crsTaken    = false;

var screen = document.getElementById("screen"); 
global.scrSize      = crsSize;      // number of pixels in screen
global.scrPixSize   = 10;           // size of pixel in the screen
global.scrColor     = "#FF0000";    // initial color 
document.getElementById("color").value = scrColor;
global.scrPixels    = new Array(scrSize);  // pixels of screen
for (var i=0; i<scrSize; i++) {
    scrPixels[i] = new Array(scrSize);
    for (var j=0; j<scrSize; j++) { scrPixels[i][j] = ''; }
}
screen.width        = scrPixSize*scrSize;
screen.height       = scrPixSize*scrSize;
var scrPrevX            = -1;
var scrPrevY            = -1;
var scrPainted          = false;

global.editMode     = false;
global.lookMode     = true;
global.screenMode   = false; 
global.pipetteMode  = false; 
var markedPrice     = 0;  
var markedCount     = 0; 

var prevUrl         = "==="; 

global.svmX = 0;
global.svmY = 0;

// params###########################

var initPrice = 10000000000000000;
var masterfee = 1;
var maxPaintCount = 120; 
var color   = new Array(brdWidth)
var owner   = new Array(brdWidth)
var url     = new Array(brdWidth)
var price   = new Array(brdWidth);
for(var x = 1; x < xLimit; x++)  {
    color[x]  = new Array(brdHeight);
    url[x]  = new Array(brdHeight);
    owner[x]  = new Array(brdHeight);
    price[x]= new Array(brdHeight);
    for (var y = 1; y < yLimit; y++) {
        color[x][y] = brdInitColor;
        url[x][y] = "";
        owner[x][y] = "";
        price[x][y] = initPrice;
    }
}
async function loggerIn() {    
    user = await Moralis.User.current();
    console.log("(loggerIn): user=" + user.get("ethAddress"));
    if (isUndefined(user)) { toLoggedOut(); }
    else { toLoggedIn(); }
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
async function getPixels() { 
    console.log("(getPixels)");
    const Pixel = Moralis.Object.extend("Pixel");
    const query = new Moralis.Query(Pixel); 
    query.limit(brdWidth*brdHeight);
    const pixels = await query.find(); 
    console.log("found " + pixels.length + " pixels");
    for (var i=0; i<pixels.length; i++) { 
        let p = pixels[i]; 
        let x = p.get('x');
        let y = p.get('y'); 
        if ((x>0) && (y>0) && (x<xLimit) && (y<yLimit)) {
            color[x][y] = p.get('color'); 
            url[x][y] = p.get('url');
            owner[x][y] = p.get('owner');
            price[x][y] = p.get('price'); 
        }
    }
    console.log("(getPixels) - out");
    return color;
}
// отрисовка картинки
async function drawBoard() {
    console.log("(drawBoard)");
    color = await getPixels();
    for(var x = 1; x < xLimit; x++) {
        for(var y = 1; y < yLimit; y++) { 
            brd.fillStyle = color[x][y];
            brd.fillRect((x-1) * brdPixSize, (y-1) * brdPixSize, brdPixSize, brdPixSize);
        }
    }
    console.log("(drawBoard) out");
}
function refresh() {
    console.log("(refresh)"); 
    toLookMode();
    drawBoard();
    //getBoardCoords(e.clientX, e.clientY);
    message("look mode: refreshed");    
}
document.getElementById("edit").addEventListener("click", function (e) { 
        toPaintMode(); 
        markedPrice = 0;    
        markedCount  = 0;
        getBoardCoords(e.clientX, e.clientY); 
    message("edit mode: click on board to choose segment for painting");
    console.log("editMode=" + editMode + ", markedCount=" + markedCount);
})
document.getElementById("refresh").onclick = refresh;
document.getElementById("board").addEventListener("click", function (e) {
    console.log("(board - click)");
    if (editMode && !screenMode) { 
        getBoardCoords(e.clientX, e.clientY);
        drawCursor();
        message("<b>paint mode:</b> click on segment to edit it");
    }
    if (lookMode) {
        let px = parseInt((e.clientX - brdX) / brdPixSize); // pixel coords
        let py = parseInt((e.clientY - brdY) / brdPixSize);
        if (url[px][py] != "") {let win = window.open("https://" + url[px][py]);}
    }
    console.log("(board - click) out");
})
document.getElementById("board").addEventListener("mousemove", function (e) {
    if (lookMode) {
        getBoardCoords();
        let px = parseInt((e.clientX - brdX) / brdPixSize)+1; // pixel coords
        let py = parseInt((e.clientY - brdY) / brdPixSize)+1;
        if ((px>0) && (px<xLimit) && (py>0) && (py<yLimit)) {
            console.log("pixel " + px + "|" + py + " url: " + url[px][py]);
            for(var x = 1; x < xLimit; x++)  {
                for (var y = 1; y < yLimit; y++) {
                    if (url[x][y] == prevUrl) {
                        brd.fillStyle = color[x][y];
                        brd.fillRect((x-1) * brdPixSize, (y-1) * brdPixSize, brdPixSize, brdPixSize);
                    }
                    if (url[x][y] == url[px][py] && url[px][py] != "") { 
                        brd.fillStyle = "white";
                        brd.fillRect((x-1) * brdPixSize, (y-1) * brdPixSize, brdPixSize, brdPixSize);
                    }
                }
            }
            prevUrl = url[px][py];
            if (url[px][py]=="") { message("."); }
            else { message("https://" + url[px][py]); }
        }
    }
})
function drawCursor() { 
    if (editMode) {
        document.getElementById("cursor").style.top = crsY + "px";
        document.getElementById("cursor").style.left = crsX + "px";
        crs.strokeStyle = "red";
        crs.strokeRect(0, 0, crsSize*brdPixSize, crsSize*brdPixSize);
        show("cursor");
    }
}
 
document.getElementById("cursor").addEventListener("mousedown", function() { crsTaken = true })
document.getElementById("cursor").addEventListener("mouseup", function() { crsTaken = false })
document.getElementById("cursor").addEventListener("mousemove", function(e) { 
    if (crsTaken) {
        getBoardCoords(e.clientX, e.clientY); 
        drawCursor(crsX, crsY);
    }
})
document.getElementById("cursor").addEventListener("dblclick", function(e) {
    console.log("(cursor dblclick)");
    screenMode = true; 
    getBoardCoords(e.clientX, e.clientY);
    show("savemenu"); 
    show("color");
    pipetteMode = false;
    // clear scrPixels
    for (var i = 0; i<scrSize; i++) { 
        for (var j = 0; j<scrSize; j++) { scrPixels[i][j] = ""; }
    }
    drawScreen();
})

function drawScreen() {
    console.log("drawScreen()");
    if (editMode) {
        scr.lineWidth = "1";
        scr.strokeStyle = "red";
        for (var i = 0; i<scrSize; i++) { 
            for (var j = 0; j<scrSize; j++) { 
                if (scrPixels[i][j] == "") {
                    scr.fillStyle = color[i+crsPixX][j+crsPixY]; 
                }
                else {
                    scr.fillStyle = scrPixels[i][j]; 
                }
                scr.fillRect(i*scrPixSize, j*scrPixSize, scrPixSize, scrPixSize);
                scr.strokeRect(i*scrPixSize, j*scrPixSize, scrPixSize, scrPixSize); 
            }
        }
    }
    console.log("drawScreen() - out");
}
document.getElementById("color").addEventListener("change", function() { scrColor = document.getElementById("color").value; })
document.getElementById("closescreen").addEventListener("click", function() { toLookMode(); })
document.getElementById("screen").addEventListener("mousedown", function() { scrPainted = true })
document.getElementById("screen").addEventListener("mouseup", function() { scrPainted = false })
document.getElementById("screen").addEventListener("mousemove", function(e) { 
    console.log("screen - mousemove: scrPainted=" + scrPainted);
    if (scrPainted) {
        //getBoardCoords(e.clientX, e.clientY); 
        let scrCoords = document.getElementById("screen").getBoundingClientRect();
        let px = parseInt((e.clientX - scrCoords.left)/scrPixSize);
        let py = parseInt((e.clientY - scrCoords.top)/scrPixSize);
        if ((markedCount <= maxPaintCount) && (px != scrPrevX) || (py != scrPrevY)) {
            console.log("pixelColor=" + scrPixels[px][py]);
            if (scrPixels[px][py] != '') { 
                scrPixels[px][py] = scrColor; 
                scr.fillStyle = scrPixels[px][py];
                scr.fillRect(px*scrPixSize, py*scrPixSize, scrPixSize, scrPixSize);
                scr.strokeStyle = "red";
                scr.strokeRect(px*scrPixSize, py*scrPixSize, scrPixSize, scrPixSize); 
                console.log("marked: " + markedCount);
                console.log("screen click: " + px + "|" + py);   
                message("marked pixes: " + markedCount + " total price: " + toBNB(parseInt(markedPrice*101/100)));                 
            }

            if ((markedCount < maxPaintCount) && (scrPixels[px][py] == '')){ 
                console.log("scrColor=" + scrColor);
                markedCount++;
                markedPrice = markedPrice + price[px+crsPixX][py+crsPixY];
                scrPixels[px][py] = scrColor; 
                scr.fillStyle = scrPixels[px][py];
                scr.fillRect(px*scrPixSize, py*scrPixSize, scrPixSize, scrPixSize);
                scr.strokeStyle = "red";
                scr.strokeRect(px*scrPixSize, py*scrPixSize, scrPixSize, scrPixSize); 
                console.log("marked: " + markedCount);
                console.log("screen click: " + px + "|" + py);   
                message("marked pixes: " + markedCount + " total price: " + toBNB(parseInt(markedPrice*101/100))); 
            }
            else { message("max " + (maxPaintCount) + " pixels per painting"); }
        }
        scrPrevX = px;
        scrPrevY = py;
    }
})
document.getElementById("pipette").addEventListener("click", function() { 
    if (pipetteMode) {
        pipetteMode = false; 
        document.getElementById("pipette").innerHTML = "Pippete";
        show("color");
    }
    else {
        pipetteMode = true; 
        document.getElementById("pipette").innerHTML = "or close pippete";
        hide("color");
    }
})
document.getElementById("screen").addEventListener("click", function(e) { 
    console.log("screen click");
    let scrCoords = document.getElementById("screen").getBoundingClientRect();
    let px = parseInt((e.clientX - scrCoords.left)/scrPixSize);
    let py = parseInt((e.clientY - scrCoords.top)/scrPixSize);
    if (pipetteMode) {
        if ((scrPixels[px][py] == '') && (price[px+crsPixX][py+crsPixY] > initPrice)) { scrColor = color[px+crsPixX][py+crsPixY]; }
        if (scrPixels[px][py] != '') { scrColor = scrPixels[px][py]; }
        document.getElementById("color").value = scrColor;
        pipetteMode = false;
        document.getElementById("pipette").innerHTML = "Pipette";
        show("color");
    }
    else {
        if ((markedCount<(maxPaintCount+1) && scrPixels[px][py] != '') || (markedCount<maxPaintCount && scrPixels[px][py] == '')){
            if (scrPixels[px][py] == '') {
                console.log("scrColor=" + scrColor);
                scrPixels[px][py] = scrColor; 
                markedCount++;
                markedPrice = markedPrice + price[px+crsPixX][py+crsPixY];
                scr.fillStyle = scrPixels[px][py];
                scr.fillRect(px*scrPixSize, py*scrPixSize, scrPixSize, scrPixSize);
            } 
            else { 
                scrPixels[px][py] = ''; 
                markedCount--;
                markedPrice = markedPrice - price[px+crsPixX][py+crsPixY];
                scr.fillStyle = color[px+crsPixX][py+crsPixY];
                scr.fillRect(px*scrPixSize, py*scrPixSize, scrPixSize, scrPixSize);
            }
            scr.strokeStyle = "red";
            scr.strokeRect(px*scrPixSize, py*scrPixSize, scrPixSize, scrPixSize); 
            console.log("marked: " + markedCount);
            console.log("screen click: " + px + "|" + py);   
            message("marked pixes: " + markedCount + " total price: " + toBNB(parseInt(markedPrice*101/100))); 
        }
        else { message("max " + (maxPaintCount) + " pixels per painting"); }
    }
})
 
document.getElementById("saveCoin").addEventListener("click", async function () {
    hide("savemenu");
    hide("color");
    hide("logout");
    hide("cursor"); 
    lookMode    = false;
    editMode    = false; 
    let xMarkedPos = [];
    let yMarkedPos = [];
    let markedColor = [];
    let markedUrl   = [];
    let l = 0; 
    for (var i=0; i<scrSize; i++) {
        for (var j=0; j<scrSize; j++) {
            if (scrPixels[i][j] != '') {
                xMarkedPos[l]   = (i+crsPixX);
                yMarkedPos[l]   = (j+crsPixY);
                markedColor[l]  = scrPixels[i][j];
                markedUrl[l]    = document.getElementById("url").value; 
                l++; 
            };
        }
    } 
    console.log("action: purchaseWithCoin with cost: " + parseInt(markedPrice*(100+masterfee)/100) + " " + xMarkedPos + " " + yMarkedPos + " " + markedColor);
    const ABI = [ 
        {   inputs:[{ internalType: "uint256[]", name: "_xpos", type: "uint256[]" },
                    { internalType: "uint256[]", name: "_ypos", type: "uint256[]" },
                    { internalType: "string[]", name: "_color", type: "string[]" },
                    { internalType: "string[]", name: "_url", type: "string[]" } ],
            name:               "purchaseWithCoin",
            outputs:            [],
            stateMutability:    "payable",
            type:               "function"
        } ];
    
    const options = {
        contractAddress:    contract,
        functionName:       "purchaseWithCoin",
        abi: ABI,
        params: {
            _xpos:  xMarkedPos,
            _ypos:  yMarkedPos,
            _color: markedColor,
            _url:   markedUrl
        },
        msgValue: parseInt(markedPrice*(100+masterfee)/100),
    };
    try {
        console.log("metamask confirmation...");
        const paintresult = await Moralis.executeFunction(options);
        console.log(JSON.stringify(paintresult));
        console.log("metamask confirmed transactionHash: " + paintresult['transactionHash']);
        message("successful painting"); 
    }
    catch (e) { 
        message("failed painting");
        console.log(e);
    }
    drawBoard();
    loggerIn();
    toLookMode();
});

async function userApproved() {
    console.log("(userApproved) function:");
    user = Moralis.User.current();
    const someuser = Moralis.Object.extend("User"); 
    const query = new Moralis.Query(someuser);
    query.equalTo("ethAddress", user.get("ethAddress"));
    query.limit(1);
    const ouruser = await query.find();    
    console.log("user: " + user.get("ethAddress") + "; amount approved: " + user.get("approved")); 
    return parseInt(ouruser[0].get("approved"));
}
// save##################################################################################################
document.getElementById("saveToken").addEventListener("click", async function () {
    console.log("(saveToken) function:");
    hide("savemenu");
    hide("color");
    hide("logout");
    hide("cursor"); 
    lookMode    = false;
    editMode    = false;
    let xMarkedPos = [];
    let yMarkedPos = [];
    let markedColor = [];
    let markedUrl   = [];
    let l = 0; 
    for (var i=0; i<scrSize; i++) {
        for (var j=0; j<scrSize; j++) {
            if (scrPixels[i][j] != '') {
                xMarkedPos[l]   = (i+crsPixX);
                yMarkedPos[l]   = (j+crsPixY);
                markedColor[l]  = scrPixels[i][j];
                markedUrl[l]    = document.getElementById("url").value; 
                l++; 
            };
        }
    } 
    console.log("action: purchaseWithCoin with cost: " + parseInt(markedPrice*(100+masterfee)/100) + " " + xMarkedPos + " " + yMarkedPos + " " + markedColor);
    let approvedAmount = await userApproved();
    if (approvedAmount == 0) { 
        console.log("amount is not approved"); 
        const ABIa = [ {    inputs:[{ internalType: "address", name: "spender", type: "address" },
                                    { internalType: "uint256", name: "amount", type: "uint256" } ],
                            name: "approve",
                            outputs: [ { internalType: "bool", name: "", type: "bool" } ],
                            stateMutability: "nonpayable", type: "function" } ];
        
        const optionsa = {
            contractAddress: token,
            functionName: "approve",
            abi: ABIa,
            params: { spender: contract, amount: "500000000000000000000000" },
            msgValue: 0,
        };    
        try {
            console.log("metamask approve...");
            const approveResult = await Moralis.executeFunction(optionsa);
            console.log(JSON.stringify(approveResult));
            console.log("metamask approved transactionHash: " + approveResult['transactionHash']);
            let amuser = Moralis.Object.extend("User");
            let query = new Moralis.Query(amuser);
            query.equalTo("ethAddress", user.get("ethAddress"));
            query.limit(1);
            let usersToChange = await query.find();    
            let userToChange = usersToChange[0];
            userToChange.set("approved", 500000000000000000000000);  
            await userToChange.save();
        }
        catch (e) { 
            message("failed to approve");
            console.log(e);
        }    
    }
    approvedAmount = await userApproved(); 
    if (approvedAmount > 0) {
        const ABI = [ 
            {   inputs: [
                { internalType: "uint256[]",    name: "_xpos",          type: "uint256[]" },
                { internalType: "uint256[]",    name: "_ypos",          type: "uint256[]" },
                { internalType: "string[]",     name: "_color",         type: "string[]" } ,
                { internalType: "string[]",     name: "_url",           type: "string[]" },
                { internalType: "uint256",      name: "_maxPayment",    type: "uint256" } ],
                name: "purchaseWithToken", outputs: [], stateMutability: "nonpayable", type: "function" } ];
        
        const options = {
            contractAddress: contract,
            functionName: "purchaseWithToken",
            abi: ABI,
            params: {
                _xpos:          xMarkedPos,
                _ypos:          yMarkedPos,
                _color:         markedColor,
                _url:           markedUrl,
                _maxPayment:    0
            },
            msgValue: 0,
        };
        try {
            console.log("metamask confirmation...");
            const paintresult = await Moralis.executeFunction(options);
            console.log(JSON.stringify(paintresult));
            console.log("metamask confirmed transactionHash: " + paintresult['transactionHash']);
            message("successful painting");  
        }
        catch (e) { 
            message("failed painting");
            console.log(e);
        }
    }
    drawBoard();
    loggerIn();
    toLookMode();
});
  


    var brd = board.getContext("2d")
    var crs = cursor.getContext("2d")
    var scr = screen.getContext("2d")

    drawBoard(); 
    loggerIn(); 
