// --- CONFIG LOGIC ---
const FAIR_MODE_PASS = "8888";
let isFairMode = false;
let spinHistory = [];

const difficultyWeights = {
  0: 100, 1: 100, 2: 100, 3: 20, 4: 10, 5: 1,
};

let prizes = [
  { value: "10k", id: "q-10", quantity: 0 },
  { value: "20k", id: "q-20", quantity: 0 },
  { value: "50k", id: "q-50", quantity: 0 },
  { value: "100k", id: "q-100", quantity: 0 },
  { value: "200k", id: "q-200", quantity: 0 },
  { value: "500k", id: "q-500", quantity: 0 },
];

let currentRotation = 0;
let isSpinning = false;
let availablePool = [];

// --- 1. INIT & CHECK LOCALSTORAGE ---
window.onload = function() {
  const savedData = localStorage.getItem('lixi_data');
  
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    prizes = parsedData.prizes;
    spinHistory = parsedData.history || [];
    
    rebuildPoolFromPrizes();
    updateInventoryUI();
    renderHistoryUI();
    checkSpinButton();
  }else {
    document.getElementById('setup-modal').style.display = 'flex';
  }
  
  const savedSound = localStorage.getItem('lixi_sound');
  if (savedSound !== null) {
      isSoundOn = (savedSound === 'true');
  }
  applySoundSettings();
};

function submitSetup() {
    availablePool = [];
    prizes.forEach((prize, index) => {
        const input = document.getElementById(prize.id);
        const qty = parseInt(input.value) || 0;
        prize.quantity = qty;
        for (let i = 0; i < qty; i++) availablePool.push(index);
    });

    if (availablePool.length === 0) {
        showNotify("Vui lòng nhập ít nhất 1 tờ tiền!");
        return;
    }
    saveData();
    document.getElementById('setup-modal').style.display = 'none';
    updateInventoryUI();
    checkSpinButton();
    toggleMenu();
}

function openSetupModal() {
    prizes.forEach(p => {
        const el = document.getElementById(p.id);
        if(el) el.value = p.quantity;
    });
    document.getElementById('setup-modal').style.display = 'flex';
    toggleMenu();
}

function rebuildPoolFromPrizes() {
    availablePool = [];
    prizes.forEach((prize, index) => {
        for (let i = 0; i < prize.quantity; i++) availablePool.push(index);
    });
}

function saveData() {
    const dataToSave = { 
        prizes: prizes,
        history: spinHistory
    };
    localStorage.setItem('lixi_data', JSON.stringify(dataToSave));
}

function checkSpinButton() {
    const btn = document.getElementById("spin-btn");
    if (availablePool.length > 0) {
        btn.disabled = false;
        btn.innerText = "QUAY NGAY";
    } else {
        btn.disabled = true;
        btn.innerText = "HẾT TIỀN";
    }
}

function toggleMenu() {
    const menu = document.getElementById('offcanvas-menu');
    const overlay = document.getElementById('menu-overlay');
    if (menu.classList.contains('-translate-x-full')) {
        menu.classList.remove('-translate-x-full');
        menu.classList.add('translate-x-0');
        overlay.classList.remove('invisible', 'opacity-0');
        overlay.classList.add('visible', 'opacity-100');
    } else {
        menu.classList.remove('translate-x-0');
        menu.classList.add('-translate-x-full');
        overlay.classList.remove('visible', 'opacity-100');
        overlay.classList.add('invisible', 'opacity-0');
    }
}

function getWeightedRandomIndex() {
  if (isFairMode) {
      console.log("Nhân phẩm");
      return Math.floor(Math.random() * availablePool.length);
  }

  let totalWeight = 0;
  availablePool.forEach((prizeIndex) => totalWeight += difficultyWeights[prizeIndex]);
  let randomValue = Math.random() * totalWeight;
  let selectedIndexInPool = -1;
  for (let i = 0; i < availablePool.length; i++) {
    let weight = difficultyWeights[availablePool[i]];
    if (randomValue < weight) { selectedIndexInPool = i; break; }
    randomValue -= weight;
  }
  return selectedIndexInPool;
}

function spinWheel() {
  if (isSpinning) return;
  if (availablePool.length === 0) {
    showNotify("Hết tiền rồi!");
    checkSpinButton();
    return;
  }
  isSpinning = true;
  document.getElementById("spin-btn").disabled = true;

  const spinAudio = document.getElementById('sound-spin');
  if(spinAudio) { spinAudio.currentTime = 0; spinAudio.play().catch(e=>{}); }

  const poolIndex = getWeightedRandomIndex();
  const winningPrizeIndex = availablePool[poolIndex];

  availablePool.splice(poolIndex, 1);
  prizes[winningPrizeIndex].quantity--;
  addToHistory(prizes[winningPrizeIndex].value);

  saveData();

  const segmentAngle = 360 / prizes.length;
  const targetAngleInWheel = winningPrizeIndex * segmentAngle + segmentAngle / 2;
  const rotateOffset = 60;
  const stopAngle = 360 - targetAngleInWheel + rotateOffset;
  const extraSpins = 5;
  const newRotation = currentRotation + 360 * extraSpins + (stopAngle - (currentRotation % 360));
  const finalRotation = newRotation < currentRotation ? newRotation + 360 : newRotation;
  currentRotation = finalRotation;

  document.getElementById("wheel").style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    isSpinning = false;
    if(spinAudio) spinAudio.pause();
    const winAudio = document.getElementById('sound-win');
    if(winAudio) winAudio.play().catch(e=>{});
    runConfetti();
    showResult(prizes[winningPrizeIndex].value);
    updateInventoryUI();
    checkSpinButton();
  }, 4150);
}

function runConfetti() {
    if(typeof confetti === 'function') confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#d32f2f', '#fbc02d', '#ffffff'] });
}

function showResult(value) {
  document.getElementById("result-text").innerText = value;
  document.getElementById("result-modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("result-modal").style.display = "none";
}

function updateInventoryUI() {
  const list = document.getElementById("inventory-list");
  list.innerHTML = "";
  let total = 0;
  prizes.forEach((p) => {
    const item = document.createElement("div");
    item.className = "inv-item flex justify-between p-3 border-b border-gray-100";
    item.innerHTML = `<span>${p.value}</span> <b class="text-tet-red">${p.quantity} tờ</b>`;
    if (p.quantity > 0) list.appendChild(item);
    total += p.quantity;
  });
  if (total === 0) list.innerHTML = '<div style="text-align:center; color:red; font-weight:bold; padding:20px;">HẾT SẠCH TIỀN! 💸</div>';
}

// --- LOGIC CONFIRM RESET ---

function hardReset() {
    toggleMenu();
    document.getElementById('reset-modal').style.display = 'flex';
}

function closeResetModal() {
    document.getElementById('reset-modal').style.display = 'none';
    toggleMenu(); 
}

function confirmHardReset() {
    localStorage.removeItem('lixi_data');
    location.reload();
}

// --- SOUND LOGIC ---
let isSoundOn = true;
const iconSoundOn = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg>`;
const iconSoundOff = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /><path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18" opacity="0.7" /></svg>`;

function toggleSound() {
    isSoundOn = !isSoundOn;
    applySoundSettings();
}

function applySoundSettings() {
    const btn = document.getElementById('sound-btn');
    const audioSpin = document.getElementById('sound-spin');
    const audioWin = document.getElementById('sound-win');
    if(audioSpin) audioSpin.muted = !isSoundOn;
    if(audioWin) audioWin.muted = !isSoundOn;
    
    if (isSoundOn) {
        btn.innerHTML = iconSoundOn;
        btn.classList.remove('opacity-50', 'text-gray-400');
        btn.classList.add('text-tet-red');
    } else {
        btn.innerHTML = iconSoundOff;
        btn.classList.add('opacity-50', 'text-gray-400');
        btn.classList.remove('text-tet-red');
    }
    localStorage.setItem('lixi_sound', isSoundOn);
}

// --- HISTORY ---

function addToHistory(value) {
    const now = new Date();
    const timeString = now.getHours() + ":" + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    spinHistory.unshift({ value: value, time: timeString });
    renderHistoryUI();
}

function renderHistoryUI() {
    const container = document.getElementById('history-list');
    if (!container) return;
    if (spinHistory.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-400 italic text-xs">Chưa có lượt quay</p>';
        return;
    }
    let html = '';
    spinHistory.forEach(item => {
        let colorClass = 'text-gray-700';
        if(item.value.includes('500k') || item.value.includes('200k')) colorClass = 'text-red-600 font-bold';
        html += `
            <div class="flex justify-between items-center bg-gray-50 p-2 rounded border border-gray-100">
                <span class="text-xs text-gray-500 font-mono">${item.time}</span>
                <span class="${colorClass}">${item.value}</span>
            </div>
        `;
    });
    container.innerHTML = html;
}

function clearHistory() {
    if(confirm("Xóa lịch sử?")) {
        spinHistory = [];
        saveData();
        renderHistoryUI();
    }
}

// Secret Checkbox
function handleSecretTrigger() {
    const checkbox = document.getElementById('fair-mode-trigger');
    if (checkbox.checked) {
        document.getElementById('secret-modal').style.display = 'flex';
        document.getElementById('secret-input').value = '';
        document.getElementById('secret-input').focus();
    } else {
        isFairMode = false;
    }
}

function closeSecretModal() {
    document.getElementById('secret-modal').style.display = 'none';
    if (!isFairMode) document.getElementById('fair-mode-trigger').checked = false;
}

function confirmSecretPass() {
    const input = document.getElementById('secret-input').value;
    if (input === FAIR_MODE_PASS) {
        isFairMode = true;
        document.getElementById('secret-modal').style.display = 'none';
    } else {
        showNotify("Sai mật khẩu!");
        document.getElementById('secret-input').value = '';
    }
}

// --- LOGIC MODAL NOTIFICATION ---
const errorModal = document.getElementById('errorModal');
const errorMessage = document.getElementById('errorMessage');
const closeModalBtn = document.getElementById('closeModalBtn');
const closeModalIcon = document.getElementById('closeModalIcon');

function showNotify(msg) {
    if (errorMessage) errorMessage.textContent = msg;
    if (errorModal) {
        errorModal.classList.remove('hidden');
        errorModal.firstElementChild.classList.remove('scale-95', 'opacity-0');
        errorModal.firstElementChild.classList.add('scale-100', 'opacity-100');
    }
}

function hideError() {
    if (errorModal) {
        errorModal.classList.add('hidden');
    }
}

if (closeModalBtn) closeModalBtn.addEventListener('click', hideError);
if (closeModalIcon) closeModalIcon.addEventListener('click', hideError);

if (errorModal) {
    errorModal.addEventListener('click', (e) => {
        if (e.target === errorModal) hideError();
    });
}