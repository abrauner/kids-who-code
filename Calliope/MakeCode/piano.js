input.onPinPressed(TouchPin.P0, () => {
    music.playTone(294, music.beat(BeatFraction.Whole))
})
input.onPinPressed(TouchPin.P1, () => {
    music.playTone(330, music.beat(BeatFraction.Whole))
})
input.onPinPressed(TouchPin.P2, () => {
    music.playTone(349, music.beat(BeatFraction.Whole))
})
input.onPinPressed(TouchPin.P3, () => {
    music.playTone(392, music.beat(BeatFraction.Whole))
})
