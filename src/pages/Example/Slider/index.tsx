import { useEffect, useState, useRef } from "react";
import * as Rx from "rxjs";
import "./style.scss";

const data = [
    {
        color: "#E91E63",
    },
    {
        color: "#448AFF",
    },
    {
        color: "#AFB42B",
    },
    {
        color: "#4CAF50",
    },
    {
        color: "#7B1FA2",
    },
    {
        color: "#FF5722",
    },
    {
        color: "#009688",
    },
];
const START_INDEX = 3;
const TRANSITION_TIME = 300;

const {
    fromEvent,
    map,
    filter,
    mergeWith,
    startWith,
    throttleTime,
    scan,
    distinctUntilChanged,
} = Rx;

const Slider = () => {
    const [sliderIndex, setSliderIndex] = useState(START_INDEX);
    const prevSliderRef = useRef<HTMLButtonElement>();
    const nextSliderRef = useRef<HTMLButtonElement>();

    useEffect(() => {
        // create stream of click events and map it to -1 that means go to prev slide
        const prevBtnClick$ = fromEvent(prevSliderRef.current, "click").pipe(
            map(() => -1)
        );
        // create stream of click events and map to 1 that means go to next slide
        const nextBtnClick$ = fromEvent(nextSliderRef.current, "click").pipe(
            map(() => 1)
        );
        // keydown stream, filter only "right" and "left" arrow keyboard keys
        // and return 1 for next slide or -1 for prev slide
        const keyDown$ = fromEvent(window, "keydown").pipe(
            map((event) => event.which),
            filter((code) => code === 39 || code === 37),
            map((code) => (code === 37 ? -1 : 1))
        );

        // stream of mousewheel
        const mouseWheelChange$ = fromEvent(window, "mousewheel")
            // map top -1 / 1 depends of user scroll up or down
            .pipe(
                map((event) => (event.wheelDelta / 120 > 0 ? -1 : 1)),
                mergeWith(prevBtnClick$, nextBtnClick$, keyDown$),
                throttleTime(TRANSITION_TIME),
                startWith(START_INDEX),
                scan((prev, current) => {
                    const next = prev + current;
                    // check if the next values is in range between 0 and slides lenght,
                    // otherwise doesn't move slide
                    if (next >= 0 && next < data.length) {
                        return next;
                    } else {
                        return prev;
                    }
                }, 0),
                distinctUntilChanged()
            );

        // Subscribe to the stream and update react state
        mouseWheelChange$.subscribe(
            //    sliderIndex => this.setState({sliderIndex})
            (sliderIndex) => setSliderIndex(sliderIndex)
        );
    }, []);

    const transition = sliderIndex * -100;
    const style = {
        width: data.length * 100 + "vw",
        transitionDuration: TRANSITION_TIME + "ms",
        transform: `translateX(${transition}vw)`,
    };

    const slides = data.map((item, index) => (
        <div className="slider__item" style={{ background: item.color }}>
            {index}
        </div>
    ));

    return (
        <div className="slider">
            <div className="slider__wrapper" style={style}>
                {slides}
            </div>
            <button
                className="slider__btn slider__btn--prev"
                ref={prevSliderRef}
            >
                {" "}
                prev{" "}
            </button>
            <button
                className="slider__btn slider__btn--next"
                ref={nextSliderRef}
            >
                {" "}
                next{" "}
            </button>
        </div>
    );
};

export default Slider;
