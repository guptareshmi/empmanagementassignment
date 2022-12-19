import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: Date): string {
    let today = moment();
    // console.log('today',today);
    
            let birthdate = moment(value);
            // console.log('birthdate',birthdate);
            let years = today.diff(birthdate, 'years');
            // console.log('years',years);
            let html:string = years + '';


    return html;
}

}
