let fussgaengerWunsch = false
// Alle LEDs ausschalten damit keine Mischfarben
// angezeigt werden
function alleLEDsAus()  {
    led.enable(false)
    basic.clearScreen()
    basic.setLedColor(0)
    led.enable(true)
}
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
        // Die Ampel für Autos bleibt 5 Sek Rot
        control.waitMicros(5000000)
        // Die Fußgängerampel schaltet auf Rot
        schalteAmpelRot()
        // Die Fußgängerampel merkt sich, dass es jetzt wieder
        // Gefährlich ist.
        fussgaengerWunsch = false
    } else {
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
// Diese Funktion schaltet erst alle LEDs aus und
// schaltet die Auto Ampel anschließend auf Rot in dem
// alle LEDs angeschaltet werden.
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
radio.setGroup(0)
radio.setTransmitPower(7)
schalteAmpelGruen()
