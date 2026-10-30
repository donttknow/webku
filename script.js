const palette = document.getElementById("palette");
const generateBtn = document.getElementById("generateBtn");
const message = document.getElementById("message");

// Initial colors
let colors = [
    "#E8B4B8",
    "#F3D5B5",
    "#C6D8C3",
    "#A7C7E7",
    "#CDB4DB"
];

// Lock status
let locked = [false, false, false, false, false];

// Random HEX color
function randomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        let random = Math.floor(Math.random() * 16);
        color += letters[random];
    }

    return color;
}

// Display palette
function showPalette() {

    palette.innerHTML = "";

    colors.forEach((color, index) => {

        const card = document.createElement("div");
        card.className = "color-card";

        // Color box
        const box = document.createElement("div");
        box.className = "color-box";
        box.style.backgroundColor = color;

        // Copy color
        box.addEventListener("click", () => {

            if (navigator.clipboard) {
                navigator.clipboard.writeText(color)
                    .then(() => {
                        message.textContent = color + " copied!";
                    })
                    .catch(() => {
                        message.textContent = "HEX Code: " + color;
                    });
            } else {
                message.textContent = "HEX Code: " + color;
            }

        });

        // HEX text
        const hex = document.createElement("p");
        hex.className = "hex-code";
        hex.textContent = color;

        // Lock button
        const lockBtn = document.createElement("button");
        lockBtn.className = "lock-btn";

        lockBtn.textContent = locked[index]
            ? "🔒 Locked"
            : "🔓 Lock";

        if (locked[index]) {
            lockBtn.classList.add("locked");
        }

        lockBtn.addEventListener("click", () => {

            locked[index] = !locked[index];

            showPalette();

        });

        card.appendChild(box);
        card.appendChild(hex);
        card.appendChild(lockBtn);

        palette.appendChild(card);

    });
}

// Generate new colors
function generatePalette() {

    colors = colors.map((color, index) => {

        if (locked[index]) {
            return color;
        }

        return randomColor();

    });

    message.textContent = "";

    showPalette();

}

// Generate button
generateBtn.addEventListener("click", generatePalette);

// Initial display
showPalette();
