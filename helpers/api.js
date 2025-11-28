import axios from "axios";

const getData = async (url, params = {}) => {
  const popularRes = await axios.get(`${process.env.BASE_URL}/${url}`, { params });
  return popularRes?.data?.data || [];
};

export default getData;