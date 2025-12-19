const originalTextArea = document.getElementById('originalText');
const newTextArea = document.getElementById('newText');

document.getElementById('btnFormatJson').addEventListener('click', () => {
    const content = originalTextArea.value.trim();
    if (!content) return;
    try {
        const parsed = JSON.parse(content);
        originalTextArea.value = JSON.stringify(parsed, null, 4); 
    } catch (e) {
        showError("Cannot format JSON!\n\nError details:\n" + e.message);
    }
});

document.getElementById('btnFormatHtml').addEventListener('click', () => {
    const content = originalTextArea.value;
    if (!content) return;
    if(typeof html_beautify !== 'undefined') {
        originalTextArea.value = html_beautify(content, { 
            indent_size: 4,
            wrap_line_length: 80
        });
    }
});

document.getElementById('btnFormatJs').addEventListener('click', () => {
    const content = originalTextArea.value;
    if (!content) return;
    if(typeof js_beautify !== 'undefined') {
        originalTextArea.value = js_beautify(content, { 
            indent_size: 4,
            space_in_empty_paren: true
        });
    }
});

document.getElementById('clearBtn').addEventListener('click', () => {
    originalTextArea.value = '';
    newTextArea.value = '';

    const resultContainer = document.getElementById('resultContainer');
    const noChangeMsg = document.getElementById('noChangeMsg');
    const diffOutput = document.getElementById('diffOutput');
    const outputOriginal = document.getElementById('outputOriginal');
    const outputNew = document.getElementById('outputNew');

    resultContainer.classList.add('hidden');
    noChangeMsg.classList.add('hidden');
    diffOutput.classList.add('hidden');
    diffOutput.classList.remove('grid');

    outputOriginal.innerHTML = '';
    outputNew.innerHTML = '';
});

function renderDiffWithLineNumbers(diff, type) {
    let lines = []; 
    let currentLine = []; 

    diff.forEach((part) => {
        if (type === 'original' && part.added) return;
        if (type === 'new' && part.removed) return;

        let className = '';
        if (part.removed) className = 'bg-red-200 text-red-900 line-through decoration-red-900 rounded-sm';
        if (part.added) className = 'bg-green-200 text-green-900 font-bold rounded-sm';

        const parts = part.value.split('\n');

        parts.forEach((text, index) => {
            if (index > 0) {
                lines.push(currentLine);
                currentLine = [];
            }
            if (text) {
                currentLine.push({ text: text, className: className });
            }
        });
    });
    lines.push(currentLine);

    let html = '';
    lines.forEach((lineSpans, index) => {
        const lineNumber = index + 1;

        let lineContentHtml = '';
        if (lineSpans.length === 0) {
            lineContentHtml = '&nbsp;'; 
        } else {
            lineSpans.forEach(span => {
                const safeText = span.text.replace(/&/g, "&amp;")
                                        .replace(/</g, "&lt;")
                                        .replace(/>/g, "&gt;")
                                        .replace(/"/g, "&quot;")
                                        .replace(/'/g, "&#039;");
                
                if (span.className) {
                    lineContentHtml += `<span class="${span.className}">${safeText}</span>`;
                } else {
                    lineContentHtml += safeText;
                }
            });
        }
        
        html += `
            <div class="flex flex-row hover:bg-slate-100 items-stretch min-w-full w-max group">
                <div class="w-8 shrink-0 text-right pr-2 text-slate-400 select-none border-r border-slate-300 bg-slate-50 text-sm leading-none py-[2px] font-mono group-hover:bg-slate-200 sticky left-0 z-10 shadow-[1px_0_2px_rgba(0,0,0,0.05)]">
                    ${lineNumber}
                </div>
                <div class="flex-1 pl-2 whitespace-pre text-sm leading-none py-[2px] font-mono text-slate-700">
                    ${lineContentHtml}
                </div>
            </div>
        `;
    });

    return html;
}

document.getElementById('compareBtn').addEventListener('click', function() {
    const originalText = originalTextArea.value;
    const newText = newTextArea.value;

    const resultContainer = document.getElementById('resultContainer');
    const noChangeMsg = document.getElementById('noChangeMsg');
    const diffOutput = document.getElementById('diffOutput');
    const outputOriginal = document.getElementById('outputOriginal');
    const outputNew = document.getElementById('outputNew');

    resultContainer.classList.remove('hidden');
    noChangeMsg.classList.add('hidden');
    diffOutput.classList.add('hidden');
    diffOutput.classList.remove('grid');
    outputOriginal.innerHTML = '';
    outputNew.innerHTML = '';

    if (originalText === newText) {
        noChangeMsg.classList.remove('hidden');
        resultContainer.scrollIntoView({ behavior: 'smooth' });
        return;
    }

    diffOutput.classList.remove('hidden');
    diffOutput.classList.add('grid');

    const diff = Diff.diffWords(originalText, newText);

    outputOriginal.innerHTML = renderDiffWithLineNumbers(diff, 'original');
    outputNew.innerHTML = renderDiffWithLineNumbers(diff, 'new');

    setTimeout(() => {
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
});

const containerOriginal = document.getElementById('outputOriginal');
const containerNew = document.getElementById('outputNew');

const syncScroll = (source, target) => {
    target.scrollLeft = source.scrollLeft;
};

containerOriginal.addEventListener('scroll', function() {
    if (containerOriginal.matches(':hover')) {
        syncScroll(containerOriginal, containerNew);
    }
});

containerNew.addEventListener('scroll', function() {
    if (containerNew.matches(':hover')) {
        syncScroll(containerNew, containerOriginal);
    }
});