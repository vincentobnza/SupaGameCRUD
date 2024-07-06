import { motion, AnimatePresence } from "framer-motion";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function DeleteModal({ open, setIsOpen, game }) {
  const navigate = useNavigate();
  const [deleteGame, setDeleteGame] = useState("Delete Game");
  const handleDelete = async () => {
    try {
      const { data, error } = await supabase
        .from("gameCollection")
        .delete()
        .eq("id", game.id);
      if (error) throw error;
      setDeleteGame("Deleting...");
      setTimeout(() => {
        console.log("Game deleted successfully:", data);
        setIsOpen(false);
        navigate("/Dashboard");
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.log("Error deleting game:", error.message);
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
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-[#0d0d0d] rounded-lg p-10 border border-zinc-800 flex flex-col justify-center items-center"
          >
            <h1 className="text-xl font-bold mb-2">Delete Game?</h1>
            <p className="text-sm text-zinc-400">
              Sure you want to delete this game?
            </p>

            <div className="flex mt-8 gap-2 text-sm font-semibold">
              <button
                onClick={() => setIsOpen(false)}
                className="py-2 px-3 border border-zinc-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="py-2 px-3 bg-red-900 border border-red-600 rounded-lg hover:border-red-500 hover:bg-red-800 duration-300"
              >
                {deleteGame}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
