function observerOnState(targetObject){
    for (const key in targetObject) {
        if (targetObject.hasOwnProperty(key) && targetObject[key] instanceof Object && targetObject[key].constructor===Object && !Array.isArray(targetObject[key])) {
            let value = targetObject[key];
            if(!value.subsList){
                value["subsList"]=[];
                value["subscribeMe"]= function(subs){this.subsList.push(subs)};
                value["unSubscribeMe"] = function(subs){
                    while(value.subsList.indexOf(subs)>-1){
                        value.subsList.splice(value.subsList.indexOf(subs),1);
                    }
                }
            }
            Object.defineProperty(value, 'tmp',{
                get(){
                    console.log(this);
                },
                set(v){
                    if(value.subsList){
                        value.subsList.forEach((item)=>{
                            //console.log(`Publish to: ${item}`);// publisher comes to here
                            window[item](v)// example for publisher
                        });
                    }
                }
            })
            observerOnState(value);
        }
    }
}
