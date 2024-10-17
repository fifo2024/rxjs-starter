import { useEffect } from "react";
import * as Rx from "rxjs";

import "./style.scss";

const { fromEvent, interval, takeUntil, mergeMap, flatMap, map, mergeWith } =
    Rx;

const Drag2 = () => {
    useEffect(() => {
        const dragTarget = document.getElementById(
            "dragTarget"
        ) as HTMLDivElement;

        const pressMove = fromEvent(document, "mousemove").pipe(
            mergeWith(fromEvent(document, "touchmove"))
        );
        const pressEnd = fromEvent(dragTarget, "mouseup").pipe(
            mergeWith(fromEvent(dragTarget, "touchend"))
        );
        const pressStart = fromEvent(dragTarget, "mousedown").pipe(
            mergeWith(fromEvent(dragTarget, "touchstart"))
        );

        let drag = pressStart.pipe(
            flatMap((md) => {
                // calculate offsets when mouse down
                let startX, startY;

                if (md.offsetX) {
                    startX = md.offsetX;
                    startY = md.offsetY;
                } else if (md.changedTouches) {
                    startX = md.changedTouches[0].clientX;
                    startY = md.changedTouches[0].clientY;
                }

                let header = dragTarget.querySelector("h2");
                header.innerHTML = `${startX}, ${startY}`;

                // Calculate delta with mousemove until mouseup
                return pressMove.pipe(
                    map((mm) => {
                        mm.preventDefault();

                        return {
                            left: mm.clientX
                                ? mm.clientX - startX
                                : mm.changedTouches[0].clientX - startX,
                            top: mm.clientY
                                ? mm.clientY - startY
                                : mm.changedTouches[0].clientY - startY,
                        };
                    }),
                    takeUntil(pressEnd)
                );
            })
        );

        // Update position
        drag.subscribe((pos) => {
            dragTarget.style.top = pos.top + "px";
            dragTarget.style.left = pos.left + "px";
        });
    }, []);

    return (
        <div>
            <div id="dragTarget">
                <h2>Drag Me!</h2>
            </div>
            <div className="container">
                <div className="page-header">
                    <h1>RxJS Drag and Drop Example</h1>
                    <p className="lead">
                        Example to show coordinating events to perform drag and
                        drop. (except touch isn't working...)
                    </p>
                    <p>
                        <a href="https://github.com/Reactive-Extensions/RxJS/tree/master/examples/dragndrop">
                            https://github.com/Reactive-Extensions/RxJS/tree/master/examples/dragndrop
                        </a>
                    </p>
                    <p>
                        <a href="http://stackoverflow.com/questions/30969339/how-to-handle-mouse-and-touch-events-simultaneously-with-reactive-event-streams">
                            http://stackoverflow.com/questions/30969339/how-to-handle-mouse-and-touch-events-simultaneously-with-reactive-event-streams
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Drag2;
