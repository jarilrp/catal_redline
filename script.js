document.addEventListener('DOMContentLoaded', () => {
    // Configuração dos catálogos de rodas
    const catalogs = [
        { name: 'HIGHEND', count: 40 },
        { name: 'LOWRIDER', count: 29 },
        { name: 'MUSCLE', count: 35 },
        { name: 'OFFROAD', count: 34 },
        { name: 'SPORT', count: 50 },
        { name: 'STOCK', count: 50 },
        { name: 'SUV', count: 37 },
        { name: 'TUNER', count: 46 }
    ];

    const catalogContainer = document.getElementById('catalog-container');

    // Função para gerar os carrosséis
    function generateCarousels() {
        catalogs.forEach(cat => {
            const categoryClass = cat.name.toLowerCase();
            const section = document.createElement('section');
            section.className = `catalog-section ${categoryClass}-section`;

            let slidesHTML = '';
            for (let i = 1; i <= cat.count; i++) {
                const number = i.toString().padStart(2, '0');
                slidesHTML += `
                    <div class="swiper-slide">
                        <div class="image-container">
                            <img src="${cat.name}/${number}.jpg" alt="Roda ${cat.name} ${number}" loading="lazy">
                            <span class="model-number">${number}</span>
                        </div>
                    </div>
                `;
            }

            section.innerHTML = `
                <h2>${cat.name}</h2>
                <div class="swiper ${categoryClass}">
                    <div class="swiper-wrapper">${slidesHTML}</div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-pagination"></div>
                </div>
            `;

            catalogContainer.appendChild(section);
        });
    }

    // Função para inicializar os carrosséis
    function initializeSwipers() {
        catalogs.forEach(cat => {
            const categoryClass = cat.name.toLowerCase();
            new Swiper(`.${categoryClass}`, {
                slidesPerView: 1,
                spaceBetween: 15,
                breakpoints: {
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    768: { slidesPerView: 3, spaceBetween: 25 },
                    1024: { slidesPerView: 4, spaceBetween: 30 },
                    1400: { slidesPerView: 5, spaceBetween: 30 }
                },
                loop: true,
                pagination: {
                    el: `.${categoryClass} .swiper-pagination`,
                    clickable: true,
                },
                navigation: {
                    nextEl: `.${categoryClass} .swiper-button-next`,
                    prevEl: `.${categoryClass} .swiper-button-prev`,
                },
                autoplay: {
                    delay: 3500,
                    disableOnInteraction: true,
                },
            });
        });
    }

    // Proteção contra cópia de imagens
    function protectImages() {
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('contextmenu', e => e.preventDefault());
            img.setAttribute('draggable', 'false');
        });

        document.querySelectorAll('.image-container').forEach(container => {
            container.addEventListener('click', () => {
                alert('As imagens são protegidas por direitos autorais.');
            });
        });
    }

    // === NOVA FUNÇÃO PARA ANIMAÇÃO AO ROLAR A PÁGINA ===
    function animateOnScroll() {
        const sections = document.querySelectorAll('.catalog-section');
        if (sections.length === 0) return;

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Se a seção está visível na tela
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Opcional: para a observação depois que a animação acontece uma vez
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 0.1 // A animação começa quando 10% do elemento está visível
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Executar funções
    generateCarousels();
    initializeSwipers();
    protectImages();
    animateOnScroll(); // Chamar a nova função de animação
});