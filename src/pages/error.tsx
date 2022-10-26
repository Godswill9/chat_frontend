import React from 'react'
import { Chat3 } from './value';


type Props = {
    arr:Chat3[] |  undefined
  };

export default function Error({arr}:Props) {
    console.log(arr)
  return (
    <div>error</div>
  )
}
