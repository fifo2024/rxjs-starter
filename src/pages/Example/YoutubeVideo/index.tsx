import { useEffect } from "react";
import * as rxjs from "rxjs";
import "./style.scss";

const YoutubeVideo = () => {
    const { fromEvent, of, delay, takeUntil, flatMap } = rxjs;

    useEffect(() => {
        const card = document.querySelector(".clip");
        const mouseEnter$ = fromEvent(card, "mouseenter");
        const mouseLeave$ = fromEvent(card, "mouseleave");

        mouseEnter$.subscribe(() => {
            console.log("enter");
            card.classList.add("hoverable");
        });

        mouseEnter$
            .pipe(
                flatMap((e) => of(e).pipe(delay(2500), takeUntil(mouseLeave$)))
            )
            .subscribe(() => {
                card.classList.remove("hoverable");
                card.classList.add("show-play-icon");
                console.log("remove");
            });

        mouseLeave$.subscribe(() => {
            card.classList.remove("hoverable");
            card.classList.remove("show-play-icon");
        });
    }, []);

    return (
        <section className="wrapper">
            <a
                href="https://www.youtube.com/watch?v=VZvzvLiGUtw"
                target="_blank"
            >
                <div className="clip">
                    <section className="preview-container">
                        <img src="https://ucarecdn.com/a27a3a5d-8fa6-4675-8b40-fbea76c99263/hqdefault.webp" />
                        <span className="time-status">5:15</span>
                        <div className="overlay-preview">
                            <div className="play-icon">
                                <svg
                                    viewBox="0 0 24 24"
                                    preserveAspectRatio="xMidYMid meet"
                                    focusable="false"
                                    className="style-scope yt-icon"
                                    style={{
                                        pointerEvents: "none",
                                        display: "block",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                >
                                    <g className="style-scope yt-icon">
                                        <path
                                            d="M8 5v14l11-7z"
                                            className="style-scope yt-icon"
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                            <div className="preview">
                                <img src="https://ucarecdn.com/59482f3c-08f5-4634-9187-df80ecf89b74/mqdefault_6s.webp" />
                            </div>
                            <button className="watch-later-button">
                                <svg
                                    viewBox="0 0 24 24"
                                    preserveAspectRatio="xMidYMid meet"
                                    focusable="false"
                                    style={{
                                        pointerEvents: "none",
                                        display: "block",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                >
                                    <g className="style-scope yt-icon">
                                        <path
                                            d="M12 3.67c-4.58 0-8.33 3.75-8.33 8.33s3.75 8.33 8.33 8.33 8.33-3.75 8.33-8.33S16.58 3.67 12 3.67zm3.5 11.83l-4.33-2.67v-5h1.25v4.34l3.75 2.25-.67 1.08z"
                                            className="style-scope yt-icon"
                                        ></path>
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </section>
                    <section className="content-container">
                        <h3 title="RAP AGAINST DICTATORSHIP">
                            RAP AGAINST DICTATORSHIP
                        </h3>
                        <footer>
                            <p
                                className="channel-name"
                                title="RAP AGAINST DICTATORSHIP"
                            >
                                Rap Against Dictatorship
                            </p>
                            <div className="meta">
                                <p>62M views</p>
                                <p>6 months ago</p>
                            </div>
                        </footer>
                        <button className="more-button">
                            <svg
                                viewBox="0 0 24 24"
                                preserveAspectRatio="xMidYMid meet"
                                focusable="false"
                                className="style-scope yt-icon"
                                style={{
                                    pointerEvents: "none",
                                    display: "block",
                                    width: "100%",
                                    height: "100%",
                                }}
                            >
                                <g className="style-scope yt-icon">
                                    <path
                                        d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                                        className="style-scope yt-icon"
                                    ></path>
                                </g>
                            </svg>
                        </button>
                    </section>
                </div>
            </a>
            <div className="playlist">
                <section className="preview-container">
                    <img src="https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80" />
                    <div className="overlay-side-panel">
                        <p className="playlist-count">38</p>
                        <span className="playlist-icon">
                            <svg
                                viewBox="0 0 24 24"
                                preserveAspectRatio="xMidYMid meet"
                                focusable="false"
                                className="style-scope yt-icon"
                                style={{
                                    pointerEvents: "none",
                                    display: "block",
                                    width: "100%",
                                    height: "100%",
                                }}
                            >
                                <g className="style-scope yt-icon">
                                    <path
                                        d="M3.67 8.67h14V11h-14V8.67zm0-4.67h14v2.33h-14V4zm0 9.33H13v2.34H3.67v-2.34zm11.66 0v7l5.84-3.5-5.84-3.5z"
                                        className="style-scope yt-icon"
                                    ></path>
                                </g>
                            </svg>
                        </span>
                    </div>
                    <div className="overlay-playlist">
                        <span className="playall-icon">
                            <svg
                                viewBox="0 0 24 24"
                                preserveAspectRatio="xMidYMid meet"
                                focusable="false"
                                className="style-scope yt-icon"
                                style={{
                                    pointerEvents: "none",
                                    display: "block",
                                    width: "100%",
                                    height: "100%",
                                }}
                            >
                                <g className="style-scope yt-icon">
                                    <path
                                        d="M8 5v14l11-7z"
                                        className="style-scope yt-icon"
                                    ></path>
                                </g>
                            </svg>
                        </span>
                        <span className="playall-text">Play All</span>
                    </div>
                </section>
                <section className="content-container">
                    <h3>Liked videos</h3>
                    <a className="view-fill-playlist">View full playlist</a>
                </section>
            </div>
        </section>
    );
};

export default YoutubeVideo;
