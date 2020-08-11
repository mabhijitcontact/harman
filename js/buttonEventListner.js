const buttonEventListnerAndAssociatedMethod = {

    attachEvent: function (elementId, eventAttach, attachedMethod) {
        document.getElementById(elementId).addEventListener(eventAttach, attachedMethod);
    },

    submitRegisterMethod: function (event) {
        event.preventDefault();

        const submitButton = document.querySelector("button[type='submit']");
        submitButton.setAttribute("disabled", true);
        const currentForm = event.currentTarget;

        let newUser = {};
        const accessAllField = this.getElementsByTagName("input");

        var statusBlank = Validator.isEmpty(accessAllField);
        if (Array.isArray(statusBlank) && statusBlank.length > 0 && statusBlank[0].isError) {
            Validator.msgBox(statusBlank[0], 'msgContainerDiv', submitButton, true, 2000);
            return false;
        }

        var statusEmail = Validator.isEmail(accessAllField.email.value);
        if (Array.isArray(statusEmail) && statusEmail[0].isError) {
            Validator.msgBox(statusEmail[0], 'msgContainerDiv', submitButton, true, 2000);
            return false;
        }

        var statusPasswordLength = Validator.passwordLength(accessAllField.password.value);
        if (Array.isArray(statusPasswordLength) && statusPasswordLength[0].isError) {
            Validator.msgBox(statusPasswordLength[0], 'msgContainerDiv', submitButton, true, 2000);
            return false;
        }

        // creating userObj and send to save the Data Dummy call;
        for (let ii = 0; ii < accessAllField.length; ii++) {
            newUser[accessAllField[ii].name] = accessAllField[ii].value;
        }


        Validator.msgBox({
            message: " Please wait while saving...",
            whichField: 'Saving'
        }, 'msgContainerDiv', submitButton, false);

        //call user object
        const userInst = new User();
        //call user object

        userInst.registerUser(newUser).then(function (res) {
            Validator.msgBox({
                message: " Data is saved",
                whichField: 'Registered'
            }, 'msgContainerDiv', submitButton, true, 1000);
            currentForm.reset();
        }).catch(e => {
            if (e == "userFound") {
                Validator.msgBox({
                    message: " Email already Exists",
                    whichField: 'User Exists'
                }, 'msgContainerDiv', submitButton, true, 2000);
            }
        });
        return false;
    }
}
//module.exports = buttonEventListner;