let fussgaengerWunsch = false
// Diese Funktion schaltet erst alle LEDs aus und
// zeigt anschließend ein grüne Licht an. Die Farb-LED
// wird auf Grün gestellt.
function schalteAmpelGruen()  {
    alleLEDsAus()
    basic.setLedColor(Colors.Green)
}
// Diese Funktion schaltet erst alle LEDs aus und
// zeigt anschließend ein gelbes Licht an. Die
// Farb-LED wird auf Gelb gestellt.
function schalteAmpelGelb()  {
    alleLEDsAus()
    basic.setLedColor(Colors.Yellow)
}
// Diese Funktion schaltet erst alle LEDs aus und
// zeigt anschließend ein rotes und ein gelbes Licht
// an. Die Farb-LED wird auf Gelb gestellt. Die
// LED-Matrix wird angeschaltet.
function schalteAmpelRotGelb()  {
    alleLEDsAus()
    basic.setLedColor(Colors.Yellow)
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
}
// Diese Funktion schaltet erst alle LEDs aus und
// zeigt anschließend ein rotes Licht an. Die
// LED-Matrix wird angeschaltet.
function schalteAmpelRot()  {
    alleLEDsAus()
    // Anschließend Rote Ampel anschalten.
    led.enable(true)
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
    // Die Autoampel sendet an andere Ampeln, dass sie auf
    // Rot gestellt ist.
    radio.sendString("AUTOS_ROT")
}
radio.onDataPacketReceived( ({ receivedString }) =>  {
    // Wenn ein Fußgänger über die Straße gehen will
    // müssen wir die Autos Rot schalten
    if (receivedString == "FUSSGAENGER_WUNSCH") {
        fussgaengerWunsch = true
        alleLEDsAus()
        // Schalte die Auto Ampel auf Gelb
        schalteAmpelGelb()
        // Warte 2 Sekunden und schalte dann auf Rot
        control.waitMicros(2000000)
        // Die Fußgängerampel schaltet auf Rot
        schalteAmpelRot()
        // Die Ampel für Autos bleibt 17 Sek Rot
        control.waitMicros(15000000)
        // Die Fußgängerampel merkt sich, dass es jetzt wieder
        // Gefährlich ist.
        fussgaengerWunsch = false
    } else {
        // Die Auto Ampel wartet bis die Fußgängerampel
        // wirklich Rot anzeigt.
        if (fussgaengerWunsch == false && receivedString == "FUSSGAENGER_ROT") {
            alleLEDsAus()
            // Schalte die Auto Ampel auf Gelb und warte 3
            // Sekunden
            schalteAmpelRotGelb()
            control.waitMicros(1000000)
            // Schalte Ampel auf Grün
            schalteAmpelGruen()
        }
    }
})
// Insgesamt 4 verschiedene Ampelphasen:
// https://upload.wikimedia.org/wikipedia/commons/2/24/Traffic_lights_4_states.svg
// Rot, Rot-Gelb, Grün, Gelb Alle LEDs ausschalten
// damit keine Mischfarben angezeigt werden
function alleLEDsAus()  {
    led.enable(false)
    basic.clearScreen()
    basic.setLedColor(0)
    led.enable(true)
}
radio.setGroup(0)
radio.setTransmitPower(7)
schalteAmpelGruen()
