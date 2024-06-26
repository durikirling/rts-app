import "./App.css";

// Мы ожидаем, что Вы исправите синтаксические ошибки, сделаете перехват возможных исключений и улучшите читаемость кода.
// А так же, напишите кастомный хук useThrottle и используете его там где это нужно.
// Желательно использование React.memo и React.useCallback там где это имеет смысл.
// Будет большим плюсом, если Вы сможете закэшировать получение случайного пользователя.
// Укажите правильные типы.
// По возможности пришлите Ваш вариант в https://codesandbox.io

import React, { useState, useEffect, useRef, memo, useCallback } from "react";

const URL = "https://jsonplaceholder.typicode.com/users";

interface ICompany {
    bs: string;
    catchPhrase: string;
    name: string;
};

interface IUser {
    id: number;
    email: string;
    name: string;
    phone: string;
    username: string;
    website: string;
    company: ICompany;
    // address: any;
    address: string;
};

type Nullable<T> = T | null | undefined;

// interface FetchResult<T> {
//     data: T | null;
//     loading: boolean;
//     error: Error | null;
// }

interface IButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const Button = memo(({ onClick }: IButtonProps): JSX.Element =>
    <button type="button" onClick={onClick}>
        get random user
    </button>
)

interface IUserInfoProps {
    user: Nullable<IUser>
};

const UserInfo = memo(({ user }: IUserInfoProps): JSX.Element =>
    <table>
        <thead>
            <tr>
                <th>Username</th>
                <th>Phone number</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                {/* ?. if user empty */}
                <td>{user?.name ?? "No data"}</td>
                <td>{user?.phone ?? "No data"}</td>
            </tr>
        </tbody>
    </table>
    // если предполагается, что данные юзера неизменны. Иначе нужно ререндерить всегда
    , (prevProps, props) => prevProps.user?.id === props.user?.id
)

function useThrottle<T>(value: T, interval = 500): T {
    const [throttledValue, setThrottledValue] = useState<T>(value);
    const lastExecuted = useRef<number>(Date.now());

    useEffect(() => {
        if (Date.now() >= lastExecuted.current + interval) {
            lastExecuted.current = Date.now();
            setThrottledValue(value);
        } else {
            const timerId = setTimeout(() => {
                lastExecuted.current = Date.now();
                setThrottledValue(value);
            }, interval);
            return () => clearTimeout(timerId);
        }
    }, [value, interval]);
    return throttledValue;
};

const getRandomUser = (id: number): Promise<IUser> => {
    return fetch(`${URL}/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error occurred!')
            }
            return response.json()
        })
        .catch(err => {
            console.log("request error:", err)
        })
}

function App(): JSX.Element {
    const [user, setUser] = useState<Nullable<IUser>>(null); // смысловая нагрузка в названии переменной
    const throttledValue = useThrottle(user);

    const receiveRandomUser = async () => {
        const id: number = Math.floor(Math.random() * (10 - 1)) + 1;
        const LSKey: string = "user_" + id;
        const LSData: string | null = localStorage.getItem(LSKey);
        if (LSData) {
            const _user = JSON.parse(LSData) as IUser;
            setUser(_user);
        }
        else {
            getRandomUser(id).then(response => {
                setUser(response)
                localStorage.setItem(LSKey, JSON.stringify(response))
            }).catch(err => {
                console.log("Error", err)
            })
        }
    };

    const handleButtonClick = useCallback((
        // оборачиваем в useCallback, чтобы функйция не пересоздавалась 
        // при каждом ререндеринге компонента App (при изменнении state)
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.stopPropagation();
        receiveRandomUser();
    }, []);

    // console.log("render App", user)
    return (
        <div>
            <header>Get a random user</header>
            <Button onClick={handleButtonClick} />
            <UserInfo user={throttledValue} />
        </div>
    );
};

export default App;
