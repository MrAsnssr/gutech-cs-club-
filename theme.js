document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.classList.add(currentTheme);

        if (currentTheme === 'light-mode') {
            themeToggle.checked = true;
        }
    }

    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        } else {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark-mode');
        }
    });
});
