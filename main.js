let reset = document.getElementById("reset");
// console.log(reset);

let boxes = document.querySelectorAll(".box");
// console.log(boxes);

let turn = document.getElementById("turn")

var result = document.getElementById("result");

var two_p = document.getElementById("two_p");

var cross = document.getElementById("cross");

var zero = document.getElementById("zero");

var begin = document.getElementById("begin");

var x_score = 0;
var o_score = 0;

var x_score_dom = document.getElementById("x_score");
var o_score_dom = document.getElementById("o_score");;

var matches = 0;

let state ;
var cx;
var co;
var ctr;
var winner;
var remaining;
var game;

const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
var x_pos;
var o_pos;

function show_score()
{
    x_score_dom.textContent = "X SCORE: "+x_score.toString();
    o_score_dom.textContent = "O SCORE: "+o_score.toString();
}

function initialize_two()
{   
    two_p.textContent = "";
    two_p.style.backgroundColor = "rgb(245, 244, 197)";
    if (matches==0)
        choose();
    cx = 0;
    co = 0;
    ctr = 0;
    winner = null;
    remaining = [0,1,2,3,4,5,6,7,8]; 
    game = true;
    x_pos = [];
    o_pos = [];
    start();
}

function clearAll()
{
    for (let box of boxes)
    {
        box.textContent="";
        box.style.color = "black";
    }
    result.textContent="";
    cross.textContent = "";
    zero.textContent = "";
    begin.textContent = "";
    begin.style.backgroundColor = "rgb(245, 244, 197)";
    cross.style.backgroundColor = "rgb(245, 244, 197)";
    zero.style.backgroundColor = "rgb(245, 244, 197)";
    turn.textContent="";
    turn.style.backgroundColor = "rgb(245, 244, 197)";
    if (matches==0)
    {
        two_p.textContent = "2 Player";
        two_p.style.backgroundColor = "rgb(204, 201, 46)";
        mode();
    }
    initialize_two();
}

function choose(){
    begin.textContent = "Which shape to begin with?";
    begin.style.backgroundColor = "rgb(204, 201, 46)";
    cross.textContent = "Cross";
    zero.textContent = "Zero";
    cross.style.backgroundColor = "rgb(204, 201, 46)";
    zero.style.backgroundColor = "rgb(204, 201, 46)";
    reset.addEventListener("click", clearAll);
    cross.addEventListener("click",startCross);
    zero.addEventListener("click",startZero);
}

function startCross(){
    state = "X";
    begin.textContent = "";
    begin.style.backgroundColor = "rgb(245, 244, 197)";
    cross.textContent = "";
    zero.textContent = "";
    cross.style.backgroundColor = "rgb(245, 244, 197)";
    zero.style.backgroundColor = "rgb(245, 244, 197)";
    turn.textContent = state+"'s Turn Now";
    turn.style.backgroundColor = "rgb(204, 201, 46)";
    show_score();
}

function startZero(){
    state = "O";
    begin.textContent = "";
    begin.style.backgroundColor = "rgb(245, 244, 197)";
    cross.textContent = "";
    zero.textContent = "";
    cross.style.backgroundColor = "rgb(245, 244, 197)";
    zero.style.backgroundColor = "rgb(245, 244, 197)";
    turn.textContent = state+"'s Turn Now";
    turn.style.backgroundColor = "rgb(204, 201, 46)";
    show_score();
}

function start()
{   
    boxes.forEach(box => {box.addEventListener("click",two_play,{once:true})})
}

function mark(box)
{
    if (state=="X")
    {
        box.textContent = "X";
        state = "O";
    }
    else
    {
        box.textContent = "O";
        state = "X";
    }
    box.style.fontSize= "xxx-large"; 
    // box.style.fontFamily= "cursive"; 
    box.style.fontWeight= "1000";
}

function scores()
{
    for (index of remaining)
    {   con = boxes[index].textContent;
        if (con=="X" || con=="O")
        {   
            remaining.splice(remaining.indexOf(index),1);
            if (con=="X")
            {    
                x_pos.push(index);
                x_pos.sort(function(a,b){return a-b});
            }
            else
            {
                o_pos.push(index);
                o_pos.sort(function(a,b){return a-b});
            }
            // console.log(con);
        }
    }
}


function check()
{
    if (x_pos.length>=3 || o_pos.length>=3) 
    {
        for (let i = 0;i<8 ; i++)
        {
            const check= wins[i].every(val => x_pos.includes(val));

            if (check)
            {
                winner = "X";
                x_score++;
                win = wins[i];
                break;
            }
        }

        for (i = 0;i<8 ; i++)
        {
            const check= wins[i].every(val => o_pos.includes(val));

            if (check)
            {
                winner = "O";
                o_score++;
                win = wins[i];
                break;
            }
        }
        // console.log(winner);
    }
}

function mode(){
    two_p.addEventListener("click",initialize_two);
}

mode();
function two_play(e)
{
    
    if (game)
    {
        turn.textContent = state+"'s Turn Now";
        turn.style.backgroundColor = "rgb(204, 201, 46)";
        ctr++;
        // console.log(ctr);
        reset.addEventListener("click", clearAll);
        let box = e.target;
        mark(box);
        scores();
        check();
        turn.textContent = state+"'s Turn Now";
        turn.style.backgroundColor = "rgb(204, 201, 46)";

        if (winner=="X")
        {
            for (i of win)
            {
                boxes[i].style.color = "red";
            }
            result.textContent="PLAYER X WON";
            matches++;
            show_score();
            result.style.backgroundColor = "rgb(204, 201, 46)"; 
            turn.textContent = "";
            turn.style.backgroundColor = "rgb(245, 244, 197)";
            cross.textContent = "";
            zero.textContent = "";
            begin.textContent = "";
            begin.style.backgroundColor = "rgb(245, 244, 197)";
            cross.style.backgroundColor = "rgb(245, 244, 197)";
            zero.style.backgroundColor = "rgb(245, 244, 197)";
            // alert("X won");
            game=false;
            console.log("Game Over");
        }
        else if(winner=="O")    
        {
            for (i of win)
            {
                boxes[i].style.color = "red";
            }
            result.textContent="PLAYER O WON";
            matches++;
            show_score();
            result.style.backgroundColor = "rgb(204, 201, 46)"; 
            turn.textContent = "";
            turn.style.backgroundColor = "rgb(245, 244, 197)";
            cross.textContent = "";
            zero.textContent = "";
            begin.textContent = "";
            begin.style.backgroundColor = "rgb(245, 244, 197)";
            cross.style.backgroundColor = "rgb(245, 244, 197)";
            zero.style.backgroundColor = "rgb(245, 244, 197)";
            // alert("O won");
            game=false;
            console.log("Game Over");
        }
        else if(ctr==9)
        {            
            result.textContent="DRAW";
            matches++;
            result.style.backgroundColor = "rgb(204, 201, 46)"; 
            turn.textContent = "";
            turn.style.backgroundColor = "rgb(245, 244, 197)";
            cross.textContent = "";
            zero.textContent = "";
            begin.textContent = "";
            begin.style.backgroundColor = "rgb(245, 244, 197)";
            cross.style.backgroundColor = "rgb(245, 244, 197)";
            zero.style.backgroundColor = "rgb(245, 244, 197)";
            // alert("Draw");
            game=false;
            console.log("Game Over");
        }
    }
    reset.addEventListener("click", clearAll);
    
    // console.log(x_pos);
    // console.log(o_pos);
}


