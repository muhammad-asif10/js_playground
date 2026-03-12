document.addEventListener('DOMContentLoaded', () => {
    const runBtn = document.getElementById('run-btn');
    const clearBtn = document.getElementById('clear-btn');
    const codeInput = document.getElementById('code-input');
    const consoleOutput = document.getElementById('console-output');

    // Load saved code
    const savedCode = localStorage.getItem('js-compiler-code');
    if (savedCode) {
        codeInput.value = savedCode;
    }

    // --- Console Overrides ---
    const originalConsole = {
        log: console.log,
        warn: console.warn,
        error: console.error,
        info: console.info,
        clear: console.clear
    };

    function formatValue(val) {
        if (val === null) return '<span class="val-null">null</span>';
        if (val === undefined) return '<span class="val-undefined">undefined</span>';
        
        const type = typeof val;
        if (type === 'string') return `<span class="val-string">"${val}"</span>`;
        if (type === 'number') return `<span class="val-number">${val}</span>`;
        if (type === 'boolean') return `<span class="val-boolean">${val}</span>`;
        
        if (type === 'object' || Array.isArray(val)) {
            try {
                const json = JSON.stringify(val, (key, value) => 
                    typeof value === 'function' ? `[Function: ${value.name || 'anonymous'}]` : value
                , 2);
                return `<span class="val-object">${json}</span>`;
            } catch (e) {
                return `<span class="val-system">[Complex Object]</span>`;
            }
        }
        
        if (type === 'function') return `<span class="val-object">ƒ ${val.name || '(anonymous)'}()</span>`;
        return String(val);
    }

    function appendLog(type, args) {
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        
        const content = args.map(arg => {
            if (type === 'error' && arg instanceof Error) return arg.stack || arg.toString();
            if (typeof arg === 'string' && type !== 'return') return arg;
            return formatValue(arg);
        }).join(' ');

        entry.innerHTML = content;
        consoleOutput.appendChild(entry);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
        
        if (originalConsole[type]) {
            originalConsole[type].apply(console, args);
        }
    }

    window.console = {
        ...window.console,
        log: (...args) => appendLog('log', args),
        warn: (...args) => appendLog('warn', args),
        error: (...args) => appendLog('error', args),
        info: (...args) => appendLog('info', args),
        clear: () => {
            consoleOutput.innerHTML = '<div class="log-entry system">Console cleared.</div>';
            originalConsole.clear();
        }
    };

    // --- Execution Logic ---

    async function runCode() {
        const code = codeInput.value.trim();
        localStorage.setItem('js-compiler-code', code);
        
        if (!code) return;

        appendLog('system', [`> Executing...`]);

        try {
            let result;
            const hasAwait = /\bawait\b/.test(code);

            if (hasAwait) {
                // Wrap in async IIFE to support top-level await
                // We use indirect eval to run in global scope
                const wrappedCode = `(async () => { ${code} })()`;
                result = await (0, eval)(wrappedCode);
            } else {
                // 1. Try to evaluate as an expression first (to get return value of things like "1+1")
                // 2. If that fails (SyntaxError), run as a normal script
                try {
                    // Try wrapping in parens to handle object literals like {a:1}
                    result = (0, eval)(`(${code})`);
                } catch (e) {
                    if (e instanceof SyntaxError) {
                        // Fallback: execute as a standard script
                        result = (0, eval)(code);
                    } else {
                        throw e; // Re-throw runtime errors
                    }
                }
            }
            
            if (result !== undefined) {
                appendLog('return', [result]);
            }
        } catch (err) {
            appendLog('error', [err]);
        }
    }

    // --- Event Listeners ---
    runBtn.addEventListener('click', runCode);
    clearBtn.addEventListener('click', () => console.clear());

    codeInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            runCode();
        }
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = codeInput.selectionStart;
            const end = codeInput.selectionEnd;
            codeInput.value = codeInput.value.substring(0, start) + '    ' + codeInput.value.substring(end);
            codeInput.selectionStart = codeInput.selectionEnd = start + 4;
        }
        // Save on every change
        setTimeout(() => localStorage.setItem('js-compiler-code', codeInput.value), 0);
    });

    // --- Resizer ---
    const resizer = document.getElementById('drag-handle');
    const editorPane = document.querySelector('.editor-pane');
    const mainContainer = document.querySelector('main');
    let isResizing = false;

    resizer.addEventListener('mousedown', () => isResizing = true);
    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
        const mainRect = mainContainer.getBoundingClientRect();
        const newHeight = e.clientY - mainRect.top;
        if (newHeight > 60 && newHeight < mainRect.height - 60) {
            editorPane.style.flex = 'none';
            editorPane.style.height = `${newHeight}px`;
        }
    });
    document.addEventListener('mouseup', () => isResizing = false);

    codeInput.focus();
});