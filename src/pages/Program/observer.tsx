import { useEffect } from "react";
import {
    Observable,
    Observer,
    from,
    of,
    interval,
    timer,
    merge,
    Subject,
} from "rxjs";
import { map, filter, take } from "rxjs/operators";

const ObserverComp = () => {
    // 创建一个Observable（可观察对象）
    const observable = new Observable((subscriber) => {
        subscriber.next(1);
        subscriber.next(2);
        subscriber.next(3);

        setTimeout(() => {
            subscriber.next(4);
            subscriber.complete();
        }, 1000);
    });

    const observer2: Partial<Observer<unknown>> = {
        next: (x: unknown) => console.log("获得值2: " + x),
        error: (err: Error) => console.error("发生错误2: " + err),
        complete: () => console.log("完成2"),
    };

    // 观察者模式 (Observer Pattern)
    useEffect(() => {
        // // 创建一个Observable（可观察对象）
        // const observable = new Observable();
        // (subscriber) => {
        //     subscriber.next(1);
        //     subscriber.next(2);
        //     subscriber.next(3);

        //     setTimeout(() => {
        //         subscriber.next(4);
        //         subscriber.complete();
        //     }, 1000);
        // }

        // 创建一个Observer（观察者）
        const observer: Partial<Observer<unknown>> = {
            next: (x: unknown) => console.log("获得值: " + x),
            error: (err: Error) => console.error("发生错误: " + err),
            complete: () => console.log("完成-观察者模式"),
        };

        // 订阅，建立Observable和Observer之间的关系
        observable.subscribe(observer);
    }, []);

    // 迭代器模式 (Iterator Pattern)
    useEffect(() => {
        // 从数组创建Observable
        const source = from([1, 2, 3, 4, 5]);

        // 订阅并逐个处理元素
        source.subscribe(
            (value) => console.log(`值: ${value}`),
            (err) => console.error(err),
            () => console.log("完成-迭代器模式")
        );
    }, []);

    // 装饰器模式 (Decorator Pattern)
    useEffect(() => {
        // 创建基础Observable
        const source = of(1, 2, 3, 4, 5);

        // 使用操作符装饰原始Observable
        const result = source.pipe(
            filter((num) => num % 2 === 0), // 过滤偶数
            map((num) => num * 10) // 将每个值乘以10
        );

        // 订阅结果
        result.subscribe((x) => console.log(x)); // 输出: 20, 40
    }, []);

    // 工厂模式 (Factory Pattern)
    useEffect(() => {
        // 使用工厂方法创建不同类型的Observable
        const source1 = interval(1000); // 每秒发出递增的数字
        const source2 = timer(2000, 1000); // 2秒后开始，每秒发出一个值
        const source3 = of("Hello", "World"); // 发出固定值
        const source4 = from([1, 2, 3]); // 从数组创建

        source1.subscribe((x) => console.log(`interval: ${x}`));
        source2.subscribe((x) => console.log(`timer: ${x}`));
        source3.subscribe((x) => console.log(`of: ${x}`));
        source4.subscribe((x) => console.log(`from: ${x}`));
    }, []);

    // 命令模式 (Command Pattern)
    useEffect(() => {
        // 创建Subject
        const subject = new Subject<number>();

        // 添加观察者
        subject.subscribe({
            next: (v) => console.log(`观察者A: ${v}`),
            complete: () => console.log("观察者A: 完成 - 命令模式"),
        });
        subject.subscribe({
            next: (v) => console.log(`观察者B: ${v}`),
        });

        // 发送命令
        subject.next(1);
        subject.next(2);
        subject.complete();
    });

    // 中介者模式 (Mediator Pattern)
    useEffect(() => {
        // 创建中介者
        const mediator = new Subject();

        // 组件A发送消息
        function componentA() {
            mediator.next("来自组件A的消息");
        }

        // 组件B接收消息
        mediator.subscribe((message) => {
            console.log(`组件B收到: ${message}`);
        });

        // 组件C接收消息
        mediator.subscribe((message) => {
            console.log(`组件C收到: ${message}`);
        });

        // 触发消息发送
        componentA();
    }, []);

    // 组合模式 (Composite Pattern)
    useEffect(() => {
        // 创建两个Observable
        const source1 = interval(1000).pipe(
            map((x) => `源1: ${x}`),
            take(3)
        );
        const source2 = interval(500).pipe(
            map((x) => `源2: ${x}`),
            take(5)
        );

        // 组合Observable
        const result = merge(source1, source2);

        // 订阅组合结果
        result.subscribe((x) => console.log(x));
    }, []);

    console.log("Observer::");

    return (
        <div>
            observer
            <div
                onClick={() => {
                    observable.subscribe(observer2);
                }}
            >
                send
            </div>
        </div>
    );
};

export default ObserverComp;
