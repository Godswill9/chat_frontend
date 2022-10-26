export interface Person {
    id: number;
    name: string;
    img:string;
  }

export interface Message{
    text:string;
    otherText?:string;
}
export interface MessageArr{
    text:string;
    otherText?:string;
}
export interface Chat{
    messages:any[];
    status:string
}
export interface Chat2{
    message:string;
    myId:string;
    otherId:String;
    timeRecieved:String
}
export interface Chat3{
    message:string[];
    myId:String|undefined;
    otherId:String|undefined;
    timeRecieved:String|undefined
}