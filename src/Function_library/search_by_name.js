
import React, { Component } from 'react';
export const array_Searching_for_Name=(array,Chuoi_tim_kiem)=>{
    const lowercase_Chuoi_tim_kiem=Chuoi_tim_kiem.toLowerCase();

    //không phải component vì không return Chuoi_JSX
   
        return array.filter(element=>{
            return element.name.toLowerCase().match(new RegExp(lowercase_Chuoi_tim_kiem, 'g')); //g = global
        })
  
}

export default array_Searching_for_Name;