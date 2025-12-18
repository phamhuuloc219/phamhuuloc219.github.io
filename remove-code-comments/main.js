const errorModal = document.getElementById('errorModal');
const errorMessage = document.getElementById('errorMessage');
const closeModalBtn = document.getElementById('closeModalBtn');
const closeModalIcon = document.getElementById('closeModalIcon');

function showError(msg) {
    errorMessage.textContent = msg;
    errorModal.classList.remove('hidden');
}

function hideError() {
    errorModal.classList.add('hidden');
}

closeModalBtn.addEventListener('click', hideError);
closeModalIcon.addEventListener('click', hideError);

errorModal.addEventListener('click', (e) => {
    if (e.target === errorModal) {
        hideError();
    }
});

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
                
            default:
                showError("Language not yet supported!");
                return code;
        }

        result = result.replace(/^\s*[\r\n]/gm, ""); 
        
        return result;

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
        
        copyBtn.classList.remove('hidden');
        
        newTextArea.classList.add('ring-2', 'ring-green-500');
        setTimeout(() => {
             newTextArea.classList.remove('ring-2', 'ring-green-500');
        }, 300);
    });
});

document.getElementById('clearBtn').addEventListener('click', () => {
    originalTextArea.value = '';
    newTextArea.value = '';
    copyBtn.classList.add('hidden');
});

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

document.addEventListener('DOMContentLoaded', () => {
        const navToggle = document.getElementById('navToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileToolsBtn = document.getElementById('mobileToolsBtn');
        const mobileToolsDropdown = document.getElementById('mobileToolsDropdown');
        const mobileToolsIcon = document.getElementById('mobileToolsIcon');

        if(navToggle && mobileMenu) {
            navToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileMenu.classList.toggle('hidden');
            });
        }

        if (mobileToolsBtn && mobileToolsDropdown) {
            mobileToolsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileToolsDropdown.classList.toggle('hidden');
                if(mobileToolsIcon) mobileToolsIcon.classList.toggle('rotate-180');
            });
        }

        document.addEventListener('click', (e) => {
            if (mobileMenu && !mobileMenu.classList.contains('hidden') && 
                !mobileMenu.contains(e.target) && 
                !navToggle.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });

        const yearEl = document.getElementById('year');
        if(yearEl) yearEl.innerText = new Date().getFullYear();
    });