var keyNum = 0;
//키 입력
function onInputKeyDown(event) {
    event = event || window.event;
    var keyID = (event.which) ? event.which : event.keyCode;
    if ((keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105)
        || keyID == 8 || keyID == 9 || keyID == 37 || keyID == 39 || keyID == 46) {
        keyNum = inputTxt.value = inputTxt.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
        return;
    }
    else
        return false;

    /* 48~57:일반 숫자키 코드, 96~105:숫자키패드 숫자키 코드 */
}

// 한글입력 방지
function onInputKeyup(obj) {
    var tmpvalue = obj.value;

    var keyID = (event.which) ? event.which : event.keyCode;
    //좌우 방향키, 백스페이스, 딜리트, 탭키에 대한 예외
    if ((keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105)
        || keyID == 8 || keyID == 9 || keyID == 37 || keyID == 39 || keyID == 46) {
        return;
    }
    keyNum = obj.value = tmpvalue.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');

}

// 더하기,뺴기,계산 버튼
function onBtnClick(data) {
    var txt = "";
    txt = inputTxt.value;
    txt = txt.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
    inputTxt.focus();
    if (txt == "") return;

    switch (data) {
        case "+":
            insertText(inputTxt, "+");
            break;

        case "-":
            insertText(inputTxt, "-");
            break;

        case "bck":
            inputTxt.value = txt.substr(0, txt.length - 1);
            break;

        case "clr":
            inputTxt.value = "";
            document.getElementById("result").innerHTML = "0";
            break;

        case "cal":
            var lastTxt = txt.substr(txt.length - 1, 1);
            if (lastTxt !== "-" && lastTxt !== "+") {
                document.getElementById("result").innerHTML = numberWithCommas(eval(txt));
            }
            else
                alert('완성되지 않은 수식입니다.');
            break;
    }

}

// 위치한 커서에 연산기호 삽입
function insertText(txtObj, value) {
    var currentPos = 0;
    var str = txtObj.value;
    var lastTxt = str.substr(str.length - 1, 1);

    if ((txtObj.selectionStart == str.length - 1) && (lastTxt == "-" || lastTxt == "+"))
        return;

    if (txtObj.selectionStart || txtObj.selectionStart == '0')
        currentPos = txtObj.selectionStart;

    if (str.substr(currentPos - 1, 1) == "+" || str.substr(currentPos - 1, 1) == "-"
        || str.substr(currentPos + 1, -1) == "+" || str.substr(currentPos + 1, -1) == "-")
        return;

    txtObj.value = str.substr(0, currentPos) + value + str.substr(currentPos);
    txtObj.selectionStart = txtObj.selectionEnd = currentPos + 1;

}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



