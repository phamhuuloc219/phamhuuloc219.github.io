const headerHTML = `
  <header class="fixed w-full z-30 bg-white/60 backdrop-blur-md border-b border-white/20">
    <div class="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
      <a href="/" class="flex items-center gap-3">
        <img src="https://raw.githubusercontent.com/phamhuuloc219/phamhuuloc219.github.io/refs/heads/main/images/phl.png" alt="phl" class="w-10 h-10 rounded-full" />
        <div>
          <div class="text-sm font-semibold">Pham Huu Loc</div>
          <div class="text-xs text-slate-600">.NET Developer</div>
        </div>
      </a>
      <nav class="hidden md:flex gap-6 items-center text-sm">
        <a href="/#about" class="hover:text-tet-red transition">About</a>
        <a href="/#skills" class="hover:text-tet-red transition">Skills</a>
        <a href="/#projects" class="hover:text-tet-red transition">Projects</a>
        <a href="/#contact" class="hover:text-tet-red transition">Contact</a>

        <div class="relative group">
          <a href="javascript:;" class="flex items-center gap-1 hover:text-tet-red transition py-2">
            Tools
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:rotate-180">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </a>

          <div class="absolute right-0 top-full pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div class="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden py-1">
              <a href="/text-compare" class="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-red-50 hover:text-tet-red transition">
                <svg fill="#000000" width="16px" height="16px" viewBox="0 0 0.48 0.48" xmlns="http://www.w3.org/2000/svg"><path d="M0.02 0.16A0.02 0.02 0 0 1 0.04 0.14h0.152L0.146 0.094A0.02 0.02 0 1 1 0.174 0.066l0.08 0.08a0.02 0.02 0 0 1 0 0.028l-0.08 0.08A0.02 0.02 0 1 1 0.146 0.226L0.192 0.18H0.04A0.02 0.02 0 0 1 0.02 0.16m0.42 0.14H0.288L0.334 0.254A0.02 0.02 0 0 0 0.306 0.226l-0.08 0.08a0.02 0.02 0 0 0 0 0.028l0.08 0.08A0.02 0.02 0 0 0 0.334 0.386L0.288 0.34H0.44a0.02 0.02 0 0 0 0 -0.04"/></svg>
                Text Compare
              </a>
              <a href="/remove-code-comments" class="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-red-50 hover:text-tet-red transition">
                <svg fill="#000000" width="18px" height="18px" viewBox="0 0 0.54 0.54" xmlns="http://www.w3.org/2000/svg"><path d="M0.067 0.27h0.135A0.026 0.026 0 0 0 0.225 0.248V0.113A0.026 0.026 0 0 0 0.203 0.09H0.067a0.026 0.026 0 0 0 -0.022 0.023v0.135a0.026 0.026 0 0 0 0.023 0.023M0.09 0.135h0.09v0.09H0.09ZM0.293 0.18h0.18a0.023 0.023 0 0 0 0 -0.045h-0.18a0.023 0.023 0 0 0 0 0.045m0 0.225H0.068a0.023 0.023 0 0 0 0 0.045h0.225a0.023 0.023 0 0 0 0 -0.045m0.179 -0.09H0.067a0.023 0.023 0 0 0 0 0.045h0.405a0.023 0.023 0 0 0 0 -0.045m0 -0.09H0.293a0.023 0.023 0 0 0 0 0.045h0.18a0.023 0.023 0 0 0 0 -0.045"/></svg>
                Remove Code Comments
              </a>
              <a href="/translate" class="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-red-50 hover:text-tet-red transition">
                <svg fill="#000000" width="18px" height="18px" viewBox="0 0 0.54 0.54" xmlns="http://www.w3.org/2000/svg"><path d="M0.067 0.27h0.135A0.026 0.026 0 0 0 0.225 0.248V0.113A0.026 0.026 0 0 0 0.203 0.09H0.067a0.026 0.026 0 0 0 -0.022 0.023v0.135a0.026 0.026 0 0 0 0.023 0.023M0.09 0.135h0.09v0.09H0.09ZM0.293 0.18h0.18a0.023 0.023 0 0 0 0 -0.045h-0.18a0.023 0.023 0 0 0 0 0.045m0 0.225H0.068a0.023 0.023 0 0 0 0 0.045h0.225a0.023 0.023 0 0 0 0 -0.045m0.179 -0.09H0.067a0.023 0.023 0 0 0 0 0.045h0.405a0.023 0.023 0 0 0 0 -0.045m0 -0.09H0.293a0.023 0.023 0 0 0 0 0.045h0.18a0.023 0.023 0 0 0 0 -0.045"/></svg>
                Translate
              </a>
            </div>
          </div>
        </div>
      </nav>

      <button id="navToggle" class="md:hidden p-2 rounded-lg border ml-2">☰</button>
    </div>

    <div id="mobileMenu" class="md:hidden hidden border-t border-white/20 bg-white/90 backdrop-blur-sm shadow-lg absolute w-full left-0 z-40">
      <div class="px-6 py-4 flex flex-col gap-3 font-medium text-slate-700">
        <a href="/#about" class="py-2 hover:text-tet-red transition">About</a>
        <a href="/#skills" class="py-2 hover:text-tet-red transition">Skills</a>
        <a href="/#projects" class="py-2 hover:text-tet-red transition">Projects</a>
        <a href="/#contact" class="py-2 hover:text-tet-red transition">Contact</a>

        <div>
          <button id="mobileToolsBtn" class="w-full flex justify-between items-center py-2 hover:text-tet-red transition group">
            <span>Tools</span>
            <svg id="mobileToolsIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          <div id="mobileToolsDropdown" class="hidden flex-col gap-2 pl-4 mt-1 border-l-2 border-slate-200">
            <a href="/text-compare" class="flex items-center gap-2 py-2 text-sm text-slate-600 hover:text-tet-red transition">
              Text Compare
            </a>
            <a href="/remove-code-comments" class="flex items-center gap-2 py-2 text-sm text-slate-600 hover:text-tet-red transition">
              Remove Code Comments
            </a>
            <a href="/translate" class="flex items-center gap-2 py-2 text-sm text-slate-600 hover:text-tet-red transition">
              Translate
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
`;

const footerHTML = `
  <footer class="max-w-5xl mx-auto px-6 py-8 text-center text-sm text-slate-500 w-full">
    © <span id="year"></span> Designed and developed by <a href="https://phamhuuloc219.github.io" target="_blank" class="font-bold hover:text-white transition-colors underline decoration-sky-400 underline-offset-2">Pham Huu Loc</a>.
  </footer>
`;

function initMobileMenu() {
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
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {

            if (!mobileMenu.contains(e.target) && !navToggle.contains(e.target)) {
                mobileMenu.classList.add('hidden');

                if(mobileToolsDropdown) mobileToolsDropdown.classList.add('hidden');
                if(mobileToolsIcon) mobileToolsIcon.classList.remove('rotate-180');
            }
        }
    });
}

function loadLayout() {

    const headerPlaceholder = document.getElementById('app-header');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerHTML;
        initMobileMenu(); 
    }

    const footerPlaceholder = document.getElementById('app-footer');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;

        const yearEl = document.getElementById('year');
        if(yearEl) yearEl.innerText = new Date().getFullYear();
    }
}

document.addEventListener('DOMContentLoaded', loadLayout);


const errorModal = document.getElementById('errorModal');
const errorMessage = document.getElementById('errorMessage');
const closeModalBtn = document.getElementById('closeModalBtn');
const closeModalIcon = document.getElementById('closeModalIcon');

function showError(msg) {
    if (errorMessage) errorMessage.textContent = msg;
    if (errorModal) errorModal.classList.remove('hidden');
}

function hideError() {
    if (errorModal) errorModal.classList.add('hidden');
}

if (closeModalBtn) closeModalBtn.addEventListener('click', hideError);
if (closeModalIcon) closeModalIcon.addEventListener('click', hideError);

if (errorModal) {
    errorModal.addEventListener('click', (e) => {
        if (e.target === errorModal) hideError();
    });
}