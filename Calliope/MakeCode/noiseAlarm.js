basic.forever(() => {
    if (pins.analogReadPin(AnalogPin.MIC) > 20) {
        basic.showIcon(IconNames.Sad)
        basic.setLedColor(Colors.Red)
    } else {
        basic.showIcon(IconNames.Happy)
        basic.setLedColor(Colors.Green)
    }
})
