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
// خاص للنافبار
(function () {
    var links = document.querySelectorAll('nav .navbar-nav .nav-link');
    if (!links.length) return;

    // اسم الصفحة الحالية (index.html إذا كان الرابط بدون اسم ملف)
    function fileOf(path) {
        return path.split('/').pop() || 'index.html';
    }
    var page = document.body.dataset.nav || fileOf(location.pathname);

    // يزيل اللون من الكل ويضعه على رابط واحد
    function setActive(link) {
        links.forEach(function (l) {
            l.classList.remove('active');
            l.removeAttribute('aria-current');
        });
        if (link) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    }

    var current = null;
    links.forEach(function (link) {
        var url = new URL(link.getAttribute('href'), location.href);
        var file = fileOf(url.pathname);
        var samePage = file === fileOf(location.pathname);

        // رابط لصفحة كاملة (بدون #) يطابق الصفحة الحالية
        if (file === page && !url.hash) current = link;
        // فتحنا الصفحة على قسم معيّن (مثلاً index.html#search)
        if (samePage && url.hash && url.hash === location.hash) current = link;

        // الضغط على رابط قسم في نفس الصفحة: يتلوّن فوراً
        link.addEventListener('click', function () {
            if (samePage && url.hash) setActive(link);
        });
    });

    setActive(current);
})();
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
// إظهار / إخفاء كلمة المرور
(function () {
    var btn = document.getElementById('showPassword');
    var input = document.getElementById('password');
    if (!btn || !input) return;
    btn.addEventListener('click', function () {
        var show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        btn.querySelector('i').className = show ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
        btn.setAttribute('aria-label', show ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور');
    });
})();
