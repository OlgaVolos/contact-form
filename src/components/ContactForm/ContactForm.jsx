import React from 'react';
import {useForm} from "react-hook-form";

import {joiResolver} from "@hookform/resolvers/joi";
import emailjs from '@emailjs/browser';

import {publicKey, serviceID, templateId} from "../../constants";
import {contactFormValidator} from "../../validators";

import './contactForm.scss'


const ContactForm = () => {
    const {
        register,
        reset,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: joiResolver(contactFormValidator),
        mode: "onTouched"
    })

    const submit = async (data) => {
        const {user_name, user_email, user_phone, message} = data;
        try {
            const templateParams = {
                user_name,
                user_email,
                user_phone,
                message,
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
    return (
        <div className="contact-form__container">
            <div className="contact-form__title">Contact Form with EmailJs</div>
            <form onSubmit={handleSubmit(submit)}>
                <div className="contact-form__input_block">
                    <div className="contact-form--input_wrapper">
                        <div className="contact-form__text">Name:</div>
                        <input className="contact-form--input" type="text" placeholder="Enter your name"  {...register('user_name')}/>
                    {errors.user_name && <span className="contact-form--input__error">{errors.user_name.message}</span>}
                    </div>

                    <div className="contact-form--input_wrapper">
                        <div className="contact-form__text">Email:</div>
                        <input className="contact-form--input" type="text"
                               placeholder="Enter your email"  {...register('user_email')}/>
                        {errors.user_email && <span className="contact-form--input__error">{errors.user_email.message}</span>}
                    </div>

                    <div className="contact-form--input_wrapper">
                        <div className="contact-form__text">Phone:</div>
                        <input className="contact-form--input" type="text"  {...register('user_phone')}
                               placeholder="+380123456789"/>
                        {errors.user_phone && <span className="contact-form--input__error">{errors.user_phone.message}</span>}
                    </div>
                </div>

                <div className="contact-form--input_wrapper" >
                    <textarea className="contact-form--textarea" {...register('message')} placeholder="Your message" rows="5"></textarea>
                    {errors.message && <span className="contact-form--input__error">{errors.message.message}</span>}
                </div>

                <br/>

                <div className="contact-form--btn__wrapper">
                    <button className="contact-form--btn">Send</button>
                </div>
            </form>
        </div>
    );
};

export {ContactForm};
