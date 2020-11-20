import { useFormik } from 'formik'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as yup from 'yup'
toast.configure()

export function VHelp({ message }) {
    return <p className='help'>{message}</p>
}

const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    message: yup.string().required("Please leave a message.")
})
export default function ContactForm() {
    let { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
        initialValues: {
            name: "",
            email: "",
            message: ""
        },

        validationSchema,

        onSubmit(values) {
            fetch('/api/contact', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            }).then(() => {
                toast('Successfully submitted', {
                    onClose: () => {
                        document.location = "/movies"
                    }
                })
            }).catch((error) => {
                toast('Failed to submit', {
                    onClose: () => {
                        document.location = "/movies"
                    }
                })
            })
        }
    })

    const history = useHistory()

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Contact us</h1>

                <div className='field'>
                    <label htmlFor='name'>Name</label>
                    <div className='control'>
                        <input type='text' name='name' id='name' value={values.name} onChange={handleChange} />
                        <VHelp message={errors.name} />
                    </div>
                </div>

                <div className='field'>
                    <label htmlFor='email'>Email</label>
                    <div className='control'>
                        <input type='text' name='email' id='email' value={values.email} onChange={handleChange} />
                        <VHelp message={errors.email} />
                    </div>
                </div>

                <div className='field'>
                    <label htmlFor='message'>Leave a message</label>
                    <div className='control'>
                        <textarea name='message' id='message' value={values.message} onChange={handleChange} />
                        <VHelp message={errors.message} />
                    </div>
                </div>

                <div className='field'>
                    <label></label>
                    <div className='control'>
                        <button className='primary' type="submit">Submit</button>
                        <button className='primary' onClick={() => history.push('/movies')}>Cancel</button>
                    </div>
                </div>
            </form>
        </>
    )
}