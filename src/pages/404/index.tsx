// pages/About/index.tsx
import useCounterStore from "~/stores/counter";

const Page404 = () => {
    const counter = useCounterStore((state) => state.counter);

    return <div>Page 404 {counter}</div>;
};

export default Page404;
