basic.forever(() => {
    if (input.temperature() < 18) {
        basic.setLedColor(Colors.Blue)
    } else {
        if (input.temperature() > 25) {
            basic.setLedColor(Colors.Red)
        } else {
            basic.setLedColor(Colors.Green)
        }
    }
})
