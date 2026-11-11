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
// ======submit.html :: start======
const proposal = document.querySelector('.proposal');
if (proposal) {

    // ---------- حساب صافي الأرباح ----------
    const price = document.getElementById('price');
    const offerValue = document.getElementById('offerValue');
    const fee = document.getElementById('fee');
    const net = document.getElementById('net');
    const money = (n) => '$' + n.toLocaleString('en-US', { maximumFractionDigits: 2 });

    function updateEarnings() {
        const value = Math.max(parseFloat(price.value) || 0, 0);
        const commission = value * 0.10;              // عمولة المنصة 10%
        offerValue.textContent = money(value);
        fee.textContent = '-' + money(commission);
        net.textContent = money(value - commission);
    }
    price.addEventListener('input', updateEarnings);
    updateEarnings();

    // ---------- عدّاد أحرف الرسالة ----------
    const message = document.getElementById('message');
    const count = document.getElementById('count');
    message.addEventListener('input', () => {
        count.textContent = message.value.length;
    });

    // ---------- مراحل التسليم ----------
    const milestones = document.getElementById('milestones');
    const addMilestone = document.getElementById('addMilestone');

    function renumber() {
        milestones.querySelectorAll('.a1 .b1').forEach((el, i) => {
            el.textContent = i + 1;
        });
    }

    addMilestone.addEventListener('click', () => {
        const row = document.createElement('div');
        row.className = 'a1';
        row.innerHTML = `
            <span class="b1"></span>
            <input type="text" class="b2" placeholder="اسم المرحلة">
            <input type="text" class="b3" placeholder="$0" inputmode="numeric">
            <button type="button" class="b4" aria-label="حذف المرحلة"><i class="fa-regular fa-trash-can"></i></button>
        `;
        milestones.appendChild(row);
        renumber();
        row.querySelector('.b2').focus();
    });

    milestones.addEventListener('click', (e) => {
        const del = e.target.closest('.b4');
        if (del) {
            del.closest('.a1').remove();
            renumber();
        }
    });

    // إضافة $ تلقائياً قبل المبلغ
    milestones.addEventListener('blur', (e) => {
        if (e.target.classList.contains('b3')) {
            const n = e.target.value.replace(/[^\d.]/g, '');
            e.target.value = n ? '$' + n : '';
        }
    }, true);

    // ---------- المرفقات (سحب وإفلات) ----------
    const dropZone = document.getElementById('dropZone');
    const files = document.getElementById('files');
    const fileList = document.getElementById('fileList');
    const MAX_SIZE = 20 * 1024 * 1024;   // 20MB

    function showFiles(list) {
        fileList.innerHTML = '';
        Array.from(list).forEach((file) => {
            const li = document.createElement('li');
            const name = document.createElement('span');
            const size = document.createElement('span');
            name.className = 'a1';
            size.className = 'a2';
            name.textContent = file.name;
            if (file.size > MAX_SIZE) {
                li.classList.add('error');
                size.textContent = 'أكبر من 20MB';
            } else {
                size.textContent = (file.size / 1024 / 1024).toFixed(1) + ' MB';
            }
            li.append(name, size);
            fileList.appendChild(li);
        });
    }

    files.addEventListener('change', () => showFiles(files.files));

    ['dragenter', 'dragover'].forEach((ev) => {
        dropZone.addEventListener(ev, (e) => {
            e.preventDefault();
            dropZone.classList.add('drag');
        });
    });
    ['dragleave', 'drop'].forEach((ev) => {
        dropZone.addEventListener(ev, (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag');
        });
    });
    dropZone.addEventListener('drop', (e) => {
        files.files = e.dataTransfer.files;
        showFiles(files.files);
    });
}
// ======submit.html :: end======
// أي صورة فيها data-dark بيتغير مسارها لما تتحول للوضع الداكن
const themeImages = document.querySelectorAll('img[data-dark]');

function swapImages() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeImages.forEach((img) => {
        const next = isDark ? img.dataset.dark : img.dataset.light;
        if (img.getAttribute('src') !== next) {
            img.src = next;
        }
    });
}

// إذا نسخة الداكن مش موجودة بمجلد image، نرجع للصورة العادية بدل ما تظهر مكسورة
themeImages.forEach((img) => {
    img.addEventListener('error', () => {
        if (img.getAttribute('src') === img.dataset.dark) {
            img.src = img.dataset.light;
        }
    });
});

// أول ما تفتح الصفحة
swapImages();

// كل ما يتغير data-theme على <html> (زر القمر) نبدّل الصور
new MutationObserver(swapImages).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
});
// ======تبديل الصور حسب الوضع :: end======
// ======postjob.html :: start======
const project = document.querySelector('.project');
if (project) {

    // ---------- نوع العقد (سعر ثابت / بالساعة) ----------
    const contractCards = project.querySelectorAll('.m2 .p2 .s2 label');
    const minLabel = project.querySelector('label[for="min"]');
    const maxLabel = project.querySelector('label[for="max"]');

    contractCards.forEach((card) => {
        card.querySelector('input').addEventListener('change', () => {
            contractCards.forEach((c) => c.classList.remove('active'));
            card.classList.add('active');

            // نغيّر عناوين الميزانية حسب النوع
            const hourly = card.querySelector('input').value === 'hourly';
            minLabel.textContent = hourly ? 'أقل سعر للساعة (USD)' : 'الحد الأدنى (USD)';
            maxLabel.textContent = hourly ? 'أعلى سعر للساعة (USD)' : 'الحد الأعلى (USD)';
        });
    });

    // ---------- التأكد إن الحد الأعلى مش أقل من الأدنى ----------
    const min = document.getElementById('min');
    const max = document.getElementById('max');
    max.addEventListener('change', () => {
        if (Number(max.value) < Number(min.value)) {
            max.value = min.value;
        }
    });

    // ---------- المرفقات (سحب وإفلات) ----------
    const dropZone = document.getElementById('dropZone');
    const files = document.getElementById('files');
    const fileList = document.getElementById('fileList');
    const MAX_SIZE = 20 * 1024 * 1024;   // 20MB

    function showFiles(list) {
        fileList.innerHTML = '';
        Array.from(list).forEach((file) => {
            const li = document.createElement('li');
            const name = document.createElement('span');
            const size = document.createElement('span');
            name.className = 's1';
            size.className = 's2';
            name.textContent = file.name;
            if (file.size > MAX_SIZE) {
                li.classList.add('error');
                size.textContent = 'أكبر من 20MB';
            } else {
                size.textContent = (file.size / 1024 / 1024).toFixed(1) + ' MB';
            }
            li.append(name, size);
            fileList.appendChild(li);
        });
    }

    files.addEventListener('change', () => showFiles(files.files));

    ['dragenter', 'dragover'].forEach((ev) => {
        dropZone.addEventListener(ev, (e) => {
            e.preventDefault();
            dropZone.classList.add('drag');
        });
    });
    ['dragleave', 'drop'].forEach((ev) => {
        dropZone.addEventListener(ev, (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag');
        });
    });
    dropZone.addEventListener('drop', (e) => {
        files.files = e.dataTransfer.files;
        showFiles(files.files);
    });
}
// ======postjob.html :: end======
// ======cheakout.html :: start======
// أضف هذا الكود في آخر js/custom.js — يعمل فقط بصفحة إتمام الدفع
const checkout = document.querySelector('.checkout');
if (checkout) {

    // ---------- اختيار طريقة الدفع ----------
    const methods = checkout.querySelectorAll('.m1 .p2 label');
    const cardBox = document.getElementById('cardBox');
    const payBtn = document.getElementById('payBtn');
    const total = document.getElementById('total').textContent.replace('$', '');

    methods.forEach((method) => {
        method.querySelector('input').addEventListener('change', () => {
            methods.forEach((m) => m.classList.remove('active'));
            method.classList.add('active');

            const value = method.querySelector('input').value;
            // بيانات البطاقة تظهر بس لما تختار البطاقة
            cardBox.classList.toggle('hide', value !== 'card');
            // نص الزر حسب الطريقة
            if (value === 'paypal') {
                payBtn.innerHTML = 'تابع إلى PayPal';
            } else if (value === 'support') {
                payBtn.innerHTML = 'تواصل مع الدعم الفني';
            } else {
                payBtn.innerHTML = 'ادفع <span>' + total + '$</span>';
            }
        });
    });

    // ---------- رقم البطاقة: أرقام فقط ومسافة بعد كل 4 ----------
    const cardNumber = document.getElementById('cardNumber');
    cardNumber.addEventListener('input', () => {
        const digits = cardNumber.value.replace(/\D/g, '').slice(0, 19);
        cardNumber.value = digits.replace(/(\d{4})(?=\d)/g, '$1  ');
    });

    // ---------- تاريخ الانتهاء: MM / YY ----------
    const cardExp = document.getElementById('cardExp');
    cardExp.addEventListener('input', (e) => {
        let digits = cardExp.value.replace(/\D/g, '').slice(0, 4);
        // إذا مسح المستخدم، ما نرجّع الشرطة
        if (e.inputType === 'deleteContentBackward') {
            cardExp.value = digits.length > 2 ? digits.slice(0, 2) + ' / ' + digits.slice(2) : digits;
            return;
        }
        if (digits.length >= 2) {
            // الشهر ما بيزيد عن 12
            let month = Math.min(Math.max(parseInt(digits.slice(0, 2), 10), 1), 12);
            digits = String(month).padStart(2, '0') + digits.slice(2);
            cardExp.value = digits.slice(0, 2) + ' / ' + digits.slice(2);
        } else {
            cardExp.value = digits;
        }
    });

    // ---------- CVC: أرقام فقط ----------
    const cardCvc = document.getElementById('cardCvc');
    cardCvc.addEventListener('input', () => {
        cardCvc.value = cardCvc.value.replace(/\D/g, '').slice(0, 4);
    });
}
// ======cheakout.html :: end======
