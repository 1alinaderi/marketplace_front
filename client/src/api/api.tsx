import axios from "axios";


const BASE_URL = "http://localhost:3001/api"

export const httpReauest = async (method : any, url : string, data :any, headers : any) => {
  const _res = await axios({
    method: method,
    url: BASE_URL + url,
    data: data,
    headers: {
      "content-type": "application/json",
      ...headers,
    },
  });

  const status = await _res?.status ;

  if (status === 200 || status === 201) {
    return {
        status: _res?.status ,
        message : "Succesfull" ,
        data : _res?.data
    }
  }else{
    return {
        status: _res?.status ,
        message : _res?.data?.message ,
        data : _res?.data
    }
  }

};
