const originalTextArea = document.getElementById('originalText');
const newTextArea = document.getElementById('newText');
const copyBtn = document.getElementById('copyBtn');

function removeComments(code, lang) {
    if (!code || code.trim() === "") return "";

    let result = code;

    try {
        switch (lang) {
            case 'csharp':
            case 'java':
            case 'js':
            case 'cpp':
                result = code.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1');
                break;

            case 'python':
                result = code.replace(/#.*$/gm, '');
                break;

            case 'sql':
                result = code.replace(/\/\*[\s\S]*?\*\/|--.*$/gm, '');
                break;

            case 'css':
                result = code.replace(/\/\*[\s\S]*?\*\//gm, '');
                break;

            default:
                showError("Language not yet supported!");
                return code;
        }

        result = result.replace(/^[ \t]+$/gm, '');
        result = result.replace(/(\r\n|\n|\r){3,}/g, '\n\n');

        return result.trim();

    } catch (e) {
        console.error(e);
        showError("An error occurred during processing: " + e.message);
        return code;
    }
}

const langButtons = document.querySelectorAll('.btn-lang');

langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        const content = originalTextArea.value;

        if (!content.trim()) {
            showError("Please enter the source code in the box on the left!");
            return;
        }

        const cleanCode = removeComments(content, lang);
        newTextArea.value = cleanCode;
        
        if (copyBtn) copyBtn.classList.remove('hidden');
        
        newTextArea.classList.add('ring-2', 'ring-green-500');
        setTimeout(() => {
             newTextArea.classList.remove('ring-2', 'ring-green-500');
        }, 300);
    });
});

const clearBtn = document.getElementById('clearBtn');
if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        originalTextArea.value = '';
        newTextArea.value = '';
        if (copyBtn) copyBtn.classList.add('hidden');
    });
}

if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        if (!newTextArea.value) return;
        navigator.clipboard.writeText(newTextArea.value).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = "Copied!";
            copyBtn.classList.add("bg-green-300");
            setTimeout(() => {
                copyBtn.innerText = originalText;
                copyBtn.classList.remove("bg-green-300");
            }, 1500);
        });
    });
}
