var App = (function () {
    const throttle = function (func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), limit);
            }
        };
    }

    const initPlaceHolder = function () {
        document
            .querySelectorAll('input[type = "text"], input[type="password"]')
            .forEach(function (inputBox) {
                inputBox.addEventListener(
                    "keyup",
                    throttle(showHidePlaceHolder, 100)
                );
            });
        document
            .querySelectorAll('input[type = "text"], input[type="password"]')
            .forEach(function (inputBox) {
                inputBox.addEventListener("focus", function (event) {
                    let textElement = document.querySelector("#" + event.target.id);
                    hideSiblingTitle(textElement, "addClass");
                });
            });
        document
            .querySelectorAll('input[type = "text"], input[type="password"]')
            .forEach(function (inputBox) {
                inputBox.addEventListener("blur", showHidePlaceHolder);
            });
    }

    const showHidePlaceHolder = function (event) { //throttled, it is not required here but still used it.
        let textElement = document.querySelector("#" + event.target.id);
        if (textElement.value.length >= 1 && textElement.value.trim() != "") {
            hideSiblingTitle(textElement, "addClass");
        } else {
            textElement.value = "";
            hideSiblingTitle(textElement, "removeClass");
        }
    }

    const hideSiblingTitle = function (n, action) {
        let toHideSibling = [...n.parentElement.children].filter((c) => c != n);
        toHideSibling.forEach(function (e) {
            let wholeList = e.classList;
            if (action === "addClass") {
                !wholeList.contains("placeholderActive")
                    ? wholeList.add("placeholderActive")
                    : null;
            } else if (action === "removeClass") e.classList.remove("placeholderActive");
        });
    }

    return {
        initPlaceHolder: initPlaceHolder
    };
}());
App.initPlaceHolder();