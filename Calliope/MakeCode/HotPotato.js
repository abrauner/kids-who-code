
// Implementation for Calliope of the game "hot potato".
// Level: medium
//
// Game mechanics:
// When button A is pressed, it will start a countdown
// (5 - 30 seconds), during which time the participants
// have to pass the Calliope around to each other until
// the time expires. The participant that holds the
// Calliope when this happens, loses.
//
// Functionality:
// - During the countdown, it displays a blinking green
// light and emits a beeping, both become faster as the
// expiration time draws near.
// - When the countdown signal tops its maximum speed,
// it will stay there maximum 5 seconds, to avoid giving
// away the exact time of expiration.
// - When the expiration time arrives, it will display
// a red light and a skull icon and it will emit a
// high-pitched beeping sound 5 times. 

let countdown = false
let counter = 0
let initialCounter = 0
input.onButtonPressed(Button.A, () => {
    basic.clearScreen()
    initialCounter = 5 + Math.random(26)
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

basic.forever(() => {
    if (countdown) {
        basic.setLedColor(Colors.Green)
        music.playTone(247, music.beat(BeatFraction.Quarter))
        basic.setLedColor(0)
        basic.pause(counter * 1000 / initialCounter)
    }
})
