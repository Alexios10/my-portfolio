import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { HiOutlineChevronDoubleUp } from "react-icons/hi";
import emailjs from "@emailjs/browser";
import schema from "./schema";
import Modal from "./Modal";

const Contact = () => {
  const form = useRef();
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    openModal
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [openModal]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const sendEmail = (data, e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_8tiaqax",
        "template_pzb5v45",
        form.current,
        "eps4pw7YWOlJdYiWX"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    reset();
  };

  return (
    <div id="contact" className="w-full lg:h-screen font-[poppins]">
      <div className="max-w-[1240px] m-auto px-2 py-16 w-full">
        <p className="text-xl tracking-widest uppercase text-[#5651e5]">
          Contact
        </p>
        <h2 className="py-4">Get In Touch</h2>
        <div className="grid lg:grid-cols-5 gap-8">
          {/* left side start */}

          <div className="col-span-3 lg:col-span-2 w-full h-full shadow-xl shadow-gray-400 rounded-xl p-4">
            <div className="lg:p-4 h-full">
              <div>
                <img
                  className="rounded-xl hover:scale-105 ease-in duration-300"
                  src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                  alt="/"
                />
              </div>
              <div>
                <h2 className="py-2">Name here</h2>
                <p>Front-End Developer</p>
                <p className="py-4">
                  I am available for part-time or full-time positions. Contact
                  me and let&lsquo;s talk ! &#128515;
                </p>
              </div>
              <div>
                <p className="uppercase pt-8 text-blue-500">Connect With Me</p>
                <div className="flex items-center justify-evenly py-4">
                  <a
                    className="rounded-full shadow-lg shadow-gray-500 p-3  hover:scale-110 ease-in duration-300"
                    href="https://www.linkedin.com/in/sattar-rahim-082188236/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedinIn className="text-blue-600" size={30} />
                  </a>
                  <a
                    className="rounded-full shadow-lg shadow-gray-500 p-3 hover:scale-110 ease-in duration-300"
                    href="https://github.com/Alexios10"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="text-black-600" size={30} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Left side End */}

          {/* *************** */}

          {/* Form start */}

          <div className="col-span-3 w-full h-auto shadow-xl shadow-gray-400 rounded-xl lg:p-4">
            <div className="p-4">
              <form onSubmit={handleSubmit(sendEmail)} ref={form}>
                <div className="grid md:grid-cols-1 gap-4 w-full py-2">
                  <div className="flex flex-col">
                    <label className="uppercase text-sm py-2">Name</label>
                    <input
                      name="name"
                      {...register("name", {
                        required: "Required",
                      })}
                      placeholder="You'r name"
                      className="border-2 rounded-lg p-3 border-gray-300"
                      type="text"
                    />
                    {errors.name && errors.name.message}
                  </div>
                </div>
                <div className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2">Email</label>
                  <input
                    name="email"
                    {...register("email", {
                      required: "Required",
                    })}
                    placeholder="You'r email"
                    className="border-2 rounded-lg p-3 border-gray-300"
                    type="email"
                  />
                  {errors.email && errors.email.message}
                </div>
                <div className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2">Subject</label>
                  <input
                    name="subject"
                    placeholder="You'r subject"
                    className="border-2 rounded-lg p-3 border-gray-300"
                    type="text"
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2">Massage</label>
                  <textarea
                    name="message"
                    {...register("message", {
                      required: "Required",
                    })}
                    type="text"
                    placeholder="You'r message"
                    className="border-2 rounded-lg p-3 border-gray-300"
                    rows="10"
                  />
                  {errors.message && errors.message.message}
                </div>
                <button
                  className="w-full p-4 text-gray-100 mt-4"
                  onClick={() => {
                    dirtyFields.name !== true ||
                    dirtyFields.email !== true ||
                    dirtyFields.message !== true ||
                    errors.email
                      ? openModal
                      : setOpenModal(true);
                  }}
                >
                  Send Massage
                </button>
                {openModal && <Modal closeModal={setOpenModal} />}
              </form>
              {/* Form end */}
            </div>
          </div>
        </div>

        <div className="flex justify-center py-12">
          <Link href="/">
            <div className="rounded-full shadow-lg shadow-gray-400 p-4 cursor-pointer hover:scale-110 ease-in duration-300">
              <HiOutlineChevronDoubleUp className="text-[#5651e5] " size={30} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
