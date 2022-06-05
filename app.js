const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const qtyTxt = document.querySelector(".quantity span");
const mainImg = document.querySelector(".main__pic img");
const thumbImg = document.querySelectorAll(".thumbnail__pic");
const lightbox = document.querySelector(".lightbox");
const lightboxMainImg = document.querySelector(".lightbox__main__pic img");
const lightboxThumbImg = document.querySelectorAll(".lightbox__thumbnail__pic");
const avatar = document.querySelector(".avatar");
const cartIcon = document.querySelector(".icon__cart");
const cart = document.querySelector(".cart");
const cartCount = document.querySelector(".count");
const addToCart = document.querySelector(".add__cart");
const cartContent = document.querySelector(".cart__content");
const closeLightbox = document.querySelector(".close");
const previous = document.querySelector(".previous");
const next = document.querySelector(".next1");
const previous1 = document.querySelector(".previous1");
const next1 = document.querySelector(".next");
const nav = document.querySelector("nav");
const closeNavIcon = document.querySelector(".menu__close");
const navIcon = document.querySelector(".menu__logo");

let totaltQty = 0;
let qty = 0;

let currentIndex = 1;

minus.addEventListener("click", changeQty);
plus.addEventListener("click", changeQty);

// Changer les images de présentation

thumbImg.forEach((img) => {
    img.addEventListener("click", (e) => {
        mainImg.parentNode.classList.remove("animation");
        thumbImg.forEach((effect) => {
            effect.classList.remove("img__active__box");
            effect.childNodes[1].classList.remove("img__active");
        });

        currentIndex = e.target.getAttribute("data-index");
        img.classList.add("img__active__box");
        img.childNodes[1].classList.add("img__active");
        setTimeout(() => {
            mainImg.parentNode.classList.add("animation");
            mainImg.src = `images/image-product-${currentIndex}.jpg`;
        }, 100);
    });
});

// Change la quantité d'article à ajouter

function changeQty(e) {
    e.preventDefault();
    if (qty === 0) {
        if (e.target.classList.contains("plus")) {
            qty++;
            qtyTxt.innerText = qty;
        } else if (e.target.classList.contains("minus")) {
            return;
        }
    } else if (qty > 0) {
        if (e.target.classList.contains("plus")) {
            qty++;
            qtyTxt.innerText = qty;
        } else if (e.target.classList.contains("minus")) {
            qty--;
            qtyTxt.innerText = qty;
        }
    }
}

// Refresh
window.addEventListener("click", (e) => {
    if (
        e.path[1].getAttribute("class") !== "profil" &&
        e.path[1].getAttribute("class") !== "quantity"
    ) {
        if (cart.getAttribute("class") !== "inactive__cart") {
            cart.classList.add("inactive__cart");
        }
    }

    if (e.path[0].getAttribute("class") === "lightbox") {
        lightbox.classList.add("inactive__lightbox");
    }
    if (e.path[0].getAttribute("id") === "nav") {
        nav.style.display = "none";
        next.style.display = "flex";
        previous.style.display = "flex";
    }

    refreshImg();
});

/// Permet de switch l'image lightbox et la principale en même temps
function refreshImg() {
    lightboxThumbImg.forEach((effect) => {
        effect.classList.remove("lightbox__img__active__box");
        effect.childNodes[1].classList.remove("lightbox__img__active");
        if (effect.getAttribute("data-index") === `${currentIndex}`) {
            effect.classList.add("lightbox__img__active__box");
            effect.childNodes[1].classList.add("lightbox__img__active");
        }
    });

    thumbImg.forEach((effect) => {
        effect.classList.remove("img__active__box");
        effect.childNodes[1].classList.remove("img__active");
        if (effect.getAttribute("data-index") === `${currentIndex}`) {
            effect.classList.add("img__active__box");
            effect.childNodes[1].classList.add("img__active");
        }
    });

    mainImg.src = `images/image-product-${currentIndex}.jpg`;
    lightboxMainImg.src = `images/image-product-${currentIndex}.jpg`;
}

avatar.addEventListener("click", () => {
    cart.classList.toggle("inactive__cart");
});
cartIcon.addEventListener("click", () => {
    cart.classList.toggle("inactive__cart");
});

addToCart.addEventListener("click", (e) => {
    e.preventDefault();
    totaltQty += qty;
    addQtyToCart();
    showCart();
});

//Ajoute la quantité souhaité l'icon cart

function addQtyToCart() {
    cartCount.childNodes[1].innerText = totaltQty;

    if (totaltQty <= 0) {
        cartCount.classList.add("inactive__cart");
        return;
    } else {
        cartCount.classList.remove("inactive__cart");
    }
}

//Affiche dans le panier la quantité souhaité

function showCart() {
    cartContent.innerHTML = ``;
    if (totaltQty <= 0) {
        cartContent.innerHTML = `<span>Your cart is empty.</span>`;
    } else {
        cartContent.innerHTML = `
        <div class="content">
            <img
                class="content__sneaker"
                src="images/image-product-1-thumbnail.jpg"
                alt="sneakers"
                />
            <div class="content__txt">
                <p>Fall Limited Edition Sneakers</p>
                <p>125.00 x ${totaltQty} <strong>$${
            125 * totaltQty
        }.00</strong></p>
            </div>
            <img
                class="trash"
                src="images/icon-delete.svg"
                alt="trash"
                />
        </div>
        <button class="cart__btn" type="submit">
            Checkout
        </button>
        `;

        //Supprime le panier

        const trash = document.querySelector(".trash");
        trash.addEventListener("click", () => {
            totaltQty = 0;
            addQtyToCart();
            showCart();
        });
    }
}

//Lightbox

mainImg.addEventListener("click", () => {
    if (window.innerWidth > 800) {
        lightbox.classList.remove("inactive__lightbox");
    }
});

closeLightbox.addEventListener("click", () => {
    lightbox.classList.add("inactive__lightbox");
});

lightboxThumbImg.forEach((img) => {
    img.addEventListener("click", (e) => {
        lightboxMainImg.parentNode.classList.remove("lightbox__animation");
        lightboxThumbImg.forEach((effect) => {
            effect.classList.remove("lightbox__img__active__box");
            effect.childNodes[1].classList.remove("lightbox__img__active");
        });

        currentIndex = e.target.parentNode.getAttribute("data-index");

        img.classList.add("lightbox__img__active__box");
        img.childNodes[1].classList.add("lightbox__img__active");
        setTimeout(() => {
            lightboxMainImg.parentNode.classList.add("lightbox__animation");
            lightboxMainImg.src = `images/image-product-${currentIndex}.jpg`;
        }, 100);
    });
});

previous.addEventListener("click", () => {
    if (currentIndex <= 1) {
        currentIndex = 4;
    } else {
        currentIndex--;
    }
    refreshImg();
});

next.addEventListener("click", () => {
    if (currentIndex >= 4) {
        currentIndex = 1;
    } else {
        currentIndex++;
    }
    refreshImg();
});
previous1.addEventListener("click", () => {
    if (currentIndex <= 1) {
        currentIndex = 4;
    } else {
        currentIndex--;
    }
    refreshImg();
});

next1.addEventListener("click", () => {
    if (currentIndex >= 4) {
        currentIndex = 1;
    } else {
        currentIndex++;
    }
    refreshImg();
});

///Nav responsive

navIcon.addEventListener("click", () => {
    nav.style.display = "block";
    next.style.display = "none";
    previous.style.display = "none";
});
closeNavIcon.addEventListener("click", () => {
    nav.style.display = "none";
    next.style.display = "flex";
    previous.style.display = "flex";
});
