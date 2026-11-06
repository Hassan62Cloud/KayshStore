
// =====================================
// KAYSH'STORE - WEBSITE INTERACTIONS
// =====================================


// 1. MASUKKAN LINK MARKETPLACE DAN TIKTOK DI SINI

const MARKETPLACE_URL = "TEMPEL_LINK_TOKO_DI_SINI";

const TIKTOK_URL = "https://www.tiktok.com/@bocil.murka67?_r=1&_t=ZS-9BBDX7CLvD6";


// 2. MENU NAVIGASI MOBILE

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


// 3. MENGATUR LINK MARKETPLACE DAN TIKTOK

function setupExternalLink(elementId, url, platformName) {

    const link = document.getElementById(elementId);

    if (!link) return;

    const isValidUrl = /^https?:\/\/\S+$/i.test(url);

    if (isValidUrl) {

        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

    } else {

        link.href = "#";

        link.addEventListener("click", function (event) {

            event.preventDefault();

            alert(
                "Link " + platformName +
                " belum diisi. Silakan masukkan link terlebih dahulu di file script.js."
            );

        });

    }

}


// Mengaktifkan tombol marketplace
setupExternalLink(
    "marketplaceLink",
    MARKETPLACE_URL,
    "Marketplace Kaysh'Store"
);


// Mengaktifkan tombol TikTok
setupExternalLink(
    "tiktokLink",
    TIKTOK_URL,
    "TikTok Kaysh'Store"
);


// 4. FILTER PRODUK

const filterButtons = document.querySelectorAll(".filter-btn");

const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const selectedCategory = button.dataset.filter;

        // Mengaktifkan tombol yang dipilih
        filterButtons.forEach(function (item) {
            item.classList.remove("active");
        });

        button.classList.add("active");


        // Menampilkan produk berdasarkan kategori
        productCards.forEach(function (card) {

            const category = card.dataset.category;

            if (
                selectedCategory === "all" ||
                category === selectedCategory
            ) {

                card.hidden = false;

            } else {

                card.hidden = true;

            }

        });

    });

});


// 5. TAHUN OTOMATIS DI FOOTER

const yearElement = document.querySelector("#year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}
