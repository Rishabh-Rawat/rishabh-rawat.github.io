let reset = document.getElementById("reset");
console.log(reset);

let boxes = document.querySelectorAll(".box");
console.log(boxes);

let turn = document.getElementById("turn")
let state = "X"

function clearAll()
{
    for (let box of boxes)
    {
        box.textContent="";
    }
}

for (let box of boxes)
{
    if (state == "X")
    {
        box.addEventListener("click", function(){box.textContent="X"});
        state = "O";
    }
    else
    {
        box.addEventListener("click", function(){box.textContent="O"});
        state = "X";
    }
    reset.addEventListener("click", clearAll)
}


