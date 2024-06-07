# Тестовые задания

### Содержание:

###### (Навигация работает, если выбранный пункт развернут)

- [? - "Редактор параметров"](#тестовое-задание-редактор-параметров)
- [ABCP IT - "Анализ кода"](#тестовое-задание-анализ-кода)
- [Mindbox IT - "ToDo-приложение"](#тестовое-задание-todo-приложение)

|  №  |  Компания  |        Задание        |                     Описание                     |           Код            |
| :-: | :--------: | :-------------------: | :----------------------------------------------: | :----------------------: |
|  1  |     ?      | "Редактор параметров" | [перейти](#тестовое-задание-редактор-параметров) | [перейти](/src/App.tsx)  |
|  2  |  ABCP IT   |     "Анализ кода"     |     [перейти](#тестовое-задание-анализ-кода)     | [перейти](/src/App2.tsx) |
|  3  | Mindbox IT |   "ToDo-приложение"   |   [перейти](#тестовое-задание-todo-приложение)   | [перейти](/src/App3.tsx) |

---

<details>
<summary>
    <b style="font-size: 16px">
        ? - "Редактор параметров"
    </b>
</summary>

## Тестовое задание "Редактор параметров"

![x][company-x]
![date-x][date-x]

### Задача

Есть следующие структуры данных, описывающие товар:

- интерфейс `Model`
- набор параметров товара `Param[]`

Необходимо реализовать на [![React][React.js]][React-url] компоненты, которые позволяют редактировать структуру `Model`:

- проставлять значения параметров
- при этом параметры должны выводиться все
- параметры сразу должны быть доступны для редактирования
- переданные значения в структуре проставлены в форме редактирования, которые передаются в `params: Param[]`
- переданные значения так же позволяют получить полную структуру в методе `getModel()` – содержащую все проставленные значения параметров.

Решение должно быть легко расширяемым (например, позволять легко добавлять новые типы параметров – не только текстовые, но, например, числовые или со списком значений). Ваша реализация должна работать только с текстовыми параметрами `Input` – тип `string`.

Решение необходимо оформить в виде одного файла со всеми компонентами и типами которые используются.

```ts
interface Param {
   id: number;
   name: string;
   type: ‘string’;
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
    colors: Color[];
}

interface Props {
    params: Param[];
    model: Model;
}

class ParamEditor extends React.Component<Props, State> {
    public getModel(): Model {
    }
}
```

### Примеры

- Пример структуры:

  - params:
    ```json
    [
      {
        "id": 1,
        "name": "Назначение"
      },
      {
        "id": 2,
        "name": "Длина"
      }
    ]
    ```
  - model:
    ```json
    {
      "paramValues": [
        {
          "paramId": 1,
          "value": "повседневное"
        },
        {
          "paramId": 2,
          "value": "макси"
        }
      ]
    }
    ```

- Пример, как должен выглядеть редактор для указанных моделей:

  ![Example Screen Shot][example-img]

### Дополнительно

По личной инициативе дополнительно реализовано:

1. Создание новых параметров и их начальных значений
2. Имитация получения данных с сервера (с помощью `Promise`)

<!-- MARKDOWN LINKS & IMAGES -->

[date-x]: https://img.shields.io/badge/Дата_выполнения-15.05.2024-x
[example-img]: /imgForReadme/example_img.png
[React.js]: https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB

 <!-- style : [flat, flat-square, plastic, for-the-badge, social] -->

[React-url]: https://reactjs.org/
[company-x]: https://img.shields.io/badge/Компания--blue

> ###### Есть следующие структуры данных, описывающих товар – интерфейс Model и набор параметров этого товара. Необходимо реализовать на React компоненты, которые позволяют редактировать структуру Model – проставлять значения параметров при этом параметры должны выводиться все и сразу должны быть доступны для редактирования, а переданные значения в структуре проставлены в форме редактирования, которые передаются в params: Param[], а так же позволяют получить полную структуру в методе getModel() – содержащую все проставленные значения параметров. Решение должно быть легко расширяемым (например, позволять легко добавлять новые типы параметров – не только текстовые, но например числовые или со списком значений) Ваша реализация должна работать только с текстовыми параметрами Input – тип string.

[Вернуться к содержанию](#содержание)

---

---

</details>

<details>
<summary>
    <b style="font-size: 16px">
        ABCP IT - "Анализ кода"
    </b>
</summary>

## Тестовое задание "Анализ кода"

[![ABCP IT][company-abcp]][abcp-url]
![ABCP IT][date-abcp]

### Задача

Ознакомиться с программным кодом и предложить варианты для его улучшения с обязавтельным текстовым описанием на русском.

#### Доп. требования:

- исправить синтаксические ошибки
- сделать перехват возможных исключений
- улучшить читаемость кода
- написать кастомный хук `useThrottle` и использовать его, там где это нужно

- желательно использование `React.memo` и `React.useCallback` там где это имеет смысл

- будет большим плюсом - закэшировать получение случайного пользователя
- указать правильные типы
- по возможности прислать вариант в [![CodeSandbox][CodeSandbox]][CodeSandbox-url]

### Программный код для анализа

```tsx
import React, { useState } from "react";

const URL = "https://jsonplaceholder.typicode.com/users";

type Company = {
  bs: string;
  catchPhrase: string;
  name: string;
};

type User = {
  id: number;
  email: string;
  name: string;
  phone: string;
  username: string;
  website: string;
  company: Company;
  address: any;
};

interface IButtonProps {
  onClick: any;
}

function Button({ onClick }: IButtonProps): JSX.Element {
  return (
    <button type="button" onClick={onClick}>
      get random user
    </button>
  );
}

interface IUserInfoProps {
  user: User;
}

function UserInfo({ user }: IUserInfoProps): JSX.Element {
  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Phone number</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{user.name}</td>
          <td>{user.phone}</td>
        </tr>
      </tbody>
    </table>
  );
}

function App(): JSX.Element {
  const [item, setItem] = useState<Record<number, User>>(null);

  const receiveRandomUser = async () => {
    const id = Math.floor(Math.random() * (10 - 1)) + 1;
    const response = await fetch(`${URL}/${id}`);
    const _user = (await response.json()) as User;
    setItem(_user);
  };

  const handleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    receiveRandomUser();
  };

  return (
    <div>
      <header>Get a random user</header>
      <Button onClick={handleButtonClick} />
      <UserInfo user={item} />
    </div>
  );
}

export default App;
```

[date-abcp]: https://img.shields.io/badge/Дата_выполнения-18.05.2024-x
[company-abcp]: https://img.shields.io/badge/Компания-ABCP%20IT-blue
[abcp-url]: https://www.abcp.ru/
[CodeSandbox]: https://img.shields.io/badge/CodeSandbox-black?style=flat&logo=CodeSandbox&logoColor=#151515
[CodeSandbox-url]: https://codesandbox.io

[Вернуться к содержанию](#содержание)

---

---

</details>

<details>
<summary>
    <b style="font-size: 16px">
        Mindbox IT - "ToDo-приложение"
    </b>
</summary>

## Тестовое задание "ToDo-приложение"

[![Mindbox IT][company-mindbox]][mindbox-url]
![Mindbox IT][date-mindbox]

#### Тестовое задание Frontend junior в Mindbox

### Задача

Сделайте ToDo-приложение, позволяющее управлять текущим списком дел.

#### Что должно быть в интерфейсе:

- Поле для ввода новой задачи
- Списки всех задач, невыполненных и выполненных задач (по отдельности)

### Пример внешнего вида приложения

![Example ToDo-app Screen Shot][example-mindbox-todo]

### Требования к коду

- Приложение создано с использованием [![TypeScript][ts]][ts-url], [![React][React.js]][React-url] и [![ReactHooks][react-hooks]][react-hooks-url]
- Библиотеки компонент – на ваше усмотрение
- Ключевая на ваш взгляд функциональность обязательно покрыта тестами
- Проект должен запускаться командой `npm i && npm run start`
- Проект доступен на [![GitHubPages][github-pages]][github-pages-url] / [![Vercel][vercel]][vercel-url] / etc.

### Дополнительно

По личной инициативе дополнительно реализовано:

1. Хранение задач и выбранного фильтра в CacheStorage

[date-mindbox]: https://img.shields.io/badge/Дата_выполнения-06.06.2024-x
[company-mindbox]: https://img.shields.io/badge/Компания-Mindbox%20IT-blue
[mindbox-url]: https://mindbox.ru/
[example-mindbox-todo]: /imgForReadme/example_mindbox_todo.png
[ts]: https://img.shields.io/badge/TypeScript-20232A?style=flat&logo=typescript
[ts-url]: https://www.typescriptlang.org/
[react-hooks]: https://img.shields.io/badge/React%20Hooks-20232A?style=flat&logo=react&logoColor=61DAFB
[react-hooks-url]: https://react.dev/reference/react/hooks
[github-pages]: https://img.shields.io/badge/GitHub%20Pages-20232A?style=flat&logo=githubpages
[github-pages-url]: https://pages.github.com/
[vercel]: https://img.shields.io/badge/Vercel-20232A?style=flat&logo=vercel
[vercel-url]: https://vercel.com/

[Вернуться к содержанию](#содержание)

---

---

</details>
