// Implementation for Calliope of the game "hot potato".
// Level: easy
//
// Game mechanics:
// When button A is pressed, it will start a countdown
// (5 - 30 seconds), during which time the participants
// have to pass the Calliope around to each other until
// the time expires. The participant that holds the
// Calliope when this happens, loses.
//
// Functionality:
// - During the countdown, it displays a constant
// blinking green light and emits a beeping.
// - When the expiration time arrives, it will display
// a red light and a skull icon and it will emit a
// high-pitched beeping. 

let counter = 0
input.onButtonPressed(Button.A, () => {
    basic.clearScreen()
    counter = 5 + Math.random(26)
    while (counter > 0) {
        basic.setLedColor(Colors.Green)
        music.playTone(247, music.beat(BeatFraction.Quarter))
        basic.setLedColor(0)
        basic.pause(1000)
        counter += -1
    }
    basic.setLedColor(Colors.Red)
    basic.showIcon(IconNames.Skull)
    music.playTone(880, music.beat(BeatFraction.Double))
    music.playTone(784, music.beat(BeatFraction.Double))
})
