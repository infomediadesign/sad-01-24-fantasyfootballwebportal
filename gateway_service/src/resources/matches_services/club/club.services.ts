import { Request } from "express";
import jwt from "jsonwebtoken";
// import { clubModel } from "../../database/models/club/club.model";
// import { CommonType } from "../../database/models/commontype";
// import { playerModel } from "../../database/models/player/player.model";
import mongoose from "mongoose";
import { CommonType } from "../../../database/models/commontype";
import axios, { AxiosError } from "axios";

import FormData from 'form-data';



import multer from "multer";



export namespace ClubServices {
    interface UploadedFile {
        buffer: Buffer;
        originalname: string;
    }
    export const CreateClub = async (req: Request) => {
        console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', req.file)
        console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', req.body)

        // req.headers['api_key'] = process.env.API_MATCH;

        // console.log('asdf', process.env.MSMATCHURL + ':' + process.env.MSMATCHPORT + '/resources/club')
        let url = process.env.MSMATCHURL + ':' + process.env.MSMATCHPORT + '/resources/club';


        try {
            if (Object.keys(req.query).length > 0) {
                // Initialize a flag to track if it's the first query parameter
                let isFirstQueryParam = true;
                // Loop through each key-value pair in req.query
                Object.entries(req.query).forEach(([key, value]) => {
                    // Append key-value pair to the URL
                    url += `${isFirstQueryParam ? '?' : '&'}${key}=${value}`;
                    // Update the flag after appending the first parameter
                    isFirstQueryParam = false;
                });
            }
            console.log('###############################', req.files)





            // Prepare form data
            const formData = new FormData();
            formData.append('image', req.file?.buffer, {
                filename: req.file?.originalname
            });
            formData.append('name', req.body.name)






            console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', formData)


            // const authResponse = await axios.post(url, req.body, { headers: req.headers });


            // Make a POST request to the downstream service

            const authResponse = await axios.post(url, formData, {
                headers: {
                    ...formData.getHeaders(), // Include form data headers
                    Authorization: req.headers.authorization, // Forward authorization header if needed
                    api_key: process.env.API_MATCH // Add other headers as needed
                },
            });



            console.log('SSSSSSSSSSSSSSSSSSSSS', authResponse)





            // return Promise.resolve({
            //   message: authResponse.data.message,
            //   token: authResponse.data.token,
            //   url: authResponse.data.url,
            // });
            return Promise.resolve(authResponse.data);

        } catch (e) {
            console.log('roshanError', e)
            if (axios.isAxiosError(e)) {
                const axiosError = e as AxiosError;
                if (axiosError.response && axiosError.response.status >= 400 && axiosError.response.status < 500) {
                    return Promise.reject({
                        code: 400,
                        http_status_code: axiosError.response.status,
                        error: axiosError.response.data,
                    })
                }
            }
            return Promise.reject(e);
        }




    };





    export const GetClub = async (req: Request) => {
        // console.log('asdf', process.env.MSMATCHURL + ':' + process.env.MSMATCHPORT + '/resources/club')
        let url = process.env.MSMATCHURL + ':' + process.env.MSMATCHPORT + '/resources/club';


        try {
            if (Object.keys(req.query).length > 0) {
                // Initialize a flag to track if it's the first query parameter
                let isFirstQueryParam = true;
                // Loop through each key-value pair in req.query
                Object.entries(req.query).forEach(([key, value]) => {
                    // Append key-value pair to the URL
                    url += `${isFirstQueryParam ? '?' : '&'}${key}=${value}`;
                    // Update the flag after appending the first parameter
                    isFirstQueryParam = false;
                });
            }
            console.log('###############################', url)
            const authResponse = await axios.get(url, { headers: req.headers });
            // return Promise.resolve({
            //   message: authResponse.data.message,
            //   token: authResponse.data.token,
            //   url: authResponse.data.url,
            // });
            return Promise.resolve(authResponse.data);

        } catch (e) {
            console.log('roshanError', e)
            if (axios.isAxiosError(e)) {
                const axiosError = e as AxiosError;
                if (axiosError.response && axiosError.response.status >= 400 && axiosError.response.status < 500) {
                    return Promise.reject({
                        code: 400,
                        http_status_code: axiosError.response.status,
                        error: axiosError.response.data,
                    })
                }
            }
            return Promise.reject(e);
        }
    };








    export const DeleteClub = async (req: Request) => {


        let url = process.env.MSMATCHURL + ':' + process.env.MSMATCHPORT + '/resources/club';


        try {
            if (Object.keys(req.query).length > 0) {
                // Initialize a flag to track if it's the first query parameter
                let isFirstQueryParam = true;
                // Loop through each key-value pair in req.query
                Object.entries(req.query).forEach(([key, value]) => {
                    // Append key-value pair to the URL
                    url += `${isFirstQueryParam ? '?' : '&'}${key}=${value}`;
                    // Update the flag after appending the first parameter
                    isFirstQueryParam = false;
                });
            }
            console.log('###############################', url)
            const authResponse = await axios.delete(url, { headers: req.headers });
            // return Promise.resolve({
            //   message: authResponse.data.message,
            //   token: authResponse.data.token,
            //   url: authResponse.data.url,
            // });
            return Promise.resolve(authResponse.data);

        } catch (e) {
            console.log('roshanError', e)
            if (axios.isAxiosError(e)) {
                const axiosError = e as AxiosError;
                if (axiosError.response && axiosError.response.status >= 400 && axiosError.response.status < 500) {
                    return Promise.reject({
                        code: 400,
                        http_status_code: axiosError.response.status,
                        error: axiosError.response.data,
                    })
                }
            }
            return Promise.reject(e);
        }

    };

    interface UploadedFile {
        buffer: Buffer;
        originalname: string;
    }
    export const UpdateClub = async (req: Request) => {
        console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', req.file)
        console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', req.body)

        // req.headers['api_key'] = process.env.API_MATCH;

        // console.log('asdf', process.env.MSMATCHURL + ':' + process.env.MSMATCHPORT + '/resources/club')
        let url = process.env.MSMATCHURL + ':' + process.env.MSMATCHPORT + '/resources/club';


        try {
            if (Object.keys(req.query).length > 0) {
                // Initialize a flag to track if it's the first query parameter
                let isFirstQueryParam = true;
                // Loop through each key-value pair in req.query
                Object.entries(req.query).forEach(([key, value]) => {
                    // Append key-value pair to the URL
                    url += `${isFirstQueryParam ? '?' : '&'}${key}=${value}`;
                    // Update the flag after appending the first parameter
                    isFirstQueryParam = false;
                });
            }
            console.log('###############################', req.files)





            // Prepare form data
            const formData = new FormData();
            formData.append('image', req.file?.buffer, {
                filename: req.file?.originalname
            });
            formData.append('name', req.body.name)






            console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', url)


            // const authResponse = await axios.post(url, req.body, { headers: req.headers });


            // Make a POST request to the downstream service

            const authResponse = await axios.patch(url, formData, {
                headers: {
                    ...formData.getHeaders(), // Include form data headers
                    Authorization: req.headers.authorization, // Forward authorization header if needed
                    api_key: process.env.API_MATCH // Add other headers as needed
                },
            });



            console.log('SSSSSSSSSSSSSSSSSSSSS', authResponse)





            // return Promise.resolve({
            //   message: authResponse.data.message,
            //   token: authResponse.data.token,
            //   url: authResponse.data.url,
            // });
            return Promise.resolve(authResponse.data);

        } catch (e) {
            console.log('roshanError', e)
            if (axios.isAxiosError(e)) {
                const axiosError = e as AxiosError;
                if (axiosError.response && axiosError.response.status >= 400 && axiosError.response.status < 500) {
                    return Promise.reject({
                        code: 400,
                        http_status_code: axiosError.response.status,
                        error: axiosError.response.data,
                    })
                }
            }
            return Promise.reject(e);
        }




    };

}