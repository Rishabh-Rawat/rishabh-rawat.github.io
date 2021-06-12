let reset = document.getElementById("reset");
// console.log(reset);

let boxes = document.querySelectorAll(".box");
// console.log(boxes);

let turn = document.getElementById("turn")
let state = "X"

var cx = 0;
var co = 0;

var remaining = [0,1,2,3,4,5,6,7,8]; 

const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
var x_pos = [];
var o_pos = [];

function clearAll()
{
    for (let box of boxes)
    {
        box.textContent="";
    }
}

boxes.forEach(box => {box.addEventListener("click",play,{once:true})})

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
    box.style.fontFamily= "cursive"; 
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
    cx = 0;
    co = 0;

    for (let i=0;i<8;i++)
    {   
        cx = 0;
        for (let j = 0;j<2 ; j++)
        {
            for (let k =0;k<x_pos.length;k++)
            {
                if (wins[i][j]==x_pos[k])
                    cx++;
            }
        }
    }

    for (i=0;i<8;i++)
    {   
        co = 0;
        for (j = 0;j<2 ; j++)
        {
            for (k =0;k<o_pos.length;k++)
            {
                if (wins[i][j]==o_pos[k])
                    co++;
            }
        }
    }
    console.log("X = ",cx)
    console.log("O = ",co)

    if (cx>=3)
    {
        console.log("X winner");
    }
    else if(co>=3)
    {
        console.log("O winner");
    }
}

function play(e)
{
    let box = e.target;
    mark(box);
    scores();
    check();
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

reset.addEventListener("click", clearAll);
boxes.forEach(box => {box.addEventListener("click",play,{once:true})})



