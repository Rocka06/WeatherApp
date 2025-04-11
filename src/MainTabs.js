const tabs = document.querySelectorAll('.tab');
let isTransitioning = false;

tabs.forEach(tab => {

    if (tabs[0].dataset.tab === tab.dataset.tab) {
        tab.classList.add("tab-active");
    }

    let content = document.querySelector(`#${tab.dataset.tab}`);
    if (!tab.classList.contains("tab-active"))
        content.classList.add("hidden");

    tab.addEventListener('click', () => {
        if (tab.classList.contains("tab-active") || isTransitioning) return;

        const activeTab = document.querySelector('.tab-active').dataset.tab;
        const oldContent = document.getElementById(activeTab);
        const newContent = document.getElementById(tab.dataset.tab);

        isTransitioning = true;

        oldContent.classList.remove("hidden");
        tabs.forEach(tab1 => {
            tab1.classList.remove("tab-active");
            if (tab1.dataset.tab === tab.dataset.tab) {
                tab1.classList.add("tab-active");
            }
        });

        oldContent.classList.remove('fade-slide-in');
        oldContent.classList.add('fade-slide-out');

        setTimeout(() => {
            oldContent.classList.add('hidden');
            oldContent.classList.remove('fade-slide-out');

            newContent.classList.remove('hidden');
            newContent.classList.add('fade-slide-in');
            isTransitioning = false;
        }, 250);

        setTimeout(() => {
            newContent.classList.remove('fade-slide-in');
        }, 500);
    });
});