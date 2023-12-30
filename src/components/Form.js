"use client";

import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { supabase } from "../supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // or another Quill theme CSS

function FormModal() {
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [from, setFrom] = useState("");

  function onCloseModal() {
    setOpenModal(false);
    setFrom("");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (message !== "" && from !== "") {
      try {
        const { error } = await supabase
          .from("msg")
          .insert([{ from, message }])
          .select();

        if (error) {
          console.error("Error inserting data:", error);
        } else {
          setMessage("");
          setFrom("");
          toast.success("Message Sended", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }

        onCloseModal();
      } catch (error) {
        console.error("Error:", error.message);
      }
    } else {
      toast.info("Please fill out the form ", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <Button
        className="mx-auto bg-green-400"
        onClick={() => setOpenModal(true)}
      >
        Write Something 📝
      </Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              ✉ Leave some message
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="from" value="From" />
              </div>
              <TextInput
                id="from"
                placeholder="Jhon Doe"
                value={from}
                onChange={(event) => setFrom(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="message" value="Some Message" />
              </div>
              <ReactQuill
                id="message"
                required
                value={message}
                onChange={(value) => setMessage(value)}
              />
            </div>

            <div className="w-full">
              <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FormModal;
