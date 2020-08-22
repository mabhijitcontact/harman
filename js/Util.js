//Util.js
const Validator = (function () {
    var errorMsg = [];
    let htmlMsg = '';
    blankFieldChecking = function (fields) {
        console.log(fields);
        var whatBlank = [],
            isFieldError = false;
        for (let ii = 0; ii < fields.length; ii++) {
            if (fields[ii].value == "" || fields[ii].value.trim() == "") {
                isFieldError = true;
                whatBlank.push(fields[ii].name.toUpperCase());
            }
        }
        if (isFieldError) {
            errorMsg = [];
            errorMsg.push({
                isError: isFieldError,
                message: " Cannot leave blank",
                whichField: whatBlank
            });
            return errorMsg;
        } else {
            errorMsg = []; whatBlank = []; isError = false;
            return true;
        }
    };

    emailFieldChecking = function (fieldVal) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(fieldVal)) {
            errorMsg = [];
            errorMsg.push({
                isError: true,
                message: "Please provide correct email",
                whichField: "EMAIL"
            });
            return errorMsg;
        }
        errorMsg = [];
        return true;
    };

    passwordLengthChecking = function (fieldVal) {
        if (fieldVal.length < 6) {
            errorMsg = [];
            errorMsg.push({
                isError: true,
                message: "Password length should be 6 or more",
                whichField: "PASSWORD"
            });
            return errorMsg;
        }
        errorMsg = [];
        return true;
    };

    specialCharecterChecking = function (field) {
        return true;
    };

    generateMsgBox = function (msg, msgContainer, submitButton, isTimerReq, delay = null) {
        htmlMsg = `<div class="alert alert-danger" role="alert">
        <span>
        ${ Array.isArray(msg.whichField) ? msg.whichField.reduce(function (a, b) { return a.concat(b) }, []) : msg.whichField} 
        </span>
        : ${msg.message} 
        </div >`;
        document.getElementById(msgContainer).innerHTML = htmlMsg;
        document.getElementById(msgContainer).style.display = 'block';
        if (isTimerReq) {
            setTimeout(function () {
                document.getElementById(msgContainer).style.display = 'none';
                submitButton.removeAttribute("disabled");
            }, delay);
        }
    }


    return {
        isEmpty: blankFieldChecking,
        isEmail: emailFieldChecking,
        passwordLength: passwordLengthChecking,
        isSpecialChar: specialCharecterChecking,
        msgBox: generateMsgBox
    }
}());


//module.exports = Validator;