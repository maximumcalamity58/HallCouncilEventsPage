document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box, index) => {
        setTimeout(() => {
            box.classList.add("animate-in");
        }, index * 200);
    });

    generateRandomHearts();
    generateRandomCoins();
    generateClouds();
    generateRain()
    generateFlyingCreatures();
    generateFlowers();
});

function generateRandomHearts() {
    const box1 = document.querySelector(".box1");
    const svgContainer = box1.querySelector(".svg-container");

    const numHearts = 10; // Maximum number of hearts

    for (let i = 0; i < numHearts; i++) {
        spawnHeart(svgContainer);
    }
}

function generateRandomCoins() {
    const box2 = document.querySelector(".box2");
    const svgContainer = box2.querySelector(".svg-container");

    const numCoins = 25; // Maximum number of coins

    for (let i = 0; i < numCoins; i++) {
        spawnCoin(svgContainer);
    }
}

// Function to create a fading and respawning heart
function spawnHeart(container) {
    const heart = document.createElement("img");
    heart.src = "/img/heart.svg";
    heart.style.position = "absolute";
    heart.style.width = "40px";
    heart.style.height = "40px";
    heart.style.opacity = "0"; // Start hidden

    positionAndRotateElement(heart, container);

    heart.style.transform = `rotate(${Math.random() * 90 - 45}deg)`;

    container.appendChild(heart);

    // Fade in after a random delay (makes animation look natural)
    setTimeout(() => {
        heart.style.transition = "opacity 1s ease-in";
        heart.style.opacity = "1";
    }, Math.random() * 2000);

    // Fade out and respawn at a random time
    setTimeout(() => fadeOutAndRespawn(heart, container, spawnHeart), Math.random() * 35000);
}

// Function to create a fading and respawning coin
function spawnCoin(container) {
    const coin = document.createElement("img");
    coin.src = "/img/coin.svg";
    coin.style.position = "absolute";
    coin.style.width = "80px";
    coin.style.height = "80px";
    coin.style.opacity = "0";

    positionAndRotateElement(coin, container);

    coin.style.transform = `rotate(${Math.random() * 90 + 45}deg)`;

    container.appendChild(coin);

    // Fade in after a random delay
    setTimeout(() => {
        coin.style.transition = "opacity 1s ease-in";
        coin.style.opacity = "1";
    }, Math.random() * 2000);

    // Fade out and respawn at a random time
    setTimeout(() => fadeOutAndRespawn(coin, container, spawnCoin), Math.random() * 25000);
}

// Function to position and randomly rotate an element
function positionAndRotateElement(element, container) {
    const boxRect = container.parentElement.getBoundingClientRect();
    const padding = 20;

    element.style.left = `${Math.random() * (boxRect.width + padding * 2) - padding}px`;
    element.style.top = `${Math.random() * (boxRect.height + padding * 2) - padding}px`;
}

// Function to fade out an element and respawn it
function fadeOutAndRespawn(element, container, spawnFunction) {
    element.style.transition = "opacity 1s ease-out";
    element.style.opacity = "0";

    setTimeout(() => {
        element.remove();
        spawnFunction(container); // Respawn a new element
    }, 1000);
}


function generateClouds() {
    const box3 = document.querySelector(".box3");
    const cloudContainer = document.createElement("div");
    cloudContainer.classList.add("cloud-container");
    box3.appendChild(cloudContainer);

    const numPuffs = 15; // Number of cloud segments

    for (let i = 0; i < numPuffs; i++) {
        // Create the black shadow cloud (outline)
        const shadowPuff = document.createElement("div");
        shadowPuff.classList.add("shadow-puff");

        // Create the actual white cloud
        const puff = document.createElement("div");
        puff.classList.add("puff");

        // Random size variation
        const size = Math.random() * 50 + 80; // 60px - 110px
        const height = size * (Math.random() + 1) * 0.6;

        puff.style.width = `${size}px`;
        puff.style.height = `${height}px`; // Oval shape

        shadowPuff.style.width = `${size + 6}px`; // Slightly bigger for outline
        shadowPuff.style.height = `${height + 4}px`; // Slightly taller

        // Ensure clouds extend **beyond** the screen edges
        const extraOffset = 10; // 10% extra on both sides
        puff.style.left = `${i * (110 / numPuffs) - extraOffset}%`; // Slightly wider spacing
        shadowPuff.style.left = `calc(${i * (110 / numPuffs) - extraOffset}% - 3px)`;

        // Random slight height variation
        const heightVariation = Math.random() * 10;
        puff.style.bottom = `${heightVariation}px`;
        shadowPuff.style.bottom = `${heightVariation - 2}px`; // Shadow slightly lower

        // Append shadow first (so it's behind), then actual puff
        cloudContainer.appendChild(shadowPuff);
        cloudContainer.appendChild(puff);
    }
}

function generateRain() {
    const rainContainer = document.querySelector(".box3 .rain-container");
    const numDrops = 40; // Adjust for more or less rain
    const box3 = document.querySelector(".box3");
    const boxHeight = box3.offsetHeight;

    for (let i = 0; i < numDrops; i++) {
        const drop = document.createElement("div");
        drop.classList.add("raindrop");

        // Randomize position within the width of the box
        drop.style.left = Math.random() * 100 + "%";

        // Start rain at 80% of box height
        drop.style.top = Math.random() * 10 + "%";  // Small variation so it's not all in a line

        // Adjust animation duration and delay for randomness
        drop.style.animationDuration = (Math.random() * 1.5 + 3) + "s";
        drop.style.animationDelay = Math.random() * 4.5 + "s";

        rainContainer.appendChild(drop);
    }
}

function generateFlowers() {
    const box4 = document.querySelector(".box4");
    const flowerContainer = document.createElement("div");
    flowerContainer.classList.add("flower-container");
    box4.appendChild(flowerContainer);

    const numFlowers = 8;
    const flowerTypes = ["/img/flower1.svg", "/img/flower2.svg"];
    const usedPositions = [];

    for (let i = 0; i < numFlowers; i++) {
        const flower = document.createElement("img");
        flower.classList.add("flower");
        flower.src = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
        flower.style.filter = `hue-rotate(${Math.random() * 360}deg)`;

        let xPos;
        let tries = 0;
        do {
            xPos = Math.random() * 120 - 20;
            tries++;
        } while (usedPositions.some(pos => Math.abs(pos - xPos) < 20) && tries < 100);

        usedPositions.push(xPos);

        flower.style.left = `${xPos}%`;
        flower.style.bottom = "0";

        flowerContainer.appendChild(flower);
    }
}

function generateFlyingCreatures() {
    const box4 = document.querySelector(".box4");
    const creatureContainer = document.createElement("div");
    creatureContainer.classList.add("creature-container");
    box4.appendChild(creatureContainer);

    const numBees = 4;
    const numButterflies = 6;

    for (let i = 0; i < numBees; i++) {
        createFlyingCreature(creatureContainer, "/img/bee.svg", "bee", Math.random() * 20 + 60);
    }

    for (let i = 0; i < numButterflies; i++) {
        createFlyingButterfly(creatureContainer);
    }
}

function createFlyingCreature(container, imagePath, className, topPosition) {
    const creature = document.createElement("img");
    creature.classList.add(className);
    creature.src = imagePath;
    creature.style.transform = "rotate(90deg)";
    creature.style.top = `${topPosition}%`;
    creature.style.left = "-40%";
    creature.style.animationDuration = `${Math.random() * 1.5 + 2}s`;
    creature.style.animationDelay = `${Math.random() * 7}s`;

    container.appendChild(creature);
}

function createFlyingButterfly(container) {
    const butterfly = document.createElement("img");
    butterfly.classList.add("butterfly");
    butterfly.src = "/img/butterfly.svg";

    // Generate random color
    const colors = ["#ff4f4f", "#ffa64f", "#ffd24f", "#6eff4f", "#4fdaff", "#c14fff"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    butterfly.style.filter = `invert(${Math.random() * 0.5 + 0.5}) sepia(1) saturate(3) hue-rotate(${Math.random() * 360}deg)`;

    // Apply color using CSS filters
    butterfly.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
    butterfly.style.color = randomColor; // Works if SVG uses `currentColor`

    // Generate random wave heights
    const wave1 = Math.random() * 100 - 50;
    const wave2 = Math.random() * 100 - 50;
    const wave3 = Math.random() * 100 - 50;

    // Apply animation with inline styles
    butterfly.style.setProperty("animation", `fly-wavy ${Math.random() * 5 + 6}s linear infinite`);
    butterfly.style.setProperty("--wave1", `${wave1}px`);
    butterfly.style.setProperty("--wave2", `${wave2}px`);
    butterfly.style.setProperty("--wave3", `${wave3}px`);

    // Random starting position
    butterfly.style.top = `${Math.random() * 30 + 30}%`;

    container.appendChild(butterfly);
}

function openModal(boxNumber) {
    const modal = document.createElement("div");
    modal.classList.add("modal");

    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.addEventListener("click", closeModal); // Clicking overlay closes modal

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    // Close button
    const closeButton = document.createElement("span");
    closeButton.innerHTML = "&times;";
    closeButton.classList.add("close-button");
    closeButton.addEventListener("click", closeModal);

    if (boxNumber === 4) {
        // Special case: Box 4 displays a message instead of an image
        modalContent.style.backgroundColor = "#f5f4df";
        modalContent.style.padding = "3vw";
        modalContent.style.display = "flex";
        modalContent.style.alignItems = "center";
        modalContent.style.justifyContent = "center";
        modalContent.style.fontSize = "2rem";
        modalContent.style.fontWeight = "bold";
        modalContent.style.textAlign = "center";

        const message = document.createElement("p");
        message.textContent = "Planning in progress! Stay tuned...";
        modalContent.appendChild(closeButton);
        modalContent.appendChild(message);
    } else {
        // Image modal for other boxes
        const modalImage = document.createElement("img");
        modalImage.src = `/img/modal${boxNumber}.jpg`; // Image per box
        modalImage.alt = `Event ${boxNumber}`;

        modalContent.appendChild(closeButton);
        modalContent.appendChild(modalImage);
    }

    modal.appendChild(overlay);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

function closeModal() {
    const modal = document.querySelector(".modal");
    if (modal) {
        modal.remove();
    }
}