document.addEventListener('DOMContentLoaded', () => {
    // 1. تحديد جميع الأزرار داخل حاوية الـ a1
    const buttons = document.querySelectorAll('.a1 button');

    // 2. إضافة حدث الضغط لكل زر
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            
            // أ. البحث عن الزر المفعّل حالياً (الذي يمتلك كلاس b1) وحذفه منه
            const currentActive = document.querySelector('.a1 button.b1');
            if (currentActive) {
                currentActive.classList.remove('b1');
            }
            
            // ب. إضافة كلاس b1 للزر الجديد لتفعيل التصميم الداكن عليه
            this.classList.add('b1');
            
        });
    });
});
window.addEventListener('load', function() {
    const splash = document.getElementById('splash-screen');
    
    // تأخير بسيط ليرى المستخدم اللوغو بشكل مريح
    setTimeout(function() {
        splash.classList.add('fade-out');
    }, 2000);
});
//  theme.js — زر تبديل الوضع الليلي/النهاري لموقع حِرفة
(function () {
    const root = document.documentElement;
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    const icon = btn.querySelector('i');

    // يطبّق الوضع ويغيّر الأيقونة
    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        if (icon) {
            icon.className = theme === 'dark' ? 'fa-regular fa-sun' : 'fa-regular fa-moon';
        }
        btn.setAttribute('aria-pressed', theme === 'dark');
    }

    // الوضع الحالي 
    applyTheme(root.getAttribute('data-theme') || 'light');

    // عند الضغط: بدّل الوضع واحفظه
    btn.addEventListener('click', function () {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try { localStorage.setItem('theme', next); } catch (e) {}
    });
})();
