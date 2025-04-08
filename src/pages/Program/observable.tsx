import { useEffect } from "react";
import * as rxjs from "rxjs";

const Observable = () => {
    useEffect(() => {
        const ob = new rxjs.Observable((observer) => {
            observer.next(10);
            observer.next(20);
            observer.complete();
        });

        setTimeout(() => {
            ob.subscribe(console.log);
        }, 1000);

        return () => {};
    }, []);

    return <div>Observable</div>;
};

export default Observable;
