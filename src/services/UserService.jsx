import React from "react";
import axios from "axios";

// const base_url = "https://jobsportalbackend-2.onrender.com/users/";
const base_url = "https://jobs-portal-backend-clqp.onrender.com/users/";

export const registerUsers = async (userData) => {
  try {
    const res = await axios.post(`${base_url}register`, userData);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const loginUsers = async (userData) => {
  try {
    const res = await axios.post(`${base_url}login`, userData);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const sendOtp = async (email) => {
  try {
    const res = await axios.post(`${base_url}sendOtp/${email}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const verifyOtp = async (email, otp) => {
  try {
    const response = await axios.get(`${base_url}verifyOtp/${email}/${otp}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const changePassword = async (loginDTO) => {
  try {
    const response = await axios.post(`${base_url}changePass`, loginDTO);
    return response.data;
  } catch (error) {
    throw error;
  }
};

