let farbe1 = 0
let farbe2 = 0
let farbe3 = 0
let hilfsFarbe = 0
let anzahlFarben = 0

// Wenn Knopf B gedrückt wird blinken 3 Farben
input.onButtonPressed(Button.B, () => {
    anzahlFarben = 3
})
// Wenn Knopf A gedrückt wird tauschen wir die Farben
// Dafür müssen wir uns eine Farbe merken bevor wir sie ändern
input.onButtonPressed(Button.A, () => {
    anzahlFarben = 2
    hilfsFarbe = farbe1
    farbe1 = farbe2
    farbe2 = hilfsFarbe
})
// Wir starten mit zwei Farben im Muster 5xfarbe1 + 1xfarbe2
anzahlFarben = 2
// Farbe 1 ist Rot
farbe1 = Colors.Red
// Farbe 1 ist Grün
farbe2 = Colors.Green
// Farbe 1 ist Gelb
farbe3 = Colors.Yellow
// Am Anfang lassen 5 x farbe1 (Rot) blinken und dann 1 x farbe2 (Grün)
basic.forever(() => {
    // Wenn nur zwei Farben blinken dann immer 5xfarbe1 und 1xfarbe2
    if (anzahlFarben == 2) {
        for (let i = 0; i < 5; i++) {
            basic.setLedColor(farbe1)
            basic.pause(500)
            basic.setLedColor(0)
            basic.pause(500)
        }
        basic.setLedColor(farbe2)
        basic.pause(500)
    } else {
        // Wenn 3 Farben blinken dann immer abwechselnd
        if (anzahlFarben == 3) {
            basic.setLedColor(farbe1)
            basic.pause(500)
            basic.setLedColor(farbe2)
            basic.pause(500)
            basic.setLedColor(farbe3)
            basic.pause(500)
        }
    }
})
