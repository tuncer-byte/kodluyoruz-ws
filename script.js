document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Adjust for sticky navbar
                    behavior: 'smooth'
                });

                // Close mobile menu on click
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // --- Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const startCounter = (counter) => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };

    // Intersection Observer for Counters
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));

    // --- Hero Video Handling ---
    // Video is handled by HTML attributes (autoplay, loop, muted)


    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerText;

            submitBtn.innerText = 'Gönderiliyor...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                alert('Mesajınız başarıyla iletildi! En kısa sürede size dönüş yapacağız.');
                contactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // --- Sticky Navbar Color Change ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY > 50;
            navbar.style.background = scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = scrolled ? '0 2px 15px rgba(0,0,0,0.1)' : '0 2px 10px rgba(0,0,0,0.05)';
        });
    }

    // --- Training Detail Data ---
    const trainingData = {
        'web-dev': {
            title: 'Full Stack Web Geliştirme',
            subtitle: 'Modern dünyayı inşa eden yazılımcılardan biri olun.',
            image: 'assets/images/training1.png',
            desc: 'Bu eğitim programı, sizi temelden ileri seviyeye bir web geliştirici olarak hazırlamak için tasarlanmıştır. HTML5, CSS3, Modern JavaScript ve React ekosistemi üzerine yoğunlaşan müfredatımız, gerçek dünya projeleriyle desteklenmektedir.',
            curriculum: ['HTML5 ve Semantik Web', 'CSS3, Flexbox ve Grid Layout', 'Modern JavaScript (ES6+)', 'React.js ile Bileşen Tabanlı Geliştirme', 'State Yönetimi ve Context API', 'API Entegrasyonu ve Veri Yönetimi'],
            reqs: 'Temel bilgisayar kullanım bilgisi ve öğrenme tutkusu yeterlidir. Herhangi bir ön kodlama bilgisi gerekmez.'
        },
        'data-science': {
            title: 'Veri Bilimi ve Yapay Zeka',
            subtitle: 'Verinin gücünü kullanarak geleceği tahmin edin.',
            image: 'assets/images/training2.png',
            desc: 'Veri bilimi dünyasına adım atın. Python programlama dilini kullanarak veri toplama, temizleme, analiz etme ve makine öğrenmesi modelleri oluşturma süreçlerini derinlemesine öğreneceksiniz.',
            curriculum: ['Python ile Programlamaya Giriş', 'NumPy ve Pandas ile Veri Manipülasyonu', 'Matplotlib ve Seaborn ile Görselleştirme', 'İstatistik ve Olasılık Temelleri', 'Scikit-learn ile Makine Öğrenmesi', 'Yapay Sinir Ağlarına Giriş'],
            reqs: 'Temel matematik bilgisi ve mantıksal düşünme becerisi gereklidir.'
        },
        'uiux': {
            title: 'UI/UX Tasarım Atölyesi',
            subtitle: 'Kullanıcıların seveceği deneyimler tasarlayın.',
            image: 'assets/images/training3.png',
            desc: 'Tasarım sadece nasıl göründüğü değil, nasıl çalıştığıdır. Bu atölyede kullanıcı deneyimi (UX) araştırmalarından, yüksek kaliteli kullanıcı arayüzü (UI) tasarımlarına kadar tüm süreci Figma üzerinden öğreneceksiniz.',
            curriculum: ['UX Tasarım Prensipleri ve Araştırma', 'Kullanıcı Yolculuğu ve Wireframing', 'Figma ile UI Tasarım Temelleri', 'Tipografi ve Renk Teorisi', 'Prototipleme ve İnteraktif Tasarım', 'Tasarım Sistemleri ve Hand-off'],
            reqs: 'Görsel estetik anlayışı ve yaratıcı düşünme becerisi avantaj sağlar.'
        }
    };

    // Populate Training Detail Page
    if (window.location.pathname.includes('training-detail.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const trainingId = urlParams.get('id');
        const data = trainingData[trainingId];

        if (data) {
            document.title = `${data.title} | Dijital Gençlik Merkezi`;
            document.getElementById('training-title').innerText = data.title;
            document.getElementById('training-subtitle').innerText = data.subtitle;
            document.getElementById('training-image').src = data.image;
            document.getElementById('training-image').alt = data.title;
            document.getElementById('training-desc').innerText = data.desc;
            document.getElementById('training-reqs').innerText = data.reqs;

            const curriculumList = document.getElementById('training-curriculum');
            if (curriculumList) {
                curriculumList.innerHTML = '';
                data.curriculum.forEach(item => {
                    const li = document.createElement('li');
                    li.innerText = item;
                    curriculumList.appendChild(li);
                });
            }
        }
    }

    // --- Application Form Handling ---
    const appForm = document.getElementById('application-form');
    if (appForm) {
        appForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = appForm.querySelector('button');
            const originalText = submitBtn.innerText;

            submitBtn.innerText = 'Başvurunuz Alınıyor...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Başvurunuz başarıyla alındı! Değerlendirme süreci hakkında e-posta yoluyla bilgilendirileceksiniz.');
                appForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

});
