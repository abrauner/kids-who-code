// Implementation for Calliope of the game "hot potato".
//
// When button A is pressed, it will start a countdown,
// during which time the participants have to pass the
// Calliope around to each other until the time expires.
// During this countdown, a blinking light and beeping
// will become faster as the expiration time draws near.
//
// The Calliope will signal the end of the countdown
// with a red light, a skull icon and a high-pitched
// beeping sound. The participant that holds the
// Calliope when this happens, loses.
//
// This one is a functional yet easy implementation,
// but it could be simplified by using alternative
// signaling on countdown and expiration time.

// Given a random amount of seconds between 5 and 25
// it starts counting down until it expires, then
// displays the expiration signals.
let countdown = false
let counter = 0
let initialCounter = 0
input.onButtonPressed(Button.A, () => {
    initialCounter = 5 + Math.random(21)
    counter = initialCounter
    countdown = true
    while (counter > 0) {
        basic.pause(1000)
        counter += -1
    }
    basic.pause(Math.random(5001))
    countdown = false
    basic.setLedColor(Colors.Red)
    basic.showIcon(IconNames.Skull)
    for (let i = 0; i < 5; i++) {
        music.playTone(880, music.beat(BeatFraction.Double))
        music.playTone(784, music.beat(BeatFraction.Double))
    }
})

// During countdown it displays the countdown signals,
// getting faster as the expiration time draws near.
basic.forever(() => {
    if (countdown) {
        basic.setLedColor(Colors.Green)
        music.playTone(247, music.beat(BeatFraction.Quarter))
        basic.setLedColor(0)
        basic.pause(counter * 1000 / initialCounter)
    }
})
