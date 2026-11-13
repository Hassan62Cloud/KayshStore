
/* =====================================
   KAYSH'STORE - WEBSITE INTERACTIONS
===================================== */


/* =====================================
   1. WEBSITE CONFIGURATION
===================================== */

// Masukkan link asli tanpa tanda Markdown.

const MARKETPLACE_URL = "";

const TIKTOK_URL = "https://www.tiktok.com/@bocil.murka67?_r=1&_t=ZS-9BBDX7CLvD6";

const INSTAGRAM_URL = "https://www.instagram.com/kaisalatifahadzkia?utm_source=qr&exln=OGlhM2xuMTUyNDVq";

// Gunakan kode negara 62.
// Contoh format: 6281234567890
const WHATSAPP_NUMBER = "62 857-1742-5868";


/* =====================================
   2. MOBILE NAVIGATION
===================================== */

const menuToggle = document.querySelector("#menuToggle");
const navMenu = document.querySelector("#navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        const isOpen = navMenu.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });

    navMenu.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =====================================
   3. EXTERNAL SOCIAL MEDIA LINKS
===================================== */

function isValidHttpUrl(value) {

    try {

        const parsedURL = new URL(value);

        return (
            parsedURL.protocol === "https:" ||
            parsedURL.protocol === "http:"
        );

    } catch {

        return false;

    }

}


function setupExternalLink(elementId, url, platformName) {

    const link = document.getElementById(elementId);

    if (!link) return;

    if (isValidHttpUrl(url)) {

        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

    } else {

        link.href = "#";

        link.addEventListener("click", function (event) {

            event.preventDefault();

            alert(
                "Link " + platformName +
                " belum diatur. Silakan isi link di bagian konfigurasi script.js."
            );

        });

    }

}


// Marketplace
setupExternalLink(
    "marketplaceLink",
    MARKETPLACE_URL,
    "Marketplace Kaysh'Store"
);


// TikTok
setupExternalLink(
    "tiktokLink",
    TIKTOK_URL,
    "TikTok Kaysh'Store"
);


// Instagram
setupExternalLink(
    "instagramLink",
    INSTAGRAM_URL,
    "Instagram Kaysh'Store"
);


/* =====================================
   4. PRODUCT FILTER
===================================== */

// Khusus mengambil tombol dan produk
// di bagian Featured Products.

const filterButtons = document.querySelectorAll(
    "#products .filter-btn"
);

const productCards = document.querySelectorAll(
    "#products .product-card"
);


if (filterButtons.length > 0 && productCards.length > 0) {

    function filterProducts(selectedCategory) {

        // Mengatur tombol aktif
        filterButtons.forEach(function (button) {

            const isActive =
                button.dataset.filter === selectedCategory;

            button.classList.toggle("active", isActive);

            button.setAttribute(
                "aria-pressed",
                String(isActive)
            );

        });


        // Mengatur produk yang ditampilkan
        productCards.forEach(function (card) {

            const category = (
                card.dataset.category || ""
            ).trim().toLowerCase();

            const shouldShow =
                selectedCategory === "all" ||
                category === selectedCategory;

            card.hidden = !shouldShow;

        });

    }


    // Menambahkan event klik ke setiap filter
    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedCategory = (
                button.dataset.filter || "all"
            ).trim().toLowerCase();

            filterProducts(selectedCategory);

        });

    });


    // Kondisi awal
    filterProducts("all");

}


/* =====================================
   5. CUSTOMER TESTIMONIAL CAROUSEL
===================================== */

const testimonialCarousel = document.querySelector(
    ".testimonial-carousel"
);

if (testimonialCarousel) {

    const slides = Array.from(
        testimonialCarousel.querySelectorAll(
            ".testimonial-slide"
        )
    );

    const dotsContainer = document.querySelector(
        "#testimonialDots"
    );

    const prevButton = document.querySelector(
        "#testimonialPrev"
    );

    const nextButton = document.querySelector(
        "#testimonialNext"
    );

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (slides.length > 0) {

        let currentSlide = 0;
        let autoPlayTimer = null;

        const dots = [];


        // Membuat indikator titik
        if (dotsContainer) {

            dotsContainer.innerHTML = "";

            slides.forEach(function (_, index) {

                const dot = document.createElement("button");

                dot.type = "button";

                dot.setAttribute(
                    "aria-label",
                    "Tampilkan ulasan " + (index + 1)
                );

                dot.addEventListener("click", function () {

                    showSlide(index);
                    restartAutoPlay();

                });

                dotsContainer.appendChild(dot);

                dots.push(dot);

            });

        }


        // Menampilkan slide
        function showSlide(index) {

            currentSlide =
                (index + slides.length) % slides.length;


            slides.forEach(function (slide, i) {

                const active = i === currentSlide;

                slide.hidden = !active;

                slide.classList.toggle(
                    "active",
                    active
                );

            });


            dots.forEach(function (dot, i) {

                const active = i === currentSlide;

                dot.classList.toggle(
                    "active",
                    active
                );

                if (active) {

                    dot.setAttribute(
                        "aria-current",
                        "true"
                    );

                } else {

                    dot.removeAttribute("aria-current");

                }

            });

        }


        // Tombol sebelumnya
        if (prevButton) {

            prevButton.addEventListener("click", function () {

                showSlide(currentSlide - 1);
                restartAutoPlay();

            });

        }


        // Tombol selanjutnya
        if (nextButton) {

            nextButton.addEventListener("click", function () {

                showSlide(currentSlide + 1);
                restartAutoPlay();

            });

        }


        // Menghentikan autoplay
        function stopAutoPlay() {

            if (autoPlayTimer !== null) {

                clearInterval(autoPlayTimer);

                autoPlayTimer = null;

            }

        }


        // Menjalankan autoplay
        function startAutoPlay() {

            stopAutoPlay();

            if (
                slides.length > 1 &&
                !prefersReducedMotion &&
                !document.hidden
            ) {

                autoPlayTimer = setInterval(function () {

                    showSlide(currentSlide + 1);

                }, 6000);

            }

        }


        function restartAutoPlay() {

            startAutoPlay();

        }


        // Berhenti saat mouse berada di atas carousel
        testimonialCarousel.addEventListener(
            "mouseenter",
            stopAutoPlay
        );

        testimonialCarousel.addEventListener(
            "mouseleave",
            startAutoPlay
        );


        // Berhenti saat carousel menggunakan keyboard
        testimonialCarousel.addEventListener(
            "focusin",
            stopAutoPlay
        );

        testimonialCarousel.addEventListener(
            "focusout",
            function (event) {

                if (
                    !testimonialCarousel.contains(
                        event.relatedTarget
                    )
                ) {

                    startAutoPlay();

                }

            }
        );


        // Menghentikan autoplay saat tab browser tidak aktif
        document.addEventListener(
            "visibilitychange",
            function () {

                if (document.hidden) {

                    stopAutoPlay();

                } else {

                    startAutoPlay();

                }

            }
        );


        // Inisialisasi carousel
        showSlide(0);

        startAutoPlay();

    }

}


/* =====================================
   6. WHATSAPP CONFIGURATION
===================================== */

// Membersihkan nomor WhatsApp
const cleanWhatsAppNumber = String(
    WHATSAPP_NUMBER
).replace(/\D/g, "");


const validWhatsAppNumber = /^62\d{8,13}$/.test(
    cleanWhatsAppNumber
);


// Membuat URL WhatsApp
function createWhatsAppURL(message) {

    return (
        "https://wa.me/" +
        cleanWhatsAppNumber +
        "?text=" +
        encodeURIComponent(message)
    );

}


// Pesan ketika nomor belum diisi
function showWhatsAppWarning(event) {

    event.preventDefault();

    alert(
        "Nomor WhatsApp Kaysh'Store belum diatur. " +
        "Silakan isi WHATSAPP_NUMBER pada konfigurasi script.js."
    );

}


/* =====================================
   7. PRODUCT ORDER VIA WHATSAPP
===================================== */

// Mengambil tombol produk khusus Featured Products
const whatsappOrderButtons = document.querySelectorAll(
    "#products .product-card .product-link, " +
    "#products .product-card .order-whatsapp"
);


whatsappOrderButtons.forEach(function (button) {

    const productCard = button.closest(".product-card");

    const productHeading = productCard
        ? productCard.querySelector("h3")
        : null;

    const productName = productHeading
        ? productHeading.textContent.trim()
        : "Produk Kaysh'Store";


    // Mengubah label tombol
    button.textContent = "Pesan via WhatsApp →";


    if (!validWhatsAppNumber) {

        button.href = "#";

        button.addEventListener(
            "click",
            showWhatsAppWarning
        );

        return;

    }


    const message =
        "Halo Kak, saya mau pesan " +
        productName +
        "-nya dong! Apakah masih tersedia?";


    button.href = createWhatsAppURL(message);

    button.target = "_blank";

    button.rel = "noopener noreferrer";

});


/* =====================================
   8. WHATSAPP CONTACT BUTTON
===================================== */

const whatsappContactLink = document.querySelector(
    "#whatsappContactLink"
);


if (whatsappContactLink) {

    if (validWhatsAppNumber) {

        const contactMessage =
            "Halo Kak! Saya ingin bertanya " +
            "tentang produk dan pemesanan. Boleh minta " +
            "informasi lebih lanjut?";


        whatsappContactLink.href =
            createWhatsAppURL(contactMessage);

        whatsappContactLink.target = "_blank";

        whatsappContactLink.rel =
            "noopener noreferrer";

    } else {

        whatsappContactLink.href = "#";

        whatsappContactLink.addEventListener(
            "click",
            showWhatsAppWarning
        );

    }

}


/* =====================================
   9. AUTOMATIC FOOTER YEAR
===================================== */

const yearElement = document.querySelector("#year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =====================================
   END OF KAYSH'STORE SCRIPT
===================================== */
