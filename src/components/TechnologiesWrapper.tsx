import React from "react";
import { motion } from "framer-motion";

const TechnologiesWrapper = ({ technologies }: any) => {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const imagesVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      layout
      className="columns-4 technologies-wrapper justify-center py-3 my-3"
    >
      {technologies.map((tech: any, index: number) => (
        <motion.div
          key={index}
          variants={imagesVariant}
          className="technologies justify-center flex m-3"
        >
          <motion.img
            src={typeof tech === "object" ? tech.image : tech}
            alt={typeof tech === "object" ? tech.title : "Technologies Used"}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};
export default TechnologiesWrapper;
