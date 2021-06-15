let reset = document.getElementById("reset");
// console.log(reset);

let boxes = document.querySelectorAll(".box");
// console.log(boxes);

let turn = document.getElementById("turn")

var result = document.getElementById("result");

var two_p = document.getElementById("two_p");
var one_p = document.getElementById("one_p");

var cross = document.getElementById("cross");

var zero = document.getElementById("zero");

var begin = document.getElementById("begin");

var origBoard;

var x_score = 0;
var o_score = 0;

var x_score_dom = document.getElementById("x_score");
var o_score_dom = document.getElementById("o_score");;

var matches = 0;
var flag;
let state = "O" ;
var cx;
var co;
var ctr = 0;
var winner = null;
var remaining = [0,1,2,3,4,5,6,7,8];
var game = true;

const matrix = [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];
const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]; 
var x_pos = [];
var o_pos = [];

function show_score()
{
    x_score_dom.textContent = "X SCORE: "+x_score.toString();
    o_score_dom.textContent = "O SCORE: "+o_score.toString();
}

function initialize_two()
{   
    one_p.textContent = "";
    two_p.textContent = "";
    two_p.style.backgroundColor = "rgb(245, 244, 197)";
    one_p.style.backgroundColor = "rgb(245, 244, 197)";
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
        two_p.textContent = "2 Player Mode";
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


function mode(){
    one_p.textContent = "1 Player Mode";
    two_p.textContent = "2 Player Mode";
    two_p.style.backgroundColor = "rgb(204, 201, 46)";
    two_p.addEventListener("click",initialize_two);
    one_p.addEventListener("click",one_player_start);
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
        check_win();
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
            // console.log("Game Over");
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
            // console.log("Game Over");
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
            // console.log("Game Over");
        }
    }
    reset.addEventListener("click", clearAll);
    
    // console.log(x_pos);
    // console.log(o_pos);
}


class Move
{
    constructor()
    {
        let row,col;
    }
}

let player = 'x', opponent = 'o';

function findBestMove(board)
{
    let bestVal = -1000;
    let bestMove = new Move();
    bestMove.row = -1;
    bestMove.col = -1;
    
    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            
            if (board[i][j] == '_')
            {
                
                board[i][j] = player;
                
                let moveVal = minimax(board, 0, false);
                
                board[i][j] = '_';
                
                if (moveVal > bestVal)
                {
                    bestMove.row = i;
                    bestMove.col = j;
                    bestVal = moveVal;
                }
            }
        }
    }
    
    return bestMove;
}

function isMovesLeft(board)
{
    for(let i = 0; i < 3; i++)
    for(let j = 0; j < 3; j++)
            if (board[i][j] == '_')
            return true;
                 
            return false;
}

function evaluate(b)
{
     
    for(let row = 0; row < 3; row++)
    {
        if (b[row][0] == b[row][1] &&
            b[row][1] == b[row][2])
            {
            if (b[row][0] == player)
                return +10;
                
            else if (b[row][0] == opponent)
            return -10;
        }
    }
    
    for(let col = 0; col < 3; col++)
    {
        if (b[0][col] == b[1][col] &&
            b[1][col] == b[2][col])
            {
            if (b[0][col] == player)
                return +10;
                
            else if (b[0][col] == opponent)
                return -10;
            }
    }
    
    if (b[0][0] == b[1][1] && b[1][1] == b[2][2])
    {
        if (b[0][0] == player)
        return +10;
        
        else if (b[0][0] == opponent)
            return -10;
        }
        
        if (b[0][2] == b[1][1] &&
        b[1][1] == b[2][0])
        {
        if (b[0][2] == player)
            return +10;
            
        else if (b[0][2] == opponent)
            return -10;
        }
  
    return 0;
}

function minimax(board, depth, isMax)
{
    let score = evaluate(board);
    
    if (score == 10)
    return score;
    
    if (score == -10)
    return score;
    
    if (isMovesLeft(board) == false)
    return 0;
    
    if (isMax)
    {
        let best = -1000;
        
        for(let i = 0; i < 3; i++)
        {
            for(let j = 0; j < 3; j++)
            {
                 
                if (board[i][j]=='_')
                {
                    
                    board[i][j] = player;
                    
                    best = Math.max(best, minimax(board,
                        depth + 1, !isMax));
  
                    board[i][j] = '_';
                }
            }
        }
        return best;
    }
    
    else
    {
        let best = 1000;
  
        for(let i = 0; i < 3; i++)
        {
            for(let j = 0; j < 3; j++)
            {
                
                if (board[i][j] == '_')
                {
                    
                    board[i][j] = opponent;
  
                    best = Math.min(best, minimax(board,
                                    depth + 1, !isMax));
                                    
                    board[i][j] = '_';
                }
            }
        }
        return best;
    }
}


function computer_start(){
    begin.textContent = "";
    begin.style.backgroundColor = "rgb(245, 244, 197)";
    cross.textContent = "";
    cross.style.backgroundColor = "rgb(245, 244, 197)";
    zero.textContent = "";
    zero.style.backgroundColor = "rgb(245, 244, 197)";

    one_player();
    ctr++;
    show_score_one();
    turn.textContent = "Your Turn Now";
    turn.style.backgroundColor = "rgb(204, 201, 46)";
    flag = -1;

    boxes.forEach(box => {box.addEventListener("click",one_play,{once:true})});

}

function player_start(){
    begin.textContent = "";
    begin.style.backgroundColor = "rgb(245, 244, 197)";
    cross.textContent = "";
    cross.style.backgroundColor = "rgb(245, 244, 197)";
    zero.textContent = "";
    zero.style.backgroundColor = "rgb(245, 244, 197)";

    turn.textContent = "Your Turn Now";
    turn.style.backgroundColor = "rgb(204, 201, 46)";
    show_score_one();
    flag = 1;
    boxes.forEach(box => {box.addEventListener("click",one_play,{once:true})});
}


function one_player_start()
{
    two_p.textContent = "";
    two_p.style.backgroundColor = "rgb(245, 244, 197)";
    one_p.textContent = "";
    one_p.style.backgroundColor = "rgb(245, 244, 197)";
    // console.log(matches);
    // console.log("flag = ",flag);
    if (!(matches))
    {   
        begin.textContent = "Who will start the game?";
        begin.style.backgroundColor = "rgb(204, 201, 46)";
        cross.textContent = "Computer";
        cross.style.backgroundColor = "rgb(204, 201, 46)";
        zero.textContent = "You";
        zero.style.backgroundColor = "rgb(204, 201, 46)";
        cross.addEventListener("click",computer_start);
        zero.addEventListener("click",player_start);
    }
    else
        if(flag==-1)
        {   
            computer_start();
        }

        else
            player_start();
}

function initialize_one()
{   
    one_p.textContent = "";
    two_p.textContent = "";
    two_p.style.backgroundColor = "rgb(245, 244, 197)";
    one_p.style.backgroundColor = "rgb(245, 244, 197)";
    cx = 0;
    co = 0;
    ctr = 0;
    winner = null;
    remaining = [0,1,2,3,4,5,6,7,8]; 
    game = true;
    x_pos = [];
    o_pos = [];
    one_player_start();
}

function clearAllOne(){
    
    flag = -flag;
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
    turn.textContent="Your Turn";
    turn.style.backgroundColor = "rgb(204, 201, 46)";
    initialize_one();
}

function check_win()
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
            check= wins[i].every(val => o_pos.includes(val));

            if (check)
            {
                winner = "O";
                o_score++;
                win = wins[i];
                break;
            }
        }
    }
}

function scores()
{
    for (index of remaining)
    {   
        con = boxes[index].textContent;
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
    // console.log("x_pos = ",x_pos,"\no_pos = ",o_pos);
}

function show_score_one()
{
    x_score_dom.textContent = "Computer's Score: "+x_score.toString();
    o_score_dom.textContent = "Your Score: "+o_score.toString();
}

function correct()
{
    boxes.forEach(box => {box.addEventListener("click",one_play,{once:true})});
}

function one_play(e)
{
    if (game)
    {
        // console.log(remaining);
        turn.textContent = "Your Turn Now";
        turn.style.backgroundColor = "rgb(204, 201, 46)";
        reset.addEventListener("click", clearAllOne);
        box = e.target;

        if (!(box.textContent=="X" || box.textContent=="O"))
        {
            box.textContent = "O";
            box.style.fontSize = "xxx-large"; 
            box.style.fontWeight = "1000";
        }
        else
        {
            correct();
            return ;
        }

        turn.textContent = "Your Turn Now";
        turn.style.backgroundColor = "rgb(204, 201, 46)";

        ctr++;
        // console.log("ctr =",ctr);

        if(ctr==9)
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
            turn.textContent = "";
            turn.style.backgroundColor = "rgb(245, 244, 197)";
            // alert("Draw");
            game=false;
            // console.log("Game Over");
        }

        
        turn.textContent = "Your Turn Now";
        turn.style.backgroundColor = "rgb(204, 201, 46)";
        
        scores();
        check_win();

        one_player(); 

        turn.textContent = "Your Turn Now";
        turn.style.backgroundColor = "rgb(204, 201, 46)";
        
        if (winner=="X")
        {
            for (i of win)
            {
                boxes[i].style.color = "red";
            }
            result.textContent="COMPUTER WON";
            matches++;
            show_score_one();
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
            game = false;
            // console.log("Game Over");
        }
        else if(winner=="O")    
        {
            for (i of win)
            {
                boxes[i].style.color = "red";
            }
            result.textContent="YOU WON";
            matches++;
            show_score_one();
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
            // console.log("Game Over");
        }
        else if(ctr==9)
        {            
            result.textContent="DRAW";
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
            // console.log("Game Over");
        }


    }
    reset.addEventListener("click", clearAllOne);

}

function one_player()
{
    let board;
    let j= 0;

    board = get_board();
    // console.log(board);

    let bestMove = findBestMove(board);
    
    // console.log([bestMove.row,bestMove.col]);

    target = get_target(matrix , [bestMove.row,bestMove.col]);
    if(target!=undefined)
    {
        boxes[target].textContent = "X";
        boxes[target].style.fontSize = "xxx-large"; 
        boxes[target].style.fontWeight = "1000";
        scores();
        check_win();
        ctr++;
    }
    else
    {
        ctr=9;
    }

    // console.log(target);
}

function get_target(matrix, data)
{
    // console.log(data);
    for(i = 0;i<matrix.length;i++)
    {   
        if (isEqual(matrix[i],data)=="True")
            return i;
    } 
}

function isEqual(a,b)
{
    if(a.length!=b.length)
        return "False";
    else
    {
        for(var i=0;i<a.length;i++)
        if(a[i]!=b[i])
        return "False";
        return "True";
    }

}


function get_board()
{
    var z = 0;
    var board = new Array(3);

    for (let i = 0; i < board.length; i++) 
        board[i] = new Array(3);

    for (let i = 0; i < 3; i++) 
    {
        for (let j = 0; j < 3; j++)    
        {
            if (boxes[z].textContent=="")
                board[i][j] = "_";
            else if (boxes[z].textContent=="X")
                board[i][j] = "x";
            else if (boxes[z].textContent=="O")
                board[i][j] = "o";
            z++;
        }
    }
    return board;
}


