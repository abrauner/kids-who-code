let asteroids: game.LedSprite[] = []
let spaceship: game.LedSprite = null
input.onButtonPressed(Button.A, () => {
    spaceship.move(-1)
})
input.onButtonPressed(Button.B, () => {
    spaceship.move(1)
})
spaceship = game.createSprite(2, 4)
basic.pause(1000)
while (true) {
    basic.pause(500)
    asteroids.push(game.createSprite(Math.random(5), 0))
    for (let asteroid of asteroids) {
        if (asteroid.get(LedSpriteProperty.X) == spaceship.get(LedSpriteProperty.X) && asteroid.get(LedSpriteProperty.Y) == 3) {
            game.gameOver()
        } else if (asteroid.get(LedSpriteProperty.Y) == 4) {
            asteroid.delete()
            game.setScore(game.score() + 10)
        } else {
            asteroid.change(LedSpriteProperty.Y, 1)
        }
    }
}
