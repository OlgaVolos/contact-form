import React from 'react';
import {useForm} from "react-hook-form";

import {joiResolver} from "@hookform/resolvers/joi";
import emailjs from '@emailjs/browser';

import {publicKey, serviceID, templateId} from "../../constants";
import {contactFormValidator} from "../../validators";


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
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <div><label>Ім'я: <input type="text" {...register('user_name')}/></label></div>
                {errors.user_name && <span style={{color: "red"}}>{errors.user_name.message}</span>}
                <div><label>Email: <input type="text" {...register('user_email')}/></label></div>
                {errors.user_email && <span style={{color: "red"}}>{errors.user_email.message}</span>}
                <div><label>Phone: <input type="text" {...register('user_phone')} placeholder="+380123456789"/></label>
                </div>
                {errors.user_phone && <span style={{color: "red"}}>{errors.user_phone.message}</span>}
                <div><textarea {...register('message')} placeholder="Your message" rows="5" cols="35"></textarea>
                </div>
                {errors.message && <span style={{color: "red"}}>{errors.message.message}</span>}
                <br/>
                <button>Send</button>

            </form>
        </div>
    );
};

export {ContactForm};
