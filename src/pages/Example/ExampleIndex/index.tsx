import { Link } from "react-router-dom";

const RxJS = () => {
    return (
        <div className="rxjs">
            <div>
                <Link to="/example/counter">Counter</Link>
            </div>
            <div>
                <Link to="/example/drag">Drag</Link>
            </div>
            <div>
                <Link to="/example/slider">Slider</Link>
            </div>
            <div>
                <Link to="/example/youtube">Youtube Video</Link>
            </div>
            <div>
                <Link to="/example/longclick">Long Click</Link>
            </div>
            <div>
                <Link to="/example/drag2">Drag2</Link>
            </div>
            <div>
                <Link to="/example/video-drag">VideoDrag</Link>
            </div>
        </div>
    );
};

export default RxJS;
