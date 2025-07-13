"use client";
import { motion } from "framer-motion";
// import { MdVerifiedUser } from "react-icons/md";

type User = {
  id: string;
  name: string;
  email: string;
};

const ProfileCard = (props: User) => {
  return (
    <section className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-black text-white">
      <motion.div
        className="bg-white/10 backdrop-blur-lg border-white/10 shadow-lg rounded-2xl p-6 w-96 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* <MdVerifiedUser size={50} /> */}
        </motion.div>
        <div className="mt-6 text-left">
          <div className="mb-3">
            <p className="text-gray-400 text-sm">User ID</p>
            <p className="text-lg font-semibold">{props.id}</p>
          </div>
          <div className="mb-3">
            <p className="text-gray-400 text-sm">Name</p>
            <p className="text-lg font-semibold">{props.name}</p>
          </div>
          <div className="mb-3">
            <p className="text-gray-400 text-sm">Email</p>
            <p className="text-lg font-semibold">{props.email}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
export default ProfileCard;