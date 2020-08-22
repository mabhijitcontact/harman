describe("User", function () {
    var USER;
    var newUser = {
        firstName: "Apratim",
        lastName: "Mukherjee",
        email: "mabhijit.contact@gmail.com",
        password: "e2132321321"
    };
    beforeEach(function () {
        USER = new User();
    });

    it("should be able to Save User Object", function () {
        USER.registerUser(newUser).then(function (result) {
            expect(result).toEqual({});
            done();
        });
    });

    it("should not be able to Save User Object", function () {
        USER.registerUser(newUser).then(function (result) {
            expect(result).toBe("userFound");
            done();
        });
    });
});


describe("Field Validator", function () {
    var fields = [
        { name: 'firstName', value: "Abhijit" },
        { name: 'lastName', value: "Mukherjee" },
        { name: 'email', value: "mabhijit.contact@gmail.com" },
        { name: 'password', value: "1234567" }
    ];


    it("Field Validator isEmpty Positive Case", function () {
        expect(Validator.isEmpty(fields)).toBe(true);
    });
    it("Field Validator isEmpty Negative Case", function () {
        //fields[3].value = "";
        var expectation = Validator.isEmpty([
            { name: 'firstName', value: "Abhijit" },
            { name: 'lastName', value: "Mukherjee" },
            { name: 'email', value: "mabhijit.contact@gmail.com" },
            { name: 'password', value: "" }
        ]);
        expect(expectation[0].isError).toBe(true);
    });

    it("Field Validator Email Positive Case", function () {
        expect(Validator.isEmail("email@email.com")).toBe(true);
    });
    it("Field Validator Email Negative Case", function () {
        var expectation = Validator.isEmail("email@email");
        expect(expectation[0].isError).toBe(true);
    });


    it("Field Validator Password Length Positive Case", function () {
        expect(Validator.passwordLength("123456")).toBe(true);
    });
    it("Field Validator Password Length Negative Case", function () {
        var expectation = Validator.passwordLength("1234");
        expect(expectation[0].isError).toBe(true);
    });
});

describe("2nd Assignment", function () {
    beforeEach(function () {
        allInOneSpy = jasmine.createSpyObj('allInOne', ['getRemainingDay', 'initProgressBar']);

        allInOneSpy.getRemainingDay();
        allInOneSpy.initProgressBar();
    });

    it("Number is to be number- Positive case", function () {
        expect(allInOne.isNumber(123456)).toBe(true);
    });

    it("Number is to be number- Negative case", function () {
        expect(allInOne.isNumber("sdasdas")).toBe(false);
    });

    it("getRemainingDay, initProgressBar- At least Called Once and Defined", function () {
        expect(allInOneSpy.getRemainingDay).toBeDefined();
        expect(allInOneSpy.getRemainingDay).toHaveBeenCalled();
        expect(allInOneSpy.initProgressBar).toBeDefined();
        expect(allInOneSpy.initProgressBar).toHaveBeenCalled();
    });
});

describe("Button Event Listner", function () {

    it("Number is to be number- Positive case", function () {
        expect(allInOne.isNumber(123456)).toBe(true);
    });

    it("Number is to be number- Negative case", function () {
        expect(allInOne.isNumber("sdasdas")).toBe(false);
    });
});