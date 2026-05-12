let display = document.getElementById('display');

function appendNumber(num) {
    // Prevent multiple leading zeros
    if (num === '0' && display.value === '0') return;
    
    // Prevent multiple decimal points
    if (num === '.') {
        const currentValue = display.value;
        const lastOperatorIndex = Math.max(
            currentValue.lastIndexOf('+'),
            currentValue.lastIndexOf('-'),
            currentValue.lastIndexOf('*'),
            currentValue.lastIndexOf('/')
        );
        const lastNumber = currentValue.substring(lastOperatorIndex + 1);
        
        if (lastNumber.includes('.')) return;
    }
    
    // Clear leading zero when typing a new number (except after operators)
    if (display.value === '0' && num !== '.') {
        display.value = num;
    } else {
        display.value += num;
    }
}

function appendOperator(operator) {
    const value = display.value;
    
    // Prevent operator at the start
    if (value === '') return;
    
    // Prevent multiple consecutive operators
    const lastChar = value[value.length - 1];
    if (['+', '-', '*', '/'].includes(lastChar)) {
        // Replace the last operator
        display.value = value.slice(0, -1) + operator;
        return;
    }
    
    display.value += operator;
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function clearDisplay() {
    display.value = '';
}

function calculate() {
    try {
        const result = eval(display.value);
        
        // Check for invalid results
        if (!isFinite(result)) {
            display.value = 'Error';
            return;
        }
        
        // Round to avoid floating point precision issues
        display.value = Math.round(result * 100000000) / 100000000;
    } catch (e) {
        display.value = 'Error';
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Numbers
    if (/[0-9]/.test(key)) {
        appendNumber(key);
    }
    // Decimal point
    else if (key === '.') {
        appendNumber('.');
    }
    // Operators
    else if (key === '+') {
        event.preventDefault();
        appendOperator('+');
    }
    else if (key === '-') {
        event.preventDefault();
        appendOperator('-');
    }
    else if (key === '*') {
        event.preventDefault();
        appendOperator('*');
    }
    else if (key === '/') {
        event.preventDefault();
        appendOperator('/');
    }
    // Calculate on Enter
    else if (key === 'Enter') {
        event.preventDefault();
        calculate();
    }
    // Delete on Backspace
    else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
    // Clear on Escape
    else if (key === 'Escape') {
        clearDisplay();
    }
});
