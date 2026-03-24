import React, {useRef, useState} from 'react'
import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import emailjs from "@emailjs/browser"

const contact = () => {
  const [isSent, setisSent] = useState(false);

  const form = useRef(null)

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_li0odr2",
        "template_8ddzn9q",
        form.current,
        "N4F_WUgZM99m3M1E4"
      )
      .then(
        () => {
        setisSent(true);
        form.current.reset()
        toast.success("Message sent successfully! \u2705", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: 'dark',
        });
      },
        (error) => {
          toast.error("Error sending message", error),
          toast.error("Failed to send message. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: 'dark',
        });
        },
      )
  }

  return (
    <section
      id="education"
      className="flex flex-col items-center py-24 px-[12vw] md:px-[7vw] lg:[px-20vw]"
    >
      <ToastContainer/>
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">CONTACT</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          I'd love to hear out from you-reach out for any opportunities and questions!
        </p>
      </div>
      <div className='mt-8 w-full max-w-md bg-[#0d081f] p-6 rounded-lg shadow-lg border border-gray-700'>
        <h3 className='text-xl font-semibold text-white text-center'>
          Connect With Me
        </h3>

        <form ref={form} onSubmit={sendEmail} className='mt-4 flex flex-col space-y-4'>
          <input type="email" name = 'user_email' placeholder='Your Email' required
          className='w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus-outline-none focus:border-purple-500'
          />
          <input type="text" name = 'user_name' placeholder='Your Name' required
          className='w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus-outline-none focus:border-purple-500'
          />
          <input type="text" name = 'user_subject' placeholder='Subject' required
          className='w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus-outline-none focus:border-purple-500'
          />
          <textarea name="message" placeholder='Message' rows='4'
          className='w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus-outline-none focus:border-purple-500'
          ></textarea>
          <button type='submit'
          className='w-full bg-gradient-to-r h-14 from-purple-600 to-pink-500 text-white font-semibold rounded-md hover:opacity-90 transition'
          >
            SEND
          </button>
        </form>
      </div>
    </section>
  )
}

export default contact
