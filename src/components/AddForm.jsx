import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AddForm({ open, setIsOpen }) {
  const [save, setSave] = useState("Save Game");

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [rating, setRatings] = useState("");

  const [error, setError] = useState(false);
  const [notif, setNotif] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !genre || !platform || !rating) {
      setError("Please fill in all fields ⚠️");
      console.log("Error: Please fill in all fields");
      setSave("Save Game");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    if (rating < 1 || rating > 5) {
      setError("Rating must be between 1 and 5");
      console.log("Error: Rating must be between 1 and 5");
      setSave("Save Game");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("gameCollection")
        .insert({ title, genre, platform, rating });

      if (error) throw error;
      setSave("Saving...");
      console.log("Game added successfully:", data);

      setInterval(() => {
        setNotif(true);
      }, 2000);

      setTimeout(() => {
        setIsOpen(false);
        navigate("/Dashboard");
        window.location.reload();
      }, 4000);
    } catch (error) {
      console.error("Error adding game:", error.message);
      setError(error.message);
      setSave("Save Game");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll"
        >
          <Notifications notif={notif} />
          <AnimatePresence>
            {error && (
              <motion.div
                key="err"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-0 right-0 flex justify-center items-center z-10"
              >
                <div className="px-4 py-2 bg-zinc-800 rounded-lg border border-zinc-600 mt-4">
                  <p className="text-xs tracking-wide font-medium text-zinc-100">
                    {error}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-zinc-900 rounded-lg p-10 border border-zinc-800 flex flex-col justify-center items-center"
            id="add-form"
          >
            <h1 className="text-lg font-bold mb-3">Add Game</h1>
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col justify-left items-start mt-5"
            >
              <div className="w-full flex flex-col">
                <label className="text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  className="w-full h-12 bg-zinc-800/10 backdrop-blur-sm border border-zinc-800 hover:ring-2 hover:ring-emerald-700 focus:outline-none outline-none transition-all duration-500 rounded-lg px-3  mb-2 text-xs"
                  placeholder="Game Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="w-full flex gap-2 ">
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-2">Genre</label>
                  <input
                    type="text"
                    className="w-full h-12 bg-zinc-800/10 backdrop-blur-sm border border-zinc-800 hover:ring-2 hover:ring-emerald-700 focus:outline-none outline-none transition-all duration-500 rounded-lg px-3  mb-2 text-xs"
                    placeholder="Game Genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-2">Platform</label>
                  <input
                    type="text"
                    className="w-full h-12 bg-zinc-800/10 backdrop-blur-sm border border-zinc-800 hover:ring-2 hover:ring-emerald-700 focus:outline-none outline-none transition-all duration-500 rounded-lg px-3  mb-2 text-xs"
                    placeholder="Game Platform"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label className="text-sm font-medium mb-2">Ratings</label>
                <input
                  type="number"
                  className="w-full h-12 bg-zinc-800/10 backdrop-blur-sm border border-zinc-800 hover:ring-2 hover:ring-emerald-700 focus:outline-none outline-none transition-all duration-500 rounded-lg px-3  mb-2 text-xs"
                  placeholder="Game Ratings"
                  value={rating}
                  onChange={(e) => setRatings(e.target.value)}
                />
              </div>
              <button
                onClick={handleSubmit}
                className="mt-5 w-full py-3 text-sm font-bold rounded-lg backdrop-blur-sm border border-emerald-600 bg-emerald-800 text-white hover:bg-emerald-800 hover:border-emerald-400 transition-all duration-300"
              >
                {save}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const Notifications = ({ notif }) => {
  return (
    <AnimatePresence>
      {notif && (
        <motion.div
          key="saved"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 left-0 right-0 flex justify-center items-center "
        >
          <div className="px-4 py-2 bg-zinc-800 rounded-lg border border-zinc-600 mt-4">
            <p className="text-xs tracking-wide font-medium text-zinc-100">
              Added 1 item to your collection 🟢
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
