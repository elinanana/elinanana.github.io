export function drawGraph(id, data) {
    // Create an SVG graph
    const svg = document.getElementById(id);
    const width = 700;
    const height = 200;

    // Scale factors for the graph
    const xScale = width / (data.length + 1);
    const maxAttempts = Math.max(...data.map(result => result.attempts))
    const yScale = height / maxAttempts;

    // Add labels for levels
    drawLevelNum(data, height, xScale, svg)

    // Add labels and lines for attempts
    // If less tha 5 attempts, draw labels line for each attempt
    if (maxAttempts < 5) {
        for (let index = maxAttempts; index > 0; index--) {
            drawAttemptNum(height, index, yScale, svg)
            drawAttemptLine(height, index, yScale, svg)
        }
        // else draw label and line for each 5 attempts
    } else {
        for (let index = maxAttempts; index > 0; index--) {
            if (index % 5 == 0) {
                drawAttemptNum(height, index, yScale, svg)
                drawAttemptLine(height, index, yScale, svg)
            }
        }
    }

    // Draw graph's rects
    drawRect(data, height, xScale, yScale, svg)
}


function drawLevelNum(data, height, xScale, svg) {
    data.forEach((result, index) => {
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", 10 + (index + 1) * xScale);
        text.setAttribute("y", height + 80);
        text.textContent = result.level;
        text.setAttribute("fill", "white");
        svg.appendChild(text);
    });
}

function drawAttemptNum(height, index, yScale, svg) {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", 10);
    text.setAttribute("y", height - index * yScale + 60);
    text.textContent = index;
    text.setAttribute("fill", "white");
    svg.appendChild(text);
}

function drawAttemptLine(height, index, yScale, svg) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", 30);
    line.setAttribute("x2", 720);
    line.setAttribute("y1", height - index * yScale + 60);
    line.setAttribute("y2", height - index * yScale + 60);
    line.setAttribute("stroke", "#454c59");
    svg.appendChild(line)
}

function drawRect(data, height, xScale, yScale, svg) {

    // Draw rectangles for each level
    data.forEach((result, index) => {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", 10 + (index + 1) * xScale); // Adjusting for rectangle width
        rect.setAttribute("y", height - result.attempts * yScale + 60);
        rect.setAttribute("width", 20); // Rectangle width
        rect.setAttribute("height", result.attempts * yScale);
        rect.setAttribute("fill", "#9969FF");
        rect.setAttribute("data-level", result.level); // Add data-level attribute
        rect.setAttribute("data-attempts", result.attempts); // Add data-attempts attribute

        // Add event listeners to show tooltip on hover
        rect.addEventListener("mousemove", () => {
            tooltip.textContent = `Level: ${result.level}\nAttempts: ${result.attempts}`;
            tooltip.style.display = "block";
            tooltip.style.left = (event.clientX + 10) + 'px';
            tooltip.style.top = (event.clientY - 100) + 'px';
        });

        rect.addEventListener("mouseout", () => {
            tooltip.style.display = "none";
        });

        svg.appendChild(rect);
    });
}