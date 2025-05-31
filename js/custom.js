let products = fetch("../data/products.json").then(res => res.json());

function flashDeal() {
    let flashDealRow = document.getElementById("flasDealRow");
    flashDealRow.innerHTML = "";
    products.then(res => {
        let flashDearProducts = res.flash_deals;
        flashDearProducts.forEach(item => {
            flashDealRow.innerHTML += `
                <div class="col">
                    <div class="card h-100">
                        <div class="position-relative">
                            <img src="${item.image}" class="card-img-top img-fuild" alt="product" />
                            <span class="position-absolute top-3 end-3 badge rounded-sm bg-danger">
                                -${item.discount}%
                            </span>
                        </div>
                        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-between">
                                <span class="badge rounded-sm bg-${item.badge_color}">
                                    ${item.badge}
                                </span>
                                <div class="d-flex gap-1">
                                    ${getStars(item.rate)}
                                </div>
                            </div>
                            <h5 class="mt-3">${item.name}</h5>
                            <p class="card-text text-secondary">${item.desc}</p>
                            <div class="d-flex align-items-center gap-2">
                                <h5 class="fw-normal">$${getPriceAfterDiscount(item.price, item.discount)}</h5>
                                <small class="mb-1 text-secondary text-decoration-line-through">$${item.price}</small>
                            </div>
                            <button class="w-100 btn btn-primary gap-2"><i class="fa-solid fa-cart-shopping"></i> Add to cart </button>
                        </div>
                    </div>
                </div>
            `
        });
    })
}

function shopByCategoies() {
    let shopByCategoies = document.getElementById("shopByCategory");
    shopByCategoies.innerHTML = "";
    products.then(res => {
        let shopByCategoiesProducts = res.shop_by_category;
        shopByCategoiesProducts.forEach(item => {
            shopByCategoies.innerHTML += `
                <div class="col">
                    <div class="card h-100">
                        <img src="${item.image}" class="card-img-top img-fuild" alt="product" />
                        <div class="card-body">
                            <h5 class="mt-3 text-center">${item.name}</h5>
                        </div>
                    </div>
                </div>
            `
        });
    })
}

function newArrival() {
    let newArrival = document.getElementById("newArrival");
    newArrival.innerHTML = "";
    products.then(res => {
        let newArrivalProducts = res.new_arrival;
        newArrivalProducts.forEach(item => {
            newArrival.innerHTML += `
                <div class="col">
                    <div class="card h-100">
                        <img src="${item.image}" class="card-img-top img-fuild" alt="product" />
                        <div class="card-body">
                            <div class="d-flex align-items-center justify-content-between">
                                <span class="badge rounded-sm bg-${item.badge_color}">
                                    ${item.badge}
                                </span>
                                <div class="d-flex gap-1">
                                    ${getStars(item.rate)}
                                </div>
                            </div>
                            <h5 class="mt-3">${item.name}</h5>
                            <p class="card-text text-secondary">${item.desc}</p>
                            <div class="d-flex align-items-center gap-2">
                                <h5 class="fw-normal">$${item.price}</h5>
                            </div>
                            <button class="w-100 btn btn-primary gap-2"><i class="fa-solid fa-cart-shopping"></i> Add to cart </button>
                        </div>
                    </div>
                </div>
            `
        });
    })
}

function topBrand() {
    let topBrand = document.getElementById("topBrand");
    topBrand.innerHTML = "";
    products.then(res => {
        let topBrandProducts = res.shop_by_category;
        topBrandProducts.forEach(item => {
            topBrand.innerHTML += `
                <div class="col text-center">
                    <img src="${item.image}" class="img-fuild w-50" alt="product" />
                </div>
            `
        });
    })
}

function getStars(rate) {
    let stars = "";
    let fullStars = Math.floor(rate);
    let hasHalfStar = rate % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        stars += `<i class="fa-solid fa-star text-warning"></i>`;
    }

    // Add half star if needed
    if (hasHalfStar) {
        stars += `<i class="fa-solid fa-star-half-stroke text-warning"></i>`;
    }

    // Add empty stars (considering both full and half stars)
    let emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += `<i class="fa-regular fa-star text-warning"></i>`;
    }

    return stars;
}

function getPriceAfterDiscount(price, discount) {
    const discountPercentage = discount / 100;
    const discountAmount = price * discountPercentage;
    const priceAfterDiscount = price - discountAmount;
    return priceAfterDiscount.toFixed(2);
}

function renderMinutesCountdown() {
    const countdownElement = document.getElementById("countdown");
    
    // The target date is always tmr
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 1);
    targetDate.setHours(0, 0, 0, 0); // Set to midnight

    const currentDate = new Date();
    const timeDifference = targetDate - currentDate;

    if (timeDifference <= 0) {
        countdownElement.textContent = "Countdown expired!";
    } else {
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        countdownElement.textContent = `${hours < 9 ? '0' + hours : hours}:${minutes < 9 ? '0' + minutes  : minutes}:${seconds < 9 ? seconds + '0' : seconds}`;
    }
}
// Update the countdown every second

flashDeal();
shopByCategoies();
newArrival();
topBrand();
renderMinutesCountdown();
setInterval(renderMinutesCountdown, 1000);