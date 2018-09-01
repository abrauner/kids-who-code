// Wir wollen die Ampel erst auf Grün schalten wenn
// die Auto-Ampel uns gesagt, dass sie Rot ist. Wir
// starten also erst, wenn wir die Nachricht bekommen
// haben, dass die Autos Rot haben.
radio.onDataPacketReceived( ({ receivedString }) =>  {
    // Wir müssen die Fußgängerampel nur auf Grünschalten
    // wenn auch jmd. über die Staße gehen will Und
    // natürlich erst wenn die Autos Rot haben.
    if (fussgaengerWunsch && receivedString == "AUTOS_ROT") {
        fussgaengerWunsch = false
        Gefahr = 0
        basic.setLedColor(0)
        // Kurz warten bis wirklich alle Autos angehalten
        // haben
        control.waitMicros(2000000)
        // Schalte die Fußgänger ampel auf Grün
        schalteAmpelGruen()
        // Die Fußgänger ampel bleibt für 5 Sekunden auf Grün
        control.waitMicros(5000000)
        // Nach der Grünphase haben die Fußgänger kurz Zeit
        // die Straße zu verlassen. Die Fußgängerampel blinkt
        // gelb
        schalteAmpelGelb()
        control.waitMicros(500000)
        // Die Fußgängerampel schaltet auf Rot.
        schalteAmpelRot()
        // Die Fußgängerampel merkt sich, dass es jetzt wieder
        // Gefährlich ist.
        Gefahr = 1
    }
})
// Wenn der Knopf B gedrückt wird, möchte eine
// Fußgängerin über die Straße gehen. 
// Wir merken uns, dass jmd. über die Straße gehen
// möchte und schalten eine gelbe "warte" Lampe an.
input.onButtonPressed(Button.B, () => {
    fussgaengerWunsch = true
    basic.setLedColor(Colors.Yellow)
    radio.sendString("FUSSGAENGER_WUNSCH")
})
// Diese Funktion schaltet die Ampel kurz aus und
// zeigt ein gelbes Blinklicht an. Dafür wird zuerst
// alles kurz ausgeschaltet und danach wird fünf mal
// gelb geblinkt. Die Farb-LED wird für eine halbe
// Sekunde an- und anschließend ausgeschaltet.
function schalteAmpelGelb()  {
    alleLEDsAus()
    for (let i = 0; i < 5; i++) {
        led.enable(false)
        basic.setLedColor(Colors.Yellow)
        control.waitMicros(500000)
        basic.setLedColor(0)
        control.waitMicros(500000)
    }
    led.enable(false)
}
// Diese Funktion schaltet erst alle LEDs aus und
// zeigt anschließend ein grüne Licht an. Die Farb-LED wird auf Grün gestellt. 
function schalteAmpelGruen()  {
    alleLEDsAus()
    basic.setLedColor(Colors.Green)
}
// Diese Funktion macht erst alle LEDs aus und
// schaltet die Fußgängerampel anschließend auf Rot in
// dem alle LEDs angeschaltet werden.
function schalteAmpelRot()  {
    alleLEDsAus()
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
    // Die Fußgängerampel sendet an andere Ampeln, dass
    // sie auf Rot gestellt ist.
    radio.sendString("FUSSGAENGER_ROT")
}
// Alle LEDs ausschalten damit keine Mischfarben angezeigt werden
function alleLEDsAus() {
    led.enable(false)
    basic.clearScreen()
    basic.setLedColor(0)
    led.enable(true)
}

// Wir merken uns ob es gerade gefährlich ist über die Straße zu gehen
let Gefahr = 1
// Am Anfang hat noch keine Fußgängerin den Warte-Knopf gedrückt. 
let fussgaengerWunsch = false
// Wir legen fest, dass wir alle Nachrichten in Gruppe
// 0 senden wollen.
radio.setGroup(0)
// Wenn wir Nachrichten senden wollen, dann machen wir
// das mit voller Kraft
radio.setTransmitPower(7)
// Zur Sicherheit schalten wir die Ampel am Anfang
// Rot.
schalteAmpelRot()
