import { Pipe, PipeTransform } from '@angular/core';
import { CategoryDTO } from '../_models/therapist/category-dto';

@Pipe({
  name: 'categoryfilter'
})
export class CategoryfilterPipe implements PipeTransform {

  transform(value: CategoryDTO[], sName: string): any {
    if(sName==="" || sName==null || sName==undefined){
      return value;
    }

    let len = value.length;

    const categoriesArray: CategoryDTO[] = [];

    for(let i=0; i<len; i++){
      if(value[i].name.toLowerCase().startsWith(sName.toLowerCase())){
        categoriesArray.push(value[i])
      }
    }
    return categoriesArray;
  }

}
