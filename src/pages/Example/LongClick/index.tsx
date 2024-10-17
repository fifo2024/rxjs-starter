import { useEffect } from "react";
import * as rxjs from "rxjs";
import "./style.scss";

const { fromEvent, Observable, flatMap } = rxjs;

const LongClick = () => {
    useEffect(() => {
        const divs = document.querySelectorAll("div");
        let longClickDetected = false;

        const longClick$ = fromEvent(divs, "mousedown").pipe(
            flatMap((e) => {
                document.body.classList.add("spinner");
                return Observable.return(e)
                    .delay(700)
                    .takeUntil(Observable.fromEvent(document.body, "mouseup"));
            })
        );

        fromEvent(divs, "click").subscribe((clickEvent) => {
            if (longClickDetected) {
                longClickDetected = false;

                return;
            }
            document.body.classList.remove("spinner");
            document.getElementById(
                "captured_event"
            ).innerHTML = `Click on ${clickEvent.target.textContent}`;
        });

        longClick$.subscribe((longClick) => {
            longClickDetected = true;
            document.body.classList.remove("spinner");
            document.getElementById(
                "captured_event"
            ).innerHTML = `Longclick on ${longClick.target.textContent}`;
        });
    }, []);

    return (
        <div>
            <h1>
                Captured event: <span id="captured_event">None</span>
            </h1>
            <div className="long-click-item">Item 1</div>
            <div className="long-click-item">Item 2</div>
            <div className="long-click-item">Item 3</div>
        </div>
    );
};

export default LongClick;
