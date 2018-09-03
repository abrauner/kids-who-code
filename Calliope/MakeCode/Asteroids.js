let asteroids: game.LedSprite[] = []
let spaceship: game.LedSprite = null
input.onButtonPressed(Button.B, () => {
    spaceship.move(1)
})
input.onButtonPressed(Button.A, () => {
    spaceship.move(-1)
})
spaceship = game.createSprite(2, 4)
while (true) {
    basic.pause(500)
    asteroids.push(game.createSprite(Math.random(5), 0))
    for (let asteroid of asteroids) {
        if (asteroid.isTouching(spaceship)) {
            music.beginMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once)
            game.gameOver()
        } else if (asteroid.get(LedSpriteProperty.Y) == 4) {
            asteroid.delete()
            game.setScore(game.score() + 1)
        } else {
            asteroid.change(LedSpriteProperty.Y, 1)
        }
    }
}
