function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateGroups() {
    const message = document.getElementById("message");
    const results = document.getElementById("results");
    message.textContent = "";
    results.innerHTML = "";

    const names = document.getElementById("name-input").value
        .split(/[\n,]+/)
        .map(name => name.trim())
        .filter(name => name.length > 0);
    const groupSize = parseInt(document.getElementById("group-size").value, 10);

    if (names.length === 0) {
        message.textContent = "Please enter at least one name.";
        return;
    }
    if (!Number.isInteger(groupSize) || groupSize < 1) {
        message.textContent = "People per group must be a whole number of at least 1.";
        return;
    }

    shuffle(names);

    // Distribute evenly so no group ends up with a single leftover person
    // when it can be avoided (e.g. 7 people at size 3 -> groups of 3 and 4).
    const groupCount = Math.max(1, Math.floor(names.length / groupSize));
    const groups = Array.from({ length: groupCount }, () => []);
    names.forEach((name, i) => groups[i % groupCount].push(name));

    groups.forEach((group, i) => {
        const heading = document.createElement("h3");
        heading.textContent = "Group " + (i + 1);
        const list = document.createElement("ul");
        group.forEach(name => {
            const item = document.createElement("li");
            item.textContent = name;
            list.appendChild(item);
        });
        results.appendChild(heading);
        results.appendChild(list);
    });
}

document.getElementById("generate-btn").addEventListener("click", generateGroups);
