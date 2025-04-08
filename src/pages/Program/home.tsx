import { Link } from "react-router-dom";

const ProgramIndex = () => {
    return (
        <div>
            <div>
                <Link to="./operators">Operators</Link>
            </div>
            <div>
                <Link to="./observable">Observable</Link>
            </div>
            <div>
                <Link to="./observer">Observer</Link>
            </div>
        </div>
    );
};

export default ProgramIndex;
