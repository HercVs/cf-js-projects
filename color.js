const DEFAULT = 0
counter = 0
let color, mode
let colorCounters = {
    red: DEFAULT,
    green: DEFAULT,
    blue: DEFAULT
}

$(function() {
    $('#displayRandomColorBtn').on('click', function() {
        onDisplayRandomColorClick()
    })

    $('.color-weights').on('click', 'button', function() {
        color = $(this).data('color')
        mode = $(this).data('mode')
        onCounterButtonClicked(mode, color)
    })

    $('#displayInputColorBtn').on('click', function() {
        onDisplayInputColorClick()
    })

    $('#inputColor').on('keypress', function(e) {
        if (e.key === 'Enter') {
            onDisplayInputColorEnter()
        }
    })
})

// Handlers

function onDisplayInputColorClick() {
    displayColor(getInputColor())
}

function onDisplayInputColorEnter() {
    displayColor(getInputColor())
}

function onDisplayRandomColorClick() {
    displayColor(generateRandomColor())
}

/**
 * Calls the appropriate function to increase/decrease/reset the color specific counter based on the type (mode) of button pressed.
 * @param {*} mode  The functionality that the pressed button offers (increase, decrease, reset)
 * @param {*} color  The color (RGB) that the button is used for.
 */
function onCounterButtonClicked(mode, color) {
    switch (mode) {
        case 'increase':
            onIncreaseClicked(color)
            break;
        case 'decrease':
            onDecreaseClicked(color)
            break;
        case 'reset':
            onResetClicked(color)
            break;
        default:
            console.log(`Incorrect button type "${mode}"`)    
    }
}

/**
 * Actions taken after the 'Decrease' button was clicked for a specific color.
 * Actions: decrease the color counter.
 * @param {*} color  the color that the button is assigned to.
 */
function onDecreaseClicked(color) {
    decreaseCounter(color)
}

/**
 * Actions taken after the 'Reset' button was clicked for a specific color.
 * Actions: reset the color counter.
 * @param {*} color  the color that the button is assigned to.
 */
function onResetClicked(color) {
    resetCounter(color)
}

/**
 * Actions taken after the 'Increase' button was clicked for a specific color.
 * Actions: increase the color counter.
 * @param {*} color  the color that the button is assigned to.
 */
function onIncreaseClicked(color) {
    increaseCounter(color)
}

// ---

//TODO Change the random color generation from hex value to RGB value in order to take the color counters into account as weights to affect the generation.
function generateRandomColor() {
    const hexChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
    let hexColor = '#'

    const randomHexadecimal = () => Math.floor((Math.random() * hexChars.length))

    for (let i = 0; i <= 5; i++) {
        hexColor += hexChars[randomHexadecimal()]
    }
    return hexColor
}

/**
 * Returns the hex color code provided by the user in the #inputColor input field.
 * @returns the value of the input field.
 */
function getInputColor() {
    let inputColor = $('#inputColor').val()
    inputColor = (inputColor.startsWith('#')) ? inputColor : '#' + inputColor
    let hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

    if (!hexColorRegex.test(inputColor)) return

    if (inputColor.length === 4) {
        inputColor = "#" 
                    + inputColor[1] + inputColor[1] 
                    + inputColor[2] + inputColor[2] 
                    + inputColor[3] + inputColor[3]
    }
    return inputColor
}

/**
 * Displays the hex color provided as background color for the color demo div as well as hex code on the screen.
 * @param {String} hexColor the hex color code to display.
 */
function displayColor(hexColor) {
    $('.color-picker').css('background-color', hexColor)
    $('#colorDisplay').html(hexColor)
}

/**
 * Decreases the color's counter by 1 and renders to UI.
 * @param {*} color  the color to modify.
 */
function decreaseCounter(color) {
    colorCounters[color]--
    updateCounter(color)
}

/**
 * Resets the color's counter to zero and renders to UI.
 * @param {*} color  the color to modify.
 */
function resetCounter(color) {
    colorCounters[color] = DEFAULT
    updateCounter(color)
}

/**
 * Increases the color's counter by 1 and renders to UI.
 * @param {*} color  the color to modify.
 */
function increaseCounter(color) {
    colorCounters[color]++
    updateCounter(color)
}

/**
 * Renders to UI the current value of color's counter and gives styling based on value.
 * @param {*} color  the (RGB) color that got its counter modified.
 */
function updateCounter(color) {
    let colorCounter = $('.counter').filter(`[data-color=${color}]`)
    // Data binding
    colorCounter.text(colorCounters[color])
    // Styling
    styleCounterElement(colorCounter, color)
}

/**
 * Styles the counter's text color based on current counter value for a specific counter (0 = white, >0 = green, <0 = red).
 * @param {*} element the DOM element object that serves as counter value for the specific color.
 * @param {*} color the color that got its counter modified.
 */
function styleCounterElement(element, color) {
    element.toggleClass('text-red', colorCounters[color] < 0)
    element.toggleClass('text-white', colorCounters[color] === 0)
    element.toggleClass('text-green', colorCounters[color] > 0)
}