import { sayHello } from "./greet";
function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = sayHello(name);
}


interface Obj{
    lable:string,
    name?:any,
    readonly color?:string,
    [propName: string]: any;
}
function Log(param:Obj):boolean{
    // console.log(`${param.lable}`);
    let c=param.color+1;
    return c=='0';
    console.log(c,param.df);
}


let op={
    lable:'1',
    color:'red',
    df:11
}
Log(op);

showHello("greeting","TypeScript");