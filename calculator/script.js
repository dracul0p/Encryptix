document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".child");
    const output = document.getElementById("output");
    let currentInput = "";
    let operator = "";
    let previousInput = "";

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.getAttribute('data-value');
            const type = button.getAttribute('data-type');

            if (type === "function") {
                handleSpecialButtons(value);
            } else if (type === "operator") {
                handleOperator(value);
            } else {
                handleNumber(value);
            }
        });
    });

    function handleSpecialButtons(value) {
        if (value === "AC") {
            currentInput = "";
            previousInput = "";
            operator = "";
            updateOutput("");
        } else if (value === "±") {
            currentInput = currentInput ? (-parseFloat(currentInput)).toString() : "";
            updateOutput(currentInput);
        } else if (value === "%") {
            currentInput = currentInput ? (parseFloat(currentInput) / 100).toString() : "";
            updateOutput(currentInput);
        }
    }

    function handleOperator(value) {
        if (value === "=") {
            if (currentInput && previousInput && operator) {
                currentInput = calculate(previousInput, operator, currentInput).toString();
                operator = "";
                previousInput = "";
                updateOutput(currentInput);
            }
        } else {
            if (currentInput) {
                if (previousInput) {
                    previousInput = calculate(previousInput, operator, currentInput).toString();
                    updateOutput(previousInput);
                } else {
                    previousInput = currentInput;
                }
                currentInput = "";
                operator = value;
            }
        }
    }

    function handleNumber(value) {
        if (value === "." && currentInput.includes(".")) {
            return;
        }
        currentInput += value;
        updateOutput(currentInput);
    }

    function updateOutput(value) {
        output.value = value;
    }

    function calculate(a, operator, b) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "*":
                return a * b;
            case "/":
                return a / b;
            default:
                return 0;
        }
    }
});
