const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');
let activeTab = document.querySelector('.tab-active').dataset.tab;
let isTransitioning = false;

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        if (tab.dataset.tab === activeTab || isTransitioning) return;

        isTransitioning = true;

        document.querySelector(`.tab[data-tab="${activeTab}"]`).classList.remove('tab-active');

        tab.classList.add('tab-active');

        const oldContent = document.getElementById(activeTab);
        const newContent = document.getElementById(tab.dataset.tab);

        oldContent.classList.remove('fade-slide-in');
        oldContent.classList.add('fade-slide-out');

        setTimeout(() => {
            oldContent.classList.add('hidden');
            oldContent.classList.remove('fade-slide-out');

            newContent.classList.remove('hidden');
            newContent.classList.add('fade-slide-in');
            activeTab = tab.dataset.tab;
            isTransitioning = false;
        }, 500);
    });
});