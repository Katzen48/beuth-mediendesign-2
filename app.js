let age = 32;

function animateOut() {
    // animate women
    document.getElementById('frau').classList.remove('rechts');
    document.getElementById('frau').classList.add('links');

    // animate info bubbles
    hide(document.getElementById('info'));

    // animate input bubbles
    hide(document.getElementById('input'));
}

function animateIn() {
    // animate hidden elements
    let elements = [...document.getElementsByClassName('hidden')];
    elements.forEach(element => element.classList.remove('hidden'));
}

function setAge() {
    age = parseInt(document.getElementById('age-input').value)
    document.getElementById('age').innerText = age.toFixed(0);
}

function onSubmit() {
    if(document.getElementById('age-input').checkValidity()) {
        document.getElementById('form').noValidate = true;

        document.getElementById('age-input').disabled = true;
        document.getElementById('submit').disabled = true;
        document.getElementById('submit').classList.remove('pointer');

        setAge();
        visualizeOvaTrend();
        visualizeFertilityTrend();

        animateIn();
        animateOut();
    }

    return false;
}

function visualizeOvaTrend() {
    let currentAge = age;

    for (let i = 0; i <= 2; i++) {
        visualizeOva(currentAge, i);
        currentAge += 2;
    }
}

function visualizeOva(age, index) {
    const max = 50000;
    const targetAge = 18;
    const decreasePerYear = max / 42;

    let value = Math.max(Math.ceil(max - decreasePerYear * (age - targetAge)), 0);

    generateOva(value, max, index);
    document.getElementById('ova-text-' + index).innerText = age + ' J';
}

function visualizeFertilityTrend() {
    let currentAge = age;

    for (let i = 0; i <= 2; i++) {
        visualizeFertility(currentAge, i);
        currentAge += 2;
    }
}

function visualizeFertility(age, index) {
    const withoutMax = 0.35;
    const withValue = 0.05;
    const targetAge = 18;
    const decreasePerYear = withoutMax / 42;

    let withoutValue = Math.max(withoutMax - decreasePerYear * (age - targetAge), 0);

    setFertility(age, withoutValue, age > 18 ? withValue : 0, index);
}

// Convenience Functions & Event Handlers

function hide(element) {
    element.classList.add('hidden');
    setTimeout(() => element.style.display = 'none', 2000);
}

function generateOva(value, max, index) {
    let totalPercent = value / max;
    let percentPerRow = 5 / 100;

    let count = Math.ceil(totalPercent * 25);

    for (let i = 0; i < count; i++) {
        let column = i % 5;
        let row = Math.floor(i / 5);
        let percent = Math.min(100, (totalPercent - percentPerRow * row) / percentPerRow * 100);

        addOvaElement(percent, row, column, index);
    }

    document.getElementById('ova-group-' + index).title = value + ' Eizellen';
}

function setFertility(age, percentWithout, percentWith, index) {
    // Value
    document.getElementById('fertility-value-with-' + index).innerText = Math.ceil(percentWithout * 100 + percentWith * 100) + '%';
    setFertilityPercents('fertility-value-with-' + index, percentWithout, percentWith);

    // Bars
    setFertilityPercents('fertility-with-' + index, percentWithout, percentWith);
    setFertilityPercents('fertility-without-' + index, percentWithout, percentWith);

    // Age
    document.getElementById('fertility-age-' + index).innerText = age + ' J';
}

function setFertilityPercents(elementName, percentWithout, percentWith) {
    document.getElementById(elementName).style.setProperty('--percent-without', percentWithout);
    document.getElementById(elementName).style.setProperty('--percent-with', percentWith);
}

function addOvaElement(percent, row, column, index) {
    let element = document.createElement('div');
    element.classList.add('ova-image');

    // Set properties
    element.style.setProperty('--percent', `${percent}%`);
    element.style.setProperty('--row', row);
    element.style.setProperty('--column', column);

    document.getElementById('ova-' + index).appendChild(element);
}