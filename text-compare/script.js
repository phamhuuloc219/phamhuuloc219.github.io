document.getElementById('compareBtn').addEventListener('click', function() {
    const originalText = document.getElementById('originalText').value;
    const newText = document.getElementById('newText').value;
    
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
    const fragmentOriginal = document.createDocumentFragment();
    const fragmentNew = document.createDocumentFragment();

    diff.forEach((part) => {
        const removedClass = "bg-red-300 text-red-900 line-through decoration-red-900 px-1 rounded mx-0.5";
        
        const addedClass = "bg-green-300 text-green-900 font-bold px-1 rounded mx-0.5";

        if (!part.added) {
            const span = document.createElement('span');
            span.textContent = part.value;
            if (part.removed) {
                span.className = removedClass;
            }
            fragmentOriginal.appendChild(span);
        }

        if (!part.removed) {
            const span = document.createElement('span');
            span.textContent = part.value;
            if (part.added) {
                span.className = addedClass;
            }
            fragmentNew.appendChild(span);
        }
    });

    outputOriginal.appendChild(fragmentOriginal);
    outputNew.appendChild(fragmentNew);

    setTimeout(() => {
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
});