import { motion } from 'framer-motion';

export default function About() {
  return (
    <motion.div
      className="px-6 py-20 max-w-4xl mx-auto text-center space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl font-bold mb-6">About the Artist</h1>

      <img
        src="/portrait.jpeg"
        alt="Nasir Alsamarraie"
        className="mx-auto w-48 h-48 object-cover rounded-full shadow-lg"
      />

      <p className="text-lg text-gray-700 leading-relaxed">
        Nasir Alsamarraie is a visionary artist merging traditional fine art with modern digital techniques.
        With a passion for blending classical beauty and abstract minimalism, his work explores the intersection
        of timeless craft and emerging technology.
      </p>

      <p className="text-base text-gray-600 max-w-2xl mx-auto">
        Based in Virginia, Nasir brings over a decade of creative experience across both physical and digital media.
        His portfolio showcases high-end, limited-edition pieces designed to elevate private collections,
        interior spaces, and contemporary galleries.
      </p>

      <p className="text-sm text-gray-500 italic">
        “Art should make you feel — grounded, inspired, or curious. If it moves you, it’s done its job.”
      </p>
    </motion.div>
  );
}
