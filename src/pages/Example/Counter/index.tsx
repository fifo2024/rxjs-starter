import { useEffect, useRef } from "react";
import * as rxjs from "rxjs";
import "./style.scss";

const Counter = () => {
    const { BehaviorSubject, fromEvent, map } = rxjs;
    const counterRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let counter = 0;
        const counter$ = new BehaviorSubject(counter);
        counter$.subscribe((value) => {
            (counterRef.current as any).innerHTML = value;
        });

        const incrementButton = document.querySelector(".increment");
        const decrementButton = document.querySelector(".decrement");

        fromEvent(buttonsRef.current, "click")
            .pipe(map((e) => e.target))
            .subscribe((target) => {
                if (target === incrementButton) counter++;
                if (target === decrementButton) counter--;

                counter$.next(counter);
            });
    }, []);

    return (
        <div className="container">
            <div className="wrapper mdc-elevation--z1">
                <div ref={counterRef} className="counter">
                    0
                </div>
                <div ref={buttonsRef} className="buttons">
                    <button
                        type="button"
                        className="button decrement mdc-elevation--z2"
                    >
                        descrement
                    </button>
                    <button
                        type="button"
                        className="button increment mdc-elevation--z2"
                    >
                        increment +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Counter;
