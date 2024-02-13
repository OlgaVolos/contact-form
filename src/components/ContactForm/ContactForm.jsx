import React, {useState} from 'react';
import {useForm} from "react-hook-form";

import {joiResolver} from "@hookform/resolvers/joi";
import emailjs from '@emailjs/browser';

import {publicKey, serviceID, templateId} from "../../constants";
import {contactFormValidator} from "../../validators";

import './contactForm.scss'


const ContactForm = () => {
    const [messageLength, setMessageLength] = useState(0)
    const [userFile, setUserFile] = useState(null)

    const {
        register,
        reset,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: joiResolver(contactFormValidator),
        mode: "onTouched"
    })

    const sendEmail = async (data) => {
        console.log('send from sendEmail');
        const formData = new FormData();
        formData.append('user_name', data.user_name);
        formData.append('user_phone', data.user_phone);
        formData.append('user_email', data.user_email);
        formData.append('message', data.message);
        formData.append('user_file', userFile);

        try {
            await emailjs.sendForm(serviceID, templateId, formData, publicKey);
            console.log('Email sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    // const submit = (e) => {
    //     // e.preventDefault()
    //     console.log(e);
    //     // sendEmail(data);
    //     // reset()
    // };

    // const handleFileChange = (event) => {
    //     // try {
    //     // const file = event.target.files[0];
    //     // const reader = new FileReader();
    //     // reader.onload = () => {
    //     //     setUserFile(reader.result);
    //     // };
    //     // reader.readAsDataURL(file);
    //     //     console.log(userFile);
    //     //
    //     // } catch (error){
    //     //     console.log(error);
    //     // }
    // };

    const submit = async (data) => {
        const {user_name, user_email, user_phone, message, user_file} = data;
        try {
            const templateParams = {
                user_name,
                user_email,
                user_phone,
                message,
                user_file
            };
            await emailjs.send(
                serviceID,
                templateId,
                templateParams,
                publicKey)
            console.log('ok');
        } catch (e) {
            console.error(e);
        } finally {
            console.log(data);
            reset()
        }
    }


    const handleTextareaChange = (event) => {
        setMessageLength(event.target.value.length);
    }

    return (
        <div className="contact-form__container">
            <div className="contact-form__title">Contact Form with EmailJs</div>
            <form onSubmit={handleSubmit(submit)}>
                <div className="contact-form__input_block">
                    <div className="contact-form--input_wrapper">
                        <div className="contact-form__text">Name:</div>
                        <div className={`contact-form--gradient ${errors.user_name && "invalid"}`}>
                            <input
                                required
                                className="contact-form--input" type="text"
                                placeholder="Enter your name"
                                {...register('user_name', {required: true})}/></div>
                        <div className="contact-form--input__error">{errors.user_name &&
                            <span className="contact-form--input__error__text">{errors.user_name.message}</span>}</div>
                    </div>

                    <div className="contact-form--input_wrapper">
                        <div className="contact-form__text">Email:</div>
                        <input className="contact-form--input" type="text"
                               placeholder="Enter your email"  {...register('user_email')}/>
                        {errors.user_email &&
                            <span className="contact-form--input__error">{errors.user_email.message}</span>}
                    </div>

                    <div className="contact-form--input_wrapper">
                        <div className="contact-form__text">Phone:</div>
                        <input className="contact-form--input" type="text"  {...register('user_phone')}
                               placeholder="+380123456789"/>
                        {errors.user_phone &&
                            <span className="contact-form--input__error">{errors.user_phone.message}</span>}
                    </div>
                </div>
                <div>
                    {/*<label>Прикріпити <input type="file"*/}
                    {/*                         {...register('user_file')}*/}
                    {/*                         onChange={handleFileChange}/></label>*/}
                </div>

                <div className="contact-form--input_wrapper">
                    <textarea className="contact-form--textarea"
                              {...register('message')}
                              placeholder="Your message"
                              rows="5"
                              onChange={handleTextareaChange}
                    />

                    {errors.message && <span className="contact-form--input__error">{errors.message.message}</span>}
                </div>
                <div>{messageLength}/300</div>

                <br/>

                <div className="contact-form--btn__wrapper">
                    <button className="contact-form--btn">Send</button>
                </div>
            </form>
        </div>
    );
}

export {ContactForm};
