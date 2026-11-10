input.onButtonPressed(Button.A, function () {
    logging = true
    while (logging) {
        if (input.acceleration(Dimension.Y) >= 200) {
            forehand_swings += 1
        }
        if (input.acceleration(Dimension.Y) <= -200) {
            backhand_swings += 1
        }
    }
})
input.onButtonPressed(Button.AB, function () {
    reset_timer = input.runningTime()
    if (reset == 1) {
        datalogger.deleteLog()
        basic.showLeds(`
            # . . . #
            . # # # .
            . . # . .
            . # # # .
            # . . . #
            `)
        reset = 0
    }
})
input.onButtonPressed(Button.B, function () {
    logging = false
    datalogger.log(
    datalogger.createCV("session_forehands", forehand_swings),
    datalogger.createCV("session_backhands", backhand_swings)
    )
})
let reset = 0
let reset_timer = 0
let backhand_swings = 0
let forehand_swings = 0
let logging = false
logging = false
datalogger.includeTimestamp(FlashLogTimeStampFormat.Milliseconds)
forehand_swings = 0
backhand_swings = 0
loops.everyInterval(200, function () {
    if (logging) {
        datalogger.log(
        datalogger.createCV("ax", input.acceleration(Dimension.X)),
        datalogger.createCV("ay", input.acceleration(Dimension.Y)),
        datalogger.createCV("az", input.acceleration(Dimension.Z)),
        datalogger.createCV("pitch", input.rotation(Rotation.Pitch)),
        datalogger.createCV("roll", input.rotation(Rotation.Roll)),
        datalogger.createCV("strength", input.acceleration(Dimension.Strength))
        )
    }
})
