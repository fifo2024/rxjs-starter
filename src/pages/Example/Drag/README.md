import { useEffect, useRef } from "react";
import { merge, fromEvent } from "rxjs";

import "./style.scss";

const Drag = () => {
    const dragTargetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dragTarget: any = dragTargetRef.current;
        const pressEnd = merge(
            fromEvent(window, "mouseup"),
            fromEvent(window, "touchend")
        );
        const pressMove = merge(
            fromEvent(document, "mousemove"),
            fromEvent(document, "touchmove")
        );
        const pressStart = merge(
            fromEvent(dragTarget, "mousedown"),
            fromEvent(dragTarget, "touchstart")
        );
        console.log(pressStart, dragTarget);
        let drag = pressStart.flatMap((md) => {
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
            return pressMove
                .map((mm) => {
                    mm.preventDefault();
                    return {
                        left: mm.clientX
                            ? mm.clientX - startX
                            : mm.changedTouches[0].clientX - startX,
                        top: mm.clientY
                            ? mm.clientY - startY
                            : mm.changedTouches[0].clientY - startY,
                    };
                })
                .takeUntil(pressEnd);
        });
        // const mouseMove$ =
        //   fromEvent(docElm, 'mousemove')
        //   .map(event => ({ x: event.clientX, y: event.clientY }));
        // const touchMove$ =
        //   fromEvent(docElm, 'touchmove')
        //   .map(event => ({
        //     x: event.touches[0].clientX,
        //     y: event.touches[0].clientY
        //   }));
        // Update position
        drag.subscribe((pos) => {
            dragTarget.style.top = pos.top + "px";
            dragTarget.style.left = pos.left + "px";
        });
    }, []);

    return (
        <div className="drag">
            <div className="drag-target" ref={dragTargetRef}>
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

export default Drag;
