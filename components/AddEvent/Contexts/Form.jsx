import React, { useState, useContext } from "react";

const FormContext = React.createContext();

export function useForm(){
    return useContext(FormContext);
}

export function FormProvider({ children }){

    const [ form, setForm ] = useState({});

    function fillForm(obj){
        var newElements = form;
        for( let [key, value] of Object.entries(obj) ){
            newElements[key] = value;
        }
        setForm(newElements);
    }

    function addNewField(field, value){
        let formCpy = form;
        formCpy[field] = value;
        setForm(formCpy);
    }

    const value = {
        form,
        fillForm,
        addNewField
    };

    return (
        <FormContext.Provider value={value}>
            { children }
        </FormContext.Provider>
    )

}

/*
    {
        title: "",
        nbrplace: ,
        price: ,
        tags: [],
        location: {},
        description: {},
        schedule: {}
    }
*/