import React from "react";

import classes from "./Input.module.css";

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.inputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Valid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}> </select>
          {props.elementConfig.options.map(option => (
            <option value={option.value} key={option.value}> {option.displayValue} </option>
          ))}
        </select>
      )
      break;
    default:
      inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
          }