import React, { useState, useContext } from "react";

const FormContext = React.createContext();

export function useForm(){
    return useContext(FormContext);
}

export function FormProvider({ children }){

    const [ form, setForm ] = useState({});

    function fillForm(obj){
        setForm(obj);
    }

    function addLocation(obj){
        var formC = form;
        formC["latitude"] = obj.latitude;
        formC["longitude"] = obj.longitude;
        setForm(formC);
    }

    const value = {
        form,
        fillForm,
        addLocation
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
        latitude:,
        longitude
    }
*/