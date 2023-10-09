import { httpReauest } from 'src/api/api';

export async function getCategories() {
  await httpReauest('GET', '/categorys', {}, {}).then((data) => {
    return { data };
  }).catch((data)=>{
    return {data}
  });
}
