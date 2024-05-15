import React, { useState, useEffect } from 'react';
import './App.css';
import { paramsData, modelData } from './data';

interface Param {
  id: number;
  name: string;
  type?: `string`;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {
  id: number;
  value: string;
  type?: `string`;
}

interface Model {
  paramValues: ParamValue[];
  colors?: Color[];
}

interface Props {
  params: Param[];
  model: Model;

  onModelParamValueChange: Function;
  onParamAdd: Function;
}

interface State {
  showForm: Boolean,
  paramName: string,
  paramValue: string
}

interface Resolve<T> {
  data: T
}

const getData = <T,>(data: T): Promise<Resolve<T>> => new Promise<Resolve<T>>(resolve => {
  // fake server request
  // with generic example
  setTimeout(() => resolve({ data: data }), 1000)
});


class ParamEditor extends React.Component<Props, State> {
  public getModel(): Model {
    return this.props.model;
  }

  state = {
    showForm: false,
    paramName: '',
    paramValue: '',
  }

  handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const { paramName, paramValue } = this.state
    this.props.onParamAdd(paramName, paramValue)
    this.setState({
      showForm: false,
      paramName: '',
      paramValue: ''
    })
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>, item: Param): void => this.props.onModelParamValueChange(item.id, e.target.value)

  handleChange = (e: React.ChangeEvent<HTMLInputElement>, stateName: keyof State): void => {
    // const newState = { [stateName]: e.target.value } as Pick<State, keyof State>
    // this.setState(newState)

    this.setState({ ...this.state, [stateName]: e.target.value })

    // this.setState({ [stateName]: e.target.value } as any)
  }

  render(): React.ReactNode {
    return (
      <div className='editor'>
        <button
          className='btn add-btn'
          title={this.state.showForm ? "hide creation form" : "add param"}
          onClick={() => this.setState({ showForm: !this.state.showForm })}
        >+</button>
        {this.state.showForm &&
          <div className='creation-form'>
            <span>Название параметра:</span>
            <input
              value={this.state.paramName}
              // onChange={e => { this.setState({ paramName: e.target.value }) }}
              onChange={e => { this.handleChange(e, "paramName") }}
            />
            <span>Значение параметра:</span>
            <input
              value={this.state.paramValue}
              // onChange={e => { this.setState({ paramValue: e.target.value })
              onChange={e => { this.handleChange(e, "paramValue") }}
            />
            <button className='btn submit-btn' onClick={this.handleSubmit}>OK</button>
          </div>
        }
        {this.props.params.map((item, i) => {
          const value: string = this.props.model?.paramValues?.find(it => it.paramId === item.id)?.value ?? ""
          return (
            <div className='editor-row' key={item.id}>
              <b>{item.name}: </b>
              <input value={value} onChange={(e) => this.onChange(e, item)}
                // type={"text"}
              />
            </div>
          )
        })}
      </div>
    );
  };
};

function App() {
  const [model, setModel] = useState<Model | undefined>()
  const [params, setParams] = useState<Param[] | undefined>() // <Param[]> ==> <Array<Param>>
  // const [isDataLoaded, setIsDataLoaded] = useState<Boolean>(false)

  useEffect(() => {
    getData<Model>(modelData)
      .then(res => {
        setModel(res.data)
      }).catch(err => { console.log(err) })
    getData<Param[]>(paramsData)
      .then(res => {
        setParams(res.data)
      }).catch(err => { console.log(err) })
  }, []);

  const onModelParamValueChange = (id: number, value: string): void => {
    if (!model) return;
    setModel({
      ...model,
      paramValues: model.paramValues.map(item => {
        if (item.paramId === id) {
          return {
            ...item,
            value: value
          }
        } else return item
      })
    });
    // console.log(model)
  };

  const onParamAdd = (paramName: string, paramValue: string): void => {
    if (paramName === "") return;
    if (!params || !model) return;
    if (params.find(item => item.name === paramName)) return;

    // const id: number = (params[params.length - 1]?.id ?? -1) + 1
    const id: number = params[params.length - 1]?.id + 1 || 0
    // console.log(id)
    setParams([
      ...params,
      {
        id: id,
        name: paramName
      }
    ])
    setModel({
      ...model,
      paramValues: [
        ...model.paramValues,
        {
          paramId: id,
          value: paramValue
        }
      ]
    })
  };

  if (!params || !model) return <>Нет данных</>;

  return (
    <div className="App">
      <ParamEditor
        params={params}
        model={model}
        onModelParamValueChange={onModelParamValueChange}
        onParamAdd={onParamAdd}
      />
    </div>
  );
};

export default App;
