$( document ).ready(function() {
    let cellContainer = $(".input-cell-container");
   
    //column and row display logic
    for(let i = 1;i<=100;i++){
        let ans = "";
        let n = i;
        while(n > 0){
        let rem = n%26;

        if(rem == 0){
            ans = "Z" + ans;
            n = Math.floor(n/26) - 1;
        }
        else{
            ans = String.fromCharCode(rem - 1 + 65) + ans;
            n = Math.floor(n/26);
        }

       }
       let column = $(`<div class="column-name colId-${i}" id="colCod-${ans}">${ans}</div>`);
       $(".column-name-container").append(column);
       let row = $(`<div class="row-name" id="rowId-${i}">${i}</div>`);
       $(".row-name-container").append(row);
    }
    
    //input cell display logic 
    for (let i = 1; i <= 100; i++) {
        let row = $(`<div class="cell-row"></div>`);
        for (let j = 1; j <= 100; j++) {
            let colCode = $(`.colId-${j}`).attr("id").split("-")[1];
            let column = $(`<div class="input-cell" contenteditable="false" id = "row-${i}-col-${j}" data="code-${colCode}"></div>`);
            row.append(column);
        }
        $(".input-cell-container").append(row);
    }

    //selection of alignment icons
    $(".align-icon").click(function(){
        $(".align-icon.selected").removeClass("selected");
        $(this).addClass("selected");
    })

    $(".style-icon").click(function(){
        $(this).toggleClass("selected");
    })

    $(".input-cell").click(function (e) {
       
        
            //top selected or not
       let idArray = $(this).attr("id").split("-");
       let rowId = parseInt(idArray[1]);
       let colId = parseInt(idArray[3]);
     let topCell = $(`#row-${rowId-1}-col-${colId}`);
     let bottomCell = $(`#row-${rowId+1}-col-${colId}`);
     let leftCell = $(`#row-${rowId}-col-${colId-1}`);
     let rightCell = $(`#row-${rowId}-col-${colId+1}`);

     if($(this).hasClass("selected")){
         unselectCell(this, e, topCell, bottomCell, leftCell, rightCell);
     }
     else{
        selectCell(this, e, topCell, bottomCell, leftCell, rightCell);
     }
      
      
       
    });
    function unselectCell(ele, e, topCell, bottomCell, leftCell, rightCell){
        if(e.ctrlKey && $(ele).attr("contenteditable") == "false"){
            if($(ele).hasClass("top-selected")){
                topCell.removeClass("bottom-selected");
            }
            if($(ele).hasClass("left-selected")){
                leftCell.removeClass("right-selected");
            }
            if($(ele).hasClass("right-selected")){
                rightCell.removeClass("left-selected");
            }
            if($(ele).hasClass("bottom-selected")){
                bottomCell.removeClass("top-selected");
            }
            $(ele).removeClass("selected top-selected bottom-selected right-selected left-selected");
        }
    }
    
    function selectCell(ele,e, topCell, bottomCell, leftCell ,rightCell){
    
        if(e.ctrlKey){
            let idArray = $(ele).attr("id").split("-");
            let rowId = parseInt(idArray[1]);
            let colId = parseInt(idArray[3]);
        if(rowId != 0){
            
            topSelected = topCell.hasClass("selected");
        }
        let bottomSelected;
        
        if(rowId != 100){
            
            bottomSelected = bottomCell.hasClass("selected");
        }
        let rightSelected;
       
        if(colId != 100){
            
            rightSelected = rightCell.hasClass("selected");
        }
        let leftSelected;
       
        if(colId != 0){
           
            leftSelected = leftCell.hasClass("selected");
        }
    
        if(topSelected){
            topCell.addClass("bottom-selected");
            $(ele).addClass("top-selected");
        }
    
        if(bottomSelected){
            bottomCell.addClass("top-selected");
            $(ele).addClass("bottom-selected");
        }
        if(leftSelected){
            leftCell.addClass("right-selected");
            $(ele).addClass("left-selected");
        }
    
        if(rightSelected){
            rightCell.addClass("left-selected");
            $(ele).addClass("right-selected");
        }
    
        
         }
         else {
             //removing selected class that was previously selected
             $(".input-cell.selected").removeClass("selected top-selected bottom-selected right-selected left-selected");
         }
         
         $(ele).addClass("selected");
    }

    $(".input-cell").dblclick(function(){
        $(".input-cell.selected").removeClass("selected");
        $(this).addClass("selected");
        $(this).attr("contenteditable", "true");
        $(this).focus();
        $(this).attr('spellcheck', false);
    })
    $(".input-cell").blur(function(){
        $(".input-cell.selected").attr("contenteditable", "false");
    })

    $(".input-cell-container").scroll(function(){
        $(".column-name-container").scrollLeft(this.scrollLeft);
        $(".row-name-container").scrollTop(this.scrollTop);
    })
});


function updateCell(property, value){
    $(".input-cell.selected").each(function(){
        $(this).css(property, value);
    })
}

$(".icon-bold").click(function(){
    if($(this).hasClass("selected")){
        updateCell("font-weight","");
    }
    else{
        updateCell("font-weight", "bold");
    }
})

$(".icon-italic").click(function(){
    if($(this).hasClass("selected")){
        updateCell("font-style","");
    }
    else{
        updateCell("font-style", "italic");
    }
})
$(".icon-underline").click(function(){
    if($(this).hasClass("selected")){
        updateCell("text-decoration","");
    }
    else{
        updateCell("text-decoration", "underline");
    }
})

let mousemoved = false;

$(".input-cell").mousemove(function(event){
    // if(event.buttons == 1){
    //     mousemoved = true;
    //     console.log(event.target, event.buttons);
    // }
    // else if(mousemoved){
    //     mousemoved = false;
    //     console.log(event.target, event.buttons);
    // }
    console.log(mousemoved);
})

