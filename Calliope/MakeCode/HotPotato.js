// Basic implementation of the game "hot potato".
// When button A is pressed, it will start a
// heart beating animation that will last a
// random amount of seconds. During this period
// of time, the participants have to pass the
// Calliope around to each other until the time
// expires. The participant that holds the
// Calliope when the time expires (i.e. LED turns
// red, among other signals), loses.

// Picks a random number between 5 and 25
// and starts counting down until it expires.
let counter = 0
input.onButtonPressed(Button.A, () => {
    basic.setLedColor(Colors.Green)
    counter = 5 + Math.random(21)
    while (counter > 0) {
        showAnimation()
        counter += -1
    }
    showPotato()
})

// Plays a heart beating animation
function showAnimation() {
    basic.showIcon(IconNames.SmallHeart)
    control.waitMicros(250000)
    basic.showIcon(IconNames.Heart)
    control.waitMicros(250000)
}

// Plays signals indicating that time has expired
function showPotato() {
    basic.setLedColor(Colors.Red)
    basic.showIcon(IconNames.Skull)
    music.playTone(494, music.beat(BeatFraction.Quarter))
}
