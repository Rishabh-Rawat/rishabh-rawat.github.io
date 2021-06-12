let reset = document.getElementById("reset");
// console.log(reset);

let boxes = document.querySelectorAll(".box");
// console.log(boxes);

let turn = document.getElementById("turn")

var result = document.getElementById("result");

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

function initialize()
{
    cx = 0;
    co = 0;
    ctr = 0;
    winner = null;
    remaining = [0,1,2,3,4,5,6,7,8]; 
    game = true;
    x_pos = [];
    o_pos = [];
    state = "X";
}

function clearAll()
{
    for (let box of boxes)
    {
        box.textContent="";
    }
    result.textContent="";
    initialize();
    start();
}

function start()
{
    boxes.forEach(box => {box.addEventListener("click",play,{once:true})})
    turn.textContent = state+"'s Turn Now";
    turn.style.backgroundColor = "rgb(204, 201, 46)";
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
                break;
            }
        }

        for (i = 0;i<8 ; i++)
        {
            const check= wins[i].every(val => o_pos.includes(val));

            if (check)
            {
                winner = "O";
                break;
            }
        }
        // console.log(winner);
    }
}

initialize();
start();
function play(e)
{
    
    if (game)
    {
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
            result.textContent="PLAYER X WON";
            result.style.backgroundColor = "rgb(204, 201, 46)"; 
            turn.textContent = "";
            turn.style.backgroundColor = "rgb(245, 244, 197)";
            // alert("X won");
            game=false;
            console.log("Game Over");
        }
        else if(winner=="O")    
        {
            result.textContent="PLAYER O WON";
            result.style.backgroundColor = "rgb(204, 201, 46)"; 
            turn.textContent = "";
            turn.style.backgroundColor = "rgb(245, 244, 197)";
            // alert("O won");
            game=false;
            console.log("Game Over");
        }
        else if(ctr==9)
        {
            result.textContent="DRAW";
            result.style.backgroundColor = "rgb(204, 201, 46)"; 
            turn.textContent = "";
            turn.style.backgroundColor = "rgb(245, 244, 197)";
            // alert("Draw");
            game=false;
            console.log("Game Over");
        }
    }
    reset.addEventListener("click", clearAll);
    
    // console.log(x_pos);
    // console.log(o_pos);
}


// for (let box of boxes)
// {
//     box.addEventListener("click", mark);
//     // if (state == "X")
//     // {
//     //     box.addEventListener("click", function(){box.textContent="X";box.style.fontSize= "xxx-large"; box.style.fontFamily= "cursive"; box.style.fontWeight= "1000"});
//     //     state = "O";
//     // }
//     // else if (state == "O")
//     // {
//     //     box.addEventListener("click", function(){box.textContent="O";box.style.fontSize= "xxx-large"; box.style.fontFamily= "cursive"; box.style.fontWeight= "1000"});
//     //     state = "X";
//     // }
    
//     // console.log(e.target.classList[1]);
//     reset.addEventListener("click", clearAll);
// }

// boxes.forEach(box => {box.addEventListener("click",play,{once:true})})



