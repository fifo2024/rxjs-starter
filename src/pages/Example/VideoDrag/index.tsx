import { useEffect } from "react";
import * as Rx from "rxjs";

import "./style.scss";

const {
    fromEvent,
    filter,
    concatAll,
    withLatestFrom,
    interval,
    takeUntil,
    mergeMap,
    flatMap,
    map,
    mergeWith,
} = Rx;

const VideoDrag = () => {
    useEffect(() => {
        const anchor = document.getElementById("anchor");
        const video = document.getElementById("video");
        const scroll = fromEvent(document, "scroll");

        scroll
            .pipe(map((event) => anchor.getBoundingClientRect().bottom < 0))
            .subscribe((bool) => {
                if (bool) {
                    video.classList.add("video-fixed");
                } else {
                    video.classList.remove("video-fixed");
                }
            });

        // 避免超出可視範圍
        const validate = (value, max, min) => {
            return Math.min(Math.max(value, min), max);
        };

        const mouseDown = fromEvent(video, "mousedown");
        const mouseMove = fromEvent(document, "mousemove");
        const mouseUp = fromEvent(document, "mouseup");

        mouseDown
            .pipe(
                filter((e) => video.classList.contains("video-fixed")), // 只有video-fixed才可移動
                map((event) => mouseMove.pipe(takeUntil(mouseUp))),
                concatAll(),
                withLatestFrom(mouseDown, (move, down) => {
                    // 擁有主從關係
                    return {
                        x: validate(
                            move.clientX - down.offsetX,
                            window.innerWidth - video.offsetWidth,
                            0
                        ),
                        y: validate(
                            move.clientY - down.offsetY,
                            window.innerHeight - video.offsetHeight,
                            0
                        ),
                    };
                })
            )
            .subscribe((pos) => {
                video.style.top = `${pos.y}px`;
                video.style.left = `${pos.x}px`;
            });
    }, []);

    return (
        <div id="anchor">
            <div className="video" id="video">
                <div className="masker"></div>
                <video width="100%" controls>
                    <source
                        src="http://bj.bcebos.com/xbrain-xsearch-public/static/oceans.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support HTML5 video.
                </video>
            </div>
        </div>
    );
};

export default VideoDrag;
