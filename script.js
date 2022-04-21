
let defaultProperties = {
    text: "",
    "bold": false,
    "italic": false,
    "underlined": false,
    "text-align": "left",
    "background-color": "#ffffff",
    "color": "#000000",
    "font-family": "Noto Sans",
    "font-size": "14px"
}
let cellData = {
    "Sheet1" : {

    }
}

let selectedSheet = "Sheet1";
let totalSheets = 1;

$( document ).ready(function() {
    let cellContainer = $(".input-cell-container");
   
    function findRowCol(ele){
        let idArray = $(ele).attr("id").split("-");
        let rowId = parseInt(idArray[1]);
        let colId = parseInt(idArray[3]);

        return [rowId,colId];
    }
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
    // $(".align-icon").click(function(){
    //     if($(this).hasClass("selected")){
    //     $(this).removeClass("selected");
    //     }
    //     else{
    //     $(this).addClass("selected");
    //     }
       
    // })

    // $(".style-icon").click(function(){
    //     $(this).toggleClass("selected");
    // })
   


    function getTopBottomLeftRightCell(rowId, colId) {
        let topCell = $(`#row-${rowId - 1}-col-${colId}`);
        let bottomCell = $(`#row-${rowId + 1}-col-${colId}`);
        let leftCell = $(`#row-${rowId}-col-${colId - 1}`);
        let rightCell = $(`#row-${rowId}-col-${colId + 1}`);
        return [topCell, bottomCell, leftCell, rightCell];
    }
    
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

    function selectCell(ele,e, topCell, bottomCell, leftCell, rightCell, mouseSelection){
    
        if(e.ctrlKey || mouseSelection){
           
  
            let topSelected;
            topSelected = topCell.hasClass("selected");
       
        let bottomSelected;
        
     
            
            bottomSelected = bottomCell.hasClass("selected");
      
        let rightSelected;
       
       
            
            rightSelected = rightCell.hasClass("selected");
 
        let leftSelected;
       
       
           
            leftSelected = leftCell.hasClass("selected");
      
    
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
         changeHeader(ele);
    }

    function changeHeader(ele){
        let [rowId,colId] = findRowCol(ele);
        let data = defaultProperties;
        if(cellData[selectedSheet][rowId-1] && cellData[selectedSheet][rowId-1][colId-1]){
        data = cellData[selectedSheet][rowId-1][colId-1];
        }
        $(".align-icon.selected").removeClass("selected");
        $(`.align-icon[data-type=${data["text-align"]}]`).addClass("selected");
        addRemoveSelectFromFontStyle(data, "bold");
    addRemoveSelectFromFontStyle(data, "italic");
    addRemoveSelectFromFontStyle(data, "underlined");
    $(".background-color-picker").val(data["background-color"]);
    $(".text-color-picker").val(data["color"]);
    $(".font-family-selector").val(data["font-family"]);
    $(".font-family-selector").css("font-family", data["font-family"]);
    $(".font-size-selector").val(data["font-size"]);
    $(".font-size-selector").css("font-size", data["font-size"]);
    }
    function addRemoveSelectFromFontStyle(data, property) {
        if(property.localeCompare("underlined") != 0){
        if (data[property]) {
            $(`.icon-${property}`).addClass("selected");
        } else {
            $(`.icon-${property}`).removeClass("selected");
        }
    }
    else{
        if (data[property]) {
            $(`.underlined`).addClass("selected");
        } else {
            $(`.underlined`).removeClass("selected");
        }
    }
    }

    $(".input-cell").click(function (e) {
       
        let [rowId,colId] = findRowCol(this);

        let [topCell, bottomCell, leftCell, rightCell] = getTopBottomLeftRightCell(rowId, colId);
            //top selected or not
      

     if($(this).hasClass("selected") && e.ctrlKey){
         unselectCell(this, e, topCell, bottomCell, leftCell, rightCell);
     }
     else{
        selectCell(this, e, topCell, bottomCell, leftCell, rightCell, false);
     }
      
});
   
    
   $(".input-cell").dblclick(function(){
        $(".input-cell.selected").removeClass("selected");
        $(this).addClass("selected");
        $(this).attr("contenteditable", "true");
        $(this).focus();
        $(this).attr('spellcheck', false);
    })

    $(".input-cell").blur(function(){
        $(".input-cell.selected").attr("contenteditable", "false");
        updateCell("text",$(this).text());
    })

    $(".input-cell-container").scroll(function(){
        $(".column-name-container").scrollLeft(this.scrollLeft);
        $(".row-name-container").scrollTop(this.scrollTop);
    })




function updateCell(property, value) {
    let prevCellData = JSON.stringify(cellData);
    if (value != defaultProperties[property]) {
        $(".input-cell.selected").each(function (index, data) {
            let [rowId, colId] = findRowCol(data);
            if (cellData[selectedSheet][rowId - 1] == undefined) {
                cellData[selectedSheet][rowId - 1] = {};
                cellData[selectedSheet][rowId - 1][colId - 1] = { ...defaultProperties};
                cellData[selectedSheet][rowId - 1][colId - 1][property] = value;
                console.log(cellData[selectedSheet][rowId - 1][colId - 1]);
            } else {
                if (cellData[selectedSheet][rowId - 1][colId - 1] == undefined) {
                    cellData[selectedSheet][rowId - 1][colId - 1] = { ...defaultProperties};
                    cellData[selectedSheet][rowId - 1][colId - 1][property] = value;
                    console.log(cellData[selectedSheet][rowId - 1][colId - 1]);
                } else {
                    cellData[selectedSheet][rowId - 1][colId - 1][property] = value;
                    console.log(cellData[selectedSheet][rowId - 1][colId - 1]);
                }
            }
        });
    } else {
        $(".input-cell.selected").each(function (index, data) {
            let [rowId, colId] = findRowCol(data);
            if (cellData[selectedSheet][rowId - 1] && cellData[selectedSheet][rowId - 1][colId - 1]) {
                cellData[selectedSheet][rowId - 1][colId - 1][property] = value;
                if (JSON.stringify(cellData[selectedSheet][rowId - 1][colId - 1]) == JSON.stringify(defaultProperties)) {
                    delete cellData[selectedSheet][rowId - 1][colId - 1];
                    if (Object.keys(cellData[selectedSheet][rowId - 1]).length == 0) {
                        delete cellData[selectedSheet][rowId - 1];
                    }
                }
            }
        });
    }
    // if (saved && JSON.stringify(cellData) != prevCellData) {
    //     saved = false;
    // }
}
function setFontStyle(ele, property, key, value) {
    if ($(ele).hasClass("selected")) {
        $(ele).removeClass("selected");
        $(".input-cell.selected").css(key, "");
        // $(".input-cell.selected").each(function (index, data) {
        //     let [rowId, colId] = findRowCOl(data);
        //     cellData[selectedSheet][rowId - 1][colId - 1][property] = false;
        // });
        updateCell(property, false); //since we are reaching closer to te default property delete it from cell data
    } else {
        $(ele).addClass("selected");
        $(".input-cell.selected").css(key, value);
        // $(".input-cell.selected").each(function (index, data) {
        //     let [rowId, colId] = findRowCOl(data);
        //     cellData[selectedSheet][rowId - 1][colId - 1][property] = true;
        // });
        updateCell(property, true);
    }
}

$(".icon-bold").click(function(){
    setFontStyle(this, "bold","font-weight","bold");
})

$(".icon-italic").click(function(){
    setFontStyle(this, "italic","font-style","italic");
})
$(".underlined").click(function(){
    setFontStyle(this, "underlined","text-decoration","underline");
})

$(".align-icon").click(function(){
      $(".align-icon.selected").removeClass("selected");
      $(this).addClass("selected");
      let alignment = $(this).attr("data-type").toString();
     
      $(".input-cell.selected").css("text-align",alignment);
    
      updateCell("text-align",alignment);
    })
let mousemoved = false;
let startCellStored = false;
let startCell;
let endCell;
$(".input-cell").mousemove(function(event){
    event.preventDefault();
    if(event.buttons == 1 && !event.ctrlKey){
        $(".input-cell.selected").removeClass("selected top-selected bottom-selected left-selected right-selected")
        mousemoved = true;
        if(!startCellStored){
            let [rowId, colId] = findRowCol(event.target);
            startCell = {rowId : rowId, colId : colId};
            startCellStored = true;
        }
        else{
            let [rowId, colId] = findRowCol(event.target);
            endCell = {rowId: rowId, colId: colId};
            selectAllBetweenTheRange(startCell, endCell);
        }
        
       
    }
    else if(event.buttons == 0 && mousemoved){
        mousemoved = false;
        startCellStored = false;
      
       
    }
   
})

function selectAllBetweenTheRange(start, end){
    for (let i = (start.rowId < end.rowId ? start.rowId : end.rowId); i <= (start.rowId < end.rowId ? end.rowId : start.rowId); i++) {
        for (let j = (start.colId < end.colId ? start.colId : end.colId); j <= (start.colId < end.colId ? end.colId : start.colId); j++) {
            let [topCell, bottomCell, leftCell, rightCell] = getTopBottomLeftRightCell(i, j);
            selectCell($(`#row-${i}-col-${j}`)[0], {}, topCell, bottomCell, leftCell, rightCell, true);
        }
    }
}

$(".color-fill-icon").click(function(){
    $(".background-color-picker").click();
})

$(".color-fill-text").click(function(){
    $(".text-color-picker").click();
})

$(".background-color-picker").change(function(){
    $(".input-cell.selected").css("background-color",$(this).val());
    updateCell("background-color", $(this).val());
})

$(".text-color-picker").change(function(){
    $(".input-cell.selected").css("color",$(this).val());
    updateCell("color", $(this).val());
})

$(".font-family-selector").change(function(){
    $(".input-cell.selected").css("font-family",$(this).val());
    $(".font-family-selector").css("font-family",$(this).val());
    updateCell("font-family",$(this).val());
})
$(".font-size-selector").change(function(){
    $(".input-cell.selected").css("font-size",$(this).val());
    
    updateCell("font-size",$(this).val());
})
});

// Book-1 Excel
