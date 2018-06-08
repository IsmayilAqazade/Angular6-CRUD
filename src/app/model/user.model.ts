export class User {

  id: number = -1;
  first_name: string;
  last_name: string;
  job?: string = 'Unknown';
  avatar?: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSJD__nTlrXcmZls8B_jxMAPkqqMBJ5q1HZAa9R7xcFm_p8_ywMw';

  constructor(jsonObj: Object) {
    for (const prop in jsonObj) {
      this[prop] = jsonObj[prop] ? jsonObj[prop] : this[prop];
    }
  }

}
