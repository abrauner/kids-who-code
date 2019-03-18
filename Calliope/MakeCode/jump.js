let Ball: game.LedSprite = null
let Girl: game.LedSprite = null
input.onButtonPressed(Button.B, () => {
    Ball = game.createSprite(4, 4)
    for (let i = 0; i < 4; i++) {
        basic.pause(200)
        Ball.change(LedSpriteProperty.X, -1)
    }
    if (Girl.isTouching(Ball)) {
        music.playTone(262, music.beat(BeatFraction.Whole))
    }
    basic.pause(200)
    Ball.delete()
    radio.sendNumber(0)
})
Girl = game.createSprite(0, 4)
basic.forever(() => {
    if (input.buttonIsPressed(Button.A)) {
        Girl.change(LedSpriteProperty.Y, -1)
        basic.pause(200)
        Girl.change(LedSpriteProperty.Y, -1)
        basic.pause(200)
        Girl.change(LedSpriteProperty.Y, 1)
        basic.pause(200)
        Girl.change(LedSpriteProperty.Y, 1)
    }
})
