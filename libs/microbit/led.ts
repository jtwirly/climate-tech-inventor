//% color=3 weight=35
namespace led {

    /**
     * Displays a vertical bar graph based on the ``value`` and ``high`` value.
     * @param value current value to plot
     * @param high maximum value, eg: 1023, 255
     */
    //% help=/led/plot-bar-graph weight=20
    //% blockId=device_plot_bar_graph block="plot bar graph of %value |up to %high" icon="\uf080" blockExternalInputs=true
    export function plotBarGraph(value: number, high: number): void {
        
        serial.writeString(value.toString() + "\r\n");
        
        let v = Math.abs((value * 15) / high);
        let k = 0;
        for(let y = 4; y >= 0; --y) {
            for (let x = 0; x < 3; ++x) {
                if (k > v) {
                    unplot(2-x,y);
                    unplot(2+x,y);
                } else {
                    plot(2-x, y);
                    plot(2+x, y);
                }
                ++k;
            }
        }        
    }
    
    /**
     * Toggles a particular pixel
     * @param x TODO
     * @param y TODO
     */
    //% help=led/toggle
    export function toggle(x: number, y: number): void {
        if (led.point(x, y)) {
            led.unplot(x, y);
        } else {
            led.plot(x, y);
        }
    }

    /**
     * Turns all LEDS on
     */
    //% help=led/plot-all
    export function plotAll(): void {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                led.plot(i, j);
            }
        }
    }

    /**
     * Inverts the current LED display
     */
    //% help=led/toggle-all
    export function toggleAll(): void {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                led.toggle(i, j);
            }
        }
    }

    /**
     * Fades in the screen display.
     * @param ms TODO
     */
    //% help=led/fade-in
    export function fadeIn(ms: number = 700): void {
        if (ms < 20) {
            led.setBrightness(255);
            return;
        }
        let dt = 50;
        let brightness = led.brightness();
        let start = input.runningTime();
        let elapsed = 0;
        while (elapsed < ms) {
            led.setBrightness(brightness + ((255 - brightness) * elapsed) / ms);
            basic.pause(dt);
            elapsed = input.runningTime() - start;
        }
        led.setBrightness(255);
    }

    /**
     * Fades out the screen brightness.
     * @param ms TODO
     */
    //% help=led/fade-out
    export function fadeOut(ms: number = 700): void {
        if (ms < 20) {
            led.setBrightness(0);
            return;
        }
        let brightness = led.brightness();
        let dt = 50;
        let start = input.runningTime();
        let elapsed = 0;
        while (elapsed < ms) {
            led.setBrightness(brightness - (brightness * elapsed) / ms);
            basic.pause(dt);
            elapsed = input.runningTime() - start;
        }
        led.setBrightness(0);
    }


}
