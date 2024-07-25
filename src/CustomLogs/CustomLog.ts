import { errorImgs, warningImgs, successImgs, imgCode5 } from "./imgData";

declare global {
  interface Console {
    defaultLog: any;
    okLog: any;
    warLog: any;
    errLog: any;
  }
}

const getRandomArrayElement = (array: string[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const setCustomLogs = () => {
  const mainStyle = `    
  font-size: 24px;
  padding: 12px 16px 12px 64px;
  border-radius: 5px;
  `;

  const func = (message: any, style: string, ...optionalParams: any[]) => {
    console.log(
      `%c${message ?? " "}`,
      mainStyle + style,
      ...optionalParams
    );
  }

  console.defaultLog = (message?: any, ...optionalParams: any[]) => {
    const style = `
    color: dodgerblue;
    border: 3px solid dodgerblue;
    background: left / contain no-repeat url('data:image/png;base64,${imgCode5}');
    `
    func(message, style, ...optionalParams)
  };

  console.okLog = (message?: any, ...optionalParams: any[]) => {
    const style = `
      color: green;
      border: 4px solid green;
      background: left / contain no-repeat url('data:image/png;base64,${getRandomArrayElement(successImgs)}');
    `
    func(message ?? "ok", style, ...optionalParams)
  };

  console.warLog = (message?: any, ...optionalParams: any[]) => {
    const style = `
      color: yellow;
      border: 4px solid yellow;
      background: left / contain no-repeat url('data:image/png;base64,${getRandomArrayElement(warningImgs)}');
    `
    func(message ?? "warning", style, ...optionalParams)
  };

  console.errLog = (message?: any, ...optionalParams: any[]) => {
    const style = `
      color: red;
      border: 4px solid red;
      background: left / contain no-repeat url('data:image/png;base64,${getRandomArrayElement(errorImgs)}');
    ` 
    func(message ?? "error", style, ...optionalParams)
  }

};

export default class CustomLog {
  static defaultLog(label: string, data: any, style = ``) {
    console.log(
      `%c${label}`,
      `
        color: dodgerblue;
        border: 4px solid dodgerblue;
        font-size: 24px;
        padding: 12px 16px 12px 64px;
        border-radius: 5px;
        ${style}
        `,
      data
    );
  }
  static errLog(label = "error", data: any) {
    this.defaultLog(
      label,
      data,
      `
        color: red;
        border: 4px solid red;
        background: left / contain no-repeat url('data:image/png;base64,${getRandomArrayElement(
          errorImgs
        )}');
        `
    );
  }
  static warLog(label = "warning", data: any) {
    this.defaultLog(
      label,
      data,
      `
        color: yellow;
        border: 4px solid yellow;
        background: left / contain no-repeat url('data:image/png;base64,${getRandomArrayElement(
          warningImgs
        )}');
        `
    );
  }
  static okLog(label = "ok", data: any) {
    this.defaultLog(
      label,
      data,
      `
        color: green;
        border: 4px solid green;
        background: left / contain no-repeat url('data:image/png;base64,${getRandomArrayElement(
          successImgs
        )}');
        `
    );
  }
}
