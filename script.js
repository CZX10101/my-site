// --- 1. 全局主题切换 ---
const themeBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);
if (themeBtn) {
    themeBtn.innerText = currentTheme === 'dark' ? '☀️' : '🌙';
    themeBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeBtn.innerText = newTheme === 'dark' ? '☀️' : '🌙';
    });
}

// --- 2. 名言卡片无缝翻转 ---
const nextQuoteBtn = document.getElementById('next-quote');
const flipInner = document.getElementById('flip-inner');
if (nextQuoteBtn && flipInner) {
    const quotes = [
        { text: "Darkness cannot drive out darkness.", author: "Martin Luther King Jr." },
        { text: "Knowledge is power.", author: "Francis Bacon" },
        { text: "I think, therefore I am.", author: "René Descartes" },
        { text: "The unexamined life is not worth living.", author: "Socrates" },
        { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" }
    ];
    let qIndex = 0;
    nextQuoteBtn.addEventListener('click', () => {
        flipInner.classList.toggle('flipped');
        if (flipInner.classList.contains('flipped')) {
            qIndex = (qIndex + 1) % quotes.length;
            setTimeout(() => {
                document.getElementById('quote-text').innerText = `"${quotes[qIndex].text}"`;
                document.getElementById('quote-author').innerText = `- ${quotes[qIndex].author}`;
            }, 300);
        }
    });
}

// --- 3. 项目页 3D 倾斜（丝滑性能版） ---
const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach(card => {
    let requestID;
    let mouseX = 0;
    let mouseY = 0;
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        if (requestID) cancelAnimationFrame(requestID);
        requestID = requestAnimationFrame(() => {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((mouseY - centerY) / centerY) * -8;
            const rotateY = ((mouseX - centerX) / centerX) * 8;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
    });
    card.addEventListener('mouseleave', () => {
        cancelAnimationFrame(requestID);
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
    });
});

// --- 4. 无用机器拒绝逻辑 ---
const robotCheck = document.getElementById('robot-check');
if (robotCheck) {
    robotCheck.addEventListener('change', () => {
        const msg = document.getElementById('captcha-msg');
        if (robotCheck.checked) {
            msg.innerText = "[ERROR] Robots are too smart. Verification failed.";
            setTimeout(() => {
                robotCheck.checked = false;
                msg.innerText = "";
            }, 2000);
        }
    });
}